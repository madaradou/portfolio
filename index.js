const IMG = "./assets/images/";
const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
const $ = (s, el = document) => el.querySelector(s);
const $$ = (s, el = document) => [...el.querySelectorAll(s)];
const clamp01 = (v) => Math.max(0, Math.min(1, v));
const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));

/* ================= DATA ================= */
const projects = {
  firesafe: {
    title: "FireSafe XR", cat: "XR SIMULATION · UNITY 6", art: "xr",
    sub: "First-person fire-safety training simulator — I own the electrical-fire scenario.",
    desc: "A team project of four students, one fire scenario each. Built in Unity 6.3 LTS with URP, the new Input System, UI Toolkit and AI Navigation. I shipped Module 3 (training fire: extinguisher physics, hold-to-extinguish with line-of-sight checks, NavMesh NPC, menus, one-click builder) and lead Module 4: an electrical cabinet fire where choosing water or foam means electrocution.",
    hl: "Scenario state machine: Briefing → Early warning → Inspection → Ignition → Power cut → Extinguish → Secure → Debrief.",
    list: ["Extinguisher types as ScriptableObjects — CO₂ correct, powder penalised, water/foam lethal", "Fire stages that spread to the cable tray and re-ignite if power is live", "Panicking coworker NPC with health, calming interaction and evacuation", "Keyboard / gamepad / touch with auto-switching and rebinding", "Three difficulties — Facile, Normal, Examen — with scoring and debrief"],
    tags: ["Unity 6.3", "C#", "URP", "UI Toolkit", "NavMesh", "Input System", "Particle VFX"],
  },
  dossier: {
    title: "Supramax Dossier AI", cat: "AI PLATFORM · CLIENT WORK", img: IMG + "supramax/dossier-hero.webp",
    sub: "STEG-compliant photovoltaic dossiers generated in minutes — AI scanner + agent.",
    desc: "Internal platform for Supramax Energy that turns a solar PV installation into the official 21-page STEG technical dossier for low-voltage grid connection. I wrote 26 of the 30 commits: the web front-end redesign, admin, the AI datasheet scanner, the STEG PDF generator with annexes and GPS, the function-calling dossier agent and the ERP module pages.",
    hl: "Sizing + NF C 15-100 checks + ready-to-submit PDF — one platform, zero re-typing.",
    list: ["AI scanner extracts panel / inverter / protection / cable specs from PDF datasheets", "Dossier agent (Qwen3-8B, tool calling) reads & updates the dossier, runs compliance, writes French narrative", "Rule-based fallback checklist when the AI is unavailable", "STEG template filler → DOCX → PDF with official 21-page layout", "ERP: CRM, products, sales, purchases, stock, accounting, HR — plus an Expo mobile client"],
    tags: ["React + TypeScript", "Recharts", "Node / Express", "MongoDB", "LLM agents", "PDF / DOCX", "Expo"],
    gallery: [IMG + "supramax/dossier-deck.webp", IMG + "supramax/dossier-pdf.webp"],
    link: "https://github.com/supramaxorganistation/supramaxenergydossiertechniqueai",
  },
  supramax: {
    title: "Supramax Energy Website", cat: "WEB · CLIENT WORK · LIVE", img: IMG + "supramax/roof-1.webp",
    sub: "Trilingual solar-energy website with an AI chatbot — live at supramaxenergy.tn.",
    desc: "Public website for a Tunisian photovoltaic installer (residential, commercial, industrial). Top contributor with 29 commits: I added the server proxy that routes the contact form and the Gemini-powered “Chamouss” chatbot, fail-over timeouts and a token cap for fast answers, server-side reCAPTCHA with a client-side Web3Forms fallback, new 93 kWp and 103 kWp realisations, and the deployments.",
    hl: "React 19 · FR / EN / AR · Leaflet map picker · Netlify serverless functions.",
    list: ["AI chatbot with a sales persona and fault-tolerant prompts", "Contact form with reCAPTCHA verification and safe error handling", "Realisations gallery and project carousel", "Dark / light theme, language selector, SEO sitemap"],
    tags: ["React 19", "Vite", "React Router", "Leaflet", "Gemini", "Netlify Functions", "reCAPTCHA"],
    gallery: [IMG + "supramax/roof-2.webp", IMG + "supramax/roof-3.webp", IMG + "supramax/inverter.webp"],
    link: "https://supramaxenergy.tn", code: "https://github.com/supramaxorganistation/reactsupramaxsite",
  },
  ess9ini: {
    title: "Ess9ini", cat: "SMART AGRICULTURE · IoT + AI", img: IMG + "ess9ini/logo.png", contain: true,
    sub: "Smart-farm dashboard for Tunisian agriculture — IoT moisture sensors + AI irrigation.",
    desc: "A bilingual Arabic/English dashboard built for an olive farm in Gabès. IoT soil sensors stream moisture, temperature and battery; AI recommends irrigation from soil and weather data; an interactive farm map shows every sensor colour-coded by moisture.",
    hl: "Target moisture 80 % · critical alerts under 30 % · updates every 30 s.",
    list: ["Real-time monitoring with offline detection", "Weather-aware AI irrigation schedules per crop", "Priority alerts with acknowledgement", "Mobile-first, field-ready UI"],
    tags: ["React 18", "Node.js", "MongoDB", "Flet", "Arduino", "WebSocket"],
    link: "https://github.com/madaradou/ess9ini",
  },
  rebirth: {
    title: "Rebirth to the World", cat: "GAME · C / SDL · 2024", img: IMG + "rebirthed/rebirth_posterr.png",
    sub: "2D platformer in C — 2nd place at Game Day 2024 and at ESPRIT's Bal des Projets.",
    desc: "A 2D side-scrolling platformer developed in C with SDL 1.2, revealed at the Digital Knights event. A multi-level medieval-fantasy adventure with dynamic combat, interactive storytelling, puzzles and an Arduino controller.",
    hl: "2nd place — Game Day 2024 · 2nd place — Bal des Projets 2024 (ESPRIT).",
    tags: ["C", "SDL 1.2", "Arduino", "Physics", "Collision detection", "Level design", "Save system", "Minimap"],
    gallery: [IMG + "rebirthed/rebirth_logo.png"],
    video: "https://www.youtube.com/embed/G5VGV8nTPTQ",
    link: "https://github.com/madaradou/rebirthed",
  },
  cleansy: {
    title: "Cleansy", cat: "DESKTOP + IoT · QT / C++", img: IMG + "cleansy/logo.png", contain: true,
    sub: "Cleaning-centre management with Arduino RFID, mapping and analytics.",
    desc: "Desktop platform digitalising cleaning companies: task automation, team and client coordination, fleet management and analytics — with Arduino RFID integration and real-time notifications.",
    tags: ["Qt", "C++", "QML", "Arduino", "RFID", "SQL", "Charts", "Serial", "PDF/Excel export"],
    gallery: [IMG + "cleansy/poster.png"],
    link: "https://github.com/madaradou/clansyqtapp",
  },
  hotelia: {
    title: "Hotelia Smart", cat: "WEB · AI RECRUITMENT", art: "HS",
    sub: "AI-powered recruitment platform — lead developer.",
    desc: "Recruitment platform with an AI chatbot assistant, face-recognition authentication, voice navigation, real-time messaging and Stripe payments.",
    tags: ["PHP", "Symfony", "Python", "OpenCV", "MySQL", "Stripe"],
    link: "https://github.com/madaradou/hoteliasmartweb",
  },
  efhemni: {
    title: "Efhemni", cat: "MOBILE · TRANSLATION", art: "فهمني",
    sub: "Tunisian-dialect translator for tourism and local businesses.",
    desc: "A mobile translator designed to break the language barrier between visitors and Tunisian businesses by understanding the Tunisian dialect.",
    tags: ["Mobile", "NLP", "Tunisian dialect"],
    link: "https://github.com/madaradou/efhemni",
  },
};
const featured = ["firesafe", "dossier", "supramax", "ess9ini", "rebirth"];
const wheelOrder = ["firesafe", "dossier", "supramax", "ess9ini", "rebirth", "cleansy", "hotelia", "efhemni"];
const media = (p, cls = "") => p.img
  ? `<img src="${p.img}" alt="${esc(p.title)}" class="${p.contain ? "contain" : ""} ${cls}" loading="lazy" draggable="false">`
  : `<div class="art ${p.art === "xr" ? "art-xr" : "art-mono"}">${p.art === "xr" ? "XR" : esc(p.art)}</div>`;

/* ================= PRELOADER ================= */
$$(".split").forEach((el) => {
  el.innerHTML = [...el.textContent].map((c, i) => `<span class="ch" style="transition-delay:${i * 40}ms">${c}</span>`).join("");
});
(function preload() {
  const num = $("#loader-num"), t0 = performance.now(), dur = reduced ? 1 : 1500;
  const tick = (t) => {
    const p = Math.min((t - t0) / dur, 1);
    num.textContent = Math.round((1 - (1 - p) ** 3) * 100);
    if (p < 1) return requestAnimationFrame(tick);
    $("#loader").classList.add("done");
    document.body.classList.replace("is-loading", "ready");
    setTimeout(() => $$(".split").forEach((s) => s.classList.add("in")), 250);
  };
  requestAnimationFrame(tick);
})();

/* ================= CURSOR / MAGNETIC / TILT ================= */
const dot = $(".cursor-dot"), ring = $(".cursor-ring"), ringLabel = $(".cursor-ring span");
let mx = innerWidth / 2, my = innerHeight / 2, rx = mx, ry = my;
addEventListener("pointermove", (e) => { mx = e.clientX; my = e.clientY; dot.style.transform = `translate(${mx}px,${my}px)`; });
(function follow() {
  rx += (mx - rx) * 0.16; ry += (my - ry) * 0.16;
  ring.style.transform = `translate(${rx}px,${ry}px)`;
  requestAnimationFrame(follow);
})();
document.addEventListener("pointerover", (e) => {
  const lab = e.target.closest("[data-cursor]");
  ring.classList.toggle("label", !!lab);
  ringLabel.textContent = lab ? lab.dataset.cursor : "";
  ring.classList.toggle("hover", !lab && !!e.target.closest("a, button, .svc, .sensor"));
});
$$(".magnetic").forEach((el) => {
  el.addEventListener("pointermove", (e) => {
    const r = el.getBoundingClientRect();
    el.style.transform = `translate(${(e.clientX - r.left - r.width / 2) * 0.3}px,${(e.clientY - r.top - r.height / 2) * 0.4}px)`;
  });
  el.addEventListener("pointerleave", () => (el.style.transform = ""));
});
const portrait = $("#portrait");
$("#home").addEventListener("pointermove", (e) => {
  if (reduced) return;
  portrait.style.setProperty("--ry", `${(e.clientX / innerWidth - 0.5) * 10}deg`);
  portrait.style.setProperty("--rx", `${(0.5 - e.clientY / innerHeight) * 6}deg`);
});

/* ================= NAV ================= */
const drawer = $("#drawer"), burger = $(".burger");
const setDrawer = (open) => { drawer.classList.toggle("open", open); burger.setAttribute("aria-expanded", open); drawer.setAttribute("aria-hidden", !open); };
burger.addEventListener("click", () => setDrawer(true));
$(".drawer-close").addEventListener("click", () => setDrawer(false));
drawer.addEventListener("click", (e) => (e.target === drawer || e.target.closest("nav a")) && setDrawer(false));

const sectionObs = new IntersectionObserver((entries) => entries.forEach((en) => {
  if (!en.isIntersecting) return;
  const id = en.target.id;
  $$(".nav-pill a, #float-nav a").forEach((a) => a.classList.toggle("active", a.hash === "#" + id));
}), { rootMargin: "-45% 0px -50% 0px" });
$$("#home, section[id], #contact").forEach((s) => sectionObs.observe(s));

/* ================= REVEAL ================= */
const revObs = new IntersectionObserver((entries) => entries.forEach((en) => {
  if (!en.isIntersecting) return;
  en.target.classList.add("in");
  revObs.unobserve(en.target);
}), { threshold: 0.12 });
$$(".reveal").forEach((el, i) => { el.style.transitionDelay = `${(i % 3) * 90}ms`; revObs.observe(el); });

/* ================= SCROLL-DRIVEN ================= */
const sem = $(".sem"), semSticky = $(".sem-sticky"), semContent = $(".sem-content");
const exp = $("#experience"), stage = $(".exp-stage"), panels = $$(".exp-panel");
const tkTop = $(".tk-top"), tkBot = $(".tk-bot"), phase = $("#exp-phase"), meter = $("#exp-meter");
const jumpBtns = $$(".exp-foot button"), floatNav = $("#float-nav");
const progress = (el) => { const r = el.getBoundingClientRect(); return clamp01(-r.top / (r.height - innerHeight)); };

function onScroll() {
  const y = scrollY;
  $("#progress").style.transform = `scaleX(${y / (document.documentElement.scrollHeight - innerHeight)})`;
  floatNav.classList.toggle("show", y > innerHeight * 0.9);
  floatNav.classList.toggle("away", $("#contact").getBoundingClientRect().top < innerHeight * 0.6);
  if (reduced) return;

  const p = clamp01(progress(sem) / 0.7);
  semSticky.style.setProperty("--p", p.toFixed(4));
  semContent.classList.toggle("is-open", p > 0.95);

  const ep = progress(exp);
  const max = stage.scrollWidth - innerWidth;
  stage.style.transform = `translate3d(${-max * ep}px,0,0)`;
  tkTop.style.transform = `translateX(${-ep * 40}vw)`;
  tkBot.style.transform = `translateX(${ep * 40 - 40}vw)`;
  meter.style.transform = `scaleX(${ep})`;
  panels.forEach((pn) => pn.querySelector(".exp-bgdate")?.style.setProperty("--par", `${(pn.getBoundingClientRect().left) * 0.15}px`));
  const cur = panels.reduce((best, pn) => Math.abs(pn.getBoundingClientRect().left) < Math.abs(best.getBoundingClientRect().left) ? pn : best);
  if (phase.textContent !== cur.dataset.phase) phase.textContent = cur.dataset.phase;
  jumpBtns.forEach((b, i) => b.classList.toggle("on", panels[i + 1] === cur));
}
addEventListener("scroll", () => requestAnimationFrame(onScroll), { passive: true });
addEventListener("resize", onScroll);
onScroll();

jumpBtns.forEach((b) => b.addEventListener("click", () => {
  const top = exp.offsetTop + (exp.offsetHeight - innerHeight) * +b.dataset.jump;
  scrollTo({ top, behavior: "smooth" });
}));

/* ================= FLEX CAROUSEL ================= */
const flex = $("#flex");
flex.innerHTML = featured.map((k, i) => {
  const p = projects[k];
  return `<div class="fc-item${i === 0 ? " open" : ""}" tabindex="0" role="button" data-k="${k}" data-cursor="OPEN" aria-label="${esc(p.title)}">
    <div class="fc-media">${media(p)}</div>
    <span class="fc-num">0${i + 1}</span>
    <span class="fc-vert">${esc(p.title.toUpperCase())}</span>
    <div class="fc-cap"><small>${esc(p.cat)}</small><h3>${esc(p.title)}</h3><p>${esc(p.sub)}</p></div>
  </div>`;
}).join("");
const fcItems = $$(".fc-item", flex);
const openFc = (el) => fcItems.forEach((it) => it.classList.toggle("open", it === el));
fcItems.forEach((it) => {
  it.addEventListener("pointerenter", (e) => e.pointerType === "mouse" && openFc(it));
  it.addEventListener("focus", () => openFc(it));
  it.addEventListener("click", () => it.classList.contains("open") ? openProject(it.dataset.k) : openFc(it));
  it.addEventListener("keydown", (e) => e.key === "Enter" && openProject(it.dataset.k));
});

/* ================= WORKS WHEEL ================= */
const wheel = $(".wheel"), info = $(".wheel-info");
const STEP = 32, RADIUS = 440; // ≈ card height / (2·tan(STEP/2)) so neighbours touch
const ringEl = document.createElement("div");
ringEl.className = "wheel-ring";
ringEl.innerHTML = wheelOrder.map((k, i) => `<div class="wheel-card" data-i="${i}" data-n="${String(i + 1).padStart(2, "0")}" data-t="${esc(projects[k].title.toUpperCase())}" style="transform:rotateX(${-i * STEP}deg) translateZ(${RADIUS}px)">${media(projects[k])}</div>`).join("");
wheel.appendChild(ringEl);
wheel.dataset.cursor = "DRAG";
const wCards = $$(".wheel-card", ringEl);
let pos = 0, target = 0, shown = -1;
const clampI = (v) => Math.max(0, Math.min(wheelOrder.length - 1, v));
const go = (i) => (target = clampI(i));
function showInfo(i) {
  if (i === shown) return;
  shown = i;
  info.classList.add("swap");
  setTimeout(() => {
    const p = projects[wheelOrder[i]];
    $(".wheel-idx").textContent = `${String(i + 1).padStart(2, "0")} / ${String(wheelOrder.length).padStart(2, "0")}`;
    $(".wheel-cat").textContent = p.cat;
    $(".wheel-title").textContent = p.title;
    $(".wheel-sub").textContent = p.sub;
    info.classList.remove("swap");
  }, 180);
  wCards.forEach((c, k) => c.classList.toggle("active", k === i));
}
(function spin() {
  pos += (target - pos) * 0.12;
  ringEl.style.transform = `translateZ(${-RADIUS}px) rotateX(${pos * STEP}deg)`;
  showInfo(Math.round(clampI(pos)));
  requestAnimationFrame(spin);
})();
let dragY = null, dragStart = 0, moved = false;
wheel.addEventListener("pointerdown", (e) => { dragY = e.clientY; dragStart = target; moved = false; wheel.setPointerCapture(e.pointerId); });
wheel.addEventListener("pointermove", (e) => {
  if (dragY === null) return;
  const dy = e.clientY - dragY;
  if (Math.abs(dy) > 4) moved = true;
  target = Math.max(-0.4, Math.min(wheelOrder.length - 0.6, dragStart - dy / 110));
});
wheel.addEventListener("pointerup", (e) => {
  if (dragY === null) return;
  dragY = null;
  if (!moved) {
    const card = document.elementsFromPoint(e.clientX, e.clientY).find((n) => n.classList?.contains("wheel-card"));
    if (card) +card.dataset.i === Math.round(pos) ? openProject(wheelOrder[+card.dataset.i]) : go(+card.dataset.i);
  }
  go(Math.round(target));
});
let wheelLock = 0;
wheel.addEventListener("wheel", (e) => {
  const next = clampI(Math.round(target) + Math.sign(e.deltaY));
  if (next === Math.round(target)) return; // at an end: let the page scroll
  e.preventDefault();
  if (Date.now() - wheelLock < 320) return;
  wheelLock = Date.now(); go(next);
}, { passive: false });
wheel.addEventListener("keydown", (e) => {
  if (e.key === "ArrowDown") { e.preventDefault(); go(Math.round(target) + 1); }
  if (e.key === "ArrowUp") { e.preventDefault(); go(Math.round(target) - 1); }
  if (e.key === "Enter") openProject(wheelOrder[Math.round(target)]);
});
$(".wheel-open").addEventListener("click", () => openProject(wheelOrder[Math.round(target)]));

/* ================= SERVICES ================= */
const svcs = $$(".svc");
const selectSvc = (i) => svcs.forEach((s, k) => s.classList.toggle("active", k === i));
svcs.forEach((s, i) => s.addEventListener("click", (e) => !e.target.closest("button") && selectSvc(i)));
$$(".disciplines a").forEach((a) => a.addEventListener("click", () => selectSvc(+a.dataset.svc)));

/* ================= MODALS ================= */
let lastFocus = null;
function openOverlay(el) {
  lastFocus = document.activeElement;
  el.classList.add("open"); el.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
  setTimeout(() => $("[data-close]", el).focus(), 50);
}
function closeOverlay(el) {
  el.classList.remove("open"); el.setAttribute("aria-hidden", "true");
  document.body.style.overflow = "";
  if (el.id === "modal") setTimeout(() => { if (!el.classList.contains("open")) $(".m-body", el).innerHTML = ""; }, 450); // stops the video
  lastFocus?.focus();
}
$$(".overlay").forEach((o) => {
  o.addEventListener("click", (e) => (e.target === o || e.target.closest("[data-close]")) && closeOverlay(o));
});
addEventListener("keydown", (e) => e.key === "Escape" && $$(".overlay.open").forEach(closeOverlay));

function openProject(k) {
  const p = projects[k], m = $("#modal");
  $("#m-cat").textContent = p.cat;
  $("#m-title").textContent = p.title;
  $(".m-body", m).innerHTML = `
    <div class="m-img">${media(p)}</div>
    <p>${esc(p.desc)}</p>
    ${p.hl ? `<div class="m-hl"><small>KEY HIGHLIGHTS</small>${esc(p.hl)}</div>` : ""}
    ${p.list ? `<div><h4>WHAT I BUILT</h4><ul>${p.list.map((l) => `<li>${esc(l)}</li>`).join("")}</ul></div>` : ""}
    <div><h4>TOOLS & TECH</h4><div class="chips">${p.tags.map((t) => `<span>${esc(t)}</span>`).join("")}</div></div>
    ${p.gallery ? `<div class="m-gallery">${p.gallery.map((g) => `<img src="${g}" alt="${esc(p.title)} image" loading="lazy">`).join("")}</div>` : ""}
    ${p.video ? `<div class="video"><iframe src="${p.video}" title="${esc(p.title)} trailer" allowfullscreen loading="lazy"></iframe></div>` : ""}
    <div class="m-links">
      ${p.link ? `<a class="btn-black" href="${p.link}" target="_blank" rel="noopener">${p.link.includes("github") ? "VIEW ON GITHUB" : "VISIT SITE"} ↗</a>` : ""}
      ${p.code ? `<a class="btn-line" href="${p.code}" target="_blank" rel="noopener">CODE ↗</a>` : ""}
    </div>`;
  openOverlay(m);
}

const cModal = $("#contact-modal"), form = $("#contact-form");
$$("[data-contact]").forEach((b) => b.addEventListener("click", (e) => {
  e.stopPropagation();
  if (b.dataset.contact) form.service.value = b.dataset.contact;
  openOverlay(cModal);
}));
form.addEventListener("submit", (e) => {
  e.preventDefault();
  const d = new FormData(form);
  const body = `${d.get("message")}\n\n— ${d.get("name")}`;
  location.href = `mailto:wesslatiyassine@gmail.com?subject=${encodeURIComponent(`[Portfolio] ${d.get("service")}`)}&body=${encodeURIComponent(body)}`;
  closeOverlay(cModal); form.reset();
  toast("Opening your mail app…");
});

/* ================= MISC ================= */
function toast(msg) {
  const t = $("#toast"); t.textContent = msg; t.classList.add("show");
  clearTimeout(toast.t); toast.t = setTimeout(() => t.classList.remove("show"), 2400);
}
$$("a[download]").forEach((a) => a.addEventListener("click", () => toast("Downloading resume…")));
$("#year").textContent = new Date().getFullYear();
