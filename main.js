/* main.js — WHYFARER
   IIFE clásico, sin módulos. Cada init está aislado con safe(). */
(function () {
  "use strict";

  var $  = function (sel, scope) { return (scope || document).querySelector(sel); };
  var $$ = function (sel, scope) { return Array.prototype.slice.call((scope || document).querySelectorAll(sel)); };
  var reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
  var fineHover = matchMedia("(hover: hover) and (pointer: fine)").matches;

  function safe(fn, name) {
    try { fn(); } catch (e) { console.warn("[" + name + "]", e); }
  }

  /* Swap no-js -> js as early as possible so .reveal defensive CSS applies correctly */
  document.documentElement.classList.remove("no-js");
  document.documentElement.classList.add("js");

  /* --- Masthead: solidify on scroll --- */
  function initMasthead() {
    var head = $(".masthead");
    if (!head) return;
    var onScroll = function () {
      if (window.scrollY > 8) head.classList.add("is-scrolled");
      else head.classList.remove("is-scrolled");
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
  }

  /* --- Mobile nav toggle --- */
  function initMobileNav() {
    var toggle = $(".nav-toggle");
    var panel = $(".mobile-nav");
    var closeBtn = $(".mobile-nav-close");
    if (!toggle || !panel) return;
    function open() {
      panel.classList.add("is-open");
      toggle.setAttribute("aria-expanded", "true");
      document.body.style.overflow = "hidden";
    }
    function close() {
      panel.classList.remove("is-open");
      toggle.setAttribute("aria-expanded", "false");
      document.body.style.overflow = "";
    }
    toggle.addEventListener("click", function () {
      panel.classList.contains("is-open") ? close() : open();
    });
    if (closeBtn) closeBtn.addEventListener("click", close);
    $$("a", panel).forEach(function (a) { a.addEventListener("click", close); });
  }

  /* --- Reveal on scroll (IntersectionObserver + safety timeout) --- */
  function initReveals() {
    var items = $$(".reveal");
    if (!items.length) return;

    if (!window.IntersectionObserver) {
      items.forEach(function (el) { el.classList.add("is-visible"); });
      return;
    }

    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.05, rootMargin: "0px 0px -40px 0px" });

    items.forEach(function (el) { io.observe(el); });

    /* Safety net: reveal anything still hidden after 6s (fonts slow, observer edge-cases) */
    setTimeout(function () {
      items.forEach(function (el) { el.classList.add("is-visible"); });
    }, 6000);
  }

  /* --- Reading progress bar (article pages only) --- */
  function initProgressBar() {
    var bar = $(".progress-bar");
    var article = $(".article-body");
    if (!bar || !article) return;
    var ticking = false;
    function update() {
      var rect = article.getBoundingClientRect();
      var total = rect.height - window.innerHeight * 0.5;
      var scrolled = -rect.top;
      var pct = total > 0 ? Math.min(100, Math.max(0, (scrolled / total) * 100)) : 0;
      bar.style.width = pct + "%";
      ticking = false;
    }
    window.addEventListener("scroll", function () {
      if (!ticking) {
        window.requestAnimationFrame(update);
        ticking = true;
      }
    }, { passive: true });
    update();
  }

  /* --- Subtle parallax on hero media (GSAP, max ~24px) --- */
  function initHeroParallax() {
    var media = $(".hero-parallax");
    if (!media || reduced) return;
    if (!(window.gsap && window.ScrollTrigger)) return;
    gsap.to(media, {
      yPercent: 8,
      ease: "none",
      scrollTrigger: {
        trigger: media.closest("section, .article-hero-figure") || media,
        start: "top top",
        end: "bottom top",
        scrub: 0.4
      }
    });
  }

  /* --- Card tilt on hover (fine pointer only, very subtle) --- */
  function initCardTilt() {
    if (!fineHover || reduced) return;
    $$(".card").forEach(function (card) {
      card.addEventListener("mousemove", function (e) {
        var r = card.getBoundingClientRect();
        var x = (e.clientX - r.left) / r.width - 0.5;
        var y = (e.clientY - r.top) / r.height - 0.5;
        card.style.transform = "perspective(900px) rotateX(" + (-y * 3.5) + "deg) rotateY(" + (x * 3.5) + "deg) translateY(-3px)";
      });
      card.addEventListener("mouseleave", function () {
        card.style.transform = "";
      });
    });
  }

  /* --- Archive category pills: smooth-scroll + active state (progressive enhancement) --- */
  function initArchiveFilter() {
    var pills = $$(".archive-nav .pill");
    if (!pills.length) return;
    pills.forEach(function (pill) {
      pill.addEventListener("click", function (e) {
        var href = pill.getAttribute("href");
        if (!href || href.charAt(0) !== "#") return;
        var target = $(href);
        if (!target) return;
        e.preventDefault();
        var top = target.getBoundingClientRect().top + window.scrollY - 130;
        window.scrollTo({ top: top, behavior: reduced ? "auto" : "smooth" });
        pills.forEach(function (p) { p.classList.remove("is-active"); });
        pill.classList.add("is-active");
      });
    });
  }

  /* --- View Transitions on internal navigation --- */
  function initViewTransitions() {
    if (!document.startViewTransition) return;
    document.addEventListener("click", function (e) {
      var a = e.target.closest && e.target.closest("a[href]");
      if (!a) return;
      var url;
      try { url = new URL(a.href, location.href); } catch (err) { return; }
      if (url.origin !== location.origin) return;
      if (a.target === "_blank" || a.hasAttribute("download")) return;
      if (url.pathname === location.pathname && url.hash) return;
      e.preventDefault();
      document.startViewTransition(function () { location.href = a.href; });
    });
  }

  /* --- Cookie consent banner ---
     Purely informational for now (no ad/analytics script reads this yet).
     When Google AdSense/Analytics is added, gate those <script> tags on
     `localStorage.getItem("wf-cookie-consent") === "accepted"` (or load
     them unconditionally for strictly-necessary-only setups — check current
     policy before wiring this up for real). */
  function initCookieBanner() {
    var KEY = "wf-cookie-consent";
    var banner = $("#cookie-banner");
    var acceptBtn = $("#cookie-accept");
    if (!banner || !acceptBtn) return;
    try {
      if (localStorage.getItem(KEY) === "accepted") return;
    } catch (e) { /* localStorage unavailable (private mode etc.) — show banner anyway */ }
    banner.hidden = false;
    acceptBtn.addEventListener("click", function () {
      try { localStorage.setItem(KEY, "accepted"); } catch (e) {}
      banner.hidden = true;
    });
  }

  function boot() {
    safe(initMasthead, "initMasthead");
    safe(initMobileNav, "initMobileNav");
    safe(initReveals, "initReveals");
    safe(initProgressBar, "initProgressBar");
    safe(initCardTilt, "initCardTilt");
    safe(initArchiveFilter, "initArchiveFilter");
    safe(initViewTransitions, "initViewTransitions");
    safe(initCookieBanner, "initCookieBanner");

    if (window.gsap && window.ScrollTrigger) {
      try { gsap.registerPlugin(ScrollTrigger); } catch (_) {}
      safe(initHeroParallax, "initHeroParallax");
    }

    document.documentElement.classList.add("is-ready");
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", boot);
  } else {
    boot();
  }
})();
