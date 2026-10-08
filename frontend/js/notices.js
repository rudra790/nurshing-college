/* Notices: bilingual filters, date sorting and accessible details.
   CHANGE BEFORE PUBLISHING: approve backend/data/notices.json content. */

(() => {
  "use strict";

  const API_PATH = "/api/notices";
  const CATEGORIES = ["All", "Admissions", "Academic", "Campus", "General"];
  const STATUSES = ["Important", "Announcement", "Information", "Update"];

  const TEXT = {
    en: {
      eyebrow: "Notices & Announcements",
      title: "Stay Informed",
      description:
        "Find admission information, academic updates and campus announcements in one place. Current entries are demonstration notices awaiting college approval.",
      demoNotice:
        "Demo notice board — these sample entries are not official college circulars. Dates and information require verification.",
      initialStatus: "Notices will load here.",
      viewAll: "View All Notices",
      filterLabel: "Filter notices by category",
      All: "All",
      Admissions: "Admissions",
      Academic: "Academic",
      Campus: "Campus",
      General: "General",
      Important: "Important",
      Announcement: "Announcement",
      Information: "Information",
      Update: "Update",
      featured: "Featured notice",
      loading: "Loading notices…",
      empty: "No notices available at the moment.",
      emptyCategory: "No notices are available in this category.",
      error:
        "Notice information is currently unavailable. Please try again later.",
      retry: "Try Again",
      dateUnknown: "Date to be confirmed",
      demo: "Demo — not an official notice",
      modalDemo:
        "This is demonstration content. Confirm information directly with the college.",
      view: "View Notice",
      close: "Close notice",
      details: "Notice details",
      count: (number) => `${number} notices displayed.`,
      open: (title) => `View notice: ${title}`,
    },

    or: {
      eyebrow: "ସୂଚନା ଓ ଘୋଷଣା",
      title: "ସୂଚନା ସହ ଯୋଡ଼ି ହୋଇ ରୁହନ୍ତୁ",
      description:
        "ନାମଲେଖା, ଶିକ୍ଷା ଓ କ୍ୟାମ୍ପସ ସମ୍ପର୍କିତ ସୂଚନା ଗୋଟିଏ ସ୍ଥାନରେ ପାଆନ୍ତୁ। ବର୍ତ୍ତମାନର ସୂଚନାଗୁଡ଼ିକ କଲେଜର ଅନୁମୋଦନ ଅପେକ୍ଷାରେ ଥିବା ନମୁନା।",
      demoNotice:
        "ନମୁନା ସୂଚନା ଫଳକ — ଏଗୁଡ଼ିକ କଲେଜର ଅଧିକୃତ ବିଜ୍ଞପ୍ତି ନୁହେଁ। ତାରିଖ ଓ ତଥ୍ୟର ଯାଞ୍ଚ ଆବଶ୍ୟକ।",
      initialStatus: "ସୂଚନାଗୁଡ଼ିକ ଏଠାରେ ଦେଖାଯିବ।",
      viewAll: "ସମସ୍ତ ସୂଚନା ଦେଖନ୍ତୁ",
      filterLabel: "ବର୍ଗ ଅନୁସାରେ ସୂଚନା ବାଛନ୍ତୁ",
      All: "ସମସ୍ତ",
      Admissions: "ନାମଲେଖା",
      Academic: "ଶିକ୍ଷା",
      Campus: "କ୍ୟାମ୍ପସ",
      General: "ସାଧାରଣ",
      Important: "ଗୁରୁତ୍ୱପୂର୍ଣ୍ଣ",
      Announcement: "ଘୋଷଣା",
      Information: "ସୂଚନା",
      Update: "ନୂତନ ତଥ୍ୟ",
      featured: "ପ୍ରମୁଖ ସୂଚନା",
      loading: "ସୂଚନାଗୁଡ଼ିକ ଲୋଡ୍ ହେଉଛି…",
      empty: "ବର୍ତ୍ତମାନ କୌଣସି ସୂଚନା ଉପଲବ୍ଧ ନାହିଁ।",
      emptyCategory: "ଏହି ବର୍ଗରେ କୌଣସି ସୂଚନା ଉପଲବ୍ଧ ନାହିଁ।",
      error: "ସୂଚନା ବର୍ତ୍ତମାନ ଉପଲବ୍ଧ ନାହିଁ। ପରେ ପୁଣି ଚେଷ୍ଟା କରନ୍ତୁ।",
      retry: "ପୁଣି ଚେଷ୍ଟା କରନ୍ତୁ",
      dateUnknown: "ତାରିଖ ନିଶ୍ଚିତ ହୋଇନାହିଁ",
      demo: "ନମୁନା — ଅଧିକୃତ ସୂଚନା ନୁହେଁ",
      modalDemo:
        "ଏହା ନମୁନା ବିଷୟବସ୍ତୁ। ସିଧାସଳଖ କଲେଜ ସହ ଯୋଗାଯୋଗ କରି ତଥ୍ୟ ନିଶ୍ଚିତ କରନ୍ତୁ।",
      view: "ସୂଚନା ଦେଖନ୍ତୁ",
      close: "ସୂଚନା ବନ୍ଦ କରନ୍ତୁ",
      details: "ସୂଚନାର ବିବରଣୀ",
      count: (number) => `${number}ଟି ସୂଚନା ଦେଖାଯାଉଛି।`,
      open: (title) => `ସୂଚନା ଦେଖନ୍ତୁ: ${title}`,
    },
  };

  function element(tag, className = "", text) {
    const node = document.createElement(tag);

    if (className) node.className = className;
    if (text !== undefined) node.textContent = text;

    return node;
  }

  function plainText(value, fallback = "", limit = 800) {
    return typeof value === "string" && value.trim()
      ? value.trim().slice(0, limit)
      : fallback;
  }

  function parseDate(value) {
    if (
      typeof value !== "string" ||
      !/^[0-9]{4}-[0-9]{2}-[0-9]{2}$/.test(value) ||
      value.startsWith("0000")
    ) {
      return null;
    }

    const parsed = new Date(`${value}T00:00:00Z`);

    if (
      !Number.isFinite(parsed.getTime()) ||
      parsed.toISOString().slice(0, 10) !== value
    ) {
      return null;
    }

    return parsed;
  }

  function normalizeNotices(data) {
    if (!Array.isArray(data) || data.length > 200) {
      throw new Error("Invalid notices response");
    }

    const ids = new Set();

    return data.map((record) => {
      if (!record || typeof record !== "object" || Array.isArray(record)) {
        throw new Error("Invalid notice");
      }

      const id = plainText(record.id);
      const title = plainText(record.title, "", 200);
      const summary = plainText(record.summary);
      const content = plainText(record.content, "", 12000);

      if (
        !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(id) ||
        id.length > 80 ||
        ids.has(id) ||
        !title ||
        !summary ||
        !content ||
        !CATEGORIES.slice(1).includes(record.category)
      ) {
        throw new Error("Invalid notice");
      }

      ids.add(id);

      const demo = record.demo !== false;
      const validDate = demo ? null : parseDate(record.date);
      const translations = {};

      for (const code of ["en", "or"]) {
        const source = record.translations?.[code];

        if (source && typeof source === "object") {
          translations[code] = {
            title: plainText(source.title, "", 200),
            summary: plainText(source.summary),
            content: plainText(source.content, "", 12000),
          };
        }
      }

      return {
        id,
        title,
        summary,
        content,
        category: record.category,
        status: STATUSES.includes(record.status)
          ? record.status
          : "Information",
        date: validDate ? record.date : "",
        timestamp: validDate ? validDate.getTime() : null,
        featured: record.featured === true,
        demo,
        translations,
      };
    });
  }

  function sortNotices(notices) {
    return [...notices].sort((first, second) => {
      if (first.timestamp === null && second.timestamp === null) return 0;
      if (first.timestamp === null) return 1;
      if (second.timestamp === null) return -1;

      return second.timestamp - first.timestamp;
    });
  }

  async function requestNotices() {
    if (typeof window.CollegeAPI?.get === "function") {
      return window.CollegeAPI.get(API_PATH);
    }

    const controller = new AbortController();
    const timeout = window.setTimeout(() => controller.abort(), 8000);

    try {
      const response = await fetch(API_PATH, {
        headers: { Accept: "application/json" },
        signal: controller.signal,
      });

      if (!response.ok) throw new Error("Notice request failed");

      return await response.json();
    } finally {
      window.clearTimeout(timeout);
    }
  }

  function startNotices() {
    const section = document.getElementById("notices");
    const board = document.getElementById("notices-board");
    const filters = document.getElementById("notices-filters");
    const status = document.getElementById("notices-status");

    if (!section || !board || !filters || !status) return;
    if (section.dataset.noticesReady === "true") return;

    section.dataset.noticesReady = "true";

    let language = getLanguage();
    let notices = [];
    let selectedCategory = "All";
    let state = "loading";
    let loading = false;

    let activeNotice = null;
    let previousFocus = null;
    let openerId = "";
    let backdropPointer = false;

    function getLanguage() {
      return document.documentElement.lang.toLowerCase().startsWith("or")
        ? "or"
        : "en";
    }

    function words() {
      return TEXT[language];
    }

    function localized(notice, field) {
      return notice.translations[language]?.[field] || notice[field] || "";
    }

    function updateSectionText() {
      section.querySelectorAll("[data-notices-text]").forEach((node) => {
        const value = words()[node.dataset.noticesText];

        if (typeof value === "string") node.textContent = value;
      });

      filters.setAttribute("aria-label", words().filterLabel);

      const link = section.querySelector(".notices-section-actions a");

      if (link) {
        const url = new URL(link.getAttribute("href"), window.location.href);
        url.searchParams.set("lang", language);
        link.href = `${url.pathname}${url.search}${url.hash}`;
      }
    }

    function setStatus(message, type = "") {
      status.className = `notices-status${type ? ` is-${type}` : ""}`;
      status.replaceChildren(element("p", "", message));

      if (type === "error") {
        const retry = element("button", "btn btn-secondary", words().retry);
        retry.type = "button";
        retry.dataset.noticesRetry = "true";

        retry.addEventListener("click", () => {
          status.focus({ preventScroll: true });
          loadNotices();
        });

        status.append(retry);
      }
    }

    function formatNoticeDate(value) {
      const parsed = parseDate(value);

      if (!parsed) return words().dateUnknown;

      return new Intl.DateTimeFormat(
        language === "or" ? "or-IN" : "en-IN",
        {
          day: "2-digit",
          month: "short",
          year: "numeric",
          timeZone: "UTC",
        }
      ).format(parsed);
    }

    function createMetadata(notice) {
      const meta = element("div", "notice-meta");

      const category = element(
        "span",
        "notice-category",
        words()[notice.category]
      );

      const dateNode = element(
        notice.date ? "time" : "span",
        "notice-date",
        formatNoticeDate(notice.date)
      );

      if (notice.date) dateNode.dateTime = notice.date;

      const badge = element(
        "span",
        "notice-status",
        words()[notice.status]
      );

      if (notice.status === "Important") {
        badge.classList.add("notice-status-important");
      }

      meta.append(category, dateNode, badge);
      return meta;
    }

    function renderFilters() {
      filters.replaceChildren();
      filters.hidden = state !== "success" || notices.length === 0;

      if (filters.hidden) return;

      CATEGORIES.forEach((category) => {
        const button = element(
          "button",
          "notices-filter",
          words()[category]
        );

        button.type = "button";
        button.dataset.category = category;
        button.setAttribute("aria-controls", "notices-board");
        button.setAttribute(
          "aria-pressed",
          String(category === selectedCategory)
        );

        button.addEventListener("click", () => {
          selectedCategory = category;

          filters.querySelectorAll("button").forEach((filter) => {
            filter.setAttribute(
              "aria-pressed",
              String(filter.dataset.category === selectedCategory)
            );
          });

          renderNotices();
        });

        filters.append(button);
      });
    }

    function createCard(notice, featured = false) {
      const card = element("article", "notice-card");

      if (featured) card.classList.add("notice-card-featured");
      if (notice.status === "Important") {
        card.classList.add("notice-card-important");
      }

      if (featured) {
        card.append(
          element("p", "notice-featured-label", words().featured)
        );
      }

      // Homepage: section H2 → card H3.
      // Dedicated page: section H1 → card H2.
      const sectionHeading = document.getElementById("notices-title");
      const headingTag = sectionHeading?.tagName === "H1" ? "h2" : "h3";
      const title = element(
        headingTag,
        "notice-title",
        localized(notice, "title")
      );

      title.id = `notice-title-${notice.id}`;
      card.setAttribute("aria-labelledby", title.id);

      card.append(
        createMetadata(notice),
        title,
        element("p", "notice-summary", localized(notice, "summary"))
      );

      if (notice.demo) {
        card.append(element("span", "notice-demo-badge", words().demo));
      }

      const actions = element("div", "notice-card-actions");
      const button = element("button", "notice-open");

      button.type = "button";
      button.dataset.noticeId = notice.id;
      button.setAttribute("aria-haspopup", "dialog");
      button.setAttribute("aria-controls", "notice-modal");
      button.setAttribute(
        "aria-label",
        words().open(localized(notice, "title"))
      );

      const arrow = element("span", "", "→");
      arrow.setAttribute("aria-hidden", "true");

      button.append(element("span", "", words().view), arrow);
      button.addEventListener("click", () => openNotice(notice));

      actions.append(button);
      card.append(actions);

      return card;
    }

    function renderNotices() {
      const filtered = notices.filter((notice) => {
        return selectedCategory === "All" ||
          notice.category === selectedCategory;
      });

      board.replaceChildren();
      board.setAttribute("aria-busy", "false");
      board.classList.toggle("notices-board-single", filtered.length <= 1);

      if (filtered.length === 0) {
        setStatus(
          notices.length === 0 ? words().empty : words().emptyCategory,
          "empty"
        );
        return;
      }

      // Records are already sorted newest first.
      // The first featured match is therefore the newest featured notice.
      const featured = filtered.find((notice) => notice.featured) ||
        filtered[0];

      board.append(createCard(featured, true));

      const remaining = filtered.filter((notice) => notice.id !== featured.id);

      if (remaining.length) {
        const list = element("div", "notices-list");

        remaining.forEach((notice) => {
          list.append(createCard(notice));
        });

        board.append(list);
      }

      setStatus(words().count(filtered.length));
    }

    function createSkeleton(featured = false) {
      const card = element("div", "notice-card notice-skeleton");
      card.setAttribute("aria-hidden", "true");

      if (featured) card.classList.add("notice-card-featured");

      for (const variant of ["short", "heading", "", "medium", "action"]) {
        card.append(
          element("div", `notice-skeleton-line ${variant}`.trim())
        );
      }

      return card;
    }

    function showLoading() {
      filters.hidden = true;
      board.replaceChildren();
      board.classList.remove("notices-board-single");
      board.setAttribute("aria-busy", "true");

      const list = element("div", "notices-list");
      list.append(createSkeleton(), createSkeleton(), createSkeleton());

      board.append(createSkeleton(true), list);
      setStatus(words().loading);
    }

    async function loadNotices() {
      if (loading) return;

      loading = true;
      state = "loading";
      showLoading();

      try {
        notices = sortNotices(normalizeNotices(await requestNotices()));
        state = "success";
        renderFilters();
        renderNotices();
      } catch {
        state = "error";
        notices = [];
        board.replaceChildren();
        filters.hidden = true;
        setStatus(words().error, "error");
      } finally {
        loading = false;
        board.setAttribute("aria-busy", "false");
      }
    }

    /* Native dialog isolates the background and manages modal focus. */

    const dialog = element("dialog", "notice-modal");
    dialog.id = "notice-modal";
    dialog.setAttribute("aria-modal", "true");
    dialog.setAttribute("aria-labelledby", "notice-modal-title");

    const toolbar = element("div", "notice-modal-toolbar");
    const modalLabel = element("p", "notice-modal-label");
    const closeButton = element("button", "notice-modal-close");

    closeButton.type = "button";

    const closeSymbol = element("span", "", "×");
    closeSymbol.setAttribute("aria-hidden", "true");
    closeButton.append(closeSymbol);

    const body = element("div", "notice-modal-body");
    const metadata = element("div");
    const modalTitle = element("h2", "notice-modal-title");
    const demoNote = element("p", "notice-modal-demo");
    const content = element("div", "notice-modal-content");

    modalTitle.id = "notice-modal-title";

    toolbar.append(modalLabel, closeButton);
    body.append(metadata, modalTitle, demoNote, content);
    dialog.append(toolbar, body);
    document.body.append(dialog);

    function renderModal() {
      if (!activeNotice) return;

      modalLabel.textContent = words().details;
      closeButton.setAttribute("aria-label", words().close);
      metadata.replaceChildren(createMetadata(activeNotice));
      modalTitle.textContent = localized(activeNotice, "title");

      demoNote.textContent = words().modalDemo;
      demoNote.hidden = !activeNotice.demo;

      content.replaceChildren();

      const paragraphs = localized(activeNotice, "content")
        .split(/\r?\n\s*\r?\n/)
        .map((paragraph) => paragraph.trim())
        .filter(Boolean);

      paragraphs.forEach((paragraph) => {
        content.append(element("p", "", paragraph));
      });
    }

    function openNotice(notice) {
      activeNotice = notice;
      openerId = notice.id;
      previousFocus = document.activeElement;

      renderModal();

      if (!dialog.open) dialog.showModal();

      document.body.classList.add("notices-scroll-locked");
      dialog.scrollTop = 0;
      closeButton.focus({ preventScroll: true });
    }

    function closeNotice() {
      if (dialog.open) dialog.close();
    }

    closeButton.addEventListener("click", closeNotice);

    dialog.addEventListener("cancel", (event) => {
      event.preventDefault();
      closeNotice();
    });

    function outsideDialog(event) {
      const bounds = dialog.getBoundingClientRect();

      return event.clientX < bounds.left ||
        event.clientX > bounds.right ||
        event.clientY < bounds.top ||
        event.clientY > bounds.bottom;
    }

    dialog.addEventListener("pointerdown", (event) => {
      backdropPointer = event.target === dialog && outsideDialog(event);
    });

    dialog.addEventListener("pointercancel", () => {
      backdropPointer = false;
    });

    dialog.addEventListener("click", (event) => {
      if (
        backdropPointer &&
        event.target === dialog &&
        outsideDialog(event)
      ) {
        closeNotice();
      }

      backdropPointer = false;
    });

    dialog.addEventListener("close", () => {
      document.body.classList.remove("notices-scroll-locked");

      const matchingButton = Array.from(
        board.querySelectorAll("[data-notice-id]")
      ).find((button) => button.dataset.noticeId === openerId);

      const target = matchingButton ||
        (previousFocus?.isConnected ? previousFocus : null) ||
        filters.querySelector('[aria-pressed="true"]') ||
        status;

      target.focus({ preventScroll: true });

      activeNotice = null;
      previousFocus = null;
      backdropPointer = false;
    });

    /* Shared main.js updates html.lang when switching languages. */

    const languageObserver = new MutationObserver(() => {
      const nextLanguage = getLanguage();
      if (nextLanguage === language) return;

      const focused = document.activeElement;
      const focusedCategory = focused?.dataset?.category;
      const focusedNoticeId = focused?.dataset?.noticeId;
      const focusedRetry = focused?.dataset?.noticesRetry;

      language = nextLanguage;
      updateSectionText();

      if (state === "success") {
        renderFilters();
        renderNotices();
      } else if (state === "error") {
        setStatus(words().error, "error");
      } else {
        setStatus(words().loading);
      }

      if (dialog.open) {
        renderModal();
        return;
      }

      if (focusedCategory) {
        Array.from(filters.querySelectorAll("button"))
          .find((button) => button.dataset.category === focusedCategory)
          ?.focus({ preventScroll: true });
      } else if (focusedNoticeId) {
        Array.from(board.querySelectorAll("[data-notice-id]"))
          .find((button) => button.dataset.noticeId === focusedNoticeId)
          ?.focus({ preventScroll: true });
      } else if (focusedRetry) {
        status.querySelector("button")?.focus({ preventScroll: true });
      }
    });

    languageObserver.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["lang"],
    });

    updateSectionText();
    loadNotices();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", startNotices, { once: true });
  } else {
    startNotices();
  }
})();