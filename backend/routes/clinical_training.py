"""Public clinical training information loaded from JSON."""

import json
import logging
import re
from pathlib import Path

from fastapi import APIRouter, HTTPException

router = APIRouter(prefix="/api", tags=["clinical-training"])
logger = logging.getLogger("college")

CLINICAL_FILE = (
    Path(__file__).resolve().parents[1]
    / "data"
    / "clinical-training.json"
)

DEFAULTS = {
    "title": "Details to be confirmed",
    "category": "Details to be confirmed",
    "description": "Details to be confirmed",
    "image_alt": "Practical learning photograph",
}


def read_text(value, fallback=""):
    """Accept plain text without converting objects into strings."""
    if isinstance(value, str) and value.strip():
        return value.strip()
    return fallback


def validate_image(value):
    """Allow local image paths only; missing images remain empty."""
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
        raise ValueError("Invalid clinical training record")

    record_id = read_text(record.get("id"))

    if (
        len(record_id) > 80
        or not re.fullmatch(r"[a-z0-9]+(?:-[a-z0-9]+)*", record_id)
    ):
        raise ValueError("Invalid clinical training identifier")

    demo = record.get("demo")

    result = {
        "id": record_id,
        "demo": demo if isinstance(demo, bool) else True,
        "image": validate_image(record.get("image")),
        "replacement_note": read_text(
            record.get("replacement_note"),
            "CHANGE BEFORE PUBLISHING: Verify clinical training "
            "information and photograph permissions with the college.",
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


def load_clinical_training():
    # Accept UTF-8 JSON with or without a Windows BOM.
    data = json.loads(
        CLINICAL_FILE.read_text(encoding="utf-8-sig")
    )

    if not isinstance(data, list):
        raise ValueError("Clinical training data must be an array")

    records = []
    seen_ids = set()

    for item in data:
        record = validate_record(item)

        if record["id"] in seen_ids:
            raise ValueError("Duplicate clinical training identifier")

        seen_ids.add(record["id"])
        records.append(record)

    # An empty array is valid and triggers the frontend empty state.
    return records


@router.get("/clinical-training")
def get_clinical_training():
    try:
        return load_clinical_training()
    except (OSError, ValueError):
        logger.warning("Clinical training content could not be loaded.")
        raise HTTPException(
            status_code=503,
            detail="Clinical training information is temporarily unavailable.",
        ) from None