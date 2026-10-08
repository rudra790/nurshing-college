"""Read-only notices API. No notice editing or personal-data storage."""

import json
import logging
import re
from datetime import date
from pathlib import Path

from fastapi import APIRouter, HTTPException


router = APIRouter(prefix="/api", tags=["notices"])
logger = logging.getLogger("college.notices")

DATA_FILE = Path(__file__).resolve().parents[1] / "data" / "notices.json"

ALLOWED_CATEGORIES = {
    "Admissions",
    "Academic",
    "Campus",
    "General",
}

ALLOWED_STATUSES = {
    "Important",
    "Announcement",
    "Information",
    "Update",
}

ID_PATTERN = re.compile(r"[a-z0-9]+(?:-[a-z0-9]+)*")
DATE_PATTERN = re.compile(r"[0-9]{4}-[0-9]{2}-[0-9]{2}")

MAX_RECORDS = 200


def clean_text(
    value: object,
    fallback: str = "",
    limit: int = 800,
) -> str:
    """Return bounded plain text, preserving paragraph breaks."""

    if not isinstance(value, str):
        return fallback

    text = value.strip()

    return text[:limit] if text else fallback


def clean_date(value: object) -> str:
    """Return a valid YYYY-MM-DD date or an empty string."""

    if not isinstance(value, str):
        return ""

    text = value.strip()

    if DATE_PATTERN.fullmatch(text) is None:
        return ""

    try:
        return date.fromisoformat(text).isoformat()
    except ValueError:
        return ""


def clean_translations(value: object) -> dict:
    """Allow only supported languages and notice text fields."""

    if not isinstance(value, dict):
        return {}

    translations = {}

    for language in ("en", "or"):
        source = value.get(language)

        if not isinstance(source, dict):
            continue

        translated = {}

        for field, limit in (
            ("title", 200),
            ("summary", 800),
            ("content", 12000),
        ):
            text = clean_text(source.get(field), limit=limit)

            if text:
                translated[field] = text

        if translated:
            translations[language] = translated

    return translations


def validate_record(record: object) -> dict:
    """Validate a notice and select its public fields."""

    if not isinstance(record, dict):
        raise ValueError("Invalid notice record")

    record_id = record.get("id")

    if (
        not isinstance(record_id, str)
        or len(record_id) > 80
        or ID_PATTERN.fullmatch(record_id) is None
    ):
        raise ValueError("Invalid notice identifier")

    title = clean_text(record.get("title"), limit=200)
    summary = clean_text(record.get("summary"), limit=800)
    content = clean_text(record.get("content"), limit=12000)

    if not title or not summary or not content:
        raise ValueError("Required notice text is missing")

    category = record.get("category")

    if (
        not isinstance(category, str)
        or category not in ALLOWED_CATEGORIES
    ):
        raise ValueError("Invalid notice category")

    # Missing or unrecognized optional statuses use a neutral label.
    status = record.get("status", "Information")

    if (
        not isinstance(status, str)
        or status not in ALLOWED_STATUSES
    ):
        status = "Information"

    # Only the actual JSON boolean true enables featured styling.
    featured = record.get("featured") is True

    # Records remain demos unless explicitly marked false.
    demo = record.get("demo", True)

    if not isinstance(demo, bool):
        raise ValueError("Invalid notice demo flag")

    publication_date = clean_date(record.get("date"))

    # Demo records must not suggest a verified publication date.
    if demo:
        publication_date = ""

    return {
        "id": record_id,
        "title": title,
        "category": category,
        "date": publication_date,
        "status": status,
        "summary": summary,
        "content": content,
        "featured": featured,
        "demo": demo,
        "replacement_note": clean_text(
            record.get("replacement_note"),
            fallback=(
                "CHANGE BEFORE PUBLISHING: Replace demo content with "
                "college-approved information and a verified publication "
                "date. Update the demo flag only after approval."
            ),
            limit=1000,
        ),
        "translations": clean_translations(
            record.get("translations")
        ),
    }


def read_notices() -> list[dict]:
    """Read, validate and sort notices without changing the JSON file."""

    # Supports UTF-8 files with or without a Windows byte-order mark.
    with DATA_FILE.open("r", encoding="utf-8-sig") as file:
        records = json.load(file)

    if not isinstance(records, list):
        raise ValueError("Notice data must be a list")

    if len(records) > MAX_RECORDS:
        raise ValueError("Too many notice records")

    notices = []
    seen_ids = set()

    for record in records:
        notice = validate_record(record)

        if notice["id"] in seen_ids:
            raise ValueError("Duplicate notice identifier")

        seen_ids.add(notice["id"])
        notices.append(notice)

    # Valid ISO dates sort chronologically as strings.
    # Empty dates follow valid dates.
    # Equal dates preserve the original JSON order.
    return sorted(
        notices,
        key=lambda notice: notice["date"],
        reverse=True,
    )


@router.get("/notices")
def get_notices() -> list[dict]:
    """Return validated public notice records."""

    try:
        return read_notices()
    except (OSError, ValueError):
        logger.warning("Notice data could not be loaded or validated.")

        raise HTTPException(
            status_code=503,
            detail=(
                "Notice information is currently unavailable. "
                "Please try again later."
            ),
        ) from None