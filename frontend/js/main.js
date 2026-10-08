"use strict";

// CHANGE BEFORE PUBLISHING:
// Confirm contact details and approve Odia translations.
// Leave unavailable contact details empty.
const SITE_CONFIG = {
  collegeName: {
    en: "Sriram College of Nursing",
    or: "ଶ୍ରୀରାମ କଲେଜ ଅଫ୍ ନର୍ସିଂ",
  },
  logoPath: "assets/images/logo/college-logo.jpeg",
  phone: "07978109125",
  whatsapp: "",
  email: "",
  announcement: {
    en: "For course and admission information, contact the college.",
    or: "ପାଠ୍ୟକ୍ରମ ଓ ନାମଲେଖା ସୂଚନା ପାଇଁ କଲେଜକୁ ଯୋଗାଯୋଗ କରନ୍ତୁ।",
  },
};

const NAVIGATION = [
  { file: "index.html", en: "Home", or: "ମୂଳ ପୃଷ୍ଠା" },
  { file: "about.html", en: "About", or: "ଆମ ବିଷୟରେ" },
  { file: "courses.html", en: "Courses", or: "ପାଠ୍ୟକ୍ରମ" },
  { file: "faculty.html", en: "Faculty", or: "ଶିକ୍ଷକ" },
  { file: "facilities.html", en: "Facilities", or: "ସୁବିଧା" },
  {
    file: "clinical-training.html",
    en: "Clinical Training",
    or: "କ୍ଲିନିକାଲ୍ ପ୍ରଶିକ୍ଷଣ",
  },
  { file: "events.html", en: "Events", or: "କାର୍ଯ୍ୟକ୍ରମ" },
  { file: "gallery.html", en: "Gallery", or: "ଫଟୋ ଗ୍ୟାଲେରୀ" },
  { file: "notices.html", en: "Notices", or: "ବିଜ୍ଞପ୍ତି" },
  { file: "contact.html", en: "Contact", or: "ଯୋଗାଯୋଗ" },
];

// CHANGE BEFORE PUBLISHING: obtain college approval for translations.
const TRANSLATIONS = {
  en: {
    skip: "Skip to content",
    label: "Sriram College of Nursing · Kendrapara",
    title: "A foundation for nursing education.",
    intro:
      "Near R.T.O. Office, Kasoti, Pandiri, Kendrapara, Odisha – 754250.",
    demo: "Development preview",
    notice:
      "This is the website foundation. Course and faculty records are demo content and require college verification before publication.",
    contact: "Call the college",
    statusTitle: "Foundation status",
    statusLoading: "Checking service…",
    statusOk: "Service is available.",
    statusError: "Content temporarily unavailable.",
    nextTitle: "Built to grow, step by step.",
    nextDescription:
      "The global header is being developed. Additional pages will follow in separate milestones.",
    card1: "Accessible design",
    body1:
      "Keyboard focus, readable contrast and responsive layouts form the shared design system.",
    card2: "English and Odia",
    body2:
      "Switch the foundation content between English and Odia using the language controls.",
    card3: "Verified content",
    body3:
      "Demo records stay clearly marked until the college supplies approved information.",
    footer: "Sriram College of Nursing",
    imageAlt: "Entrance gate and campus of Sriram College of Nursing",
    admission: "Admission Enquiry",
    details: "View Details",
    more: "More",
    navigation: "Navigation",
    primaryNavigation: "Primary navigation",
    mobileNavigation: "Mobile navigation",
    openMenu: "Open navigation menu",
    closeMenu: "Close navigation menu",
    languageLabel: "Choose language",
    homeLabel: "Sriram College of Nursing home",
    contactTitle: "Contact the College",
    contactIntro: "Contact the college for current course information, eligibility requirements and admission guidance.",
    addressTitle: "Visit the College",
    contactNote: "Please call ahead to confirm visiting hours and availability.",
  },

  or: {
    skip: "ମୁଖ୍ୟ ବିଷୟବସ୍ତୁକୁ ଯାଆନ୍ତୁ",
    label: "ଶ୍ରୀରାମ କଲେଜ ଅଫ୍ ନର୍ସିଂ · କେନ୍ଦ୍ରାପଡ଼ା",
    title: "ନର୍ସିଂ ଶିକ୍ଷାର ଏକ ଭିତ୍ତିଭୂମି।",
    intro:
      "ଆର୍.ଟି.ଓ. କାର୍ଯ୍ୟାଳୟ ନିକଟରେ, କସୋଟି, ପଣ୍ଡିରି, କେନ୍ଦ୍ରାପଡ଼ା, ଓଡ଼ିଶା – ୭୫୪୨୫୦।",
    demo: "ବିକାଶ ପୂର୍ବଦର୍ଶନ",
    notice:
      "ଏହା ୱେବସାଇଟ୍‌ର ଭିତ୍ତିଭୂମି। ପାଠ୍ୟକ୍ରମ ଓ ଶିକ୍ଷକଙ୍କ ତଥ୍ୟ ନମୁନା ମାତ୍ର। ପ୍ରକାଶନ ପୂର୍ବରୁ କଲେଜର ଯାଞ୍ଚ ଆବଶ୍ୟକ।",
    contact: "କଲେଜକୁ ଫୋନ୍ କରନ୍ତୁ",
    statusTitle: "ସେବାର ସ୍ଥିତି",
    statusLoading: "ସେବା ଯାଞ୍ଚ ହେଉଛି…",
    statusOk: "ସେବା ଉପଲବ୍ଧ ଅଛି।",
    statusError: "ବିଷୟବସ୍ତୁ ବର୍ତ୍ତମାନ ଉପଲବ୍ଧ ନାହିଁ।",
    nextTitle: "ପର୍ଯ୍ୟାୟକ୍ରମେ ଆଗକୁ ବଢ଼ିବା।",
    nextDescription:
      "ୱେବସାଇଟ୍‌ର ହେଡର୍ ତିଆରି ହେଉଛି। ଅନ୍ୟ ପୃଷ୍ଠାଗୁଡ଼ିକ ପରବର୍ତ୍ତୀ ପର୍ଯ୍ୟାୟରେ ତିଆରି ହେବ।",
    card1: "ସୁଗମ ଡିଜାଇନ୍",
    body1:
      "କୀବୋର୍ଡ ବ୍ୟବହାର, ସ୍ପଷ୍ଟ ଲେଖା ଓ ମୋବାଇଲ୍ ଅନୁକୂଳ ବିନ୍ୟାସ।",
    card2: "ଇଂରାଜୀ ଓ ଓଡ଼ିଆ",
    body2:
      "ଭାଷା ବଟନ୍ ବ୍ୟବହାର କରି ଇଂରାଜୀ ଓ ଓଡ଼ିଆ ମଧ୍ୟରେ ବଦଳାନ୍ତୁ।",
    card3: "ଯାଞ୍ଚ ହୋଇଥିବା ତଥ୍ୟ",
    body3:
      "କଲେଜର ଅନୁମୋଦିତ ତଥ୍ୟ ମିଳିବା ପର୍ଯ୍ୟନ୍ତ ନମୁନା ତଥ୍ୟ ସ୍ପଷ୍ଟ ଭାବେ ଚିହ୍ନିତ ରହିବ।",
    footer: "ଶ୍ରୀରାମ କଲେଜ ଅଫ୍ ନର୍ସିଂ",
    imageAlt:
      "ଶ୍ରୀରାମ କଲେଜ ଅଫ୍ ନର୍ସିଂର ପ୍ରବେଶ ଦ୍ୱାର ଓ ପରିସର",
    admission: "ନାମଲେଖା ସମ୍ବନ୍ଧୀୟ ଯୋଗାଯୋଗ",
    details: "ବିବରଣୀ ଦେଖନ୍ତୁ",
    more: "ଅଧିକ",
    navigation: "ନାଭିଗେସନ୍",
    primaryNavigation: "ମୁଖ୍ୟ ନାଭିଗେସନ୍",
    mobileNavigation: "ମୋବାଇଲ୍ ନାଭିଗେସନ୍",
    openMenu: "ନାଭିଗେସନ୍ ଖୋଲନ୍ତୁ",
    closeMenu: "ନାଭିଗେସନ୍ ବନ୍ଦ କରନ୍ତୁ",
    languageLabel: "ଭାଷା ବାଛନ୍ତୁ",
    homeLabel: "ଶ୍ରୀରାମ କଲେଜ ଅଫ୍ ନର୍ସିଂର ମୂଳ ପୃଷ୍ଠା",
    contactTitle: "କଲେଜକୁ ଯୋଗାଯୋଗ କରନ୍ତୁ",
    contactIntro: "ପାଠ୍ୟକ୍ରମ, ଯୋଗ୍ୟତା ଓ ନାମଲେଖା ସୂଚନା ପାଇଁ କଲେଜକୁ ଯୋଗାଯୋଗ କରନ୍ତୁ।",
    addressTitle: "କଲେଜକୁ ଆସନ୍ତୁ",
    contactNote: "ଆସିବା ପୂର୍ବରୁ ସମୟ ଓ ଉପଲବ୍ଧତା ନିଶ୍ଚିତ କରିବା ପାଇଁ ଫୋନ୍ କରନ୍ତୁ।",
  },
};

let language =
  new URLSearchParams(location.search).get("lang") === "or"
    ? "or"
    : "en";

let serviceState = "statusLoading";
const originalTitle = document.title;
const reducedMotion = matchMedia("(prefers-reduced-motion: reduce)");

function createElement(tag, className, text) {
  const element = document.createElement(tag);

  if (className) element.className = className;
  if (text !== undefined) element.textContent = text;

  return element;
}

function translatedElement(tag, className, key) {
  const element = createElement(tag, className);
  element.dataset.i18n = key;
  return element;
}

function getCurrentFile() {
  return location.pathname.split("/").pop() || "index.html";
}

function getAdmissionDestination() {
  return document.getElementById("admission")
    ? "#admission"
    : "contact.html#admission";
}

function createLogo(className) {
  const image = createElement("img", className);

  image.src = SITE_CONFIG.logoPath;
  image.alt = SITE_CONFIG.collegeName[language];
  image.width = 864;
  image.height = 417;
  image.dataset.collegeLogo = "";

  return image;
}

function createNavigationLink(item, className) {
  const link = createElement("a", className);

  link.href = item.file;
  link.dataset.navFile = item.file;
  link.dataset.headerLink = "";
  link.dataset.navLabel = item.file;

  return link;
}

function createNavigationList(items, listClass, linkClass) {
  const list = createElement("ul", listClass);

  items.forEach((item) => {
    const listItem = createElement("li");
    listItem.append(createNavigationLink(item, linkClass));
    list.append(listItem);
  });

  return list;
}

function createAdmissionLink(className) {
  const link = translatedElement("a", className, "admission");

  link.href = getAdmissionDestination();
  link.dataset.admissionLink = "";
  link.dataset.headerLink = "";

  return link;
}

function createLanguageControls() {
  const group = createElement("div", "language-switch");

  group.setAttribute("role", "group");
  group.dataset.i18nAria = "languageLabel";

  [
    { code: "en", label: "English" },
    { code: "or", label: "ଓଡ଼ିଆ" },
  ].forEach(({ code, label }) => {
    const button = createElement("button", "", label);

    button.type = "button";
    button.lang = code;
    button.dataset.language = code;
    button.setAttribute("aria-pressed", "false");

    group.append(button);
  });

  return group;
}

function initAnnouncementBar(header) {
  const bar = createElement("div", "announcement-bar");
  const inner = createElement("div", "container announcement-inner");
  const text = createElement("p", "announcement-text");

  text.dataset.announcement = "";

  const link = translatedElement("a", "announcement-link", "details");

  link.href = getAdmissionDestination();
  link.dataset.headerLink = "";
  link.dataset.admissionLink = "";

  inner.append(text, link);
  bar.append(inner);
  header.append(bar);
}

function buildHeader() {
  let header = document.getElementById("site-header");

  if (!header) {
    const main = document.querySelector("main");
    if (!main) return null;

    header = createElement("header", "site-header");
    header.id = "site-header";
    main.before(header);
  }

  header.classList.add("site-header");
  header.replaceChildren();

  initAnnouncementBar(header);

  const nav = createElement("nav", "main-navbar");
  nav.dataset.i18nAria = "primaryNavigation";

  const inner = createElement("div", "container navbar-inner");
  const brand = createElement("a", "navbar-brand");

  brand.href = "index.html";
  brand.dataset.headerLink = "";
  brand.dataset.i18nAria = "homeLabel";
  brand.append(createLogo("navbar-logo"));

  const desktop = createElement("div", "desktop-navigation");
  const desktopList = createNavigationList(
    NAVIGATION.slice(0, 6),
    "nav-list",
    "nav-link"
  );

  const moreItem = createElement("li");
  const more = createElement("details", "nav-more");
  const summary = createElement("summary", "more-toggle");
  const summaryText = translatedElement("span", "", "more");
  const chevron = createElement("span", "more-chevron", "▾");

  chevron.setAttribute("aria-hidden", "true");
  summary.append(summaryText, chevron);

  more.append(
    summary,
    createNavigationList(
      NAVIGATION.slice(6),
      "more-menu",
      "nav-link"
    )
  );

  moreItem.append(more);
  desktopList.append(moreItem);
  desktop.append(desktopList);

  const actions = createElement("div", "navbar-actions");
  const menuButton = createElement("button", "menu-toggle");

  menuButton.type = "button";
  menuButton.dataset.i18nAria = "openMenu";
  menuButton.setAttribute("aria-expanded", "false");
  menuButton.setAttribute("aria-controls", "mobile-navigation");
  menuButton.setAttribute("aria-haspopup", "dialog");

  const hamburger = createElement("span", "hamburger");
  hamburger.setAttribute("aria-hidden", "true");

  for (let index = 0; index < 3; index += 1) {
    hamburger.append(createElement("span"));
  }

  menuButton.append(hamburger);

  actions.append(
    createAdmissionLink("btn btn-primary header-admission"),
    createLanguageControls(),
    menuButton
  );

  inner.append(brand, desktop, actions);
  nav.append(inner);
  header.append(nav);

  const drawer = createElement("dialog", "mobile-navigation");
  drawer.id = "mobile-navigation";
  drawer.setAttribute("aria-labelledby", "drawer-title");

  const drawerHeader = createElement("div", "drawer-header");
  const closeButton = createElement("button", "drawer-close");

  closeButton.type = "button";
  closeButton.dataset.i18nAria = "closeMenu";
  closeButton.setAttribute("autofocus", "");

  const closeIcon = createElement("span", "close-icon", "×");
  closeIcon.setAttribute("aria-hidden", "true");
  closeButton.append(closeIcon);

  drawerHeader.append(createLogo("drawer-logo"), closeButton);

  const drawerContent = createElement("div", "drawer-content");
  const drawerTitle = translatedElement(
    "h2",
    "drawer-title",
    "navigation"
  );

  drawerTitle.id = "drawer-title";

  const mobileNav = createElement("nav");
  mobileNav.dataset.i18nAria = "mobileNavigation";
  mobileNav.append(
    createNavigationList(
      NAVIGATION,
      "mobile-nav-list",
      "mobile-nav-link"
    )
  );

  drawerContent.append(
    drawerTitle,
    mobileNav,
    createAdmissionLink("btn btn-primary drawer-admission")
  );

  drawer.append(drawerHeader, drawerContent);
  document.body.append(drawer);

  return { header, drawer, menuButton, closeButton, more };
}

function updateLanguageLinks() {
  document.querySelectorAll("a[href]").forEach((link) => {
    const url = new URL(link.getAttribute("href"), location.href);

    if (url.origin !== location.origin ||
        !["http:", "https:", "file:"].includes(url.protocol) ||
        (!url.pathname.endsWith(".html") && !url.pathname.endsWith("/"))) return;

    url.searchParams.set("lang", language);
    link.href = `${url.pathname}${url.search}${url.hash}`;
  });
}

function renderLanguage() {
  const dictionary = TRANSLATIONS[language];

  document.documentElement.lang = language;

  document.querySelectorAll("[data-i18n]").forEach((element) => {
    const text = dictionary[element.dataset.i18n];
    if (text !== undefined) element.textContent = text;
  });

  document.querySelectorAll("[data-i18n-alt]").forEach((element) => {
    const text = dictionary[element.dataset.i18nAlt];
    if (text !== undefined) element.alt = text;
  });

  document.querySelectorAll("[data-i18n-aria]").forEach((element) => {
    const text = dictionary[element.dataset.i18nAria];
    if (text !== undefined) element.setAttribute("aria-label", text);
  });

  document.querySelectorAll("[data-nav-label]").forEach((element) => {
    const item = NAVIGATION.find(
      (entry) => entry.file === element.dataset.navLabel
    );

    if (item) element.textContent = item[language];
  });

  document.querySelectorAll("[data-language]").forEach((button) => {
    button.setAttribute(
      "aria-pressed",
      String(button.dataset.language === language)
    );
  });

  document.querySelectorAll("[data-announcement]").forEach((element) => {
    element.textContent = SITE_CONFIG.announcement[language];
  });

  document.querySelectorAll("[data-college-logo]").forEach((image) => {
    image.alt = SITE_CONFIG.collegeName[language];
  });

  const status = document.querySelector("[data-service-status]");
  if (status) status.textContent = dictionary[serviceState];

  if (getCurrentFile() === "index.html") {
    document.title =
      language === "or"
        ? "ଶ୍ରୀରାମ କଲେଜ ଅଫ୍ ନର୍ସିଂ | ପୂର୍ବଦର୍ଶନ"
        : originalTitle;
  }

  updateLanguageLinks();
}

function setLanguage(nextLanguage) {
  language = nextLanguage === "or" ? "or" : "en";
  renderLanguage();

  const url = new URL(location.href);
  url.searchParams.set("lang", language);

  try {
    history.replaceState(null, "", url);
  } catch {
    // Language switching still works in restricted file previews.
  }
}

function initLanguageControls() {
  document.querySelectorAll("[data-language]").forEach((button) => {
    button.addEventListener("click", () => {
      setLanguage(button.dataset.language);
    });
  });

  renderLanguage();
}

function initActiveNavigation(more) {
  const currentFile = getCurrentFile() === "course-details.html"
    ? "courses.html" : getCurrentFile();

  document.querySelectorAll("[data-nav-file]").forEach((link) => {
    if (link.dataset.navFile === currentFile) {
      link.setAttribute("aria-current", "page");
    } else {
      link.removeAttribute("aria-current");
    }
  });

  const summary = more.querySelector("summary");
  summary.classList.toggle(
    "has-active-page",
    Boolean(more.querySelector('[aria-current="page"]'))
  );
}

/* Desktop fix:
   Avoid closing the dropdown during mouse focus transitions.
   Let links navigate before hiding the menu. */
function initDesktopDropdown(more) {
  const summary = more.querySelector("summary");

  more.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && more.open) {
      event.preventDefault();
      more.open = false;
      summary.focus();
    }
  });

  document.addEventListener("click", (event) => {
    if (!more.contains(event.target)) {
      more.open = false;
    }
  });

  more.addEventListener("focusout", (event) => {
    const nextTarget = event.relatedTarget;

    if (nextTarget instanceof Node && !more.contains(nextTarget)) {
      more.open = false;
    }
  });

  more.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      setTimeout(() => {
        more.open = false;
      }, 0);
    });
  });
}

function initMobileNavigation({ drawer, menuButton, closeButton }) {
  let closingTimer;
  let returnFocus;
  let previouslyLocked = false;

  function finishClose() {
    clearTimeout(closingTimer);
    if (drawer.open) drawer.close();
  }

  function closeDrawer(immediate = false) {
    if (!drawer.open) return;

    if (immediate || reducedMotion.matches) {
      finishClose();
      return;
    }

    if (drawer.classList.contains("is-closing")) return;

    drawer.classList.add("is-closing");
    closingTimer = setTimeout(finishClose, 220);
  }

  function openDrawer() {
    if (drawer.open) return;

    returnFocus = document.activeElement;
    previouslyLocked = document.body.classList.contains(
      "nav-scroll-locked"
    );

    drawer.classList.remove("is-closing");
    drawer.showModal();

    document.body.classList.add("nav-scroll-locked");
    menuButton.setAttribute("aria-expanded", "true");
    closeButton.focus();
  }

  menuButton.addEventListener("click", openDrawer);
  closeButton.addEventListener("click", () => closeDrawer());

  drawer.addEventListener("cancel", (event) => {
    event.preventDefault();
    closeDrawer();
  });

  drawer.addEventListener("close", () => {
    clearTimeout(closingTimer);
    drawer.classList.remove("is-closing");
    menuButton.setAttribute("aria-expanded", "false");

    if (!previouslyLocked) {
      document.body.classList.remove("nav-scroll-locked");
    }

    if (
      returnFocus instanceof HTMLElement &&
      returnFocus.isConnected &&
      returnFocus.getClientRects().length
    ) {
      returnFocus.focus({ preventScroll: true });
    }
  });

  drawer.addEventListener("click", (event) => {
    if (event.target !== drawer) return;

    const bounds = drawer.getBoundingClientRect();
    const outside =
      event.clientX < bounds.left ||
      event.clientX > bounds.right ||
      event.clientY < bounds.top ||
      event.clientY > bounds.bottom;

    if (outside) closeDrawer();
  });

  drawer.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => closeDrawer(true));
  });

  const desktopViewport = matchMedia("(min-width: 1200px)");

  desktopViewport.addEventListener("change", (event) => {
    if (event.matches) closeDrawer(true);
  });
}

function initStickyHeader(header) {
  let framePending = false;

  function updateHeaderHeight() {
    document.documentElement.style.setProperty(
      "--sticky-header-height", `${header.getBoundingClientRect().height}px`
    );
  }

  // Keep anchor destinations visible as the logo, language and layout change.
  updateHeaderHeight();
  if ("ResizeObserver" in window) {
    new ResizeObserver(updateHeaderHeight).observe(header);
  } else {
    window.addEventListener("resize", updateHeaderHeight, { passive: true });
  }

  function update() {
    header.classList.toggle("is-scrolled", window.scrollY > 24);
    framePending = false;
  }

  window.addEventListener(
    "scroll",
    () => {
      if (framePending) return;

      framePending = true;
      requestAnimationFrame(update);
    },
    { passive: true }
  );

  update();
}

function initAdmissionLinks() {
  document.querySelectorAll("[data-admission-link]").forEach((link) => {
    link.addEventListener("click", (event) => {
      const target = document.getElementById("admission");

      if (!target || event.defaultPrevented || event.button !== 0 ||
          event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return;

      event.preventDefault();

      if (!target.hasAttribute("tabindex")) {
        target.setAttribute("tabindex", "-1");
      }

      target.focus({ preventScroll: true });
      target.scrollIntoView({
        behavior: reducedMotion.matches ? "auto" : "smooth",
        block: "start",
      });
    });
  });
}

function initCurrentYear() {
  const year = String(new Date().getFullYear());

  document.querySelectorAll("[data-year]").forEach((element) => {
    element.textContent = year;
  });
}

function initScrollReveal() {
  const elements = document.querySelectorAll("[data-reveal]");
  let observer;

  function configure() {
    if (observer) observer.disconnect();

    if (
      reducedMotion.matches ||
      !("IntersectionObserver" in window)
    ) {
      elements.forEach((element) => {
        element.classList.remove("js-reveal");
      });
      return;
    }

    observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;

          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        });
      },
      { threshold: 0.1 }
    );

    elements.forEach((element) => {
      element.classList.add("js-reveal");
      observer.observe(element);
    });
  }

  configure();
  reducedMotion.addEventListener("change", configure);
}

async function initServiceStatus() {
  if (!document.querySelector("[data-service-status]")) return;

  try {
    if (!window.CollegeAPI) throw new Error("API helper unavailable");

    const data = await window.CollegeAPI.get("/api/health");
    serviceState = data.status === "ok" ? "statusOk" : "statusError";
  } catch {
    serviceState = "statusError";
  }

  const status = document.querySelector("[data-service-status]");
  if (status) {
    status.textContent = TRANSLATIONS[language][serviceState];
  }
}

function initSite() {
  const headerSystem = buildHeader();

  initLanguageControls();
  initCurrentYear();
  initScrollReveal();
  initServiceStatus();

  if (headerSystem) {
    initActiveNavigation(headerSystem.more);
    initDesktopDropdown(headerSystem.more);
    initMobileNavigation(headerSystem);
    initStickyHeader(headerSystem.header);
    initAdmissionLinks();
  }
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initSite, { once: true });
} else {
  initSite();
}
