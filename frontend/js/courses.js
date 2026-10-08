"use strict";

(() => {
  // Shared route configuration for course cards and the details page.
  const sharedConfig =
    typeof SITE_CONFIG !== "undefined" ? SITE_CONFIG : {};

  sharedConfig.routes = {
    ...sharedConfig.routes,
    coursesApi: "/api/courses",
    courseDetails: "course-details.html",
    admission: "contact.html#admission",
  };

  const ROUTES = sharedConfig.routes;

  const TEXT = {
    en: {
      eyebrow: "Our Programs",
      title: "Explore Your Path in Nursing",
      description:
        "Explore these demo program profiles and contact the college for confirmed course availability and admission information.",
      demoNotice:
        "Demo programs — availability, duration, eligibility and intake require college confirmation.",
      initialStatus: "Program information will load here.",
      loading: "Loading program information…",
      loaded: "Program information loaded.",
      programLabel: "Nursing Program",
      demoBadge: "Demo program",
      duration: "Duration",
      eligibility: "Eligibility",
      intake: "Intake",
      career: "Career pathways",
      overview: "Overview",
      programInformation: "Program information",
      view: "View Program",
      admission: "Admission Enquiry",
      unavailable: "Photograph temporarily unavailable.",
      fallback: "Details to be confirmed",
      availability: "Program availability to be confirmed",
      emptyTitle: "Programs are currently being updated.",
      emptyDescription:
        "Please check back shortly or contact the college for program information.",
      errorTitle: "Unable to load program information.",
      errorDescription:
        "Course information is temporarily unavailable. Please try again shortly.",
      retry: "Try Again",
      contact: "Contact the College",
      notFound: "Program not found.",
      notFoundDescription:
        "The requested program is unavailable. Return to the homepage to explore program information.",
      home: "Home",
      courses: "Programs",
      detailsTitle: "Program Details",
    },

    or: {
      eyebrow: "ଆମ ପାଠ୍ୟକ୍ରମ",
      title: "ନର୍ସିଂରେ ଆପଣଙ୍କ ପଥ ଖୋଜନ୍ତୁ",
      description:
        "ଏହି ନମୁନା ପାଠ୍ୟକ୍ରମ ପରିଚୟ ଦେଖନ୍ତୁ। ପାଠ୍ୟକ୍ରମର ନିଶ୍ଚିତ ଉପଲବ୍ଧତା ଓ ନାମଲେଖା ସୂଚନା ପାଇଁ କଲେଜକୁ ଯୋଗାଯୋଗ କରନ୍ତୁ।",
      demoNotice:
        "ନମୁନା ପାଠ୍ୟକ୍ରମ — ଉପଲବ୍ଧତା, ଅବଧି, ଯୋଗ୍ୟତା ଓ ଆସନ ସଂଖ୍ୟା କଲେଜ ଦ୍ୱାରା ନିଶ୍ଚିତ ହେବା ଆବଶ୍ୟକ।",
      initialStatus: "ପାଠ୍ୟକ୍ରମ ସୂଚନା ଏଠାରେ ଦେଖାଯିବ।",
      loading: "ପାଠ୍ୟକ୍ରମ ସୂଚନା ଲୋଡ୍ ହେଉଛି…",
      loaded: "ପାଠ୍ୟକ୍ରମ ସୂଚନା ଲୋଡ୍ ହୋଇଛି।",
      programLabel: "ନର୍ସିଂ ପାଠ୍ୟକ୍ରମ",
      demoBadge: "ନମୁନା ପାଠ୍ୟକ୍ରମ",
      duration: "ଅବଧି",
      eligibility: "ଯୋଗ୍ୟତା",
      intake: "ଆସନ ସଂଖ୍ୟା",
      career: "ବୃତ୍ତିଗତ ପଥ",
      overview: "ପରିଚୟ",
      programInformation: "ପାଠ୍ୟକ୍ରମ ସୂଚନା",
      view: "ପାଠ୍ୟକ୍ରମ ଦେଖନ୍ତୁ",
      admission: "ନାମଲେଖା ସମ୍ବନ୍ଧୀୟ ଯୋଗାଯୋଗ",
      unavailable: "ଫଟୋ ବର୍ତ୍ତମାନ ଉପଲବ୍ଧ ନାହିଁ।",
      fallback: "ବିବରଣୀ ନିଶ୍ଚିତ ହେବା ବାକି",
      availability: "ପାଠ୍ୟକ୍ରମର ଉପଲବ୍ଧତା ନିଶ୍ଚିତ ହେବା ବାକି",
      emptyTitle: "ପାଠ୍ୟକ୍ରମ ସୂଚନା ଅଦ୍ୟତନ ହେଉଛି।",
      emptyDescription:
        "ପରେ ପୁଣି ଦେଖନ୍ତୁ କିମ୍ବା ପାଠ୍ୟକ୍ରମ ସୂଚନା ପାଇଁ କଲେଜକୁ ଯୋଗାଯୋଗ କରନ୍ତୁ।",
      errorTitle: "ପାଠ୍ୟକ୍ରମ ସୂଚନା ଲୋଡ୍ ହୋଇପାରିଲା ନାହିଁ।",
      errorDescription:
        "ପାଠ୍ୟକ୍ରମ ସୂଚନା ବର୍ତ୍ତମାନ ଉପଲବ୍ଧ ନାହିଁ। କିଛି ସମୟ ପରେ ପୁଣି ଚେଷ୍ଟା କରନ୍ତୁ।",
      retry: "ପୁଣି ଚେଷ୍ଟା କରନ୍ତୁ",
      contact: "କଲେଜକୁ ଯୋଗାଯୋଗ କରନ୍ତୁ",
      notFound: "ପାଠ୍ୟକ୍ରମ ମିଳିଲା ନାହିଁ।",
      notFoundDescription:
        "ଅନୁରୋଧ କରାଯାଇଥିବା ପାଠ୍ୟକ୍ରମ ଉପଲବ୍ଧ ନାହିଁ। ପାଠ୍ୟକ୍ରମ ସୂଚନା ଦେଖିବା ପାଇଁ ମୂଳ ପୃଷ୍ଠାକୁ ଫେରନ୍ତୁ।",
      home: "ମୂଳ ପୃଷ୍ଠା",
      courses: "ପାଠ୍ୟକ୍ରମ",
      detailsTitle: "ପାଠ୍ୟକ୍ରମର ବିବରଣୀ",
    },
  };

  const FIELDS = [
    "name",
    "short_name",
    "overview",
    "duration",
    "eligibility",
    "intake",
    "career",
    "availability",
    "image_alt",
  ];

  let courses = [];
  let state = "initial";
  let loading = false;

  let grid;
  let status;
  let details;

  function getLanguage() {
    return document.documentElement.lang === "or" ? "or" : "en";
  }

  function dictionary() {
    return TEXT[getLanguage()];
  }

  function element(tag, className, text) {
    const node = document.createElement(tag);

    if (className) node.className = className;
    if (text !== undefined) node.textContent = text;

    return node;
  }

  function safeText(value, fallback = "") {
    return typeof value === "string" && value.trim()
      ? value.trim()
      : fallback;
  }

  function isRecord(value) {
    return (
      value !== null &&
      typeof value === "object" &&
      !Array.isArray(value)
    );
  }

  function validateImagePath(value) {
    const path = safeText(value);

    if (!/^\/assets\/images\/[A-Za-z0-9_./-]+$/.test(path)) {
      return "";
    }

    if (path.slice(1).split("/").some(
      (part) => part === "." || part === ".." || part === ""
    )) {
      return "";
    }

    if (!/\.(jpg|jpeg|png|webp|avif)$/i.test(path)) {
      return "";
    }

    return path;
  }

  function validateCourses(data) {
    if (!Array.isArray(data)) {
      throw new Error("Invalid program data");
    }

    const ids = new Set();

    return data.map((raw) => {
      if (!isRecord(raw)) throw new Error("Invalid program record");

      const id = safeText(raw.id);

      if (
        !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(id) ||
        id.length > 80 ||
        ids.has(id) ||
        !safeText(raw.name) ||
        !safeText(raw.overview)
      ) {
        throw new Error("Invalid program record");
      }

      ids.add(id);

      const course = {
        id,
        demo: typeof raw.demo === "boolean" ? raw.demo : true,
        image: validateImagePath(raw.image),
        translations: {},
      };

      FIELDS.forEach((field) => {
        course[field] = safeText(raw[field]);
      });

      if (isRecord(raw.translations)) {
        ["en", "or"].forEach((language) => {
          const translated = raw.translations[language];

          if (!isRecord(translated)) return;

          course.translations[language] = {};

          FIELDS.forEach((field) => {
            course.translations[language][field] =
              safeText(translated[field]);
          });
        });
      }

      return course;
    });
  }

  function localized(course, field) {
    const translated = course.translations[getLanguage()];

    return (
      safeText(translated?.[field]) ||
      safeText(course[field]) ||
      dictionary().fallback
    );
  }

  function routeUrl(path, parameters = {}) {
    const url = new URL(path, document.baseURI);

    url.searchParams.set("lang", getLanguage());

    Object.entries(parameters).forEach(([key, value]) => {
      url.searchParams.set(key, value);
    });

    return `${url.pathname}${url.search}${url.hash}`;
  }

  function admissionLink(className) {
    const link = element("a", className, dictionary().admission);
    const target = document.getElementById("admission");

    link.href = routeUrl(target ? "#admission" : ROUTES.admission);

    if (target) {
      link.addEventListener("click", (event) => {
        if (event.defaultPrevented || event.button !== 0 || event.ctrlKey ||
            event.metaKey || event.shiftKey || event.altKey) return;
        event.preventDefault();

        if (!target.hasAttribute("tabindex")) {
          target.setAttribute("tabindex", "-1");
        }

        target.focus({ preventScroll: true });
        target.scrollIntoView({
          behavior: matchMedia("(prefers-reduced-motion: reduce)").matches
            ? "auto"
            : "smooth",
          block: "start",
        });
      });
    }

    return link;
  }

  function createMetadata(course, fields) {
    const list = element("dl", "course-metadata");

    fields.forEach((field) => {
      const row = element("div", "course-meta-row");

      row.append(
        element("dt", "", dictionary()[field]),
        element("dd", "", localized(course, field))
      );

      list.append(row);
    });

    return list;
  }

  function createCourseImage(course) {
    const frame = element("div", "course-image-frame");
    const fallback = element(
      "div",
      "course-image-fallback",
      dictionary().unavailable
    );

    frame.append(fallback);

    if (!course.image) return frame;

    const image = element("img", "course-image");

    image.alt = localized(course, "image_alt");
    image.loading = "lazy";
    image.decoding = "async";
    image.width = 800;
    image.height = 500;

    fallback.hidden = true;

    image.addEventListener("error", () => {
      image.hidden = true;
      fallback.hidden = false;
    }, { once: true });

    image.src = course.image;
    frame.prepend(image);

    return frame;
  }

  function createCourseCard(course) {
    const card = element("article", "course-card course-card-enter");
    const body = element("div", "course-card-body");
    const labelRow = element("div", "course-label-row");

    labelRow.append(
      element("span", "course-program-label", dictionary().programLabel)
    );

    if (course.demo) {
      labelRow.append(
        element("span", "course-demo-badge", dictionary().demoBadge)
      );
    }

    const shortName = localized(course, "short_name");
    const fullName = localized(course, "name");

    body.append(
      labelRow,
      element("h3", "course-title", shortName)
    );

    if (fullName !== shortName) {
      body.append(element("p", "course-full-name", fullName));
    }

    body.append(
      element("p", "course-overview", localized(course, "overview")),
      createMetadata(course, ["duration", "eligibility", "career"]),
      element(
        "p",
        "course-availability",
        localized(course, "availability")
      )
    );

    const actions = element("div", "course-card-actions");
    const view = element("a", "btn btn-primary", dictionary().view);

    view.href = routeUrl(ROUTES.courseDetails, { id: course.id });
    view.setAttribute("aria-label", `${dictionary().view}: ${fullName}`);

    actions.append(
      view,
      admissionLink("btn btn-secondary")
    );

    body.append(actions);
    card.append(createCourseImage(course), body);

    return card;
  }

  function createSkeleton() {
    const card = element("div", "course-card course-skeleton");
    card.setAttribute("aria-hidden", "true");

    const image = element(
      "div",
      "course-image-frame skeleton-block"
    );

    const body = element("div", "course-card-body");

    [
      "skeleton-label",
      "skeleton-title",
      "skeleton-line",
      "skeleton-line",
      "skeleton-line skeleton-line-short",
      "skeleton-metadata",
      "skeleton-button",
      "skeleton-button",
    ].forEach((className) => {
      body.append(element("div", `skeleton-block ${className}`));
    });

    card.append(image, body);
    return card;
  }

  function renderCoursesLoading() {
    status.replaceChildren(element("p", "", dictionary().loading));

    if (grid) {
      grid.setAttribute("aria-busy", "true");
      grid.replaceChildren(
        createSkeleton(),
        createSkeleton(),
        createSkeleton()
      );
    }

    if (details) {
      details.setAttribute("aria-busy", "true");
      details.replaceChildren();
    }
  }

  function renderState(title, description, retry = false) {
    if (grid) {
      grid.setAttribute("aria-busy", "false");
      grid.replaceChildren();
    }

    if (details) {
      details.setAttribute("aria-busy", "false");
      details.replaceChildren();
    }

    const panel = element("div", "courses-state");

    panel.append(
      element("h3", "", title),
      element("p", "", description)
    );

    if (retry) {
      const button = element(
        "button",
        "btn btn-primary",
        dictionary().retry
      );

      button.type = "button";
      button.addEventListener("click", () => loadCourses(true));
      panel.append(button);
    } else {
      const contact = element(
        "a",
        "btn btn-secondary",
        dictionary().contact
      );

      contact.href = routeUrl(ROUTES.admission);
      panel.append(contact);
    }

    status.replaceChildren(panel);
  }

  function renderCoursesEmpty() {
    renderState(
      dictionary().emptyTitle,
      dictionary().emptyDescription
    );
  }

  function renderCoursesError() {
    renderState(
      dictionary().errorTitle,
      dictionary().errorDescription,
      true
    );
  }

  function renderCourses() {
    if (!grid) return;

    grid.setAttribute("aria-busy", "false");
    grid.replaceChildren(...courses.map(createCourseCard));

    status.replaceChildren(
      element("p", "", dictionary().loaded)
    );
  }

  // The details page will use the same API and validated data.
  function renderCourseDetails() {
    if (!details) return;

    const requestedId = new URLSearchParams(location.search).get("id");
    const course = courses.find((item) => item.id === requestedId);

    if (!course) {
      renderState(
        dictionary().notFound,
        dictionary().notFoundDescription
      );
      return;
    }

    details.setAttribute("aria-busy", "false");
    status.replaceChildren();

    const breadcrumb = element("nav", "course-breadcrumb");
    breadcrumb.setAttribute(
      "aria-label",
      getLanguage() === "or" ? "ପୃଷ୍ଠାର ପଥ" : "Breadcrumb"
    );

    const home = element("a", "", dictionary().home);
    home.href = routeUrl("index.html");

    const programs = element("a", "", dictionary().courses);
    programs.href = routeUrl("courses.html");

    const separatorOne = element("span", "", "›");
    const separatorTwo = element("span", "", "›");
    separatorOne.setAttribute("aria-hidden", "true");
    separatorTwo.setAttribute("aria-hidden", "true");

    const current = element("span", "", localized(course, "short_name"));
    current.setAttribute("aria-current", "page");

    breadcrumb.append(
      home, separatorOne, programs, separatorTwo, current
    );

    const heading = element(
      "h1",
      "course-details-title",
      localized(course, "name")
    );

    const contentGrid = element("div", "course-details-grid");
    const overview = element("section", "course-details-panel");
    const information = element("section", "course-details-panel");

    overview.append(
      element("h2", "", dictionary().overview),
      element("p", "", localized(course, "overview")),
      element("h2", "", dictionary().career),
      element("p", "", localized(course, "career"))
    );

    information.append(
      element("h2", "", dictionary().programInformation),
      createMetadata(course, ["duration", "eligibility", "intake"]),
      element(
        "p",
        "course-availability",
        localized(course, "availability")
      ),
      admissionLink("btn btn-primary")
    );

    contentGrid.append(overview, information);

    details.replaceChildren(
      breadcrumb,
      heading,
      contentGrid
    );

    if (course.demo) {
      heading.after(
        element("p", "courses-demo-note", dictionary().demoNotice)
      );
    }

    document.title =
      `${localized(course, "short_name")} | Sriram College of Nursing`;
  }

  function renderCurrentState() {
    document.querySelectorAll("[data-courses-text]").forEach((node) => {
      const value = dictionary()[node.dataset.coursesText];
      if (value !== undefined) node.textContent = value;
    });

    if (state === "loading") {
      renderCoursesLoading();
    } else if (state === "error") {
      renderCoursesError();
    } else if (state === "loaded") {
      if (details) {
        renderCourseDetails();
      } else if (courses.length) {
        renderCourses();
      } else {
        renderCoursesEmpty();
      }
    }
  }

  async function loadCourses(moveFocus = false) {
    if (loading) return;

    loading = true;
    state = "loading";
    renderCurrentState();

    if (moveFocus) {
      status.setAttribute("tabindex", "-1");
      status.focus({ preventScroll: true });
    }

    try {
      if (!window.CollegeAPI) {
        throw new Error("API helper unavailable");
      }

      const data = await window.CollegeAPI.get(ROUTES.coursesApi);
      courses = validateCourses(data);
      state = "loaded";
    } catch {
      courses = [];
      state = "error";
    } finally {
      loading = false;
      renderCurrentState();
    }
  }

  function initCourses() {
    grid = document.getElementById("courses-grid");
    details = document.getElementById("course-details-content");
    status = document.getElementById(
      details ? "course-details-status" : "courses-status"
    );

    if ((!grid && !details) || !status) return;

    const languageObserver = new MutationObserver(renderCurrentState);

    languageObserver.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["lang"],
    });

    loadCourses();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initCourses, {
      once: true,
    });
  } else {
    initCourses();
  }
})();
