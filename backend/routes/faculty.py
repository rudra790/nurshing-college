"""Public faculty records. No submissions or personal-data storage."""

import json
import logging
import re
from pathlib import Path

from fastapi import APIRouter, HTTPException

router = APIRouter(prefix="/api", tags=["faculty"])
logger = logging.getLogger("college")

FACULTY_FILE = (
    Path(__file__).resolve().parents[1] / "data" / "faculty.json"
)

ID_PATTERN = re.compile(r"^[a-z0-9]+(?:-[a-z0-9]+)*$")
IMAGE_PATTERN = re.compile(r"^/assets/images/[A-Za-z0-9_./-]+$")
IMAGE_EXTENSIONS = {".jpg", ".jpeg", ".png", ".webp", ".avif"}

DEFAULTS = {
    "name": "Faculty Profile",
    "designation": "Details to be confirmed",
    "qualification": "Details to be confirmed",
    "experience": "Details to be confirmed",
    "specialization": "Details to be confirmed",
    "image_alt": "Faculty profile placeholder",
}

TRANSLATABLE_FIELDS = tuple(DEFAULTS)


def read_text(value, fallback=""):
    """Return plain text without converting objects into strings."""
    if isinstance(value, str) and value.strip():
        return value.strip()
    return fallback


def validate_image(value):
    """Allow only local image paths; empty values use the UI placeholder."""
    image = read_text(value)

    if not image:
        return ""

    if not IMAGE_PATTERN.fullmatch(image):
        return ""

    segments = image.split("/")[1:]

    if any(segment in {"", ".", ".."} for segment in segments):
        return ""

    if Path(image).suffix.lower() not in IMAGE_EXTENSIONS:
        return ""

    return image


def validate_record(record):
    if not isinstance(record, dict):
        raise ValueError("Invalid faculty record")

    faculty_id = read_text(record.get("id"))

    if (
        not faculty_id
        or len(faculty_id) > 80
        or not ID_PATTERN.fullmatch(faculty_id)
    ):
        raise ValueError("Invalid faculty identifier")

    # Explicitly approved records may set demo to false.
    # Missing or invalid flags remain marked as demo.
    demo_value = record.get("demo")
    demo = demo_value if isinstance(demo_value, bool) else True

    result = {
        "id": faculty_id,
        "demo": demo,
        "image": validate_image(record.get("image")),
        "replacement_note": read_text(
            record.get("replacement_note"),
            (
                "CHANGE BEFORE PUBLISHING: Verify faculty information "
                "and photograph permissions with the college."
            ),
        ),
    }

    for field, fallback in DEFAULTS.items():
        result[field] = read_text(record.get(field), fallback)

    translations = record.get("translations")
    result["translations"] = {}

    if isinstance(translations, dict):
        for language in ("en", "or"):
            translated_record = translations.get(language)

            if not isinstance(translated_record, dict):
                continue

            # Return supplied translations only.
            # The frontend handles bilingual fallback text.
            translated_fields = {}

            for field in TRANSLATABLE_FIELDS:
                value = read_text(translated_record.get(field))
                if value:
                    translated_fields[field] = value

            if translated_fields:
                result["translations"][language] = translated_fields

    return result


def load_faculty():
    # utf-8-sig also accepts JSON saved with a UTF-8 BOM on Windows.
    raw_data = json.loads(FACULTY_FILE.read_text(encoding="utf-8-sig"))

    if not isinstance(raw_data, list):
        raise ValueError("Faculty data must be an array")

    records = []
    seen_ids = set()

    for raw_record in raw_data:
        record = validate_record(raw_record)

        if record["id"] in seen_ids:
            raise ValueError("Duplicate faculty identifier")

        seen_ids.add(record["id"])
        records.append(record)

    # An empty array is valid and triggers the frontend empty state.
    return records


@router.get("/faculty")
def get_faculty():
    try:
        return load_faculty()
    except (OSError, ValueError):
        logger.warning("Faculty content could not be loaded.")
        raise HTTPException(
            status_code=503,
            detail="Faculty information is temporarily unavailable.",
        ) from None