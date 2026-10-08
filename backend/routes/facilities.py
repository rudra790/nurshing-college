"""Public facility information loaded from JSON."""

import json
import logging
import re
from pathlib import Path

from fastapi import APIRouter, HTTPException

router = APIRouter(prefix="/api", tags=["facilities"])
logger = logging.getLogger("college")

FACILITIES_FILE = (
    Path(__file__).resolve().parents[1] / "data" / "facilities.json"
)

DEFAULTS = {
    "name": "Facility Profile",
    "category": "Details to be confirmed",
    "description": "Facility information requires college confirmation.",
    "image_alt": "Facility image awaiting confirmation",
}


def read_text(value, fallback=""):
    """Accept plain text without converting objects into strings."""
    if isinstance(value, str) and value.strip():
        return value.strip()
    return fallback


def validate_image(value):
    """Allow local image paths only; empty values use a UI fallback."""
    image = read_text(value)

    if not re.fullmatch(r"/assets/images/[A-Za-z0-9_./-]+", image):
        return ""

    if any(part in {"", ".", ".."} for part in image.split("/")[1:]):
        return ""

    if Path(image).suffix.lower() not in {
        ".jpg", ".jpeg", ".png", ".webp", ".avif"
    }:
        return ""

    return image


def validate_record(record):
    if not isinstance(record, dict):
        raise ValueError("Invalid facility record")

    facility_id = read_text(record.get("id"))

    if (
        len(facility_id) > 80
        or not re.fullmatch(r"[a-z0-9]+(?:-[a-z0-9]+)*", facility_id)
    ):
        raise ValueError("Invalid facility identifier")

    demo = record.get("demo")

    result = {
        "id": facility_id,
        "demo": demo if isinstance(demo, bool) else True,
        "image": validate_image(record.get("image")),
        "replacement_note": read_text(
            record.get("replacement_note"),
            "CHANGE BEFORE PUBLISHING: Verify facility information "
            "and photograph permissions with the college.",
        ),
        "translations": {},
    }

    for field, fallback in DEFAULTS.items():
        result[field] = read_text(record.get(field), fallback)

    translations = record.get("translations")

    if isinstance(translations, dict):
        for language in ("en", "or"):
            translated = translations.get(language)

            if not isinstance(translated, dict):
                continue

            fields = {}

            for field in DEFAULTS:
                value = read_text(translated.get(field))
                if value:
                    fields[field] = value

            if fields:
                result["translations"][language] = fields

    return result


def load_facilities():
    # Supports UTF-8 files with or without a Windows BOM.
    data = json.loads(
        FACILITIES_FILE.read_text(encoding="utf-8-sig")
    )

    if not isinstance(data, list):
        raise ValueError("Facility data must be an array")

    records = []
    seen_ids = set()

    for item in data:
        record = validate_record(item)

        if record["id"] in seen_ids:
            raise ValueError("Duplicate facility identifier")

        seen_ids.add(record["id"])
        records.append(record)

    # An empty array is valid and triggers the frontend empty state.
    return records


@router.get("/facilities")
def get_facilities():
    try:
        return load_facilities()
    except (OSError, ValueError):
        logger.warning("Facility content could not be loaded.")
        raise HTTPException(
            status_code=503,
            detail="Facility information is temporarily unavailable.",
        ) from None