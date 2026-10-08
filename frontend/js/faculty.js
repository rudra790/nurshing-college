/* Faculty profiles loaded from /api/faculty.
   CHANGE BEFORE PUBLISHING:
   Replace demo records and obtain approval for public content. */

(() => {
  "use strict";

  const API_PATH = "/api/faculty";

  const TEXT = {
    en: {
      eyebrow: "Our Faculty",
      title: "Guided by Knowledge. Inspired by Compassion.",
      description:
        "Explore our demo faculty profiles. Verified information about teaching staff, qualifications and areas of expertise will be added after college confirmation.",
      demoNotice:
        "Demo profiles — names, designations, qualifications, experience and specializations require college verification.",
      initialStatus: "Faculty information will load here.",
      meetFaculty: "Meet Our Faculty",
      loading: "Loading faculty information…",
      loaded: "Faculty profiles loaded.",
      demo: "Demo profile",
      profile: "Faculty profile",
      placeholder: "Faculty photograph to be added",
      imageAlt: "Faculty profile placeholder",
      name: "Faculty Profile",
      confirmed: "Details to be confirmed",
      qualification: "Qualification",
      specialization: "Specialization",
      experience: "Experience",
      emptyTitle: "Faculty information is currently being updated.",
      emptyDescription:
        "Please check back shortly for the latest information.",
      errorTitle: "Unable to load faculty information.",
      errorDescription: "Please try again shortly.",
      retry: "Try Again"
    },

    or: {
      eyebrow: "ଆମ ଅଧ୍ୟାପକମାନେ",
      title: "ଜ୍ଞାନର ମାର୍ଗଦର୍ଶନ। ସହାନୁଭୂତିର ପ୍ରେରଣା।",
      description:
        "ଆମର ନମୁନା ଅଧ୍ୟାପକ ପରିଚୟ ଦେଖନ୍ତୁ। କଲେଜର ନିଶ୍ଚିତକରଣ ପରେ ଶିକ୍ଷକମାନଙ୍କ ଯୋଗ୍ୟତା ଏବଂ ବିଶେଷଜ୍ଞତା ସମ୍ବନ୍ଧୀୟ ଯାଞ୍ଚ ହୋଇଥିବା ତଥ୍ୟ ଯୋଡ଼ାଯିବ।",
      demoNotice:
        "ନମୁନା ପରିଚୟ — ନାମ, ପଦବୀ, ଯୋଗ୍ୟତା, ଅଭିଜ୍ଞତା ଏବଂ ବିଶେଷଜ୍ଞତା କଲେଜ ଦ୍ୱାରା ଯାଞ୍ଚ ହେବା ଆବଶ୍ୟକ।",
      initialStatus: "ଅଧ୍ୟାପକଙ୍କ ସୂଚନା ଏଠାରେ ଦେଖାଯିବ।",
      meetFaculty: "ଆମ ଅଧ୍ୟାପକଙ୍କ ପରିଚୟ ଜାଣନ୍ତୁ",
      loading: "ଅଧ୍ୟାପକଙ୍କ ସୂଚନା ଲୋଡ୍ ହେଉଛି…",
      loaded: "ଅଧ୍ୟାପକଙ୍କ ପରିଚୟ ଲୋଡ୍ ହୋଇଛି।",
      demo: "ନମୁନା ପରିଚୟ",
      profile: "ଅଧ୍ୟାପକ ପରିଚୟ",
      placeholder: "ଅଧ୍ୟାପକଙ୍କ ଫଟୋ ଯୋଡ଼ାଯିବ",
      imageAlt: "ଅଧ୍ୟାପକ ପରିଚୟ ପାଇଁ ନମୁନା ଚିତ୍ର",
      name: "ଅଧ୍ୟାପକ ପରିଚୟ",
      confirmed: "ବିବରଣୀ ନିଶ୍ଚିତ ହେବା ବାକି",
      qualification: "ଶିକ୍ଷାଗତ ଯୋଗ୍ୟତା",
      specialization: "ବିଶେଷଜ୍ଞତା",
      experience: "ଅଭିଜ୍ଞତା",
      emptyTitle: "ଅଧ୍ୟାପକଙ୍କ ସୂଚନା ଏବେ ଅଦ୍ୟତନ କରାଯାଉଛି।",
      emptyDescription: "ନୂତନ ସୂଚନା ପାଇଁ କିଛି ସମୟ ପରେ ପୁଣି ଦେଖନ୍ତୁ।",
      errorTitle: "ଅଧ୍ୟାପକଙ୍କ ସୂଚନା ଲୋଡ୍ ହୋଇପାରିଲା ନାହିଁ।",
      errorDescription: "ଦୟାକରି କିଛି ସମୟ ପରେ ପୁଣି ଚେଷ୍ଟା କରନ୍ତୁ।",
      retry: "ପୁଣି ଚେଷ୍ଟା କରନ୍ତୁ"
    }
  };

  const FIELDS = [
    "name",
    "designation",
    "qualification",
    "specialization",
    "experience",
    "image_alt"
  ];

  let section;
  let grid;
  let status;
  let records = [];
  let state = "initial";
  let loading = false;

  function getLanguage() {
    return document.documentElement.lang === "or" ? "or" : "en";
  }

  function dictionary() {
    return TEXT[getLanguage()];
  }

  function isRecord(value) {
    return value !== null &&
      typeof value === "object" &&
      !Array.isArray(value);
  }

  function safeText(value, fallback = "") {
    return typeof value === "string" && value.trim()
      ? value.trim()
      : fallback;
  }

  function element(tag, className = "", text = "") {
    const node = document.createElement(tag);
    if (className) node.className = className;
    if (text) node.textContent = text;
    return node;
  }

  function validateImagePath(value) {
    const path = safeText(value);

    if (!/^\/assets\/images\/[A-Za-z0-9_./-]+$/.test(path)) {
      return "";
    }

    const parts = path.split("/").slice(1);

    if (parts.some(part => ["", ".", ".."].includes(part))) {
      return "";
    }

    return /\.(jpe?g|png|webp|avif)$/i.test(path) ? path : "";
  }

  function validateFaculty(data) {
    if (!Array.isArray(data)) {
      throw new Error("Invalid faculty response.");
    }

    const seen = new Set();

    return data.map(item => {
      if (!isRecord(item)) {
        throw new Error("Invalid faculty record.");
      }

      const id = safeText(item.id);

      if (
        id.length > 80 ||
        !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(id) ||
        seen.has(id)
      ) {
        throw new Error("Invalid faculty identifier.");
      }

      seen.add(id);

      const record = {
        id,
        demo: typeof item.demo === "boolean" ? item.demo : true,
        image: validateImagePath(item.image),
        translations: {}
      };

      FIELDS.forEach(field => {
        record[field] = safeText(item[field]);
      });

      if (isRecord(item.translations)) {
        ["en", "or"].forEach(language => {
          const supplied = item.translations[language];

          if (!isRecord(supplied)) return;

          record.translations[language] = {};

          FIELDS.forEach(field => {
            const value = safeText(supplied[field]);
            if (value) {
              record.translations[language][field] = value;
            }
          });
        });
      }

      return record;
    });
  }

  function localized(record, field) {
    const translation = record.translations[getLanguage()];
    const translated = translation && safeText(translation[field]);

    if (translated) return translated;
    if (record[field]) return record[field];

    const copy = dictionary();

    if (field === "name") return copy.name;
    if (field === "image_alt") return copy.imageAlt;

    return copy.confirmed;
  }

  function updateSectionText() {
    const copy = dictionary();

    section.querySelectorAll("[data-faculty-text]").forEach(node => {
      const key = node.dataset.facultyText;
      if (Object.hasOwn(copy, key)) {
        node.textContent = copy[key];
      }
    });

    // Keep the faculty-page link in the selected language.
    const link = section.querySelector(
      ".faculty-section-actions a"
    );

    if (link) {
      const url = new URL("faculty.html", document.baseURI);
      url.searchParams.set("lang", getLanguage());
      link.href = url.href;
    }
  }

  function createPlaceholderSymbol() {
    const wrapper = element("span", "faculty-placeholder-symbol");
    wrapper.setAttribute("aria-hidden", "true");

    const namespace = "http://www.w3.org/2000/svg";
    const svg = document.createElementNS(namespace, "svg");

    svg.setAttribute("viewBox", "0 0 48 48");
    svg.setAttribute("fill", "none");
    svg.setAttribute("stroke", "currentColor");
    svg.setAttribute("stroke-width", "1.6");
    svg.setAttribute("stroke-linecap", "round");
    svg.setAttribute("stroke-linejoin", "round");
    svg.setAttribute("focusable", "false");

    const head = document.createElementNS(namespace, "circle");
    head.setAttribute("cx", "24");
    head.setAttribute("cy", "15");
    head.setAttribute("r", "7");

    const shoulders = document.createElementNS(namespace, "path");
    shoulders.setAttribute(
      "d",
      "M10 40v-3a14 14 0 0 1 28 0v3"
    );

    svg.append(head, shoulders);
    wrapper.append(svg);

    return wrapper;
  }

  function createFacultyImage(record) {
    const frame = element("div", "faculty-image-frame");
    const placeholder = element("div", "faculty-image-placeholder");

    placeholder.append(
      createPlaceholderSymbol(),
      element(
        "p",
        "faculty-placeholder-text",
        dictionary().placeholder
      )
    );

    frame.append(placeholder);

    // Empty image fields use the neutral placeholder without a request.
    if (!record.image) return frame;

    const image = element("img", "faculty-image");
    image.alt = localized(record, "image_alt");
    image.width = 800;
    image.height = 1000;
    image.loading = "lazy";
    image.decoding = "async";
    placeholder.hidden = true;

    image.addEventListener("load", () => {
      image.hidden = false;
      placeholder.hidden = true;
    }, { once: true });

    image.addEventListener("error", () => {
      image.hidden = true;
      placeholder.hidden = false;
    }, { once: true });

    frame.append(image);
    image.src = record.image;

    return frame;
  }

  function createMetadata(record) {
    const list = element("dl", "faculty-metadata");
    const copy = dictionary();

    ["qualification", "specialization", "experience"].forEach(field => {
      const row = element("div", "faculty-meta-row");

      row.append(
        element("dt", "", copy[field]),
        element("dd", "", localized(record, field))
      );

      list.append(row);
    });

    return list;
  }

  function createFacultyCard(record) {
    const card = element(
      "article",
      "faculty-card faculty-card-enter"
    );

    const body = element("div", "faculty-card-body");
    const copy = dictionary();

    body.append(
      element(
        "span",
        "faculty-profile-indicator",
        record.demo ? copy.demo : copy.profile
      ),
      element(
        "p",
        "faculty-designation",
        localized(record, "designation")
      ),
      element(
        "h3",
        "faculty-name",
        localized(record, "name")
      ),
      createMetadata(record)
    );

    card.append(createFacultyImage(record), body);

    return card;
  }

  function skeletonBlock(className) {
    return element(
      "span",
      `faculty-skeleton-block ${className}`
    );
  }

  function createSkeleton() {
    const card = element("div", "faculty-card faculty-skeleton");
    card.setAttribute("aria-hidden", "true");

    const frame = element("div", "faculty-image-frame");
    const body = element("div", "faculty-card-body");

    body.append(
      skeletonBlock("faculty-skeleton-indicator"),
      skeletonBlock("faculty-skeleton-designation"),
      skeletonBlock("faculty-skeleton-name")
    );

    for (let index = 0; index < 3; index += 1) {
      const row = element("div", "faculty-skeleton-meta");

      row.append(
        skeletonBlock("faculty-skeleton-meta-label"),
        skeletonBlock("faculty-skeleton-meta-value")
      );

      body.append(row);
    }

    card.append(frame, body);
    return card;
  }

  function renderFacultyLoading() {
    grid.setAttribute("aria-busy", "true");
    status.replaceChildren(
      element("p", "", dictionary().loading)
    );

    grid.replaceChildren(
      createSkeleton(),
      createSkeleton(),
      createSkeleton()
    );
  }

  function renderFaculty() {
    const fragment = document.createDocumentFragment();

    records.forEach(record => {
      fragment.append(createFacultyCard(record));
    });

    grid.replaceChildren(fragment);
    grid.setAttribute("aria-busy", "false");

    status.replaceChildren(
      element("p", "", dictionary().loaded)
    );

    const demoNote = section.querySelector(".faculty-demo-note");
    if (demoNote) {
      demoNote.hidden = !records.some(record => record.demo);
    }
  }

  function renderFacultyEmpty() {
    const copy = dictionary();
    const panel = element("div", "faculty-state");

    panel.append(
      element("h3", "", copy.emptyTitle),
      element("p", "", copy.emptyDescription)
    );

    grid.replaceChildren();
    grid.setAttribute("aria-busy", "false");
    status.replaceChildren(panel);
  }

  function renderFacultyError() {
    const copy = dictionary();
    const panel = element("div", "faculty-state");
    const retry = element(
      "button",
      "btn btn-primary",
      copy.retry
    );

    retry.type = "button";
    retry.addEventListener("click", () => loadFaculty(true));

    panel.append(
      element("h3", "", copy.errorTitle),
      element("p", "", copy.errorDescription),
      retry
    );

    grid.replaceChildren();
    grid.setAttribute("aria-busy", "false");
    status.replaceChildren(panel);
  }

  function renderCurrentState() {
    updateSectionText();

    if (state !== "success") {
      const demoNote = section.querySelector(".faculty-demo-note");
      if (demoNote) demoNote.hidden = false;
    }

    if (state === "loading") {
      renderFacultyLoading();
    } else if (state === "success") {
      renderFaculty();
    } else if (state === "empty") {
      renderFacultyEmpty();
    } else if (state === "error") {
      renderFacultyError();
    }
  }

  async function loadFaculty(fromRetry = false) {
    if (loading) return;

    loading = true;
    state = "loading";

    // Preserve keyboard focus when the retry button is removed.
    if (fromRetry) {
      status.setAttribute("tabindex", "-1");
      status.focus({ preventScroll: true });
    }

    renderCurrentState();

    try {
      if (
        !window.CollegeAPI ||
        typeof window.CollegeAPI.get !== "function"
      ) {
        throw new Error("Content service unavailable.");
      }

      const data = await window.CollegeAPI.get(API_PATH);
      records = validateFaculty(data);
      state = records.length ? "success" : "empty";
    } catch {
      records = [];
      state = "error";
    } finally {
      loading = false;
      renderCurrentState();
    }
  }

  function initialize() {
    grid = document.getElementById("faculty-grid");
    status = document.getElementById("faculty-status");

    if (!grid || !status) return;

    section = grid.closest(".faculty-section");
    if (!section) return;

    // main.js changes the document language when a language is selected.
    const observer = new MutationObserver(() => {
      renderCurrentState();
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["lang"]
    });

    loadFaculty();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initialize, {
      once: true
    });
  } else {
    initialize();
  }
})();
