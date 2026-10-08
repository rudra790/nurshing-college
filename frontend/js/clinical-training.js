/* Clinical training profiles loaded from /api/clinical-training.
   CHANGE BEFORE PUBLISHING:
   Verify educational content, arrangements and photograph permissions. */

(() => {
  "use strict";

  const TEXT = {
    en: {
      eyebrow: "Clinical Training",
      title: "Turning Nursing Knowledge Into Practical Confidence",
      description:
        "Practical learning can help connect classroom knowledge with care principles, professional responsibility and clinical understanding. The profiles below are demonstration content.",
      demoNotice:
        "Demo educational profiles — teaching activities, supervision and clinical exposure arrangements require college verification.",
      initialStatus: "Clinical training information will load here.",
      loading: "Loading clinical training information…",
      loaded: "Clinical training profiles loaded.",
      demo: "Demo educational profile",
      confirmed: "Details to be confirmed",
      imageAlt: "Practical learning photograph",
      imageUnavailable: "Practical learning photograph temporarily unavailable.",
      imageCaption:
        "Supplied teaching photograph. Its use does not confirm hospital affiliations or clinical placements.",
      processTitle: "From Learning to Professional Preparation",
      processNote:
        "An illustrative learning sequence, subject to college review.",
      learnTitle: "Learn",
      learnDescription: "Build foundational nursing knowledge.",
      practiceTitle: "Practice",
      practiceDescription:
        "Explore practical skills through guided learning.",
      applyTitle: "Apply",
      applyDescription:
        "Connect knowledge with simulated care situations.",
      growTitle: "Grow",
      growDescription:
        "Reflect on learning and professional responsibility.",
      arrangementsTitle: "Clinical Exposure Arrangements",
      arrangementsDescription:
        "Clinical exposure and practical training arrangements are subject to institutional policies, applicable requirements and verified college information. Hospital affiliations, internships and placements are not confirmed by these demo profiles.",
      exploreTraining: "Explore Clinical Training",
      emptyTitle: "Clinical training information is currently being updated.",
      emptyDescription:
        "Please check back shortly for the latest details.",
      errorTitle: "Clinical training information is temporarily unavailable.",
      errorDescription: "Please try again shortly.",
      retry: "Try Again"
    },

    or: {
      eyebrow: "କ୍ଲିନିକାଲ୍ ପ୍ରଶିକ୍ଷଣ",
      title: "ନର୍ସିଂ ଜ୍ଞାନରୁ ବ୍ୟବହାରିକ ଆତ୍ମବିଶ୍ୱାସ",
      description:
        "ବ୍ୟବହାରିକ ଶିକ୍ଷା ଶ୍ରେଣୀକକ୍ଷର ଜ୍ଞାନକୁ ସେବାର ମୂଳନୀତି, ବୃତ୍ତିଗତ ଦାୟିତ୍ୱ ଏବଂ କ୍ଲିନିକାଲ୍ ବୁଝାମଣା ସହିତ ଯୋଡ଼ିବାରେ ସହାୟକ ହୋଇପାରେ। ନିମ୍ନରେ ଥିବା ପରିଚୟଗୁଡ଼ିକ ନମୁନା ତଥ୍ୟ।",
      demoNotice:
        "ନମୁନା ଶିକ୍ଷାମୂଳକ ପରିଚୟ — ଶିକ୍ଷା କାର୍ଯ୍ୟକଳାପ, ତତ୍ତ୍ୱାବଧାନ ଏବଂ କ୍ଲିନିକାଲ୍ ଅନୁଭବର ବ୍ୟବସ୍ଥା କଲେଜ ଦ୍ୱାରା ଯାଞ୍ଚ ହେବା ଆବଶ୍ୟକ।",
      initialStatus: "କ୍ଲିନିକାଲ୍ ପ୍ରଶିକ୍ଷଣର ସୂଚନା ଏଠାରେ ଦେଖାଯିବ।",
      loading: "କ୍ଲିନିକାଲ୍ ପ୍ରଶିକ୍ଷଣର ସୂଚନା ଲୋଡ୍ ହେଉଛି…",
      loaded: "କ୍ଲିନିକାଲ୍ ପ୍ରଶିକ୍ଷଣର ପରିଚୟ ଲୋଡ୍ ହୋଇଛି।",
      demo: "ନମୁନା ଶିକ୍ଷାମୂଳକ ପରିଚୟ",
      confirmed: "ବିବରଣୀ ନିଶ୍ଚିତ ହେବା ବାକି",
      imageAlt: "ବ୍ୟବହାରିକ ଶିକ୍ଷାର ଫଟୋ",
      imageUnavailable:
        "ବ୍ୟବହାରିକ ଶିକ୍ଷାର ଫଟୋ ସାମୟିକ ଭାବେ ଉପଲବ୍ଧ ନାହିଁ।",
      imageCaption:
        "ଦିଆଯାଇଥିବା ଶିକ୍ଷାଦାନର ଫଟୋ। ଏହାର ବ୍ୟବହାର ହସ୍ପିଟାଲ୍ ସହଭାଗିତା କିମ୍ବା କ୍ଲିନିକାଲ୍ ପ୍ଲେସମେଣ୍ଟ ନିଶ୍ଚିତ କରେ ନାହିଁ।",
      processTitle: "ଶିକ୍ଷାରୁ ବୃତ୍ତିଗତ ପ୍ରସ୍ତୁତି",
      processNote:
        "କଲେଜର ସମୀକ୍ଷା ପାଇଁ ଏକ ନମୁନା ଶିକ୍ଷା କ୍ରମ।",
      learnTitle: "ଶିଖନ୍ତୁ",
      learnDescription: "ନର୍ସିଂର ମୂଳ ଜ୍ଞାନ ଅର୍ଜନ କରନ୍ତୁ।",
      practiceTitle: "ଅଭ୍ୟାସ କରନ୍ତୁ",
      practiceDescription:
        "ମାର୍ଗଦର୍ଶନ ସହିତ ବ୍ୟବହାରିକ ଦକ୍ଷତା ଶିଖନ୍ତୁ।",
      applyTitle: "ପ୍ରୟୋଗ କରନ୍ତୁ",
      applyDescription:
        "ଅନୁକରଣ ସେବା ପରିସ୍ଥିତି ସହିତ ଜ୍ଞାନକୁ ଯୋଡ଼ନ୍ତୁ।",
      growTitle: "ବିକାଶ କରନ୍ତୁ",
      growDescription:
        "ଶିକ୍ଷା ଏବଂ ବୃତ୍ତିଗତ ଦାୟିତ୍ୱ ବିଷୟରେ ଚିନ୍ତନ କରନ୍ତୁ।",
      arrangementsTitle: "କ୍ଲିନିକାଲ୍ ଅନୁଭବର ବ୍ୟବସ୍ଥା",
      arrangementsDescription:
        "କ୍ଲିନିକାଲ୍ ଅନୁଭବ ଏବଂ ବ୍ୟବହାରିକ ପ୍ରଶିକ୍ଷଣର ବ୍ୟବସ୍ଥା ପ୍ରତିଷ୍ଠାନର ନୀତି, ପ୍ରଯୁଜ୍ୟ ନିୟମ ଏବଂ ଯାଞ୍ଚ ହୋଇଥିବା କଲେଜ ତଥ୍ୟ ଉପରେ ନିର୍ଭର କରେ। ଏହି ନମୁନା ପରିଚୟଗୁଡ଼ିକ ହସ୍ପିଟାଲ୍ ସହଭାଗିତା, ଇଣ୍ଟର୍ନଶିପ୍ କିମ୍ବା ପ୍ଲେସମେଣ୍ଟ ନିଶ୍ଚିତ କରେ ନାହିଁ।",
      exploreTraining: "କ୍ଲିନିକାଲ୍ ପ୍ରଶିକ୍ଷଣ ବିଷୟରେ ଜାଣନ୍ତୁ",
      emptyTitle:
        "କ୍ଲିନିକାଲ୍ ପ୍ରଶିକ୍ଷଣର ସୂଚନା ଏବେ ଅଦ୍ୟତନ କରାଯାଉଛି।",
      emptyDescription:
        "ନୂତନ ବିବରଣୀ ପାଇଁ କିଛି ସମୟ ପରେ ପୁଣି ଦେଖନ୍ତୁ।",
      errorTitle:
        "କ୍ଲିନିକାଲ୍ ପ୍ରଶିକ୍ଷଣର ସୂଚନା ସାମୟିକ ଭାବେ ଉପଲବ୍ଧ ନାହିଁ।",
      errorDescription:
        "ଦୟାକରି କିଛି ସମୟ ପରେ ପୁଣି ଚେଷ୍ଟା କରନ୍ତୁ।",
      retry: "ପୁଣି ଚେଷ୍ଟା କରନ୍ତୁ"
    }
  };

  const FIELDS = ["title", "category", "description", "image_alt"];

  let section;
  let content;
  let status;
  let records = [];
  let state = "initial";
  let loading = false;

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

  function validateRecords(data) {
    if (!Array.isArray(data)) {
      throw new Error("Invalid clinical training response.");
    }

    const seen = new Set();

    return data.map(item => {
      if (!isRecord(item)) {
        throw new Error("Invalid clinical training record.");
      }

      const id = safeText(item.id);

      if (
        id.length > 80 ||
        !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(id) ||
        seen.has(id)
      ) {
        throw new Error("Invalid clinical training identifier.");
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

    return field === "image_alt" ? copy().imageAlt : copy().confirmed;
  }

  function updateSectionText() {
    const text = copy();

    section.querySelectorAll("[data-clinical-text]").forEach(node => {
      const key = node.dataset.clinicalText;
      if (Object.hasOwn(text, key)) node.textContent = text[key];
    });

    const link = section.querySelector(".clinical-section-actions a");

    if (link) {
      const url = new URL("clinical-training.html", document.baseURI);
      url.searchParams.set("lang", language());
      link.href = url.href;
    }
  }

  function createFeature(record) {
    const figure = element("figure", "clinical-feature");
    const frame = element("div", "clinical-feature-image-frame");
    const fallback = element("div", "clinical-image-fallback");

    fallback.append(element("p", "", copy().imageUnavailable));
    frame.append(fallback);

    const image = element("img", "clinical-feature-image");
    image.alt = localized(record, "image_alt");
    image.width = 800;
    image.height = 600;
    image.loading = "lazy";
    image.decoding = "async";
    image.hidden = true;

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

    const caption = element("figcaption", "clinical-feature-caption");
    caption.append(element("p", "", copy().imageCaption));

    figure.append(frame, caption);
    return figure;
  }

  function createClinicalTrainingCard(record) {
    const card = element("article", "clinical-card clinical-card-enter");
    const heading = element(
      "h3",
      "clinical-card-title",
      localized(record, "title")
    );

    heading.id = `clinical-profile-${record.id}`;
    card.setAttribute("aria-labelledby", heading.id);

    card.append(
      element("p", "clinical-category", localized(record, "category")),
      heading
    );

    if (record.demo) {
      card.append(element("span", "clinical-demo-label", copy().demo));
    }

    card.append(
      element(
        "p",
        "clinical-card-description",
        localized(record, "description")
      )
    );

    return card;
  }

  function skeletonBlock(className) {
    return element("span", `clinical-skeleton-block ${className}`);
  }

  function renderClinicalTrainingLoading() {
    content.classList.remove("clinical-layout-text-only");
    content.setAttribute("aria-busy", "true");
    status.replaceChildren(element("p", "", copy().loading));

    const feature = element("div", "clinical-feature clinical-skeleton");
    feature.setAttribute("aria-hidden", "true");

    feature.append(
      element(
        "div",
        "clinical-feature-image-frame clinical-skeleton-image"
      )
    );

    const caption = element("div", "clinical-feature-caption");
    caption.append(skeletonBlock("clinical-skeleton-line-short"));
    feature.append(caption);

    const profiles = element("div", "clinical-profiles");

    for (let index = 0; index < 3; index += 1) {
      const card = element("div", "clinical-card clinical-skeleton");
      card.setAttribute("aria-hidden", "true");

      card.append(
        skeletonBlock("clinical-skeleton-category"),
        skeletonBlock("clinical-skeleton-title"),
        skeletonBlock("clinical-skeleton-line"),
        skeletonBlock("clinical-skeleton-line"),
        skeletonBlock("clinical-skeleton-line-short")
      );

      profiles.append(card);
    }

    content.replaceChildren(feature, profiles);
  }

  function renderClinicalTraining() {
    const profiles = element("div", "clinical-profiles");

    records.forEach(record => {
      profiles.append(createClinicalTrainingCard(record));
    });

    const imageRecord = records.find(record => record.image);

    // Omit the feature area gracefully if no local image is supplied.
    content.classList.toggle("clinical-layout-text-only", !imageRecord);

    if (imageRecord) {
      content.replaceChildren(createFeature(imageRecord), profiles);
    } else {
      content.replaceChildren(profiles);
    }

    content.setAttribute("aria-busy", "false");
    status.replaceChildren(element("p", "", copy().loaded));

    const note = section.querySelector(".clinical-demo-note");
    if (note) note.hidden = !records.some(record => record.demo);
  }

  function renderStatePanel(title, description, withRetry) {
    const panel = element("div", "clinical-state");

    panel.append(
      element("h3", "", title),
      element("p", "", description)
    );

    if (withRetry) {
      const retry = element("button", "btn btn-primary", copy().retry);
      retry.type = "button";
      retry.addEventListener("click", () => loadClinicalTraining(true));
      panel.append(retry);
    }

    content.replaceChildren();
    content.setAttribute("aria-busy", "false");
    status.replaceChildren(panel);
  }

  function renderClinicalTrainingEmpty() {
    renderStatePanel(copy().emptyTitle, copy().emptyDescription, false);
  }

  function renderClinicalTrainingError() {
    renderStatePanel(copy().errorTitle, copy().errorDescription, true);
  }

  function renderCurrentState() {
    updateSectionText();

    const note = section.querySelector(".clinical-demo-note");
    if (note && state !== "success") note.hidden = false;

    if (state === "loading") {
      renderClinicalTrainingLoading();
    } else if (state === "success") {
      renderClinicalTraining();
    } else if (state === "empty") {
      renderClinicalTrainingEmpty();
    } else if (state === "error") {
      renderClinicalTrainingError();
    }
  }

  async function loadClinicalTraining(fromRetry = false) {
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

      const data = await window.CollegeAPI.get("/api/clinical-training");
      records = validateRecords(data);
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
    content = document.getElementById("clinical-training-content");
    status = document.getElementById("clinical-training-status");

    if (!content || !status) return;

    section = content.closest(".clinical-training-section");
    if (!section) return;

    const observer = new MutationObserver(renderCurrentState);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["lang"]
    });

    loadClinicalTraining();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initialize, {
      once: true
    });
  } else {
    initialize();
  }
})();