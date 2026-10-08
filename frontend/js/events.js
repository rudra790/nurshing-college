/* Event profiles loaded from /api/events.
   CHANGE BEFORE PUBLISHING:
   Verify event details and photograph permissions. */

(() => {
  "use strict";

  const TEXT = {
    en: {
      eyebrow: "Campus Life",
      title: "Learning Beyond the Classroom",
      description:
        "Explore demo concepts for academic activities, workshops and campus experiences. Confirmed college events will be added after verification.",
      demoNotice:
        "Demo activity concepts — these are not confirmed scheduled or completed events. Dates, locations and details remain unverified.",
      initialStatus: "Event information will load here.",
      viewAllEvents: "View All Events",
      loading: "Loading event information…",
      loaded: "Event profiles loaded.",
      demo: "Demo activity concept",
      confirmed: "Details to be confirmed",
      date: "Date",
      unknownDate: "Date to be confirmed",
      location: "Location",
      unknownLocation: "Location to be confirmed",
      tbc: "TBC",
      statusTBC: "Not officially scheduled",
      statusUpcoming: "Upcoming",
      statusOngoing: "Ongoing",
      statusCompleted: "Completed",
      imageAlt: "Event photograph",
      imageUnavailable: "Photograph temporarily unavailable.",
      details: "View Details",
      emptyTitle: "No upcoming events are currently available.",
      emptyDescription:
        "Please check back soon for the latest campus updates.",
      errorTitle: "Unable to load event information.",
      errorDescription: "Please try again shortly.",
      retry: "Try Again"
    },

    or: {
      eyebrow: "କ୍ୟାମ୍ପସ୍ ଜୀବନ",
      title: "ଶ୍ରେଣୀକକ୍ଷ ବାହାରେ ଶିକ୍ଷା",
      description:
        "ଶିକ୍ଷାମୂଳକ କାର୍ଯ୍ୟକଳାପ, କର୍ମଶାଳା ଏବଂ କ୍ୟାମ୍ପସ୍ ଅନୁଭବର ନମୁନା ଧାରଣା ଦେଖନ୍ତୁ। ଯାଞ୍ଚ ପରେ କଲେଜର ନିଶ୍ଚିତ କାର୍ଯ୍ୟକ୍ରମ ଯୋଡ଼ାଯିବ।",
      demoNotice:
        "ନମୁନା କାର୍ଯ୍ୟକ୍ରମ ଧାରଣା — ଏଗୁଡ଼ିକ ନିର୍ଦ୍ଧାରିତ କିମ୍ବା ସମ୍ପନ୍ନ କାର୍ଯ୍ୟକ୍ରମ ନୁହେଁ। ତାରିଖ, ସ୍ଥାନ ଏବଂ ବିବରଣୀ ଯାଞ୍ଚ ହେବା ବାକି।",
      initialStatus: "କାର୍ଯ୍ୟକ୍ରମ ସୂଚନା ଏଠାରେ ଦେଖାଯିବ।",
      viewAllEvents: "ସମସ୍ତ କାର୍ଯ୍ୟକ୍ରମ ଦେଖନ୍ତୁ",
      loading: "କାର୍ଯ୍ୟକ୍ରମ ସୂଚନା ଲୋଡ୍ ହେଉଛି…",
      loaded: "କାର୍ଯ୍ୟକ୍ରମ ପରିଚୟ ଲୋଡ୍ ହୋଇଛି।",
      demo: "ନମୁନା କାର୍ଯ୍ୟକ୍ରମ ଧାରଣା",
      confirmed: "ବିବରଣୀ ନିଶ୍ଚିତ ହେବା ବାକି",
      date: "ତାରିଖ",
      unknownDate: "ତାରିଖ ନିଶ୍ଚିତ ହେବା ବାକି",
      location: "ସ୍ଥାନ",
      unknownLocation: "ସ୍ଥାନ ନିଶ୍ଚିତ ହେବା ବାକି",
      tbc: "ଅନିଶ୍ଚିତ",
      statusTBC: "ଅଧିକୃତ ଭାବେ ନିର୍ଦ୍ଧାରିତ ହୋଇନାହିଁ",
      statusUpcoming: "ଆଗାମୀ",
      statusOngoing: "ଚାଲୁ ଅଛି",
      statusCompleted: "ସମ୍ପନ୍ନ",
      imageAlt: "କାର୍ଯ୍ୟକ୍ରମର ଫଟୋ",
      imageUnavailable: "ଫଟୋ ସାମୟିକ ଭାବେ ଉପଲବ୍ଧ ନାହିଁ।",
      details: "ବିବରଣୀ ଦେଖନ୍ତୁ",
      emptyTitle: "ବର୍ତ୍ତମାନ କୌଣସି ଆଗାମୀ କାର୍ଯ୍ୟକ୍ରମ ଉପଲବ୍ଧ ନାହିଁ।",
      emptyDescription: "ନୂତନ କ୍ୟାମ୍ପସ୍ ସୂଚନା ପାଇଁ ପୁଣି ଦେଖନ୍ତୁ।",
      errorTitle: "କାର୍ଯ୍ୟକ୍ରମ ସୂଚନା ଲୋଡ୍ ହୋଇପାରିଲା ନାହିଁ।",
      errorDescription: "କିଛି ସମୟ ପରେ ପୁଣି ଚେଷ୍ଟା କରନ୍ତୁ।",
      retry: "ପୁଣି ଚେଷ୍ଟା କରନ୍ତୁ"
    }
  };

  const FIELDS = [
    "title", "category", "location", "description",
    "image_alt", "image_caption"
  ];

  let section;
  let grid;
  let status;
  let records = [];
  let state = "initial";
  let loading = false;
  let anchorHandled = false;

  function language() {
    return document.documentElement.lang === "or" ? "or" : "en";
  }

  function copy() {
    return TEXT[language()];
  }

  function safeText(value, fallback = "") {
    return typeof value === "string" && value.trim()
      ? value.trim()
      : fallback;
  }

  function isRecord(value) {
    return value !== null &&
      typeof value === "object" &&
      !Array.isArray(value);
  }

  function element(tag, className = "", text = "") {
    const node = document.createElement(tag);
    if (className) node.className = className;
    if (text) node.textContent = text;
    return node;
  }

  function validateImage(value) {
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

  function parseDate(value) {
    const text = safeText(value);
    if (!/^\d{4}-\d{2}-\d{2}$/.test(text)) return null;

    const date = new Date(`${text}T00:00:00Z`);

    if (
      Number.isNaN(date.getTime()) ||
      date.toISOString().slice(0, 10) !== text
    ) {
      return null;
    }

    return date;
  }

  function validateEvents(data) {
    if (!Array.isArray(data)) {
      throw new Error("Invalid event response.");
    }

    const seen = new Set();

    return data.map(item => {
      if (!isRecord(item)) throw new Error("Invalid event record.");

      const id = safeText(item.id);

      if (
        id.length > 80 ||
        !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(id) ||
        seen.has(id)
      ) {
        throw new Error("Invalid event identifier.");
      }

      seen.add(id);

      const demo = typeof item.demo === "boolean" ? item.demo : true;
      const date = parseDate(item.date);
      const allowed = ["Upcoming", "Ongoing", "Completed", "TBC"];
      const suppliedStatus = safeText(item.status);

      const record = {
        id,
        demo,
        date: date ? safeText(item.date) : "",
        status: !demo && date && allowed.includes(suppliedStatus)
          ? suppliedStatus
          : "TBC",
        image: validateImage(item.image),
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
    if (field === "image_caption") return "";
    if (field === "image_alt") return copy().imageAlt;
    if (field === "location") return copy().unknownLocation;

    return copy().confirmed;
  }

  function isEventsPage() {
    return window.location.pathname.endsWith("/events.html");
  }

  function eventUrl(id) {
    const url = new URL("events.html", document.baseURI);
    url.searchParams.set("lang", language());
    url.hash = `event-${id}`;
    return url.href;
  }

  function updateSectionText() {
    const text = copy();

    section.querySelectorAll("[data-events-text]").forEach(node => {
      const key = node.dataset.eventsText;
      if (Object.hasOwn(text, key)) node.textContent = text[key];
    });

    const link = section.querySelector(".events-section-actions a");

    if (link) {
      const url = new URL("events.html", document.baseURI);
      url.searchParams.set("lang", language());
      link.href = url.href;
    }
  }

  function formatDate(date, options) {
    return new Intl.DateTimeFormat(
      language() === "or" ? "or-IN" : "en-IN",
      { ...options, timeZone: "UTC" }
    ).format(date);
  }

  function createDateDisplay(record) {
    // Demo concepts never display a date as a confirmed event date.
    const date = record.demo ? null : parseDate(record.date);

    if (!date) {
      const block = element("div", "event-date");
      block.setAttribute("aria-label", copy().unknownDate);
      block.append(
        element("span", "event-date-label", copy().date),
        element("span", "event-date-tbc", copy().tbc)
      );
      return block;
    }

    const block = element("time", "event-date");
    block.dateTime = record.date;
    block.setAttribute(
      "aria-label",
      formatDate(date, { dateStyle: "long" })
    );

    block.append(
      element("span", "event-date-month", formatDate(date, {
        month: "short"
      })),
      element("span", "event-date-day", formatDate(date, {
        day: "numeric"
      })),
      element("span", "event-date-year", formatDate(date, {
        year: "numeric"
      }))
    );

    return block;
  }

  function createMetadata(record) {
    const list = element("dl", "event-metadata");
    const date = record.demo ? null : parseDate(record.date);

    const dateRow = element("div", "event-meta-row");
    dateRow.append(
      element("dt", "", copy().date),
      element(
        "dd",
        "",
        date
          ? formatDate(date, { dateStyle: "long" })
          : copy().unknownDate
      )
    );

    const locationRow = element("div", "event-meta-row");
    locationRow.append(
      element("dt", "", copy().location),
      element("dd", "", localized(record, "location"))
    );

    list.append(dateRow, locationRow);
    return list;
  }

  function createVisual(record) {
    if (!record.image) return null;

    const figure = element("figure", "event-visual");
    const frame = element("div", "event-image-frame");
    const fallback = element("div", "event-image-fallback");

    fallback.append(element("p", "", copy().imageUnavailable));
    frame.append(fallback);

    const image = element("img", "event-image");
    image.alt = localized(record, "image_alt");
    image.width = 800;
    image.height = 500;
    image.loading = "lazy";
    image.decoding = "async";
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
    figure.append(frame);

    const caption = localized(record, "image_caption");

    if (caption) {
      figure.append(element("figcaption", "event-image-caption", caption));
    }

    return figure;
  }

  function createEventCard(record, index) {
    const card = element(
      "article",
      "event-card event-card-enter" +
        (index === 0 ? " event-card-featured" : "") +
        (!record.image ? " event-card-text-only" : "")
    );

    card.id = `event-${record.id}`;

    const body = element("div", "event-card-body");
    const labels = element("div", "event-label-row");

    labels.append(
      element("p", "event-category", localized(record, "category")),
      element("span", "event-status", copy()[`status${record.status}`])
    );

    const heading = element(
      "h3",
      "event-title",
      localized(record, "title")
    );

    heading.id = `event-title-${record.id}`;
    card.setAttribute("aria-labelledby", heading.id);
    body.append(labels, heading);

    if (record.demo) {
      body.append(element("span", "event-demo-label", copy().demo));
    }

    body.append(
      element("p", "event-description", localized(record, "description"))
    );

    const information = element("div", "event-information");
    information.append(createDateDisplay(record), createMetadata(record));
    body.append(information);

    if (!isEventsPage()) {
      const link = element("a", "event-details-link");
      link.href = eventUrl(record.id);
      link.setAttribute(
        "aria-label",
        `${copy().details}: ${localized(record, "title")}`
      );

      const arrow = element("span", "", "→");
      arrow.setAttribute("aria-hidden", "true");

      link.append(element("span", "", copy().details), arrow);
      body.append(link);
    }

    const visual = createVisual(record);
    if (visual) card.append(visual);
    card.append(body);

    return card;
  }

  function skeletonBlock(className) {
    return element("span", `event-skeleton-block ${className}`);
  }

  function createSkeleton(index) {
    const card = element(
      "div",
      "event-card event-skeleton" +
        (index === 0 ? " event-card-featured" : "")
    );

    card.setAttribute("aria-hidden", "true");

    const body = element("div", "event-card-body");

    body.append(
      skeletonBlock("event-skeleton-category"),
      skeletonBlock("event-skeleton-title"),
      skeletonBlock("event-skeleton-line"),
      skeletonBlock("event-skeleton-line-short"),
      skeletonBlock("event-skeleton-metadata"),
      skeletonBlock("event-skeleton-link")
    );

    // Demo supporting records have no photographs.
    if (index === 0) {
      const visual = element("div", "event-visual");
      visual.append(element("div", "event-image-frame"));
      card.append(visual);
    }

    card.append(body);
    return card;
  }

  function renderEventsLoading() {
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
    if (anchorHandled || !isEventsPage()) return;
    anchorHandled = true;

    const hash = window.location.hash;
    if (!hash.startsWith("#event-")) return;

    const target = document.getElementById(hash.slice(1));
    if (!target || !grid.contains(target)) return;

    requestAnimationFrame(() => {
      target.scrollIntoView({ block: "start", behavior: "instant" });
    });
  }

  function renderEvents() {
    const fragment = document.createDocumentFragment();

    records.forEach((record, index) => {
      fragment.append(createEventCard(record, index));
    });

    grid.replaceChildren(fragment);
    grid.setAttribute("aria-busy", "false");
    status.replaceChildren(element("p", "", copy().loaded));

    const note = section.querySelector(".events-demo-note");
    if (note) note.hidden = !records.some(record => record.demo);

    handleInitialAnchor();
  }

  function renderStatePanel(title, description, withRetry) {
    const panel = element("div", "events-state");

    panel.append(
      element("h3", "", title),
      element("p", "", description)
    );

    if (withRetry) {
      const retry = element("button", "btn btn-primary", copy().retry);
      retry.type = "button";
      retry.addEventListener("click", () => loadEvents(true));
      panel.append(retry);
    }

    grid.replaceChildren();
    grid.setAttribute("aria-busy", "false");
    status.replaceChildren(panel);
  }

  function renderEventsEmpty() {
    renderStatePanel(copy().emptyTitle, copy().emptyDescription, false);
  }

  function renderEventsError() {
    renderStatePanel(copy().errorTitle, copy().errorDescription, true);
  }

  function renderCurrentState() {
    updateSectionText();

    const note = section.querySelector(".events-demo-note");
    if (note && state !== "success") note.hidden = false;

    if (state === "loading") {
      renderEventsLoading();
    } else if (state === "success") {
      renderEvents();
    } else if (state === "empty") {
      renderEventsEmpty();
    } else if (state === "error") {
      renderEventsError();
    }
  }

  async function loadEvents(fromRetry = false) {
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

      const data = await window.CollegeAPI.get("/api/events");
      records = validateEvents(data);
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
    grid = document.getElementById("events-grid");
    status = document.getElementById("events-status");

    if (!grid || !status) return;

    section = grid.closest(".events-section");
    if (!section) return;

    const observer = new MutationObserver(renderCurrentState);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["lang"]
    });

    loadEvents();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initialize, {
      once: true
    });
  } else {
    initialize();
  }
})();
