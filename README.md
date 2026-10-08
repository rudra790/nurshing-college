# Sriram College of Nursing — foundation only

HTML5, CSS3, vanilla JavaScript and FastAPI. No frontend frameworks, database, logins or application forms.

## Windows / VS Code setup
Extract this folder and open nursing-college in VS Code. In the integrated PowerShell terminal:

```powershell
py -m venv .venv
.\.venv\Scripts\python.exe -m pip install -r requirements.txt
.\.venv\Scripts\python.exe -m uvicorn backend.main:app --reload --host 127.0.0.1 --port 8000
```

No PowerShell activation is required. Keep that terminal running. Open http://127.0.0.1:8000/ in your browser. Health: http://127.0.0.1:8000/api/health. Stop with Ctrl+C.

macOS/Linux: python3 -m venv .venv; then run .venv/bin/python -m pip install -r requirements.txt and .venv/bin/python -m uvicorn backend.main:app --reload.

Use the FastAPI URL for both frontend and backend. Opening index.html directly displays the static English preview but the API requires an HTTP server.

## Scope
- CSS tokens, buttons, cards, inputs, badges, loading/empty/error utility classes and responsive layout.
- Minimal foundation preview, English/Odia language controls and reduced-motion-aware reveal behavior.
- Reusable mobile navigation hooks; full responsive navbar and announcement bar are next.
- /api/health, restricted environment-configured CORS and public-only static serving.
- Other HTML files are explicitly unfinished bilingual scaffolds.
- Courses/faculty/events/notices/gallery JavaScript files are reserved for later pages.
- JSON files are staged demo records, not public API endpoints yet.
- Original supplied photos copied under meaningful names. No external photos or fonts required.

## CHANGE BEFORE PUBLISHING
Search the project for `CHANGE BEFORE PUBLISHING` in VS Code (Ctrl+Shift+F).
JSON cannot contain comments: use the `replacement_note` and `demo` fields there.

1. ANM, GNM and B.Sc. Nursing are DEMO entries only; confirm every offered course, eligibility, duration, seats, fees and approval. No accreditation claims have been added.
2. All faculty names and roles are fictional demo profiles; replace with college-approved records before displaying them publicly.
3. Email is not supplied and is omitted. WhatsApp availability is unconfirmed and no WhatsApp link is added.
4. Confirm supplied phone/address and official name. Obtain college approval for uploaded photographs. No student/faculty identity is inferred from images.
5. Review Odia spelling/translation with the college. Install an Odia-capable system font if your operating system does not display Odia; licensed self-hosted fonts can be added later.
6. Replace example.invalid canonical/Open Graph URLs and favicon. Preview pages have noindex. Add language-specific SEO in the later publication milestone.
7. For production set APP_ENV=production and ALLOWED_ORIGINS to exact approved HTTPS origins. Use a production ASGI hosting setup with TLS; do not deploy --reload. Same-origin hosting needs no CORS.
8. Dependency version ranges are foundation constraints; lock reviewed versions before deployment.

## Assets
logo/college-logo.jpeg: logo.jpeg
hero/campus-building.jpeg: i1.jpeg
hero/campus-entrance.jpeg: i2.jpeg
gallery/nursing-training.jpg: i3.jpg
facilities/nursing-lab.jpg: i5.jpg
facilities/anatomy-model.jpg: i6.jpg
facilities/community-health-lab.jpg: i7.jpg

## File changes
All files in this package are newly created. Supplied originals were copied, not modified.

## Validation completed
Health endpoint, all 11 HTML documents, security headers, public asset paths, JSON parsing, JavaScript syntax, allowed and rejected CORS origins, and non-exposure of backend data passed. Browser layout/interaction tests were not run because no browser executable was available in the build environment. Check the preview at 360, 390, 768, 1024 and 1440 pixels in your browser before publication.
