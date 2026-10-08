"use strict";

(() => {
  // CHANGE BEFORE PUBLISHING:
  // Approve the introductory copy and Odia translations.
  const HERO_CONFIG = {
    imagePath: "assets/images/hero/campus-entrance.jpeg",

    text: {
      en: {
        eyebrow: "Professional Nursing Education",
        title:
          "Empowering the Next Generation of Healthcare Professionals",
        description:
          "Learn with purpose. Develop nursing knowledge and practical skills, with compassion and responsibility at the heart of your journey.",
        explore: "Explore Courses",
        admission: "Admission Enquiry",
        valueLearn: "Learn with purpose",
        valuePractice: "Practice with care",
        valueServe: "Serve with compassion",
        locationLabel: "Our location",
        location: "Kasoti, Pandiri, Kendrapara, Odisha",
        collegeName: "Sriram College of Nursing",
        caption: "Learn. Practice. Serve.",
        imageUnavailable: "Campus photograph temporarily unavailable.",
        imageAlt:
          "Entrance gate and campus buildings of Sriram College of Nursing",
        valuesLabel: "Educational values",
        pageTitle:
          "Sriram College of Nursing | Nursing Education in Kendrapara",
      },

      or: {
        eyebrow: "ବୃତ୍ତିଗତ ନର୍ସିଂ ଶିକ୍ଷା",
        title: "ଆଗାମୀ ପିଢ଼ିର ସ୍ୱାସ୍ଥ୍ୟସେବା ପେଶାଜୀବୀଙ୍କୁ ସଶକ୍ତ କରିବା",
        description:
          "ଲକ୍ଷ୍ୟ ସହିତ ଶିଖନ୍ତୁ। ସହାନୁଭୂତି ଓ ଦାୟିତ୍ୱବୋଧକୁ ଆପଣଙ୍କ ଯାତ୍ରାର କେନ୍ଦ୍ରରେ ରଖି ନର୍ସିଂ ଜ୍ଞାନ ଓ ବ୍ୟବହାରିକ ଦକ୍ଷତା ବିକାଶ କରନ୍ତୁ।",
        explore: "ପାଠ୍ୟକ୍ରମ ଦେଖନ୍ତୁ",
        admission: "ନାମଲେଖା ସମ୍ବନ୍ଧୀୟ ଯୋଗାଯୋଗ",
        valueLearn: "ଲକ୍ଷ୍ୟ ସହିତ ଶିଖନ୍ତୁ",
        valuePractice: "ଯତ୍ନ ସହିତ ଅଭ୍ୟାସ କରନ୍ତୁ",
        valueServe: "ସହାନୁଭୂତି ସହିତ ସେବା କରନ୍ତୁ",
        locationLabel: "ଆମ ଠିକଣା",
        location: "କସୋଟି, ପଣ୍ଡିରି, କେନ୍ଦ୍ରାପଡ଼ା, ଓଡ଼ିଶା",
        collegeName: "ଶ୍ରୀରାମ କଲେଜ ଅଫ୍ ନର୍ସିଂ",
        caption: "ଶିଖନ୍ତୁ। ଅଭ୍ୟାସ କରନ୍ତୁ। ସେବା କରନ୍ତୁ।",
        imageUnavailable: "କ୍ୟାମ୍ପସ୍ ଫଟୋ ବର୍ତ୍ତମାନ ଉପଲବ୍ଧ ନାହିଁ।",
        imageAlt:
          "ଶ୍ରୀରାମ କଲେଜ ଅଫ୍ ନର୍ସିଂର ପ୍ରବେଶ ଦ୍ୱାର ଓ କ୍ୟାମ୍ପସ୍ ଭବନ",
        valuesLabel: "ଶିକ୍ଷାର ମୂଲ୍ୟବୋଧ",
        pageTitle: "ଶ୍ରୀରାମ କଲେଜ ଅଫ୍ ନର୍ସିଂ | କେନ୍ଦ୍ରାପଡ଼ାରେ ନର୍ସିଂ ଶିକ୍ଷା",
      },
    },
  };

  function initHero() {
    const hero = document.querySelector(".college-hero");
    if (!hero) return;

    const image = hero.querySelector("#hero-campus-image");
    const fallback = hero.querySelector(".hero-image-fallback");
    const values = hero.querySelector(".hero-values");
    let lastLanguage = "";
    let failureReported = false;

    function updateHeroLanguage() {
      const currentLanguage =
        document.documentElement.lang === "or" ? "or" : "en";

      if (currentLanguage === lastLanguage) return;
      lastLanguage = currentLanguage;

      const text = HERO_CONFIG.text[currentLanguage];

      hero.querySelectorAll("[data-hero-text]").forEach((element) => {
        const value = text[element.dataset.heroText];

        if (typeof value === "string") {
          element.textContent = value;
        }
      });

      if (image) image.alt = text.imageAlt;
      if (values) values.setAttribute("aria-label", text.valuesLabel);

      document.title = text.pageTitle;
    }

    function showImage() {
      if (!image || !fallback) return;

      image.hidden = false;
      fallback.hidden = true;
    }

    function showFallback() {
      if (!image || !fallback) return;

      image.hidden = true;
      fallback.hidden = false;

      const isLocalPreview =
        location.hostname === "localhost" ||
        location.hostname === "127.0.0.1" ||
        location.protocol === "file:";

      if (isLocalPreview && !failureReported) {
        console.warn(
          "Hero photograph could not load. Check HERO_CONFIG.imagePath " +
          "and the corresponding file in frontend/assets/images/hero/."
        );

        failureReported = true;
      }
    }

    if (image && fallback) {
      image.addEventListener("load", showImage);
      image.addEventListener("error", showFallback);

      // Centralized image setting; avoids reloading the same image.
      const expectedSource = new URL(
        HERO_CONFIG.imagePath,
        document.baseURI
      ).href;

      if (image.src !== expectedSource) {
        image.src = HERO_CONFIG.imagePath;
      }

      // Handles images that loaded or failed before this script ran.
      if (image.complete) {
        if (image.naturalWidth > 0) {
          showImage();
        } else {
          showFallback();
        }
      }
    }

    updateHeroLanguage();

    // main.js controls the site language.
    // Observe its lang attribute instead of duplicating button handlers.
    const languageObserver = new MutationObserver(updateHeroLanguage);

    languageObserver.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["lang"],
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initHero, {
      once: true,
    });
  } else {
    initHero();
  }
})();




/* ==================================================
   INSTITUTION SECTIONS
   ================================================== */

(() => {
  // CHANGE BEFORE PUBLISHING:
  // Replace draft statements with college-approved content.
  // Have all Odia translations reviewed.
  const INSTITUTION_CONFIG = {
    imagePath: "assets/images/hero/campus-building.jpeg",

    text: {
      en: {
        trustTitle: "A foundation for learning and service",
        draftLabel: "Draft content — pending college approval",

        trustAcademicTitle: "Academic learning",
        trustAcademicDescription:
          "Building a foundation of nursing knowledge.",

        trustPracticeTitle: "Practical understanding",
        trustPracticeDescription:
          "Connecting knowledge with careful practice.",

        trustGuidanceTitle: "Student development",
        trustGuidanceDescription:
          "Encouraging growth and professional responsibility.",

        trustCareTitle: "Compassionate care",
        trustCareDescription:
          "Keeping dignity and empathy at the centre.",

        aboutEyebrow: "About the Institution",
        aboutTitle: "Building Knowledge. Developing Compassion.",
        aboutDescription:
          "Nursing education brings together knowledge, practical understanding and compassion. Our proposed educational approach places academic growth, responsible practice and respect for people at the heart of a student's development.",
        aboutLocation:
          "Sriram College of Nursing is located near the R.T.O. Office in Kasoti, Pandiri, Kendrapara, Odisha. Contact the college for verified course and admission information.",
        draftNote:
          "Draft introduction: replace with the college's approved institutional profile before publication.",
        aboutCta: "Know Our Institution",

        imageCaption: "A view of our campus in Kendrapara, Odisha.",
        imageAlt:
          "Exterior of the Sriram College of Nursing campus building",
        imageUnavailable: "Campus photograph temporarily unavailable.",

        purposeEyebrow: "Our Direction",
        purposeTitle:
          "Learning with purpose. Caring with responsibility.",
        purposeNote:
          "Proposed statements for review, not the college's official Vision and Mission.",

        visionTitle: "Vision",
        visionDescription:
          "To support the development of knowledgeable, compassionate and responsible healthcare professionals.",

        missionTitle: "Mission",
        missionDescription:
          "To support nursing education through academic learning, practical understanding and student-focused development.",
      },

      or: {
        trustTitle: "ଶିକ୍ଷା ଓ ସେବାର ଏକ ଭିତ୍ତିଭୂମି",
        draftLabel: "ଖସଡ଼ା ତଥ୍ୟ — କଲେଜର ଅନୁମୋଦନ ଅପେକ୍ଷାରେ",

        trustAcademicTitle: "ଶୈକ୍ଷିକ ଶିକ୍ଷା",
        trustAcademicDescription:
          "ନର୍ସିଂ ଜ୍ଞାନର ଏକ ଦୃଢ଼ ଭିତ୍ତି ଗଠନ।",

        trustPracticeTitle: "ବ୍ୟବହାରିକ ବୁଝାମଣା",
        trustPracticeDescription:
          "ଜ୍ଞାନକୁ ଯତ୍ନଶୀଳ ଅଭ୍ୟାସ ସହିତ ଯୋଡ଼ିବା।",

        trustGuidanceTitle: "ଛାତ୍ରଛାତ୍ରୀଙ୍କ ବିକାଶ",
        trustGuidanceDescription:
          "ବିକାଶ ଓ ବୃତ୍ତିଗତ ଦାୟିତ୍ୱବୋଧକୁ ପ୍ରୋତ୍ସାହନ।",

        trustCareTitle: "ସହାନୁଭୂତିପୂର୍ଣ୍ଣ ଯତ୍ନ",
        trustCareDescription:
          "ମର୍ଯ୍ୟାଦା ଓ ସହାନୁଭୂତିକୁ କେନ୍ଦ୍ରରେ ରଖିବା।",

        aboutEyebrow: "ଅନୁଷ୍ଠାନ ବିଷୟରେ",
        aboutTitle: "ଜ୍ଞାନର ବିକାଶ। ସହାନୁଭୂତିର ଗଠନ।",
        aboutDescription:
          "ନର୍ସିଂ ଶିକ୍ଷା ଜ୍ଞାନ, ବ୍ୟବହାରିକ ବୁଝାମଣା ଓ ସହାନୁଭୂତିକୁ ଏକତ୍ର କରେ। ଆମର ପ୍ରସ୍ତାବିତ ଶିକ୍ଷା ପଦ୍ଧତି ଛାତ୍ରଛାତ୍ରୀଙ୍କ ବିକାଶର କେନ୍ଦ୍ରରେ ଶୈକ୍ଷିକ ଉନ୍ନତି, ଦାୟିତ୍ୱପୂର୍ଣ୍ଣ ଅଭ୍ୟାସ ଓ ମଣିଷ ପ୍ରତି ସମ୍ମାନକୁ ସ୍ଥାନ ଦିଏ।",
        aboutLocation:
          "ଶ୍ରୀରାମ କଲେଜ ଅଫ୍ ନର୍ସିଂ ଓଡ଼ିଶାର କେନ୍ଦ୍ରାପଡ଼ା ଜିଲ୍ଲାର କସୋଟି, ପଣ୍ଡିରିରେ ଆର୍.ଟି.ଓ. କାର୍ଯ୍ୟାଳୟ ନିକଟରେ ଅବସ୍ଥିତ। ଯାଞ୍ଚ ହୋଇଥିବା ପାଠ୍ୟକ୍ରମ ଓ ନାମଲେଖା ସୂଚନା ପାଇଁ କଲେଜକୁ ଯୋଗାଯୋଗ କରନ୍ତୁ।",
        draftNote:
          "ଖସଡ଼ା ପରିଚୟ: ପ୍ରକାଶନ ପୂର୍ବରୁ କଲେଜର ଅନୁମୋଦିତ ଅନୁଷ୍ଠାନ ପରିଚୟ ସହିତ ବଦଳାନ୍ତୁ।",
        aboutCta: "ଆମ ଅନୁଷ୍ଠାନ ବିଷୟରେ ଜାଣନ୍ତୁ",

        imageCaption: "ଓଡ଼ିଶାର କେନ୍ଦ୍ରାପଡ଼ାରେ ଆମ କ୍ୟାମ୍ପସ୍‌ର ଏକ ଦୃଶ୍ୟ।",
        imageAlt:
          "ଶ୍ରୀରାମ କଲେଜ ଅଫ୍ ନର୍ସିଂର କ୍ୟାମ୍ପସ୍ ଭବନର ବାହ୍ୟ ଦୃଶ୍ୟ",
        imageUnavailable: "କ୍ୟାମ୍ପସ୍ ଫଟୋ ବର୍ତ୍ତମାନ ଉପଲବ୍ଧ ନାହିଁ।",

        purposeEyebrow: "ଆମ ଦିଗ",
        purposeTitle: "ଲକ୍ଷ୍ୟ ସହିତ ଶିକ୍ଷା। ଦାୟିତ୍ୱ ସହିତ ଯତ୍ନ।",
        purposeNote:
          "ଏଗୁଡ଼ିକ ସମୀକ୍ଷା ପାଇଁ ପ୍ରସ୍ତାବିତ ବକ୍ତବ୍ୟ; କଲେଜର ଅଧିକୃତ ଦୃଷ୍ଟିକୋଣ ଓ ଲକ୍ଷ୍ୟ ନୁହେଁ।",

        visionTitle: "ଦୃଷ୍ଟିକୋଣ",
        visionDescription:
          "ଜ୍ଞାନସମ୍ପନ୍ନ, ସହାନୁଭୂତିଶୀଳ ଓ ଦାୟିତ୍ୱବାନ ସ୍ୱାସ୍ଥ୍ୟସେବା ପେଶାଜୀବୀଙ୍କ ବିକାଶକୁ ସମର୍ଥନ କରିବା।",

        missionTitle: "ଲକ୍ଷ୍ୟ",
        missionDescription:
          "ଶୈକ୍ଷିକ ଶିକ୍ଷା, ବ୍ୟବହାରିକ ବୁଝାମଣା ଓ ଛାତ୍ରଛାତ୍ରୀଙ୍କ ବିକାଶ ମାଧ୍ୟମରେ ନର୍ସିଂ ଶିକ୍ଷାକୁ ସମର୍ଥନ କରିବା।",
      },
    },
  };

  function initInstitutionSections() {
    const elements = document.querySelectorAll(
      "[data-institution-text]"
    );

    if (!elements.length) return;

    const image = document.querySelector("[data-institution-image]");
    const fallback = document.querySelector(
      ".institution-image-fallback"
    );

    let lastLanguage = "";
    let failureReported = false;

    function updateInstitutionLanguage() {
      const currentLanguage =
        document.documentElement.lang === "or" ? "or" : "en";

      if (currentLanguage === lastLanguage) return;
      lastLanguage = currentLanguage;

      const text = INSTITUTION_CONFIG.text[currentLanguage];

      elements.forEach((element) => {
        const value = text[element.dataset.institutionText];

        if (typeof value === "string") {
          element.textContent = value;
        }
      });

      if (image) image.alt = text.imageAlt;
    }

    function showImage() {
      if (!image || !fallback) return;

      image.hidden = false;
      fallback.hidden = true;
    }

    function showFallback() {
      if (!image || !fallback) return;

      image.hidden = true;
      fallback.hidden = false;

      const isLocalPreview =
        location.hostname === "localhost" ||
        location.hostname === "127.0.0.1" ||
        location.protocol === "file:";

      if (isLocalPreview && !failureReported) {
        console.warn(
          "Institution photograph could not load. Check " +
          "INSTITUTION_CONFIG.imagePath and the corresponding image file."
        );

        failureReported = true;
      }
    }

    if (image && fallback) {
      image.addEventListener("load", showImage);
      image.addEventListener("error", showFallback);

      const expectedSource = new URL(
        INSTITUTION_CONFIG.imagePath,
        document.baseURI
      ).href;

      if (image.src !== expectedSource) {
        image.src = INSTITUTION_CONFIG.imagePath;
      }

      if (image.complete) {
        if (image.naturalWidth > 0) {
          showImage();
        } else {
          showFallback();
        }
      }
    }

    updateInstitutionLanguage();

    // Follow the language selected by global main.js.
    const languageObserver = new MutationObserver(
      updateInstitutionLanguage
    );

    languageObserver.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["lang"],
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener(
      "DOMContentLoaded",
      initInstitutionSections,
      { once: true }
    );
  } else {
    initInstitutionSections();
  }
})();




/* =========================================================
   ADMISSION / ENQUIRY CTA
   Contact details come from SITE_CONFIG in main.js.
   No API, form submission or personal-data storage.
   ========================================================= */

(() => {
  "use strict";

  // CHANGE BEFORE PUBLISHING:
  // Approve the English and Odia copy below.
  // Maintain phone and WhatsApp numbers only in SITE_CONFIG.

  const ADMISSION_TEXT = {
    en: {
      eyebrow: "Admissions & Enquiries",
      title: "Take the Next Step Toward a Career in Nursing",
      description:
        "Explore nursing course information and connect with the college to learn more about admissions, eligibility and the academic journey.",
      enquiry: "Admission Enquiry",
      topicCourses: "Course information",
      topicEligibility: "Eligibility questions",
      topicProcess: "Admission process",
      topicsLabel: "Enquiry topics",
      cardEyebrow: "Ready to Begin?",
      cardTitle: "Talk to the College",
      cardDescription:
        "Contact the college for current course information, eligibility requirements and admission guidance.",
      call: "Call Now",
      whatsapp: "WhatsApp Enquiry",
      courses: "Explore Courses",
      phoneLabel: "Phone",
      callLabel: (number) => `Call the college on ${number}`,
      whatsappLabel: "WhatsApp Enquiry (opens in a new tab)",
      whatsappMessage:
        "Hello, I would like to know more about the nursing courses and admission process.",
    },

    or: {
      eyebrow: "ନାମଲେଖା ଓ ଯୋଗାଯୋଗ",
      title: "ନର୍ସିଂ କ୍ଷେତ୍ରରେ କ୍ୟାରିୟର ପାଇଁ ପରବର୍ତ୍ତୀ ପଦକ୍ଷେପ ନିଅନ୍ତୁ",
      description:
        "ନର୍ସିଂ ପାଠ୍ୟକ୍ରମ ବିଷୟରେ ଜାଣନ୍ତୁ ଏବଂ ନାମଲେଖା, ଯୋଗ୍ୟତା ଓ ଶିକ୍ଷା ଯାତ୍ରା ସମ୍ପର୍କରେ ଅଧିକ ତଥ୍ୟ ପାଇଁ କଲେଜ ସହ ଯୋଗାଯୋଗ କରନ୍ତୁ।",
      enquiry: "ନାମଲେଖା ସମ୍ପର୍କରେ ପଚାରନ୍ତୁ",
      topicCourses: "ପାଠ୍ୟକ୍ରମ ସୂଚନା",
      topicEligibility: "ଯୋଗ୍ୟତା ସମ୍ପର୍କିତ ପ୍ରଶ୍ନ",
      topicProcess: "ନାମଲେଖା ପ୍ରକ୍ରିୟା",
      topicsLabel: "ଯୋଗାଯୋଗର ବିଷୟ",
      cardEyebrow: "ଆରମ୍ଭ କରିବାକୁ ପ୍ରସ୍ତୁତ?",
      cardTitle: "କଲେଜ ସହ କଥା ହୁଅନ୍ତୁ",
      cardDescription:
        "ବର୍ତ୍ତମାନର ପାଠ୍ୟକ୍ରମ ସୂଚନା, ଯୋଗ୍ୟତା ଓ ନାମଲେଖା ମାର୍ଗଦର୍ଶନ ପାଇଁ କଲେଜ ସହ ଯୋଗାଯୋଗ କରନ୍ତୁ।",
      call: "ଏବେ ଫୋନ୍ କରନ୍ତୁ",
      whatsapp: "ହ୍ୱାଟ୍ସଆପ୍‌ରେ ପଚାରନ୍ତୁ",
      courses: "ପାଠ୍ୟକ୍ରମ ଦେଖନ୍ତୁ",
      phoneLabel: "ଫୋନ୍",
      callLabel: (number) => `${number} ନମ୍ବରରେ କଲେଜକୁ ଫୋନ୍ କରନ୍ତୁ`,
      whatsappLabel: "ହ୍ୱାଟ୍ସଆପ୍‌ରେ ପଚାରନ୍ତୁ (ନୂତନ ଟ୍ୟାବ୍‌ରେ ଖୋଲିବ)",
      whatsappMessage:
        "ନମସ୍କାର, ମୁଁ ନର୍ସିଂ ପାଠ୍ୟକ୍ରମ ଓ ନାମଲେଖା ପ୍ରକ୍ରିୟା ସମ୍ପର୍କରେ ଅଧିକ ଜାଣିବାକୁ ଚାହୁଁଛି।",
    },
  };

  function getAdmissionConfig() {
    // A top-level const in main.js is not necessarily on window.
    if (
      typeof SITE_CONFIG !== "undefined" &&
      SITE_CONFIG &&
      typeof SITE_CONFIG === "object"
    ) {
      return SITE_CONFIG;
    }

    if (
      window.SITE_CONFIG &&
      typeof window.SITE_CONFIG === "object"
    ) {
      return window.SITE_CONFIG;
    }

    return {};
  }

  function normalizeAdmissionPhone(value) {
    if (typeof value !== "string") return "";

    const trimmed = value.trim();

    // Accept common formatting, but reject letters and URL characters.
    if (!/^\+?[0-9\s().-]+$/.test(trimmed)) return "";

    const compact = trimmed.replace(/[\s().-]/g, "");

    // Indian domestic mobile number with a leading trunk zero.
    if (/^0[6-9][0-9]{9}$/.test(compact)) {
      return `+91${compact.slice(1)}`;
    }

    // Indian mobile number without a country code.
    if (/^[6-9][0-9]{9}$/.test(compact)) {
      return `+91${compact}`;
    }

    // Indian mobile number with country code.
    if (/^91[6-9][0-9]{9}$/.test(compact)) {
      return `+${compact}`;
    }

    // Explicit international number.
    if (/^\+[1-9][0-9]{7,14}$/.test(compact)) {
      return compact;
    }

    return "";
  }

  function normalizeAdmissionWhatsApp(value) {
    if (typeof value !== "string") return "";

    const trimmed = value.trim();

    if (!/^\+?[0-9\s().-]+$/.test(trimmed)) return "";

    const compact = trimmed.replace(/[\s().-]/g, "");

    // WhatsApp configuration must include the country code.
    if (!/^\+?[1-9][0-9]{7,14}$/.test(compact)) return "";

    return compact.replace(/^\+/, "");
  }

  function readableAdmissionPhone(number) {
    if (/^\+91[6-9][0-9]{9}$/.test(number)) {
      return `${number.slice(0, 3)} ${number.slice(3, 8)} ${number.slice(8)}`;
    }

    return number;
  }

  function startAdmissionCTA() {
    const section = document.getElementById("admission");

    if (!section || !section.classList.contains("admission-cta")) return;
    if (section.dataset.admissionReady === "true") return;

    section.dataset.admissionReady = "true";

    const phoneLink = section.querySelector("[data-admission-phone]");
    const whatsappLink = section.querySelector("[data-admission-whatsapp]");
    const phoneDisplay = section.querySelector(
      "[data-admission-phone-display]"
    );
    const topics = section.querySelector("[data-admission-topics]");
    const enquiryLink = section.querySelector("[data-admission-enquiry]");
    const coursesLink = section.querySelector("[data-admission-courses]");

    let language = "";

    function currentLanguage() {
      return document.documentElement.lang.toLowerCase().startsWith("or")
        ? "or"
        : "en";
    }

    function renderAdmissionCTA() {
      language = currentLanguage();

      const text = ADMISSION_TEXT[language];
      const config = getAdmissionConfig();

      section.querySelectorAll("[data-admission-text]").forEach((node) => {
        const value = text[node.dataset.admissionText];

        if (typeof value === "string") {
          node.textContent = value;
        }
      });

      if (topics) {
        topics.setAttribute("aria-label", text.topicsLabel);
      }

      const phone = normalizeAdmissionPhone(config.phone);
      const displayNumber = readableAdmissionPhone(phone);

      if (phoneLink) {
        phoneLink.hidden = !phone;

        if (phone) {
          phoneLink.href = `tel:${phone}`;
          phoneLink.setAttribute(
            "aria-label",
            text.callLabel(displayNumber)
          );
        } else {
          phoneLink.removeAttribute("href");
          phoneLink.removeAttribute("aria-label");
        }
      }

      if (phoneDisplay) {
        phoneDisplay.hidden = !phone;
        phoneDisplay.textContent = phone
          ? `${text.phoneLabel}: ${displayNumber}`
          : "";
      }

      // Do not assume that the telephone number also supports WhatsApp.
      const whatsapp = normalizeAdmissionWhatsApp(config.whatsapp);

      if (whatsappLink) {
        whatsappLink.hidden = !whatsapp;

        if (whatsapp) {
          whatsappLink.href =
            `https://wa.me/${whatsapp}?text=` +
            encodeURIComponent(text.whatsappMessage);

          whatsappLink.target = "_blank";
          whatsappLink.rel = "noopener noreferrer";
          whatsappLink.setAttribute("aria-label", text.whatsappLabel);
        } else {
          whatsappLink.removeAttribute("href");
          whatsappLink.removeAttribute("aria-label");
        }
      }

      if (coursesLink) {
        coursesLink.href = document.getElementById("courses")
          ? "#courses"
          : `courses.html?lang=${language}`;
      }
    }

    function moveToTarget(event, target) {
      if (
        !target ||
        event.defaultPrevented ||
        event.button !== 0 ||
        event.ctrlKey ||
        event.metaKey ||
        event.shiftKey ||
        event.altKey
      ) {
        return;
      }

      event.preventDefault();

      if (!target.hasAttribute("tabindex")) {
        target.setAttribute("tabindex", "-1");
      }

      target.focus({ preventScroll: true });

      const reducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;

      target.scrollIntoView({
        behavior: reducedMotion ? "instant" : "smooth",
        block: "start",
      });
    }

    if (enquiryLink) {
      enquiryLink.addEventListener("click", (event) => {
        moveToTarget(
          event,
          document.getElementById("admission-contact")
        );
      });
    }

    if (coursesLink) {
      coursesLink.addEventListener("click", (event) => {
        moveToTarget(event, document.getElementById("courses"));
      });
    }

    const observer = new MutationObserver(() => {
      if (currentLanguage() !== language) {
        renderAdmissionCTA();
      }
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["lang"],
    });

    renderAdmissionCTA();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", startAdmissionCTA, {
      once: true,
    });
  } else {
    startAdmissionCTA();
  }
})();