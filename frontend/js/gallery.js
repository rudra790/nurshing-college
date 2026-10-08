/* Gallery: bilingual filters, safe rendering and accessible lightbox.
   CHANGE BEFORE PUBLISHING: verify backend/data/gallery.json captions
   and photograph permissions. */

(() => {
  "use strict";

  const API_PATH = "/api/gallery";
  const CATEGORIES = ["All", "Campus", "Facilities", "Events", "Activities"];

  const TEXT = {
    en: {
      eyebrow: "Campus Life",
      title: "Life at Our Nursing College",
      description:
        "Explore supplied photographs of campus spaces, learning materials and practical demonstrations.",
      demoNotice:
        "Gallery preview — captions, photograph attribution and publication permissions await college verification.",
      initialStatus: "Gallery photographs will load here.",
      viewAll: "Explore Campus Life",
      filterLabel: "Filter gallery by category",
      All: "All",
      Campus: "Campus",
      Facilities: "Facilities",
      Events: "Events",
      Activities: "Activities",
      loading: "Loading gallery photographs…",
      empty: "No gallery images available at the moment.",
      emptyCategory: "No photographs are available in this category yet.",
      error: "Gallery content is currently unavailable. Please try again later.",
      retry: "Try Again",
      view: "View image",
      unavailable: "Image unavailable",
      demo: "Caption pending verification",
      close: "Close image viewer",
      previous: "Previous",
      next: "Next",
      count: (number) => `${number} photographs displayed.`,
      position: (current, total) => `Image ${current} of ${total}`,
      open: (title) => `View image: ${title}`,
    },

    or: {
      eyebrow: "କ୍ୟାମ୍ପସ ଜୀବନ",
      title: "ଆମ ନର୍ସିଂ କଲେଜର ଜୀବନ",
      description:
        "କ୍ୟାମ୍ପସ, ଶିକ୍ଷା ସାମଗ୍ରୀ ଓ ବ୍ୟବହାରିକ ପ୍ରଦର୍ଶନର ପ୍ରଦାନ କରାଯାଇଥିବା ଫଟୋଗୁଡ଼ିକ ଦେଖନ୍ତୁ।",
      demoNotice:
        "ଗ୍ୟାଲେରୀ ନମୁନା — ଫଟୋର ବିବରଣୀ, ଉତ୍ସ ଓ ପ୍ରକାଶନ ଅନୁମତି ସମ୍ପର୍କରେ କଲେଜର ଯାଞ୍ଚ ବାକି ଅଛି।",
      initialStatus: "ଗ୍ୟାଲେରୀର ଫଟୋଗୁଡ଼ିକ ଏଠାରେ ଦେଖାଯିବ।",
      viewAll: "କ୍ୟାମ୍ପସ ଜୀବନ ଦେଖନ୍ତୁ",
      filterLabel: "ବର୍ଗ ଅନୁସାରେ ଫଟୋ ବାଛନ୍ତୁ",
      All: "ସମସ୍ତ",
      Campus: "କ୍ୟାମ୍ପସ",
      Facilities: "ସୁବିଧା",
      Events: "କାର୍ଯ୍ୟକ୍ରମ",
      Activities: "କାର୍ଯ୍ୟକଳାପ",
      loading: "ଗ୍ୟାଲେରୀର ଫଟୋଗୁଡ଼ିକ ଲୋଡ୍ ହେଉଛି…",
      empty: "ବର୍ତ୍ତମାନ ଗ୍ୟାଲେରୀରେ କୌଣସି ଫଟୋ ଉପଲବ୍ଧ ନାହିଁ।",
      emptyCategory: "ଏହି ବର୍ଗରେ ଏପର୍ଯ୍ୟନ୍ତ କୌଣସି ଫଟୋ ଉପଲବ୍ଧ ନାହିଁ।",
      error: "ଗ୍ୟାଲେରୀ ବର୍ତ୍ତମାନ ଉପଲବ୍ଧ ନାହିଁ। ପରେ ପୁଣି ଚେଷ୍ଟା କରନ୍ତୁ।",
      retry: "ପୁଣି ଚେଷ୍ଟା କରନ୍ତୁ",
      view: "ଫଟୋ ଦେଖନ୍ତୁ",
      unavailable: "ଫଟୋ ଉପଲବ୍ଧ ନାହିଁ",
      demo: "ବିବରଣୀର ଯାଞ୍ଚ ବାକି ଅଛି",
      close: "ଫଟୋ ଦର୍ଶକ ବନ୍ଦ କରନ୍ତୁ",
      previous: "ପୂର୍ବବର୍ତ୍ତୀ",
      next: "ପରବର୍ତ୍ତୀ",
      count: (number) => `${number}ଟି ଫଟୋ ଦେଖାଯାଉଛି।`,
      position: (current, total) => `${total}ଟି ମଧ୍ୟରୁ ଫଟୋ ${current}`,
      open: (title) => `ଫଟୋ ଦେଖନ୍ତୁ: ${title}`,
    },
  };

  function startGallery() {
    const section = document.getElementById("gallery");
    const grid = document.getElementById("gallery-grid");
    const status = document.getElementById("gallery-status");
    const filters = document.getElementById("gallery-filters");

    if (!section || !grid || !status || !filters) return;
    if (section.dataset.galleryReady === "true") return;

    section.dataset.galleryReady = "true";

    let records = [];
    let visibleRecords = [];
    let selectedCategory = "All";
    let state = "loading";
    let loading = false;
    let language = getLanguage();

    let viewerRecords = [];
    let viewerIndex = 0;
    let returnFocusId = "";
    let previousFocus = null;
    let backdropPointer = false;

    function getLanguage() {
      return document.documentElement.lang.toLowerCase().startsWith("or")
        ? "or"
        : "en";
    }

    function words() {
      return TEXT[language];
    }

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

    function safeImagePath(value) {
      if (typeof value !== "string" || value.length > 300) return "";

      if (!/^\/assets\/images\/[A-Za-z0-9_./-]+$/.test(value)) {
        return "";
      }

      if (value.slice(1).split("/").some((part) => {
        return part === "" || part === "." || part === "..";
      })) {
        return "";
      }

      return /\.(jpg|jpeg|png|webp|avif)$/i.test(value) ? value : "";
    }

    function normalizeRecords(data) {
      if (!Array.isArray(data) || data.length > 200) {
        throw new Error("Invalid gallery response");
      }

      const identifiers = new Set();

      return data.map((record) => {
        if (!record || typeof record !== "object" || Array.isArray(record)) {
          throw new Error("Invalid gallery record");
        }

        const id = plainText(record.id);
        const title = plainText(record.title, "", 160);
        const alt = plainText(record.alt, "", 300);
        const image = safeImagePath(record.image);

        if (
          !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(id) ||
          id.length > 80 ||
          identifiers.has(id) ||
          !title ||
          !alt ||
          !image ||
          !CATEGORIES.slice(1).includes(record.category)
        ) {
          throw new Error("Invalid gallery record");
        }

        identifiers.add(id);

        const translations = {};

        for (const code of ["en", "or"]) {
          const source = record.translations?.[code];

          if (source && typeof source === "object") {
            translations[code] = {
              title: plainText(source.title, "", 160),
              description: plainText(source.description),
              alt: plainText(source.alt, "", 300),
            };
          }
        }

        return {
          id,
          title,
          alt,
          image,
          category: record.category,
          description: plainText(record.description),
          demo: record.demo !== false,
          translations,
        };
      });
    }

    function localized(record, field) {
      return record.translations[language]?.[field] || record[field] || "";
    }

    function updateSectionText() {
      section.querySelectorAll("[data-gallery-text]").forEach((node) => {
        const key = node.dataset.galleryText;
        const value = words()[key];

        if (typeof value === "string") node.textContent = value;
      });

      filters.setAttribute("aria-label", words().filterLabel);

      const link = section.querySelector(
        ".gallery-section-actions a"
      );

      if (link) {
        const url = new URL(link.getAttribute("href"), window.location.href);
        url.searchParams.set("lang", language);
        link.href = `${url.pathname}${url.search}${url.hash}`;
      }
    }

    function setStatus(message, type = "") {
      status.className = `gallery-status${type ? ` is-${type}` : ""}`;
      status.replaceChildren(element("p", "", message));

      if (type === "error") {
        const retry = element("button", "btn btn-secondary", words().retry);
        retry.type = "button";

        retry.addEventListener("click", () => {
          status.focus({ preventScroll: true });
          loadGallery();
        });

        status.append(retry);
      }
    }

    function renderFilters() {
      filters.replaceChildren();
      filters.hidden = state !== "success" || records.length === 0;

      if (filters.hidden) return;

      for (const category of CATEGORIES) {
        const button = element(
          "button",
          "gallery-filter",
          words()[category]
        );

        button.type = "button";
        button.dataset.category = category;
        button.setAttribute("aria-controls", "gallery-grid");
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

          renderCards();
        });

        filters.append(button);
      }
    }

    function createCard(record, index) {
      const article = element("article", "gallery-card");

      if (index === 0) article.classList.add("gallery-card-featured");

      const button = element("button", "gallery-open");
      button.type = "button";
      button.dataset.galleryId = record.id;
      button.setAttribute("aria-haspopup", "dialog");
      button.setAttribute(
        "aria-label",
        words().open(localized(record, "title"))
      );

      const frame = element("span", "gallery-image-frame");
      const image = element("img", "gallery-image");

      image.alt = localized(record, "alt");
      image.loading = index === 0 ? "eager" : "lazy";
      image.decoding = "async";

      const fallback = element(
        "span",
        "gallery-image-fallback",
        words().unavailable
      );
      fallback.hidden = true;

      image.addEventListener("error", () => {
        image.hidden = true;
        fallback.hidden = false;
      }, { once: true });

      image.src = record.image;

      frame.append(
        image,
        fallback,
        element("span", "gallery-view-label", words().view)
      );

      const body = element("span", "gallery-card-body");

      body.append(
        element("span", "gallery-category", words()[record.category]),
        element("span", "gallery-card-title", localized(record, "title"))
      );

      const description = localized(record, "description");

      if (description) {
        body.append(
          element("span", "gallery-card-description", description)
        );
      }

      if (record.demo) {
        body.append(element("span", "gallery-demo-badge", words().demo));
      }

      button.append(frame, body);
      button.addEventListener("click", () => openLightbox(record.id));
      article.append(button);

      return article;
    }

    function renderCards() {
      visibleRecords = records.filter((record) => {
        return selectedCategory === "All" ||
          record.category === selectedCategory;
      });

      grid.classList.toggle(
        "gallery-grid-editorial",
        visibleRecords.length >= 5
      );

      grid.replaceChildren();
      grid.setAttribute("aria-busy", "false");

      if (visibleRecords.length === 0) {
        setStatus(
          records.length === 0 ? words().empty : words().emptyCategory,
          "empty"
        );
        return;
      }

      const fragment = document.createDocumentFragment();

      visibleRecords.forEach((record, index) => {
        fragment.append(createCard(record, index));
      });

      grid.append(fragment);
      setStatus(words().count(visibleRecords.length));
    }

    function renderSkeletons() {
      grid.replaceChildren();
      grid.classList.remove("gallery-grid-editorial");
      grid.setAttribute("aria-busy", "true");

      for (let index = 0; index < 4; index += 1) {
        const skeleton = element("div", "gallery-card gallery-skeleton");
        skeleton.setAttribute("aria-hidden", "true");

        if (index === 0) {
          skeleton.classList.add("gallery-skeleton-featured");
        }

        const body = element("div", "gallery-skeleton-body");

        body.append(
          element("div", "gallery-skeleton-line short"),
          element("div", "gallery-skeleton-line medium"),
          element("div", "gallery-skeleton-line")
        );

        skeleton.append(
          element("div", "gallery-skeleton-media"),
          body
        );

        grid.append(skeleton);
      }
    }

    async function requestGallery() {
      if (typeof window.CollegeAPI?.get === "function") {
        return window.CollegeAPI.get(API_PATH);
      }

      // Fallback for pages where the shared API helper is unavailable.
      const controller = new AbortController();
      const timeout = window.setTimeout(() => controller.abort(), 8000);

      try {
        const response = await fetch(API_PATH, {
          headers: { Accept: "application/json" },
          signal: controller.signal,
        });

        if (!response.ok) throw new Error("Gallery request failed");

        return await response.json();
      } finally {
        window.clearTimeout(timeout);
      }
    }

    async function loadGallery() {
      if (loading) return;

      loading = true;
      state = "loading";
      filters.hidden = true;
      setStatus(words().loading);
      renderSkeletons();

      try {
        records = normalizeRecords(await requestGallery());
        state = "success";
        renderFilters();
        renderCards();
      } catch {
        state = "error";
        records = [];
        visibleRecords = [];
        grid.replaceChildren();
        filters.hidden = true;
        setStatus(words().error, "error");
      } finally {
        loading = false;
        grid.setAttribute("aria-busy", "false");
      }
    }

    /* Native dialog keeps background content inert and handles
       modal keyboard focus without a custom focus-trap library. */

    const dialog = element("dialog", "gallery-lightbox");
    dialog.id = "gallery-lightbox";
    dialog.setAttribute("aria-modal", "true");
    dialog.setAttribute("aria-labelledby", "gallery-lightbox-title");
    dialog.setAttribute(
      "aria-describedby",
      "gallery-lightbox-description"
    );

    const panel = element("div", "gallery-lightbox-panel");
    const toolbar = element("div", "gallery-lightbox-toolbar");
    const counter = element("p", "gallery-lightbox-counter");

    counter.setAttribute("role", "status");
    counter.setAttribute("aria-live", "polite");
    counter.setAttribute("aria-atomic", "true");

    const closeButton = element("button", "gallery-lightbox-close");
    closeButton.type = "button";

    const closeSymbol = element("span", "", "×");
    closeSymbol.setAttribute("aria-hidden", "true");
    closeButton.append(closeSymbol);

    const media = element("div", "gallery-lightbox-media");
    const details = element("div", "gallery-lightbox-details");
    const categoryLabel = element("p", "gallery-category");
    const viewerTitle = element("h2", "gallery-lightbox-title");
    const description = element("p", "gallery-lightbox-description");
    const demoBadge = element("span", "gallery-demo-badge");

    viewerTitle.id = "gallery-lightbox-title";
    description.id = "gallery-lightbox-description";

    const navigation = element("div", "gallery-lightbox-navigation");
    const previousButton = element("button", "gallery-lightbox-nav");
    const nextButton = element("button", "gallery-lightbox-nav");

    previousButton.type = "button";
    nextButton.type = "button";

    toolbar.append(counter, closeButton);
    details.append(categoryLabel, viewerTitle, description, demoBadge);
    navigation.append(previousButton, nextButton);
    panel.append(toolbar, media, details, navigation);
    dialog.append(panel);
    document.body.append(dialog);

    function updateViewer() {
      const record = viewerRecords[viewerIndex];
      if (!record) return;

      closeButton.setAttribute("aria-label", words().close);
      previousButton.textContent = `← ${words().previous}`;
      nextButton.textContent = `${words().next} →`;

      counter.textContent = words().position(
        viewerIndex + 1,
        viewerRecords.length
      );

      categoryLabel.textContent = words()[record.category];
      viewerTitle.textContent = localized(record, "title");
      description.textContent = localized(record, "description");
      demoBadge.textContent = words().demo;
      demoBadge.hidden = !record.demo;

      navigation.hidden = viewerRecords.length < 2;
      previousButton.disabled = viewerIndex === 0;
      nextButton.disabled = viewerIndex === viewerRecords.length - 1;

      // Keep focus on an enabled control when reaching a boundary.
      if (
        (document.activeElement === previousButton && previousButton.disabled) ||
        (document.activeElement === nextButton && nextButton.disabled)
      ) {
        closeButton.focus({ preventScroll: true });
      }

      const image = element("img", "gallery-lightbox-image");
      image.alt = localized(record, "alt");
      image.decoding = "async";

      const fallback = element(
        "p",
        "gallery-lightbox-fallback",
        words().unavailable
      );
      fallback.hidden = true;
      fallback.setAttribute("role", "status");

      image.addEventListener("error", () => {
        image.hidden = true;
        fallback.hidden = false;
      }, { once: true });

      media.replaceChildren(image, fallback);
      image.src = record.image;
    }

    function openLightbox(id) {
      viewerRecords = [...visibleRecords];
      viewerIndex = viewerRecords.findIndex((record) => record.id === id);

      if (viewerIndex < 0) return;

      previousFocus = document.activeElement;
      returnFocusId = id;
      updateViewer();

      if (!dialog.open) dialog.showModal();

      document.body.classList.add("gallery-scroll-locked");
      dialog.scrollTop = 0;
      closeButton.focus({ preventScroll: true });
    }

    function closeLightbox() {
      if (dialog.open) dialog.close();
    }

    function moveViewer(direction) {
      const nextIndex = viewerIndex + direction;

      if (nextIndex < 0 || nextIndex >= viewerRecords.length) return;

      viewerIndex = nextIndex;
      updateViewer();
    }

    closeButton.addEventListener("click", closeLightbox);
    previousButton.addEventListener("click", () => moveViewer(-1));
    nextButton.addEventListener("click", () => moveViewer(1));

    dialog.addEventListener("cancel", (event) => {
      event.preventDefault();
      closeLightbox();
    });

    dialog.addEventListener("keydown", (event) => {
      if (event.altKey || event.ctrlKey || event.metaKey) return;

      if (event.key === "ArrowLeft") {
        event.preventDefault();
        moveViewer(-1);
      } else if (event.key === "ArrowRight") {
        event.preventDefault();
        moveViewer(1);
      }
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
        closeLightbox();
      }

      backdropPointer = false;
    });

    dialog.addEventListener("close", () => {
      document.body.classList.remove("gallery-scroll-locked");

      const matchingCard = Array.from(
        grid.querySelectorAll("[data-gallery-id]")
      ).find((button) => button.dataset.galleryId === returnFocusId);

      const target = matchingCard ||
        (previousFocus?.isConnected ? previousFocus : null) ||
        filters.querySelector('[aria-pressed="true"]') ||
        status;

      target.focus({ preventScroll: true });

      media.replaceChildren();
      viewerRecords = [];
      previousFocus = null;
      backdropPointer = false;
    });

    /* Shared main.js changes html.lang when the language is switched. */

    const languageObserver = new MutationObserver(() => {
      const nextLanguage = getLanguage();
      if (nextLanguage === language) return;

      language = nextLanguage;

      const focused = document.activeElement;
      const focusedCategory = focused?.dataset?.category;
      const focusedCardId = focused?.dataset?.galleryId;

      updateSectionText();

      if (state === "success") {
        renderFilters();
        renderCards();
      } else if (state === "error") {
        setStatus(words().error, "error");
      } else {
        setStatus(words().loading);
      }

      if (dialog.open) {
        updateViewer();
        return;
      }

      if (focusedCategory) {
        Array.from(filters.querySelectorAll("button"))
          .find((button) => button.dataset.category === focusedCategory)
          ?.focus({ preventScroll: true });
      } else if (focusedCardId) {
        Array.from(grid.querySelectorAll("[data-gallery-id]"))
          .find((button) => button.dataset.galleryId === focusedCardId)
          ?.focus({ preventScroll: true });
      }
    });

    languageObserver.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["lang"],
    });

    updateSectionText();
    loadGallery();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", startGallery, { once: true });
  } else {
    startGallery();
  }
})();