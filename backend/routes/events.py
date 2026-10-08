"""Public event profiles loaded from JSON."""

import json
import logging
import re
from datetime import date
from pathlib import Path

from fastapi import APIRouter, HTTPException

router = APIRouter(prefix="/api", tags=["events"])
logger = logging.getLogger("college")

EVENTS_FILE = Path(__file__).resolve().parents[1] / "data" / "events.json"

DEFAULTS = {
    "title": "Details to be confirmed",
    "category": "Details to be confirmed",
    "location": "Location to be confirmed",
    "description": "Details to be confirmed",
    "image_alt": "Event photograph",
    "image_caption": "",
}

ALLOWED_STATUSES = {"Upcoming", "Ongoing", "Completed", "TBC"}


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


def validate_date(value):
    """Return a valid YYYY-MM-DD date or empty text for an unknown date."""
    value = read_text(value)

    if not re.fullmatch(r"\d{4}-\d{2}-\d{2}", value):
        return ""

    try:
        date.fromisoformat(value)
    except ValueError:
        return ""

    return value


def validate_record(record):
    if not isinstance(record, dict):
        raise ValueError("Invalid event record")

    event_id = read_text(record.get("id"))

    if (
        len(event_id) > 80
        or not re.fullmatch(r"[a-z0-9]+(?:-[a-z0-9]+)*", event_id)
    ):
        raise ValueError("Invalid event identifier")

    demo_value = record.get("demo")
    demo = demo_value if isinstance(demo_value, bool) else True

    event_date = validate_date(record.get("date"))
    event_status = read_text(record.get("status"), "TBC")

    if event_status not in ALLOWED_STATUSES:
        event_status = "TBC"

    # Demo profiles must not appear as confirmed scheduled events.
    # Unknown dates also remain marked as unconfirmed.
    if demo or not event_date:
        event_status = "TBC"

    result = {
        "id": event_id,
        "demo": demo,
        "date": event_date,
        "status": event_status,
        "image": validate_image(record.get("image")),
        "replacement_note": read_text(
            record.get("replacement_note"),
            "CHANGE BEFORE PUBLISHING: Verify event information "
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


def load_events():
    # Accept UTF-8 JSON with or without a Windows BOM.
    data = json.loads(EVENTS_FILE.read_text(encoding="utf-8-sig"))

    if not isinstance(data, list):
        raise ValueError("Event data must be an array")

    records = []
    seen_ids = set()

    for item in data:
        record = validate_record(item)

        if record["id"] in seen_ids:
            raise ValueError("Duplicate event identifier")

        seen_ids.add(record["id"])
        records.append(record)

    # An empty array is valid and triggers the frontend empty state.
    return records


@router.get("/events")
def get_events():
    try:
        return load_events()
    except (OSError, ValueError):
        logger.warning("Event content could not be loaded.")
        raise HTTPException(
            status_code=503,
            detail="Event information is temporarily unavailable.",
        ) from None