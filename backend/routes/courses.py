"""Public course API backed by the local JSON data file."""

import json
import logging
import re
from pathlib import Path

from fastapi import APIRouter, HTTPException


router = APIRouter(prefix="/api", tags=["courses"])
logger = logging.getLogger("college.courses")

COURSES_FILE = (
    Path(__file__).resolve().parents[1] / "data" / "courses.json"
)

COURSE_ID_PATTERN = re.compile(r"[a-z0-9]+(?:-[a-z0-9]+)*")

TEXT_DEFAULTS = {
    "short_name": "Details to be confirmed",
    "availability": "Program availability to be confirmed",
    "duration": "Duration to be confirmed",
    "eligibility": "Eligibility details to be confirmed",
    "intake": "Intake to be confirmed",
    "career": "Career information to be confirmed",
    "image_alt": "Nursing education photograph",
}

TRANSLATABLE_FIELDS = {
    "name",
    "short_name",
    "availability",
    "duration",
    "eligibility",
    "intake",
    "overview",
    "career",
    "image_alt",
}


def read_text(value, fallback=""):
    """Accept only non-empty strings; never expose null or objects."""

    if isinstance(value, str) and value.strip():
        return value.strip()

    return fallback


def validate_image_path(value):
    """Permit local image paths only, without traversal or external URLs."""

    path = read_text(value)

    if not path:
        return ""

    if not path.startswith("/assets/images/"):
        raise ValueError("Invalid image path")

    if not re.fullmatch(r"/assets/images/[A-Za-z0-9_./-]+", path):
        raise ValueError("Invalid image path")

    if any(part in {".", "..", ""} for part in path[1:].split("/")):
        raise ValueError("Invalid image path")

    if Path(path).suffix.lower() not in {
        ".jpg",
        ".jpeg",
        ".png",
        ".webp",
        ".avif",
    }:
        raise ValueError("Invalid image extension")

    return path


def validate_course(raw):
    """Return only the expected public course fields."""

    if not isinstance(raw, dict):
        raise ValueError("Invalid course record")

    course_id = read_text(raw.get("id"))
    name = read_text(raw.get("name"))
    overview = read_text(raw.get("overview"))

    if (
        not course_id
        or len(course_id) > 80
        or not COURSE_ID_PATTERN.fullmatch(course_id)
        or not name
        or not overview
    ):
        raise ValueError("Missing or invalid course information")

    demo = raw.get("demo", True)

    if not isinstance(demo, bool):
        raise ValueError("Invalid demo flag")

    course = {
        "id": course_id,
        "name": name,
        "overview": overview,
        "demo": demo,
        "image": validate_image_path(raw.get("image")),
        "replacement_note": read_text(raw.get("replacement_note")),
    }

    for field, fallback in TEXT_DEFAULTS.items():
        course[field] = read_text(raw.get(field), fallback)

    # If a short name is missing, use the validated full name.
    course["short_name"] = read_text(raw.get("short_name"), name)

    translations = raw.get("translations", {})

    if not isinstance(translations, dict):
        raise ValueError("Invalid translations")

    course["translations"] = {}

    for language in ("en", "or"):
        translated = translations.get(language)

        if translated is None:
            continue

        if not isinstance(translated, dict):
            raise ValueError("Invalid translated record")

        course["translations"][language] = {
            field: read_text(translated.get(field), course[field])
            for field in TRANSLATABLE_FIELDS
        }

    return course


def load_courses():
    """Read and validate JSON; an empty array remains a valid empty state."""

    with COURSES_FILE.open("r", encoding="utf-8-sig") as file:
        data = json.load(file)

    if not isinstance(data, list):
        raise ValueError("Course data must be an array")

    courses = []
    seen_ids = set()

    for raw in data:
        course = validate_course(raw)

        if course["id"] in seen_ids:
            raise ValueError("Duplicate course ID")

        seen_ids.add(course["id"])
        courses.append(course)

    return courses


@router.get("/courses")
def get_courses():
    """Return course information without exposing backend internals."""

    try:
        return load_courses()

    except (OSError, ValueError):
        logger.warning("Course data is unavailable or invalid.")

        raise HTTPException(
            status_code=503,
            detail="Course information is temporarily unavailable.",
        ) from None