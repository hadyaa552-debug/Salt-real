"use client";

/* ── Constants ────────────────────────────────────────── */
const P = "01001050018";           // Phone
const PD = "201001050018";        // Phone (international)
const WN = "201001050018";        // WhatsApp number
const WK = "YOUR-WEB3FORMS-KEY";  // Web3Forms access key
const GA_ID = "AW-XXXXXXXXXX";    // Google Ads conversion ID

/* ── Tracking helpers ─────────────────────────────────── */
const trackCall = () => {
  if (typeof window !== "undefined" && (window as any).gtag) {
    (window as any).gtag("event", "conversion", {
      send_to: `${GA_ID}/CALL_LABEL`,
    });
  }
};
const trackWA = () => {
  if (typeof window !== "undefined" && (window as any).gtag) {
    (window as any).gtag("event", "conversion", {
      send_to: `${GA_ID}/WA_LABEL`,
    });
  }
};
const trackLead = () => {
  if (typeof window !== "undefined" && (window as any).gtag) {
    (window as any).gtag("event", "conversion", {
      send_to: `${GA_ID}/LEAD_LABEL`,
    });
  }
};

import { useState, useEffect, useRef, FormEvent } from "react";

/* ══════════════════════════════════════════════════════════
   CONTENT — bilingual
   ══════════════════════════════════════════════════════════ */
const content = {
  en: {
    dir: "ltr" as const,
    lang: "en",
    nav: {
      home: "Home",
      project: "The Project",
      marina: "The Marina",
      residences: "Residences",
      location: "Location",
      register: "Register",
      cta: "Register Interest",
    },
    hero: {
      eyebrow: "Salt · Tatweer Misr · Ras El Hekma Km 185",
      heading: ["Live on", "the marina."],
      sub: "Tatweer Misr's second marina — a new waterfront icon at Ras El Hekma where the Mediterranean meets Crystal Lagoons®, and every home opens to the water.",
      cta1: "Register Your Interest",
      cta2: "View Residences",
      badges: ["New Launch · Registration Open", "65-Yacht Marina", "Sea & Crystal Lagoons"],
    },
    stats: [
      { value: "340k m²", label: "Marina Masterplan" },
      { value: "65", label: "Yacht Berths" },
      { value: "2,600", label: "Homes & Hotel" },
      { value: "16k m²", label: "Walkway & Retail" },
      { value: "2029", label: "Delivery" },
    ],
    about: {
      eyebrow: "A marina, brought home",
      heading: ["Where two", "waterfronts meet."],
      p1: "SALT Marina is the newest waterfront district within Tatweer Misr's SALT at Ras El Hekma (Km 185) — carved into the coast where the mountain meets the Mediterranean. Combining direct sea access with Crystal Lagoons®, it delivers a dual-waterfront lifestyle unlike anywhere else on the North Coast.",
      p2: "At its heart, a licensed yacht marina for 65 boats — the North Coast's newest — with docking piers, a 16,000 m² walkway of waterfront retail and dining, three Crystal Lagoons®, a boutique hotel and two beach clubs. Registration is now open for the first launch of 1,350 homes — studios, chalets and town houses from EGP 8M.",
    },
    features: {
      eyebrow: "Why Salt",
      heading: "A community built around a marina.",
      items: [
        { title: "A licensed yacht marina", desc: "A home port for 65 yachts of up to 80 feet — with three docking piers and a 4-metre draft, the North Coast's newest licensed marina." },
        { title: "Where two waterfronts meet", desc: "Direct Mediterranean sea access combined with Crystal Lagoons® — a rare dual-waterfront lifestyle, carved into the natural coastline." },
        { title: "Every home on the water", desc: "Terraced elevations give every residence an open view of the marina and the sea — no exceptions, no interior compromises." },
        { title: "16,000 m² of waterfront life", desc: "A promenade of retail, cafés and dining runs along the marina — a walkable waterfront at the centre of the community." },
        { title: "Crystal lagoons & sandy beach", desc: "Three crystal lagoons and a licensed sandy beach — SALT is the first North Coast developer to secure a sandy-beach licence." },
        { title: "Sail between three coasts", desc: "Egypt's first multi-destination marina network — travel by sea between SALT, Fouka Bay and D-Bay." },
      ],
    },
    marina: {
      eyebrow: "The marina",
      heading: ["A licensed home port", "for 65 yachts."],
      desc: "The marina sits at the centre of SALT — a licensed yacht basin carved into the coast and wrapped by the community, not tucked away at its edge. It's Tatweer Misr's second marina, after IL Monte Galala on the Red Sea.",
      stats: [
        { value: "65", label: "Yachts, up to 80 feet" },
        { value: "4 m", label: "Marina depth" },
        { value: "3", label: "Docking piers" },
        { value: "Network", label: "Sail to Fouka Bay & D-Bay" },
      ],
    },
    gallery: {
      eyebrow: "The gallery",
      heading: "A first look at SALT Marina.",
      sub: "Developer renders of the marina, the masterplan and the residences.",
    },
    residences: {
      eyebrow: "The residences",
      heading: "From studios to town houses.",
      desc: "A full collection wrapping the marina — studios, one- to three-bedroom chalets and town houses, from EGP 8M on flexible 5-, 7- and 10-year plans.",
    },
    pricing: {
      eyebrow: "Pricing & plans",
      heading: "Plans over 5, 7 or 10 years.",
      desc: "SALT Marina starts from EGP 8M, on flexible plans of 5, 7 or 10 years — the shorter the plan, the lower the price. Register and an advisor will send you the full zone-by-zone price list.",
      items: [
        { value: "5 · 7 · 10", label: "Year Plans" },
        { value: "EGP 8M", label: "Starting Price" },
        { value: "2029", label: "Marina Delivery" },
      ],
    },
    locationSection: {
      eyebrow: "The location",
      heading: ["Km 185, Ras El Hekma —", "the coast's new centre."],
      desc: "SALT sits at Km 185 on the Alexandria–Marsa Matrouh road, in the heart of Ras El Hekma — the North Coast's fastest-rising destination and Egypt's landmark bay.",
      stats: [
        { value: "Km 185", label: "Ras El Hekma · North Coast" },
        { value: "~2 hrs", label: "from Alexandria" },
        { value: "Fouka Rd", label: "Direct access" },
        { value: "Ras El Hekma", label: "Egypt's landmark bay" },
      ],
    },
    register: {
      eyebrow: "Registration now open",
      heading: "Be among the first at SALT Marina.",
      desc: "Register today for priority access to the first launch — and to the best marina- and sea-view homes — before public release.",
      benefits: [
        "Priority unit selection at launch",
        "Full price list & payment plan",
        "Marina- & sea-view homes",
      ],
      formTitle: "Register your interest",
      formSub: "SALT Marina · Ras El Hekma — by Tatweer Misr",
      name: "Full name",
      phone: "Phone",
      unit: "Residence of interest",
      unitOptions: ["Any / Not sure yet", "Studio", "1-Bedroom Chalet", "2-Bedroom Chalet", "3-Bedroom Chalet", "Town House"],
      submit: "Register Interest",
      consent: "By submitting, you agree to be contacted about SALT Marina.",
      successTitle: "You're registered!",
      successMsg: "Thank you — your interest has been received. An advisor will call you shortly.",
      whatsapp: "Enquire on WhatsApp",
    },
    footer: {
      tagline: "SALT Marina — Ras El Hekma, by Tatweer Misr.",
      disclaimer: "SALT Marina is a new launch; unit types, areas, prices and payment plans are indicative and subject to the developer's official price list and contracts at reservation. All imagery consists of developer renders for illustration only. This page is operated by an authorized sales agent.",
    },
  },
  ar: {
    dir: "rtl" as const,
    lang: "ar",
    nav: {
      home: "الرئيسية",
      project: "المشروع",
      marina: "المارينا",
      residences: "الوحدات",
      location: "الموقع",
      register: "سجّل",
      cta: "سجّل اهتمامك",
    },
    hero: {
      eyebrow: "سولت · تطوير مصر · رأس الحكمة كم ١٨٥",
      heading: ["عيش على", "المارينا."],
      sub: "المارينا الثانية لتطوير مصر — أيقونة بحرية جديدة في رأس الحكمة حيث يلتقي البحر المتوسط بالكريستال لاجونز®، وكل بيت يُطل على المياه.",
      cta1: "سجّل اهتمامك",
      cta2: "شوف الوحدات",
      badges: ["إطلاق جديد · التسجيل مفتوح", "مارينا ٦٥ يخت", "بحر وكريستال لاجونز"],
    },
    stats: [
      { value: "٣٤٠ ألف م²", label: "ماستربلان المارينا" },
      { value: "٦٥", label: "رصيف يخوت" },
      { value: "٢,٦٠٠", label: "وحدة وفندق" },
      { value: "١٦ ألف م²", label: "ممشى وتجاري" },
      { value: "٢٠٢٩", label: "التسليم" },
    ],
    about: {
      eyebrow: "مارينا في قلب البيت",
      heading: ["حيث يلتقي", "واجهتان بحريتان."],
      p1: "سولت مارينا هي أحدث منطقة بحرية ضمن مشروع سولت لتطوير مصر في رأس الحكمة (كم ١٨٥) — منحوتة في الساحل حيث يلتقي الجبل بالبحر المتوسط. تجمع بين الوصول المباشر للبحر والكريستال لاجونز® لتقدم أسلوب حياة بواجهتين بحريتين لا مثيل له على الساحل الشمالي.",
      p2: "في قلبها مارينا يخوت مرخصة تتسع لـ ٦٥ يختاً — الأحدث على الساحل الشمالي — مع أرصفة رسو وممشى بمساحة ١٦,٠٠٠ م² من المطاعم والمحال التجارية وثلاث كريستال لاجونز® وفندق بوتيك ونادييّ شاطئ. التسجيل مفتوح الآن لأول إطلاق يضم ١,٣٥٠ وحدة — استوديوهات وشاليهات وتاون هاوس تبدأ من ٨ مليون جنيه.",
    },
    features: {
      eyebrow: "ليه سولت",
      heading: "مجتمع مبني حول مارينا.",
      items: [
        { title: "مارينا يخوت مرخصة", desc: "ميناء لـ ٦٥ يختاً بطول يصل لـ ٨٠ قدماً — بثلاثة أرصفة رسو وعمق ٤ أمتار، أحدث مارينا مرخصة على الساحل الشمالي." },
        { title: "واجهتان بحريتان", desc: "وصول مباشر للبحر المتوسط مع كريستال لاجونز® — أسلوب حياة نادر بواجهتين بحريتين، منحوت في الساحل الطبيعي." },
        { title: "كل بيت على المياه", desc: "ارتفاعات متدرجة تمنح كل وحدة إطلالة مفتوحة على المارينا والبحر — بدون استثناء." },
        { title: "١٦,٠٠٠ م² من الحياة البحرية", desc: "ممشى من المحال والكافيهات والمطاعم يمتد على طول المارينا — واجهة بحرية تمشيها على رجلك." },
        { title: "كريستال لاجونز وشاطئ رملي", desc: "ثلاث كريستال لاجونز وشاطئ رملي مرخص — سولت أول مطور على الساحل الشمالي يحصل على ترخيص شاطئ رملي." },
        { title: "أبحر بين ثلاث وجهات", desc: "أول شبكة مارينا متعددة الوجهات في مصر — أبحر بين سولت وفوكا باي ودي باي." },
      ],
    },
    marina: {
      eyebrow: "المارينا",
      heading: ["ميناء مرخص", "لـ ٦٥ يختاً."],
      desc: "المارينا في قلب سولت — حوض يخوت مرخص منحوت في الساحل ومحاط بالمجتمع، مش على أطرافه. إنها المارينا الثانية لتطوير مصر، بعد المونت جلالة على البحر الأحمر.",
      stats: [
        { value: "٦٥", label: "يخت بطول ٨٠ قدم" },
        { value: "٤ م", label: "عمق المارينا" },
        { value: "٣", label: "أرصفة رسو" },
        { value: "شبكة", label: "أبحر لفوكا باي ودي باي" },
      ],
    },
    gallery: {
      eyebrow: "المعرض",
      heading: "نظرة أولى على سولت مارينا.",
      sub: "تصورات المطور للمارينا والماستربلان والوحدات السكنية.",
    },
    residences: {
      eyebrow: "الوحدات",
      heading: "من الاستوديو للتاون هاوس.",
      desc: "مجموعة كاملة تحيط بالمارينا — استوديوهات وشاليهات من غرفة لثلاث غرف وتاون هاوس، تبدأ من ٨ مليون جنيه بأنظمة سداد مرنة على ٥ و٧ و١٠ سنوات.",
    },
    pricing: {
      eyebrow: "الأسعار وأنظمة السداد",
      heading: "أنظمة سداد على ٥ و٧ و١٠ سنوات.",
      desc: "سولت مارينا تبدأ من ٨ مليون جنيه بأنظمة سداد مرنة — كلما كان النظام أقصر، كان السعر أقل. سجّل وهيتواصل معاك مستشار بقائمة الأسعار الكاملة.",
      items: [
        { value: "٥ · ٧ · ١٠", label: "سنوات تقسيط" },
        { value: "٨ مليون", label: "يبدأ من" },
        { value: "٢٠٢٩", label: "تسليم المارينا" },
      ],
    },
    locationSection: {
      eyebrow: "الموقع",
      heading: ["كم ١٨٥، رأس الحكمة —", "مركز الساحل الجديد."],
      desc: "سولت على كم ١٨٥ على طريق إسكندرية–مرسى مطروح، في قلب رأس الحكمة — الوجهة الأسرع نمواً على الساحل الشمالي وخليج مصر المميز.",
      stats: [
        { value: "كم ١٨٥", label: "رأس الحكمة · الساحل الشمالي" },
        { value: "~٢ ساعة", label: "من الإسكندرية" },
        { value: "طريق فوكا", label: "وصول مباشر" },
        { value: "رأس الحكمة", label: "خليج مصر المميز" },
      ],
    },
    register: {
      eyebrow: "التسجيل مفتوح",
      heading: "كن من أوائل سكان سولت مارينا.",
      desc: "سجّل اليوم للحصول على أولوية الاختيار في أول إطلاق — وأفضل الوحدات المطلة على المارينا والبحر — قبل الطرح العام.",
      benefits: [
        "أولوية اختيار الوحدات عند الإطلاق",
        "قائمة الأسعار الكاملة ونظام السداد",
        "وحدات بإطلالة مارينا وبحر",
      ],
      formTitle: "سجّل اهتمامك",
      formSub: "سولت مارينا · رأس الحكمة — تطوير مصر",
      name: "الاسم بالكامل",
      phone: "رقم الموبايل",
      unit: "الوحدة المفضلة",
      unitOptions: ["مش محدد بعد", "استوديو", "شاليه غرفة واحدة", "شاليه غرفتين", "شاليه ٣ غرف", "تاون هاوس"],
      submit: "سجّل اهتمامك",
      consent: "بالتسجيل، أنت موافق على التواصل معاك بخصوص سولت مارينا.",
      successTitle: "تم التسجيل!",
      successMsg: "شكراً — تم استلام بياناتك. مستشار هيتواصل معاك قريباً.",
      whatsapp: "استفسر على واتساب",
    },
    footer: {
      tagline: "سولت مارينا — رأس الحكمة، تطوير مصر.",
      disclaimer: "سولت مارينا إطلاق جديد؛ أنواع الوحدات والمساحات والأسعار وأنظمة السداد استرشادية وقابلة للتغيير وفقاً لقائمة الأسعار الرسمية والعقود عند الحجز. جميع الصور تصورات معمارية للتوضيح فقط. هذه الصفحة تُدار بواسطة وكيل مبيعات معتمد.",
    },
  },
};

const galleryImages = [
  { src: "https://www.najd.realestate/assets/img/salt/salt-aerial.jpg", en: "The masterplan · a village around the marina", ar: "الماستربلان · قرية حول المارينا" },
  { src: "https://www.najd.realestate/assets/img/salt/salt-bay.jpg", en: "Waterfront residences", ar: "وحدات على الواجهة البحرية" },
  { src: "https://www.najd.realestate/assets/img/salt/salt-apartment.jpg", en: "Marina chalets", ar: "شاليهات المارينا" },
  { src: "https://www.najd.realestate/assets/img/salt/salt-villa.jpg", en: "Standalone villas", ar: "فيلات مستقلة" },
  { src: "https://www.najd.realestate/assets/img/salt/salt-beachclub.jpg", en: "Beach clubs", ar: "نوادي الشاطئ" },
  { src: "https://www.najd.realestate/assets/img/salt/salt-townhouse.jpg", en: "Townhouses & twin houses", ar: "تاون هاوس وتوين هاوس" },
  { src: "https://www.najd.realestate/assets/img/salt/salt-villa-living.jpg", en: "Sea-view living", ar: "معيشة بإطلالة بحرية" },
  { src: "https://www.najd.realestate/assets/img/salt/salt-promenade.jpg", en: "The promenade", ar: "الممشى" },
  { src: "https://www.najd.realestate/assets/img/salt/salt-terrace.jpg", en: "Terraces & rooftops", ar: "تراسات وأسطح" },
  { src: "https://www.najd.realestate/assets/img/salt/salt-beach.jpg", en: "Sandy beach & lagoons", ar: "شاطئ رملي ولاجونز" },
];

const unitTypes = [
  { en: "Studio", ar: "استوديو", rooms: 0, area: "50 m²", areaAr: "٥٠ م²", price: "5,541,000", badge: { en: "Most Popular", ar: "الأكثر طلباً" }, note: { en: "Marina view", ar: "إطلالة مارينا" }, img: "https://www.najd.realestate/assets/img/salt/salt-apartment.jpg" },
  { en: "1-Bed Chalet", ar: "شاليه غرفة نوم", rooms: 1, area: "65–90 m²", areaAr: "٦٥-٩٠ م²", price: "6,054,000", badge: { en: "Ideal Entry", ar: "دخول مثالي" }, note: { en: "1 bedroom", ar: "١ غرفة" }, img: "https://www.najd.realestate/assets/img/salt/salt-bay.jpg" },
  { en: "2-Bed Chalet", ar: "شاليه غرفتين نوم", rooms: 2, area: "95–115 m²", areaAr: "٩٥-١١٥ م²", price: "8,347,000", badge: { en: "Top Demand", ar: "الأعلى طلباً" }, note: { en: "2 bedrooms", ar: "٢ غرفة" }, img: "https://www.najd.realestate/assets/img/salt/salt-villa.jpg" },
  { en: "3-Bed Chalet", ar: "شاليه ٣ غرف نوم", rooms: 3, area: "130–160 m²", areaAr: "١٣٠-١٦٠ م²", price: "11,200,000", badge: { en: "Family Choice", ar: "اختيار العائلة" }, note: { en: "3 bedrooms", ar: "٣ غرف" }, img: "https://www.najd.realestate/assets/img/salt/salt-villa-living.jpg" },
  { en: "Town House", ar: "تاون هاوس", rooms: 4, area: "180–230 m²", areaAr: "١٨٠-٢٣٠ م²", price: "16,500,000", badge: { en: "Premium", ar: "بريميوم" }, note: { en: "3+ bedrooms", ar: "+٣ غرف" }, img: "https://www.najd.realestate/assets/img/salt/salt-townhouse.jpg" },
];

/* ══════════════════════════════════════════════════════════
   COMPONENT
   ══════════════════════════════════════════════════════════ */
export default function SaltMarina() {
  const [lang, setLang] = useState<"en" | "ar">("ar");
  const [navSolid, setNavSolid] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);
  const [lightbox, setLightbox] = useState<string | null>(null);
  const [formSent, setFormSent] = useState(false);
  const [formLoading, setFormLoading] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [popupDismissed, setPopupDismissed] = useState(false);
  const [popupFormSent, setPopupFormSent] = useState(false);
  const [popupFormLoading, setPopupFormLoading] = useState(false);

  const t = content[lang];

  // Scroll observer for nav
  useEffect(() => {
    const onScroll = () => setNavSolid(window.scrollY > 80);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Popup trigger: 55% scroll OR 16 seconds
  useEffect(() => {
    if (popupDismissed) return;
    const timer = setTimeout(() => { if (!popupDismissed) setShowPopup(true); }, 16000);
    const onScroll = () => {
      const scrollPct = window.scrollY / (document.documentElement.scrollHeight - window.innerHeight);
      if (scrollPct > 0.55 && !popupDismissed) setShowPopup(true);
    };
    window.addEventListener("scroll", onScroll);
    return () => { clearTimeout(timer); window.removeEventListener("scroll", onScroll); };
  }, [popupDismissed]);

  // Intersection observer for animations
  useEffect(() => {
    const els = document.querySelectorAll(".animate-on-scroll");
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add("visible"); }),
      { threshold: 0.15 }
    );
    els.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, [lang]);

  // Update dir & lang on html
  useEffect(() => {
    document.documentElement.dir = t.dir;
    document.documentElement.lang = t.lang;
    document.body.dir = t.dir;
    if (lang === "ar") {
      document.body.style.fontFamily = "var(--font-arabic)";
    } else {
      document.body.style.fontFamily = "var(--font-body)";
    }
  }, [lang, t.dir, t.lang]);

  const toggleLang = () => {
    setLang((l) => (l === "en" ? "ar" : "en"));
    setMobileMenu(false);
  };

  // Form handler
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormLoading(true);
    const form = e.currentTarget;
    const data = new FormData(form);
    try {
      await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: data,
      });
      trackLead();
      setFormSent(true);
    } catch {
      alert("Something went wrong. Please try again.");
    }
    setFormLoading(false);
  };

  // Popup form handler
  const handlePopupSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setPopupFormLoading(true);
    const data = new FormData(e.currentTarget);
    try {
      await fetch("https://api.web3forms.com/submit", { method: "POST", body: data });
      trackLead();
      setPopupFormSent(true);
      setTimeout(() => { setShowPopup(false); setPopupDismissed(true); }, 2500);
    } catch {
      alert("Something went wrong.");
    }
    setPopupFormLoading(false);
  };

  const closePopup = () => { setShowPopup(false); setPopupDismissed(true); };

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMobileMenu(false);
  };

  const serif = { fontFamily: lang === "ar" ? "var(--font-arabic-display)" : "var(--font-display)", fontWeight: lang === "ar" ? 800 : undefined };

  return (
    <>
      {/* ═══ NAV ═══ */}
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${navSolid ? "nav-solid" : "nav-transparent"}`}
      >
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          {/* Logo */}
          <button onClick={() => scrollTo("hero")} className="text-xl font-semibold tracking-wider" data-nav-text style={{ ...serif, color: navSolid ? "var(--color-navy)" : "white" }}>
            SALT
          </button>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-8 text-sm" data-nav-text style={{ color: navSolid ? "var(--color-navy)" : "white" }}>
            <button onClick={() => scrollTo("about")} className="hover:opacity-70 transition-opacity">{t.nav.project}</button>
            <button onClick={() => scrollTo("marina")} className="hover:opacity-70 transition-opacity">{t.nav.marina}</button>
            <button onClick={() => scrollTo("residences")} className="hover:opacity-70 transition-opacity">{t.nav.residences}</button>
            <button onClick={() => scrollTo("location")} className="hover:opacity-70 transition-opacity">{t.nav.location}</button>
            <button
              onClick={toggleLang}
              className="px-3 py-1 rounded-full border text-xs font-medium tracking-wide hover:opacity-70 transition-opacity"
              style={{ borderColor: navSolid ? "var(--color-navy)" : "rgba(255,255,255,0.5)" }}
            >
              {lang === "en" ? "عربي" : "EN"}
            </button>
            <button
              onClick={() => scrollTo("register")}
              className="px-5 py-2 rounded-full text-sm font-medium transition-all hover:scale-105"
              style={{ background: "var(--color-sea)", color: "white" }}
            >
              {t.nav.cta}
            </button>
          </div>

          {/* Mobile hamburger */}
          <div className="flex md:hidden items-center gap-3">
            <button
              onClick={toggleLang}
              className="px-3 py-1 rounded-full border text-xs font-medium"
              data-nav-text
              style={{ borderColor: navSolid ? "var(--color-navy)" : "rgba(255,255,255,0.5)", color: navSolid ? "var(--color-navy)" : "white" }}
            >
              {lang === "en" ? "عربي" : "EN"}
            </button>
            <button
              onClick={() => setMobileMenu(!mobileMenu)}
              className="p-2"
              data-nav-text
              style={{ color: navSolid ? "var(--color-navy)" : "white" }}
            >
              <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2">
                {mobileMenu ? (
                  <path d="M6 6l12 12M18 6L6 18" />
                ) : (
                  <path d="M4 7h16M4 12h16M4 17h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileMenu && (
          <div className="md:hidden px-6 pb-6 flex flex-col gap-4 text-sm" style={{ background: "rgba(250,250,248,0.98)", color: "var(--color-navy)" }}>
            <button onClick={() => scrollTo("about")} className="py-2 border-b border-gray-200 text-start">{t.nav.project}</button>
            <button onClick={() => scrollTo("marina")} className="py-2 border-b border-gray-200 text-start">{t.nav.marina}</button>
            <button onClick={() => scrollTo("residences")} className="py-2 border-b border-gray-200 text-start">{t.nav.residences}</button>
            <button onClick={() => scrollTo("location")} className="py-2 border-b border-gray-200 text-start">{t.nav.location}</button>
            <button
              onClick={() => scrollTo("register")}
              className="py-3 rounded-full text-center font-medium text-white"
              style={{ background: "var(--color-sea)" }}
            >
              {t.nav.cta}
            </button>
          </div>
        )}
      </nav>

      {/* ═══ HERO ═══ */}
      <section id="hero" className="relative min-h-screen flex items-end pb-20 md:pb-28">
        <img
          src="https://www.najd.realestate/assets/img/salt/salt-hero.jpg"
          alt="SALT Marina aerial view"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-black/10" />
        <div className="relative z-10 max-w-7xl mx-auto px-6 w-full text-white">
          <p className="text-xs md:text-sm tracking-[0.2em] uppercase opacity-80 mb-4">{t.hero.eyebrow}</p>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-medium leading-[1.1] mb-6" style={serif}>
            {t.hero.heading[0]}<br />
            <em>{t.hero.heading[1]}</em>
          </h1>
          <p className="max-w-xl text-base md:text-lg opacity-90 leading-relaxed mb-8">{t.hero.sub}</p>
          <div className="flex flex-wrap gap-4 mb-12">
            <button
              onClick={() => scrollTo("register")}
              className="px-8 py-3 rounded-full font-medium transition-all hover:scale-105"
              style={{ background: "var(--color-sea)", color: "white" }}
            >
              {t.hero.cta1}
            </button>
            <button
              onClick={() => scrollTo("residences")}
              className="px-8 py-3 rounded-full font-medium border border-white/40 hover:bg-white/10 transition-all"
            >
              {t.hero.cta2}
            </button>
          </div>
          <div className="flex flex-wrap gap-4 text-xs tracking-wider opacity-70">
            {t.hero.badges.map((b, i) => (
              <span key={i} className="px-4 py-2 rounded-full border border-white/20 backdrop-blur-sm">{b}</span>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ STATS BAR ═══ */}
      <section className="border-y" style={{ borderColor: "var(--color-border)", background: "white" }}>
        <div className="max-w-7xl mx-auto px-6 py-8 grid grid-cols-2 md:grid-cols-5 gap-6 md:gap-4">
          {t.stats.map((s, i) => (
            <div key={i} className="text-center">
              <div className="text-2xl md:text-3xl font-semibold" style={{ ...serif, color: "var(--color-sea)" }}>{s.value}</div>
              <div className="text-xs tracking-wider mt-1 uppercase" style={{ color: "var(--color-muted)" }}>{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ═══ ABOUT ═══ */}
      <section id="about" className="py-20 md:py-32">
        <div className="max-w-7xl mx-auto px-6">
          {/* Full-width image */}
          <div className="animate-on-scroll rounded-2xl overflow-hidden mb-16 md:mb-20">
            <img
              src="https://www.najd.realestate/assets/img/salt/salt-bay.jpg"
              alt="SALT Marina bay"
              className="w-full h-[300px] md:h-[500px] lg:h-[600px] object-cover"
            />
          </div>
          <div className="max-w-3xl mx-auto animate-on-scroll">
            <p className="text-xs tracking-[0.25em] uppercase mb-4" style={{ color: "var(--color-sea)" }}>{t.about.eyebrow}</p>
            <h2 className="text-3xl md:text-5xl font-medium leading-tight mb-8" style={serif}>
              {t.about.heading[0]}<br /><em>{t.about.heading[1]}</em>
            </h2>
            <p className="text-base md:text-lg leading-relaxed mb-6" style={{ color: "var(--color-navy-light)" }}>{t.about.p1}</p>
            <p className="text-base md:text-lg leading-relaxed" style={{ color: "var(--color-navy-light)" }}>{t.about.p2}</p>
          </div>
        </div>
      </section>

      {/* ═══ WHY SALT / FEATURES ═══ */}
      <section className="py-20 md:py-28" style={{ background: "white" }}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16 animate-on-scroll">
            <p className="text-xs tracking-[0.25em] uppercase mb-4" style={{ color: "var(--color-sea)" }}>{t.features.eyebrow}</p>
            <h2 className="text-3xl md:text-4xl font-medium" style={serif}>{t.features.heading}</h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
            {t.features.items.map((f, i) => (
              <div
                key={i}
                className="animate-on-scroll p-8 rounded-xl border transition-all hover:shadow-lg"
                style={{ borderColor: "var(--color-border)", background: "var(--color-cream)" }}
              >
                <div className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium mb-5" style={{ background: "var(--color-sea-light)", color: "var(--color-sea)" }}>
                  {String(i + 1).padStart(2, "0")}
                </div>
                <h3 className="text-lg font-semibold mb-3" style={serif}>{f.title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: "var(--color-muted)" }}>{f.desc}</p>
              </div>
            ))}
          </div>
          {/* CTA after features */}
          <div className="text-center mt-14 animate-on-scroll">
            <p className="text-sm mb-4" style={{ color: "var(--color-muted)" }}>
              {lang === "en" ? "Registration closes in 10 days" : "التسجيل ينتهي خلال ١٠ أيام"}
            </p>
            <button
              onClick={() => setShowPopup(true)}
              className="px-10 py-4 rounded-full font-semibold text-white text-base transition-all hover:scale-105 shadow-lg"
              style={{ background: "var(--color-sea)" }}
            >
              {lang === "en" ? "Register Your Interest" : "سجّل اهتمامك الآن"}
            </button>
          </div>
        </div>
      </section>

      {/* ═══ MARINA ═══ */}
      <section id="marina" className="relative py-0">
        {/* Big image */}
        <div className="relative h-[50vh] md:h-[70vh]">
          <img
            src="https://www.najd.realestate/assets/img/salt/salt-marina.jpg"
            alt="SALT yacht marina"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          <div className="absolute bottom-8 left-0 right-0 px-6">
            <div className="max-w-7xl mx-auto text-white">
              <p className="text-xs tracking-[0.25em] uppercase opacity-70 mb-2">{t.marina.eyebrow}</p>
              <h2 className="text-3xl md:text-5xl font-medium leading-tight" style={serif}>
                {t.marina.heading[0]}<br /><em>{t.marina.heading[1]}</em>
              </h2>
            </div>
          </div>
        </div>
        {/* Marina content */}
        <div className="max-w-7xl mx-auto px-6 py-16 md:py-20">
          <div className="max-w-3xl animate-on-scroll">
            <p className="text-base md:text-lg leading-relaxed mb-10" style={{ color: "var(--color-navy-light)" }}>{t.marina.desc}</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 animate-on-scroll">
            {t.marina.stats.map((s, i) => (
              <div key={i} className="p-6 rounded-xl" style={{ background: "white", border: "1px solid var(--color-border)" }}>
                <div className="text-2xl font-semibold mb-1" style={{ ...serif, color: "var(--color-sea)" }}>{s.value}</div>
                <div className="text-xs uppercase tracking-wider" style={{ color: "var(--color-muted)" }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ FULL-WIDTH BREAK IMAGE ═══ */}
      <section className="relative h-[40vh] md:h-[50vh]">
        <img
          src="https://www.najd.realestate/assets/img/salt/salt-pool.jpg"
          alt="SALT waterfront pool"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/30 flex items-center justify-center text-center text-white px-6">
          <div>
            <p className="text-sm tracking-[0.3em] uppercase opacity-80 mb-3">SALT Marina</p>
            <h3 className="text-2xl md:text-4xl font-medium" style={serif}>
              {lang === "en" ? "Come home to the harbour." : "ارجع لبيتك على المارينا."}
            </h3>
          </div>
        </div>
      </section>

      {/* ═══ GALLERY ═══ */}
      <section id="gallery" className="py-20 md:py-28" style={{ background: "white" }}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12 animate-on-scroll">
            <p className="text-xs tracking-[0.25em] uppercase mb-4" style={{ color: "var(--color-sea)" }}>{t.gallery.eyebrow}</p>
            <h2 className="text-3xl md:text-4xl font-medium mb-4" style={serif}>{t.gallery.heading}</h2>
            <p className="text-sm" style={{ color: "var(--color-muted)" }}>{t.gallery.sub}</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4">
            {galleryImages.map((img, i) => (
              <div
                key={i}
                className={`animate-on-scroll group cursor-pointer overflow-hidden rounded-lg relative ${i === 0 ? "col-span-2 row-span-2" : ""}`}
                onClick={() => setLightbox(img.src)}
              >
                <img
                  src={img.src}
                  alt={lang === "en" ? img.en : img.ar}
                  className={`w-full object-cover transition-transform duration-500 group-hover:scale-105 ${i === 0 ? "h-full min-h-[300px]" : "h-48 md:h-56"}`}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                  <p className="text-white text-xs italic">{lang === "en" ? img.en : img.ar}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox */}
      {lightbox && (
        <div className="lightbox-overlay" onClick={() => setLightbox(null)}>
          <button
            className="absolute top-6 right-6 text-white text-3xl hover:opacity-70"
            onClick={() => setLightbox(null)}
          >
            ✕
          </button>
          <img src={lightbox} alt="Gallery" />
        </div>
      )}

      {/* ═══ RESIDENCES ═══ */}
      <section id="residences" className="py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-14 animate-on-scroll">
            <p className="text-xs tracking-[0.25em] uppercase mb-4" style={{ color: "var(--color-sea)" }}>{t.residences.eyebrow}</p>
            <h2 className="text-3xl md:text-4xl font-medium mb-4" style={serif}>{t.residences.heading}</h2>
            <p className="max-w-2xl mx-auto text-sm leading-relaxed" style={{ color: "var(--color-muted)" }}>{t.residences.desc}</p>
          </div>

          {/* Scrollable on mobile, grid on desktop */}
          <div className="flex md:grid md:grid-cols-3 lg:grid-cols-5 gap-5 overflow-x-auto pb-4 md:pb-0 snap-x snap-mandatory -mx-6 px-6 md:mx-0 md:px-0">
            {unitTypes.map((u, i) => (
              <div
                key={i}
                className="animate-on-scroll flex-shrink-0 w-[280px] md:w-auto snap-center rounded-2xl overflow-hidden border transition-all hover:shadow-xl"
                style={{ background: "white", borderColor: "var(--color-border)" }}
              >
                {/* Card image */}
                <div className="relative h-48 overflow-hidden">
                  <img src={u.img} alt={lang === "en" ? u.en : u.ar} className="w-full h-full object-cover" />
                  {/* Badge */}
                  <div className="absolute top-3 end-3 px-3 py-1 rounded-full text-xs font-semibold text-white" style={{ background: "var(--color-sea)" }}>
                    {lang === "en" ? u.badge.en : u.badge.ar}
                  </div>
                </div>
                {/* Card content */}
                <div className="p-5">
                  <h3 className="text-lg font-bold mb-2" style={serif}>{lang === "en" ? u.en : u.ar}</h3>
                  <div className="flex items-center gap-3 text-xs mb-4" style={{ color: "var(--color-muted)" }}>
                    <span>{lang === "en" ? u.note.en : u.note.ar}</span>
                    <span>·</span>
                    <span>{lang === "en" ? u.area : u.areaAr}</span>
                  </div>
                  <p className="text-xs mb-1" style={{ color: "var(--color-muted)" }}>{lang === "en" ? "Starting from" : "يبدأ من"}</p>
                  <p className="text-xl font-bold mb-4" style={{ ...serif, color: "var(--color-navy)" }}>
                    {u.price} <span className="text-sm font-normal">{lang === "en" ? "EGP" : "ج.م"}</span>
                  </p>
                  <a
                    href={`https://wa.me/${WN}?text=${encodeURIComponent(lang === "en" ? `Hi, I'm interested in ${u.en} at SALT Marina` : `مرحبا، أنا مهتم بـ ${u.ar} في سولت مارينا`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={trackWA}
                    className="block w-full py-3 rounded-full text-center text-sm font-semibold text-white transition-all hover:scale-[1.02]"
                    style={{ background: "#25D366" }}
                  >
                    {lang === "en" ? "Book via WhatsApp" : "احجز عبر واتساب"}
                  </a>
                </div>
              </div>
            ))}
          </div>

          <p className="text-center text-xs mt-8 italic" style={{ color: "var(--color-muted)" }}>
            {lang === "en"
              ? "* Indicative prices on a 5-year plan; final prices vary by zone per the developer's official list."
              : "* أسعار استرشادية على نظام ٥ سنوات؛ الأسعار النهائية تختلف حسب المنطقة وفقاً لقائمة المطور الرسمية."}
          </p>

          {/* CTA after residences */}
          <div className="text-center mt-10 animate-on-scroll">
            <button
              onClick={() => setShowPopup(true)}
              className="px-10 py-4 rounded-full font-semibold text-white text-base transition-all hover:scale-105 shadow-lg"
              style={{ background: "var(--color-sea)" }}
            >
              {lang === "en" ? "Register Now — Limited Units" : "سجّل الآن — الوحدات محدودة"}
            </button>
          </div>
        </div>
      </section>

      {/* ═══ PRICING ═══ */}
      <section className="py-20 md:py-28" style={{ background: "white" }}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="max-w-3xl mx-auto text-center animate-on-scroll">
            <p className="text-xs tracking-[0.25em] uppercase mb-4" style={{ color: "var(--color-sea)" }}>{t.pricing.eyebrow}</p>
            <h2 className="text-3xl md:text-4xl font-medium mb-6" style={serif}>{t.pricing.heading}</h2>
            <p className="text-base leading-relaxed mb-12" style={{ color: "var(--color-navy-light)" }}>{t.pricing.desc}</p>
          </div>
          <div className="grid grid-cols-3 gap-4 max-w-2xl mx-auto animate-on-scroll">
            {t.pricing.items.map((p, i) => (
              <div key={i} className="text-center p-6 rounded-xl" style={{ background: "var(--color-cream)" }}>
                <div className="text-2xl md:text-3xl font-semibold mb-2" style={{ ...serif, color: "var(--color-sea)" }}>{p.value}</div>
                <div className="text-xs uppercase tracking-wider" style={{ color: "var(--color-muted)" }}>{p.label}</div>
              </div>
            ))}
          </div>
          {/* CTA after pricing */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-12 animate-on-scroll">
            <button
              onClick={() => setShowPopup(true)}
              className="px-10 py-4 rounded-full font-semibold text-white text-base transition-all hover:scale-105 shadow-lg"
              style={{ background: "var(--color-sea)" }}
            >
              {lang === "en" ? "Get the Full Price List" : "احصل على قائمة الأسعار الكاملة"}
            </button>
            <a
              href={`https://wa.me/${WN}?text=${encodeURIComponent(lang === "en" ? "Hi, I want the SALT Marina price list" : "مرحبا، عايز قائمة أسعار سولت مارينا")}`}
              target="_blank"
              rel="noopener noreferrer"
              onClick={trackWA}
              className="px-10 py-4 rounded-full font-semibold text-sm transition-all hover:scale-105 border-2"
              style={{ borderColor: "#25D366", color: "#25D366" }}
            >
              {lang === "en" ? "Ask on WhatsApp" : "اسأل على واتساب"}
            </a>
          </div>
        </div>
      </section>

      {/* ═══ LOCATION ═══ */}
      <section id="location" className="py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="animate-on-scroll">
              <p className="text-xs tracking-[0.25em] uppercase mb-4" style={{ color: "var(--color-sea)" }}>{t.locationSection.eyebrow}</p>
              <h2 className="text-3xl md:text-4xl font-medium leading-tight mb-6" style={serif}>
                {t.locationSection.heading[0]}<br /><em>{t.locationSection.heading[1]}</em>
              </h2>
              <p className="text-base leading-relaxed mb-10" style={{ color: "var(--color-navy-light)" }}>{t.locationSection.desc}</p>
              <div className="grid grid-cols-2 gap-4">
                {t.locationSection.stats.map((s, i) => (
                  <div key={i} className="p-4 rounded-lg" style={{ background: "white", border: "1px solid var(--color-border)" }}>
                    <div className="text-lg font-semibold mb-0.5" style={{ ...serif, color: "var(--color-sea)" }}>{s.value}</div>
                    <div className="text-xs" style={{ color: "var(--color-muted)" }}>{s.label}</div>
                  </div>
                ))}
              </div>
            </div>
            <div className="animate-on-scroll rounded-2xl overflow-hidden">
              <img
                src="https://www.najd.realestate/assets/img/salt/salt-aerial.jpg"
                alt="SALT location"
                className="w-full h-[350px] md:h-[500px] object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ═══ REGISTRATION ═══ */}
      <section id="register" className="py-20 md:py-28" style={{ background: "var(--color-navy)" }}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12 md:gap-16 items-start">
            {/* Left info */}
            <div className="text-white animate-on-scroll">
              <p className="text-xs tracking-[0.25em] uppercase opacity-60 mb-4">{t.register.eyebrow}</p>
              <h2 className="text-3xl md:text-4xl font-medium leading-tight mb-6" style={serif}>{t.register.heading}</h2>
              <p className="text-base leading-relaxed opacity-80 mb-8">{t.register.desc}</p>
              <ul className="space-y-3 mb-10">
                {t.register.benefits.map((b, i) => (
                  <li key={i} className="flex items-center gap-3 text-sm opacity-90">
                    <span className="w-5 h-5 rounded-full flex items-center justify-center text-xs" style={{ background: "var(--color-sea)" }}>✓</span>
                    {b}
                  </li>
                ))}
              </ul>
              <a
                href={`https://wa.me/${WN}?text=${encodeURIComponent(lang === "en" ? "Hi, I'm interested in SALT Marina" : "مرحبا، أنا مهتم بسولت مارينا")}`}
                target="_blank"
                rel="noopener noreferrer"
                onClick={trackWA}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-medium text-sm transition-all hover:scale-105"
                style={{ background: "#25D366", color: "white" }}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="white">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
                  <path d="M12 2C6.477 2 2 6.477 2 12c0 1.89.525 3.66 1.438 5.168L2 22l4.832-1.438A9.955 9.955 0 0012 22c5.523 0 10-4.477 10-10S17.523 2 12 2zm0 18a8 8 0 01-4.243-1.214l-.252-.149-2.625.781.781-2.625-.149-.252A8 8 0 1112 20z" />
                </svg>
                {t.register.whatsapp}
              </a>

              {/* Phone CTA */}
              <div className="mt-4">
                <a
                  href={`tel:${P}`}
                  onClick={trackCall}
                  className="inline-flex items-center gap-2 text-sm opacity-70 hover:opacity-100 transition-opacity text-white"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/></svg>
                  {P}
                </a>
              </div>
            </div>

            {/* Right form */}
            <div className="rounded-2xl p-8 md:p-10 animate-on-scroll" style={{ background: "white" }}>
              {!formSent ? (
                <>
                  <h3 className="text-xl font-semibold mb-1" style={serif}>{t.register.formTitle}</h3>
                  <p className="text-xs mb-8" style={{ color: "var(--color-muted)" }}>{t.register.formSub}</p>
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <input type="hidden" name="access_key" value={WK} />
                    <input type="hidden" name="subject" value="SALT Marina — New Lead" />
                    <input type="hidden" name="from_name" value="SALT Marina Landing" />
                    <input type="checkbox" name="botcheck" className="hidden" />

                    <div>
                      <label className="block text-sm font-medium mb-2">{t.register.name} *</label>
                      <input
                        name="name"
                        required
                        className="w-full px-4 py-3 rounded-lg border text-sm outline-none transition-all focus:ring-2"
                        style={{ borderColor: "var(--color-border)", focusRing: "var(--color-sea)" } as any}
                        placeholder={lang === "en" ? "Your full name" : "اسمك بالكامل"}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">{t.register.phone} *</label>
                      <input
                        name="phone"
                        type="tel"
                        required
                        className="w-full px-4 py-3 rounded-lg border text-sm outline-none transition-all focus:ring-2"
                        style={{ borderColor: "var(--color-border)" }}
                        placeholder={lang === "en" ? "01XXXXXXXXX" : "01XXXXXXXXX"}
                        dir="ltr"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">{t.register.unit}</label>
                      <select
                        name="unit_interest"
                        className="w-full px-4 py-3 rounded-lg border text-sm outline-none transition-all"
                        style={{ borderColor: "var(--color-border)" }}
                      >
                        {t.register.unitOptions.map((o, i) => (
                          <option key={i}>{o}</option>
                        ))}
                      </select>
                    </div>
                    <button
                      type="submit"
                      disabled={formLoading}
                      className="w-full py-3.5 rounded-full font-medium text-white transition-all hover:scale-[1.02] disabled:opacity-50"
                      style={{ background: "var(--color-sea)" }}
                    >
                      {formLoading ? "..." : t.register.submit}
                    </button>
                    <p className="text-xs text-center" style={{ color: "var(--color-muted)" }}>{t.register.consent}</p>
                  </form>
                </>
              ) : (
                <div className="text-center py-12">
                  <div className="w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center text-2xl" style={{ background: "var(--color-sea-light)", color: "var(--color-sea)" }}>✓</div>
                  <h3 className="text-xl font-semibold mb-2" style={serif}>{t.register.successTitle}</h3>
                  <p className="text-sm" style={{ color: "var(--color-muted)" }}>{t.register.successMsg}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ═══ FOOTER ═══ */}
      <footer className="py-12 border-t" style={{ borderColor: "var(--color-border)" }}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-start gap-8 mb-10">
            <div>
              <h4 className="text-xl font-semibold mb-2" style={serif}>SALT</h4>
              <p className="text-sm" style={{ color: "var(--color-muted)" }}>{t.footer.tagline}</p>
            </div>
            <div className="flex gap-8 text-sm" style={{ color: "var(--color-muted)" }}>
              <button onClick={() => scrollTo("about")} className="hover:opacity-70">{t.nav.project}</button>
              <button onClick={() => scrollTo("marina")} className="hover:opacity-70">{t.nav.marina}</button>
              <button onClick={() => scrollTo("residences")} className="hover:opacity-70">{t.nav.residences}</button>
              <button onClick={() => scrollTo("register")} className="hover:opacity-70">{t.nav.register}</button>
            </div>
          </div>
          <div className="border-t pt-6" style={{ borderColor: "var(--color-border)" }}>
            <p className="text-xs leading-relaxed" style={{ color: "var(--color-muted)" }}>
              {t.footer.disclaimer}
            </p>
            <p className="text-xs mt-4" style={{ color: "var(--color-muted)" }}>
              © {new Date().getFullYear()} SALT Marina by Tatweer Misr
            </p>
          </div>
        </div>
      </footer>

      {/* ═══ FLOATING WHATSAPP ═══ */}
      <a
        href={`https://wa.me/${WN}?text=${encodeURIComponent(lang === "en" ? "Hi, I'm interested in SALT Marina" : "مرحبا، أنا مهتم بسولت مارينا")}`}
        target="_blank"
        rel="noopener noreferrer"
        onClick={trackWA}
        className="fixed bottom-6 right-6 z-40 w-14 h-14 rounded-full flex items-center justify-center shadow-lg transition-all hover:scale-110"
        style={{ background: "#25D366" }}
        aria-label="WhatsApp"
      >
        <svg width="28" height="28" viewBox="0 0 24 24" fill="white">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
          <path d="M12 2C6.477 2 2 6.477 2 12c0 1.89.525 3.66 1.438 5.168L2 22l4.832-1.438A9.955 9.955 0 0012 22c5.523 0 10-4.477 10-10S17.523 2 12 2zm0 18a8 8 0 01-4.243-1.214l-.252-.149-2.625.781.781-2.625-.149-.252A8 8 0 1112 20z"/>
        </svg>
      </a>

      {/* ═══ MOBILE BOTTOM BAR ═══ */}
      <div
        className="fixed bottom-0 left-0 right-0 z-40 md:hidden flex items-center gap-2 px-4 py-3 border-t"
        style={{ background: "rgba(250,250,248,0.97)", backdropFilter: "blur(10px)", borderColor: "var(--color-border)" }}
      >
        <a
          href={`tel:${P}`}
          onClick={trackCall}
          className="flex-1 py-2.5 rounded-full text-center text-sm font-medium border"
          style={{ borderColor: "var(--color-sea)", color: "var(--color-sea)" }}
        >
          {lang === "en" ? "Call" : "اتصل"}
        </a>
        <a
          href={`https://wa.me/${WN}`}
          target="_blank"
          rel="noopener noreferrer"
          onClick={trackWA}
          className="flex-1 py-2.5 rounded-full text-center text-sm font-medium text-white"
          style={{ background: "#25D366" }}
        >
          WhatsApp
        </a>
        <button
          onClick={() => setShowPopup(true)}
          className="flex-1 py-2.5 rounded-full text-center text-sm font-medium text-white"
          style={{ background: "var(--color-sea)" }}
        >
          {lang === "en" ? "Register" : "سجّل"}
        </button>
      </div>

      {/* ═══ POPUP — Registration with urgency ═══ */}
      {showPopup && (
        <div
          className="fixed inset-0 z-[200] flex items-center justify-center p-4"
          style={{ background: "rgba(0,0,0,0.6)", backdropFilter: "blur(4px)" }}
          onClick={(e) => { if (e.target === e.currentTarget) closePopup(); }}
        >
          <div
            className="relative w-full max-w-md rounded-2xl overflow-hidden shadow-2xl"
            style={{ background: "white", animation: "fadeUp 0.4s ease" }}
            dir={t.dir}
          >
            {/* Close button */}
            <button onClick={closePopup} className="absolute top-4 end-4 z-10 w-8 h-8 rounded-full flex items-center justify-center text-lg hover:opacity-60 transition-opacity" style={{ background: "var(--color-cream)", color: "var(--color-navy)" }}>✕</button>

            {/* Urgency banner */}
            <div className="px-6 py-3 text-center text-sm font-semibold text-white" style={{ background: "#e63946" }}>
              <span className="inline-flex items-center gap-2">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="white"><circle cx="12" cy="12" r="10" stroke="white" strokeWidth="2" fill="none"/><path d="M12 6v6l4 2" stroke="white" strokeWidth="2" fill="none" strokeLinecap="round"/></svg>
                {lang === "en" ? "Only 10 days left — Registration closes soon!" : "باقي ١٠ أيام فقط — التسجيل ينتهي قريباً!"}
              </span>
            </div>

            {/* Popup header */}
            <div className="px-6 pt-6 pb-2 text-center">
              <h3 className="text-xl font-bold mb-1" style={{ ...serif, color: "var(--color-navy)" }}>
                {lang === "en" ? "Register Your Interest" : "سجّل اهتمامك الآن"}
              </h3>
              <p className="text-xs" style={{ color: "var(--color-muted)" }}>
                {lang === "en" ? "SALT Marina · Ras El Hekma — Tatweer Misr" : "سولت مارينا · رأس الحكمة — تطوير مصر"}
              </p>
            </div>

            {/* Popup form */}
            <div className="px-6 pb-6 pt-4">
              {!popupFormSent ? (
                <form onSubmit={handlePopupSubmit} className="space-y-4">
                  <input type="hidden" name="access_key" value={WK} />
                  <input type="hidden" name="subject" value="SALT Marina — Popup Lead" />
                  <input type="hidden" name="from_name" value="SALT Marina Popup" />
                  <input type="checkbox" name="botcheck" className="hidden" />

                  <input
                    name="name"
                    required
                    className="w-full px-4 py-3 rounded-xl border text-sm outline-none focus:ring-2"
                    style={{ borderColor: "var(--color-border)" }}
                    placeholder={lang === "en" ? "Full name" : "الاسم بالكامل"}
                  />
                  <input
                    name="phone"
                    type="tel"
                    required
                    className="w-full px-4 py-3 rounded-xl border text-sm outline-none focus:ring-2"
                    style={{ borderColor: "var(--color-border)" }}
                    placeholder="01XXXXXXXXX"
                    dir="ltr"
                  />
                  <select
                    name="unit_interest"
                    className="w-full px-4 py-3 rounded-xl border text-sm outline-none"
                    style={{ borderColor: "var(--color-border)" }}
                  >
                    {t.register.unitOptions.map((o, i) => (
                      <option key={i}>{o}</option>
                    ))}
                  </select>
                  <button
                    type="submit"
                    disabled={popupFormLoading}
                    className="w-full py-3.5 rounded-full font-bold text-white text-base transition-all hover:scale-[1.02] disabled:opacity-50"
                    style={{ background: "var(--color-sea)" }}
                  >
                    {popupFormLoading ? "..." : lang === "en" ? "Register Now" : "سجّل الآن"}
                  </button>
                </form>
              ) : (
                <div className="text-center py-8">
                  <div className="w-14 h-14 rounded-full mx-auto mb-3 flex items-center justify-center text-2xl" style={{ background: "var(--color-sea-light)", color: "var(--color-sea)" }}>✓</div>
                  <h4 className="text-lg font-bold mb-1" style={serif}>{t.register.successTitle}</h4>
                  <p className="text-sm" style={{ color: "var(--color-muted)" }}>{t.register.successMsg}</p>
                </div>
              )}

              {/* Quick WhatsApp + Call in popup */}
              {!popupFormSent && (
                <div className="flex gap-3 mt-4">
                  <a
                    href={`https://wa.me/${WN}?text=${encodeURIComponent(lang === "en" ? "Hi, I'm interested in SALT Marina" : "مرحبا، أنا مهتم بسولت مارينا")}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => { trackWA(); closePopup(); }}
                    className="flex-1 py-2.5 rounded-full text-center text-sm font-semibold text-white"
                    style={{ background: "#25D366" }}
                  >
                    WhatsApp
                  </a>
                  <a
                    href={`tel:${P}`}
                    onClick={() => { trackCall(); closePopup(); }}
                    className="flex-1 py-2.5 rounded-full text-center text-sm font-semibold border"
                    style={{ borderColor: "var(--color-sea)", color: "var(--color-sea)" }}
                  >
                    {lang === "en" ? "Call Us" : "اتصل بنا"}
                  </a>
                </div>
              )}

              <p className="text-[10px] text-center mt-3" style={{ color: "var(--color-muted)" }}>
                {t.register.consent}
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
