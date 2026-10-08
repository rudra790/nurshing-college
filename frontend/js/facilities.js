/* Facilities loaded from /api/facilities.
   CHANGE BEFORE PUBLISHING:
   Verify facility records and photograph permissions. */

(() => {
  "use strict";

  const TEXT = {
    en: {
      eyebrow: "Our Facilities",
      title: "A Learning Environment Designed for Growth",
      description:
        "Explore these demo profiles of learning spaces and resources, illustrated with supplied photographs. Facility details require college confirmation.",
      demoNotice:
        "Demo facility profiles — names, availability, descriptions and photograph attribution require college verification.",
      initialStatus: "Facility information will load here.",
      exploreFacilities: "Explore Our Facilities",
      loading: "Loading facility information…",
      loaded: "Facility profiles loaded.",
      demo: "Demo facility profile",
      name: "Facility Profile",
      category: "Details to be confirmed",
      descriptionFallback:
        "Facility information requires college confirmation.",
      imageAlt: "Facility image awaiting confirmation",
      imageUnavailable: "Facility photograph temporarily unavailable.",
      explore: "Explore",
      emptyTitle: "Facility information is currently being updated.",
      emptyDescription:
        "Please check back shortly for the latest campus information.",
      errorTitle: "Unable to load facility information.",
      errorDescription: "Please try again shortly.",
      retry: "Try Again"
    },

    or: {
      eyebrow: "ଆମର ସୁବିଧାଗୁଡ଼ିକ",
      title: "ବିକାଶ ପାଇଁ ଏକ ଶିକ୍ଷା ପରିବେଶ",
      description:
        "ଦିଆଯାଇଥିବା ଫଟୋ ସହିତ ଶିକ୍ଷା ସ୍ଥାନ ଏବଂ ସାମଗ୍ରୀର ଏହି ନମୁନା ପରିଚୟ ଦେଖନ୍ତୁ। ସୁବିଧାଗୁଡ଼ିକର ବିବରଣୀ କଲେଜ ଦ୍ୱାରା ନିଶ୍ଚିତ ହେବା ଆବଶ୍ୟକ।",
      demoNotice:
        "ନମୁନା ସୁବିଧା ପରିଚୟ — ନାମ, ଉପଲବ୍ଧତା, ବିବରଣୀ ଏବଂ ଫଟୋର ଉତ୍ସ କଲେଜ ଦ୍ୱାରା ଯାଞ୍ଚ ହେବା ଆବଶ୍ୟକ।",
      initialStatus: "ସୁବିଧାଗୁଡ଼ିକର ସୂଚନା ଏଠାରେ ଦେଖାଯିବ।",
      exploreFacilities: "ଆମର ସୁବିଧାଗୁଡ଼ିକ ଦେଖନ୍ତୁ",
      loading: "ସୁବିଧାଗୁଡ଼ିକର ସୂଚନା ଲୋଡ୍ ହେଉଛି…",
      loaded: "ସୁବିଧାଗୁଡ଼ିକର ପରିଚୟ ଲୋଡ୍ ହୋଇଛି।",
      demo: "ନମୁନା ସୁବିଧା ପରିଚୟ",
      name: "ସୁବିଧାର ପରିଚୟ",
      category: "ବିବରଣୀ ନିଶ୍ଚିତ ହେବା ବାକି",
      descriptionFallback:
        "ସୁବିଧାର ସୂଚନା କଲେଜ ଦ୍ୱାରା ନିଶ୍ଚିତ ହେବା ଆବଶ୍ୟକ।",
      imageAlt: "ସୁବିଧାର ଚିତ୍ର ନିଶ୍ଚିତ ହେବା ବାକି",
      imageUnavailable: "ସୁବିଧାର ଫଟୋ ସାମୟିକ ଭାବେ ଉପଲବ୍ଧ ନାହିଁ।",
      explore: "ଦେଖନ୍ତୁ",
      emptyTitle: "ସୁବିଧାଗୁଡ଼ିକର ସୂଚନା ଏବେ ଅଦ୍ୟତନ କରାଯାଉଛି।",
      emptyDescription:
        "ନୂତନ କ୍ୟାମ୍ପସ୍ ସୂଚନା ପାଇଁ କିଛି ସମୟ ପରେ ପୁଣି ଦେଖନ୍ତୁ।",
      errorTitle: "ସୁବିଧାଗୁଡ଼ିକର ସୂଚନା ଲୋଡ୍ ହୋଇପାରିଲା ନାହିଁ।",
      errorDescription: "ଦୟାକରି କିଛି ସମୟ ପରେ ପୁଣି ଚେଷ୍ଟା କରନ୍ତୁ।",
      retry: "ପୁଣି ଚେଷ୍ଟା କରନ୍ତୁ"
    }
  };

  const FIELDS = ["name", "category", "description", "image_alt"];

  let section;
  let grid;
  let status;
  let records = [];
  let state = "initial";
  let loading = false;
  let initialAnchorHandled = false;

  function language() {
    return document.documentElement.lang === "or" ? "or" : "en";
  }

  function copy() {
    return TEXT[language()];
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

    if (
      path.split("/").slice(1).some(
        part => ["", ".", ".."].includes(part)
      )
    ) {
      return "";
    }

    return /\.(jpe?g|png|webp|avif)$/i.test(path) ? path : "";
  }

  function validateFacilities(data) {
    if (!Array.isArray(data)) {
      throw new Error("Invalid facility response.");
    }

    const seen = new Set();

    return data.map(item => {
      if (!isRecord(item)) {
        throw new Error("Invalid facility record.");
      }

      const id = safeText(item.id);

      if (
        id.length > 80 ||
        !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(id) ||
        seen.has(id)
      ) {
        throw new Error("Invalid facility identifier.");
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
        ["en", "or"].forEach(lang => {
          const translated = item.translations[lang];
          if (!isRecord(translated)) return;

          record.translations[lang] = {};

          FIELDS.forEach(field => {
            const value = safeText(translated[field]);
            if (value) record.translations[lang][field] = value;
          });
        });
      }

      return record;
    });
  }

  function localized(record, field) {
    const translated = record.translations[language()];
    const value = translated && safeText(translated[field]);

    if (value) return value;
    if (record[field]) return record[field];

    const defaults = {
      name: copy().name,
      category: copy().category,
      description: copy().descriptionFallback,
      image_alt: copy().imageAlt
    };

    return defaults[field] || "";
  }

  function isFacilitiesPage() {
    return window.location.pathname.endsWith("/facilities.html");
  }

  function facilityUrl(id) {
    const url = new URL("facilities.html", document.baseURI);
    url.searchParams.set("lang", language());
    url.hash = `facility-${id}`;
    return url.href;
  }

  function updateSectionText() {
    const text = copy();

    section.querySelectorAll("[data-facilities-text]").forEach(node => {
      const key = node.dataset.facilitiesText;
      if (Object.hasOwn(text, key)) node.textContent = text[key];
    });

    const link = section.querySelector(
      ".facilities-section-actions a"
    );

    if (link) {
      const url = new URL("facilities.html", document.baseURI);
      url.searchParams.set("lang", language());
      link.href = url.href;
    }
  }

  function createFacilityImage(record) {
    const frame = element("div", "facility-image-frame");
    const fallback = element("div", "facility-image-fallback");

    fallback.append(element("p", "", copy().imageUnavailable));
    frame.append(fallback);

    if (!record.image) return frame;

    const image = element("img", "facility-image");
    image.alt = localized(record, "image_alt");
    image.width = 800;
    image.height = 500;
    image.loading = "lazy";
    image.decoding = "async";
    // Lazy images need a layout box before the browser will fetch them.
    fallback.hidden = true;

    image.addEventListener("load", () => {
      image.hidden = false;
      fallback.hidden = true;
    }, { once: true });

    image.addEventListener("error", () => {
      image.hidden = true;
      fallback.hidden = false;
    }, { once: true });

    frame.append(image);
    image.src = record.image;

    return frame;
  }

  function createFacilityCard(record, index) {
    const card = element(
      "article",
      "facility-card facility-card-enter" +
        (index === 0 ? " facility-card-featured" : "")
    );

    card.id = `facility-${record.id}`;

    const headingId = `facility-title-${record.id}`;
    card.setAttribute("aria-labelledby", headingId);

    const body = element("div", "facility-card-body");
    const heading = element(
      "h3",
      "facility-name",
      localized(record, "name")
    );
    heading.id = headingId;

    body.append(
      element("p", "facility-category", localized(record, "category")),
      heading
    );

    if (record.demo) {
      body.append(
        element("span", "facility-demo-label", copy().demo)
      );
    }

    body.append(
      element(
        "p",
        "facility-description",
        localized(record, "description")
      )
    );

    // Homepage cards link to their matching facilities-page anchor.
    // On the facilities page, the complete profile is already displayed.
    if (!isFacilitiesPage()) {
      const link = element("a", "facility-explore");
      link.href = facilityUrl(record.id);
      link.setAttribute(
        "aria-label",
        `${copy().explore}: ${localized(record, "name")}`
      );

      const arrow = element("span", "", "→");
      arrow.setAttribute("aria-hidden", "true");

      link.append(element("span", "", copy().explore), arrow);
      body.append(link);
    }

    card.append(createFacilityImage(record), body);
    return card;
  }

  function skeletonBlock(className) {
    return element(
      "span",
      `facility-skeleton-block ${className}`
    );
  }

  function createSkeleton(index) {
    const card = element(
      "div",
      "facility-card facility-skeleton" +
        (index === 0 ? " facility-card-featured" : "")
    );

    card.setAttribute("aria-hidden", "true");

    const body = element("div", "facility-card-body");

    body.append(
      skeletonBlock("facility-skeleton-category"),
      skeletonBlock("facility-skeleton-title"),
      skeletonBlock("facility-skeleton-line"),
      skeletonBlock("facility-skeleton-line"),
      skeletonBlock("facility-skeleton-line-short"),
      skeletonBlock("facility-skeleton-link")
    );

    card.append(element("div", "facility-image-frame"), body);
    return card;
  }

  function renderFacilitiesLoading() {
    status.replaceChildren(element("p", "", copy().loading));
    grid.setAttribute("aria-busy", "true");

    grid.replaceChildren(
      createSkeleton(0),
      createSkeleton(1),
      createSkeleton(2),
      createSkeleton(3)
    );
  }

  function handleInitialAnchor() {
    if (initialAnchorHandled || !isFacilitiesPage()) return;
    initialAnchorHandled = true;

    const hash = window.location.hash;
    if (!hash.startsWith("#facility-")) return;

    const target = document.getElementById(hash.slice(1));
    if (!target || !grid.contains(target)) return;

    requestAnimationFrame(() => {
      target.scrollIntoView({ block: "start", behavior: "instant" });
    });
  }

  function renderFacilities() {
    const fragment = document.createDocumentFragment();

    records.forEach((record, index) => {
      fragment.append(createFacilityCard(record, index));
    });

    grid.replaceChildren(fragment);
    grid.setAttribute("aria-busy", "false");
    status.replaceChildren(element("p", "", copy().loaded));

    const note = section.querySelector(".facilities-demo-note");
    if (note) note.hidden = !records.some(record => record.demo);

    handleInitialAnchor();
  }

  function renderFacilitiesEmpty() {
    const panel = element("div", "facilities-state");

    panel.append(
      element("h3", "", copy().emptyTitle),
      element("p", "", copy().emptyDescription)
    );

    grid.replaceChildren();
    grid.setAttribute("aria-busy", "false");
    status.replaceChildren(panel);
  }

  function renderFacilitiesError() {
    const panel = element("div", "facilities-state");
    const retry = element("button", "btn btn-primary", copy().retry);

    retry.type = "button";
    retry.addEventListener("click", () => loadFacilities(true));

    panel.append(
      element("h3", "", copy().errorTitle),
      element("p", "", copy().errorDescription),
      retry
    );

    grid.replaceChildren();
    grid.setAttribute("aria-busy", "false");
    status.replaceChildren(panel);
  }

  function renderCurrentState() {
    updateSectionText();

    const note = section.querySelector(".facilities-demo-note");
    if (note && state !== "success") note.hidden = false;

    if (state === "loading") {
      renderFacilitiesLoading();
    } else if (state === "success") {
      renderFacilities();
    } else if (state === "empty") {
      renderFacilitiesEmpty();
    } else if (state === "error") {
      renderFacilitiesError();
    }
  }

  async function loadFacilities(fromRetry = false) {
    if (loading) return;

    loading = true;
    state = "loading";

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

      const data = await window.CollegeAPI.get("/api/facilities");
      records = validateFacilities(data);
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
    grid = document.getElementById("facilities-grid");
    status = document.getElementById("facilities-status");

    if (!grid || !status) return;

    section = grid.closest(".facilities-section");
    if (!section) return;

    const observer = new MutationObserver(renderCurrentState);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["lang"]
    });

    loadFacilities();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initialize, {
      once: true
    });
  } else {
    initialize();
  }
})();
