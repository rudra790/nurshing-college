"""Read-only gallery API. No uploads or personal-data storage."""

import json
import logging
import re
from pathlib import Path

from fastapi import APIRouter, HTTPException


router = APIRouter(prefix="/api", tags=["gallery"])
logger = logging.getLogger("college.gallery")

DATA_FILE = Path(__file__).resolve().parents[1] / "data" / "gallery.json"

ALLOWED_CATEGORIES = {
    "Campus",
    "Facilities",
    "Events",
    "Activities",
}

ALLOWED_IMAGE_EXTENSIONS = {
    ".jpg",
    ".jpeg",
    ".png",
    ".webp",
    ".avif",
}

ID_PATTERN = re.compile(r"[a-z0-9]+(?:-[a-z0-9]+)*")
IMAGE_PATTERN = re.compile(r"/assets/images/[A-Za-z0-9_./-]+")

MAX_RECORDS = 200


def clean_text(value: object, fallback: str = "", limit: int = 500) -> str:
    """Return a bounded plain-text value."""

    if not isinstance(value, str):
        return fallback

    text = value.strip()
    return text[:limit] if text else fallback


def validate_image_path(value: object) -> str:
    """Allow only local image paths inside public assets."""

    if not isinstance(value, str):
        raise ValueError("Invalid gallery image")

    path = value.strip()

    if len(path) > 300 or IMAGE_PATTERN.fullmatch(path) is None:
        raise ValueError("Invalid gallery image")

    # Reject traversal, repeated separators and standalone dot segments.
    segments = path.removeprefix("/").split("/")

    if any(segment in {"", ".", ".."} for segment in segments):
        raise ValueError("Invalid gallery image")

    if Path(path).suffix.lower() not in ALLOWED_IMAGE_EXTENSIONS:
        raise ValueError("Invalid gallery image extension")

    return path


def clean_translations(value: object) -> dict:
    """Return only supported language fields."""

    if not isinstance(value, dict):
        return {}

    result = {}

    for language in ("en", "or"):
        source = value.get(language)

        if not isinstance(source, dict):
            continue

        translated = {}

        for field, limit in (
            ("title", 160),
            ("description", 800),
            ("alt", 300),
        ):
            text = clean_text(source.get(field), limit=limit)

            if text:
                translated[field] = text

        if translated:
            result[language] = translated

    return result


def validate_record(record: object) -> dict:
    """Validate and select public gallery fields."""

    if not isinstance(record, dict):
        raise ValueError("Invalid gallery record")

    record_id = record.get("id")

    if (
        not isinstance(record_id, str)
        or len(record_id) > 80
        or ID_PATTERN.fullmatch(record_id) is None
    ):
        raise ValueError("Invalid gallery identifier")

    category = record.get("category")

    if not isinstance(category, str) or category not in ALLOWED_CATEGORIES:
        raise ValueError("Invalid gallery category")

    title = clean_text(record.get("title"), limit=160)
    alt = clean_text(record.get("alt"), limit=300)

    if not title or not alt:
        raise ValueError("Gallery title and alt text are required")

    demo = record.get("demo", True)

    if not isinstance(demo, bool):
        raise ValueError("Invalid gallery demo flag")

    return {
        "id": record_id,
        "title": title,
        "category": category,
        "description": clean_text(
            record.get("description"),
            limit=800,
        ),
        "image": validate_image_path(record.get("image")),
        "alt": alt,
        "demo": demo,
        "replacement_note": clean_text(
            record.get("replacement_note"),
            fallback=(
                "CHANGE BEFORE PUBLISHING: Verify photograph attribution, "
                "publication permission and approved captions."
            ),
            limit=1000,
        ),
        "translations": clean_translations(
            record.get("translations")
        ),
    }


def read_gallery() -> list[dict]:
    """Read gallery records without exposing backend files."""

    # utf-8-sig also supports files saved with a UTF-8 BOM on Windows.
    with DATA_FILE.open("r", encoding="utf-8-sig") as file:
        records = json.load(file)

    if not isinstance(records, list):
        raise ValueError("Gallery data must be a list")

    if len(records) > MAX_RECORDS:
        raise ValueError("Too many gallery records")

    gallery = []
    seen_ids = set()

    for record in records:
        item = validate_record(record)

        if item["id"] in seen_ids:
            raise ValueError("Duplicate gallery identifier")

        seen_ids.add(item["id"])
        gallery.append(item)

    return gallery


@router.get("/gallery")
def get_gallery() -> list[dict]:
    """Return validated public gallery data."""

    try:
        return read_gallery()
    except (OSError, ValueError):
        logger.warning("Gallery data could not be loaded or validated.")

        raise HTTPException(
            status_code=503,
            detail="Gallery content is currently unavailable.",
        ) from None