"""Local foundation. No admissions submissions or personal-data storage."""

import logging
import os
from pathlib import Path

from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from fastapi.staticfiles import StaticFiles

from backend.routes.courses import router as courses_router
from backend.routes.faculty import router as faculty_router
from backend.routes.facilities import router as facilities_router
from backend.routes.clinical_training import router as clinical_training_router
from backend.routes.events import router as events_router
from backend.routes.gallery import router as gallery_router
from backend.routes.notices import router as notices_router


app = FastAPI(
    title="College foundation",
    docs_url=None,
    redoc_url=None,
    openapi_url=None,
)

# CHANGE BEFORE PUBLISHING:
# Set APP_ENV=production and configure exact approved frontend origins.
environment = os.getenv("APP_ENV", "development")

default_origins = (
    "http://localhost:8000,http://127.0.0.1:8000"
    if environment == "development"
    else ""
)

origins = [
    value.strip()
    for value in os.getenv("ALLOWED_ORIGINS", default_origins).split(",")
    if value.strip()
]

if "*" in origins:
    raise RuntimeError("Explicit origins are required")

if origins:
    app.add_middleware(
        CORSMiddleware,
        allow_origins=origins,
        allow_credentials=False,
        allow_methods=["GET"],
        allow_headers=["Accept", "Content-Type"],
    )


@app.middleware("http")
async def security_headers(request: Request, call_next):
    response = await call_next(request)

    response.headers["X-Content-Type-Options"] = "nosniff"
    response.headers["Referrer-Policy"] = "strict-origin-when-cross-origin"
    response.headers["X-Frame-Options"] = "DENY"
    response.headers["Permissions-Policy"] = (
        "camera=(), microphone=(), geolocation=()"
    )
    response.headers["Content-Security-Policy"] = (
        "default-src 'self'; "
        "script-src 'self'; "
        "style-src 'self'; "
        "img-src 'self'; "
        "connect-src 'self'; "
        "font-src 'self'; "
        "object-src 'none'; "
        "base-uri 'self'; "
        "frame-ancestors 'none'; "
        "form-action 'self'"
    )

    return response


@app.exception_handler(Exception)
async def unexpected_error(request: Request, exc: Exception):
    logging.getLogger("college").error(
        "Unhandled request failure",
        exc_info=(type(exc), exc, exc.__traceback__),
    )

    return JSONResponse(
        status_code=500,
        content={"detail": "Content temporarily unavailable."},
    )


@app.get("/api/health")
def health():
    return {"status": "ok"}


# Register all API routes BEFORE the frontend catch-all mount.
app.include_router(courses_router)
app.include_router(faculty_router)
app.include_router(facilities_router)
app.include_router(clinical_training_router)
app.include_router(events_router)
app.include_router(gallery_router)
app.include_router(notices_router)


# Serve only public frontend files, never backend/data.
# On Vercel, static files are served by Vercel's CDN, so we skip mounting.
if os.getenv("VERCEL") != "1":
    frontend_directory = Path(__file__).resolve().parents[1] / "frontend"

    app.mount(
        "/",
        StaticFiles(directory=frontend_directory, html=True),
        name="frontend",
    )