// tools/generate.js
// Dev-only Node tool: zips meta.js + content.en.js + content.es.js and writes
// the final static .html files — English at the project root, Spanish under /es/.
// Not shipped as a runtime dependency of the site itself.
'use strict';

const fs = require('fs');
const path = require('path');
const { META } = require('./meta.js');
const { INLINE_IMAGES } = require('./inline-images.js');
const { TIPS, LINKS } = require('./tips.js');
const { ARTICLES_EN } = require('./content.en.js');
const { ARTICLES_ES } = require('./content.es.js');
const { PAGES } = require('./pages.js');

const ROOT = path.join(__dirname, '..');
const V = '20260913b'; // cache-buster — bump on every deploy

// ⚠️ UPDATE THIS after your first deploy (real Vercel URL or custom domain),
// then run `node tools/generate.js` again and redeploy. Used for canonical
// links, hreflang alternates, sitemap.xml and Open Graph absolute URLs.
const SITE_URL = 'https://whyfarer.world';

// Paste the content="..." value Google Search Console gives you for the
// "HTML tag" verification method (leave empty to skip). Re-run generate.js
// after setting it. Alternative: use the "HTML file" method instead — just
// drop the googleXXXXX.html file Search Console gives you straight into the
// project root, no code change needed.
const GOOGLE_SITE_VERIFICATION = '';

// Google Analytics 4 Measurement ID (format "G-XXXXXXXXXX"), from
// analytics.google.com → Admin → Data Streams → your web stream.
// Leave empty to skip — no GA code is emitted at all until this is set.
const GA_MEASUREMENT_ID = 'G-MQCCZQD50Q';

function escHTML(s) {
  return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) {
    return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
  });
}
// Escapes HTML then turns markdown-style *word* emphasis into <em>word</em>
// (used for foreign-language terms embedded in the prose: *meiwaku*, *fika*...).
function escInline(s) {
  return escHTML(s).replace(/\*([^*]+)\*/g, '<em>$1</em>');
}

function zip(contentArr) {
  return META.map(function (m, i) { return Object.assign({}, m, contentArr[i]); });
}

const CATEGORY_ORDER = ['europe', 'asia', 'americas', 'africa'];

const STRINGS = {
  en: {
    htmlLang: 'en',
    brand: 'WHYFARER',
    tagline: 'A magazine of world curiosities',
    desc: 'Twenty-five customs, beliefs, and cultural quirks from around the world, explained calmly: why they exist, and what they reveal about the people who live them.',
    categories: { europe: 'Europe', asia: 'Asia', americas: 'Americas', africa: 'Africa' },
    navHome: 'Home', navArchive: 'Archive',
    issue: 'Issue No. 1 · 2026', issueSub: '25 customs · 25 countries',
    coverStory: 'Cover story',
    heroTitlePlain: 'The world has its reasons.', heroTitleEm: 'We tell them.',
    startWith: 'Start with:', readFirst: 'Read the first why', seeArchive: 'See the full archive',
    the25kicker: 'The 25 whys',
    sectionHeadTitle: 'Customs that someone, somewhere, finds perfectly normal',
    sectionHeadDek: 'Organized by continent. Each one is a door into why the world works differently depending on where you stand.',
    ctaPlain: 'Prefer to explore', ctaEm: 'by country?',
    ctaDek: 'The full archive gathers all 25 customs grouped by continent, ready to browse like a magazine.',
    goToArchive: 'Go to the archive',
    minRead: 'read',
    byline: 'WHYFARER Editors',
    photoBy: 'Photo:', licensedUnder: 'licensed under CC', seeOriginal: 'See original ↗',
    aboutBlurb: 'About WHYFARER. We’re a digital magazine dedicated to explaining, unhurried and without judgment, the customs that make every corner of the world different. We publish a new why every week.',
    sourcesHeading: 'Sources',
    h2Opening: `What's Really Going On`, h2Origin: 'Where This Comes From', h2Beyond: 'Beyond the Basics',
    h2Tips: 'What to Know If You Visit', h2Closing: 'The Bigger Picture',
    relatedIntro: `Curious how nearby cultures handle similar rules? Don't miss our pieces on`,
    relatedAnd: 'and',
    keepReading: 'Keep reading',
    archiveKicker: 'Full archive',
    archiveTitle: 'All 25 customs, country by country',
    archiveDek: 'From a Norwegian fjord’s thaw to a smashed plate in a Greek taverna: this is how the whole world explains its own unwritten rules.',
    articlesWord: function (n) { return n === 1 ? 'article' : 'articles'; },
    creditsKicker: 'Transparency',
    creditsTitle: 'Photo credits',
    creditsDek: 'Every photograph on WHYFARER comes from Openverse and is published under a Creative Commons license. Thanks to every author for sharing their work.',
    footerTagline: 'A magazine of world curiosities. Twenty-five whys, told calmly, one country at a time.',
    footerSections: 'Sections', footerMagazine: 'Magazine',
    footerHome: 'Home', footerArchive: 'Full archive', footerCredits: 'Photo credits',
    copyright: '© 2026 WHYFARER. Editorial content for informational purposes.',
    photosNote: 'Photographs under Creative Commons license — see',
    creditsLinkWord: 'credits',
    skipLink: 'Skip to content',
    openMenu: 'Open menu', closeMenu: 'Close menu',
    langLabel: 'Language',
    footerLegal: 'Legal',
    footerAbout: 'About', footerContact: 'Contact', footerPrivacy: 'Privacy Policy', footerTerms: 'Terms of Use',
    cookieMsg: 'We use cookies to keep Whyfarer running smoothly and, where enabled, to show relevant ads.',
    cookieAccept: 'Got it', cookieLearnMore: 'Privacy Policy'
  },
  es: {
    htmlLang: 'es',
    brand: 'WHYFARER',
    tagline: 'Revista de curiosidades culturales del mundo',
    desc: 'Veinticinco costumbres, creencias y rarezas culturales del mundo, explicadas con calma: por qué existen y qué dicen de quienes las viven.',
    categories: { europe: 'Europa', asia: 'Asia', americas: 'América', africa: 'África' },
    navHome: 'Inicio', navArchive: 'Archivo',
    issue: 'Edición N.º 1 · 2026', issueSub: '25 costumbres · 25 países',
    coverStory: 'Historia de portada',
    heroTitlePlain: 'El mundo tiene sus razones.', heroTitleEm: 'Nosotros las contamos.',
    startWith: 'Empieza por:', readFirst: 'Leer el primer porqué', seeArchive: 'Ver el archivo completo',
    the25kicker: 'Los 25 porqués',
    sectionHeadTitle: 'Costumbres que alguien, en algún lugar, encuentra perfectamente normales',
    sectionHeadDek: 'Organizadas por continente. Cada una es una puerta a por qué el mundo funciona distinto según dónde te pares.',
    ctaPlain: '¿Prefieres explorar', ctaEm: 'por país?',
    ctaDek: 'El archivo completo reúne las 25 costumbres agrupadas por continente, listas para hojear como una revista.',
    goToArchive: 'Ir al archivo',
    minRead: 'de lectura',
    byline: 'Redacción WHYFARER',
    photoBy: 'Foto:', licensedUnder: 'licencia CC', seeOriginal: 'Ver original ↗',
    aboutBlurb: 'Sobre WHYFARER. Somos una revista digital dedicada a explicar, sin prisa y sin prejuicio, las costumbres que hacen distinto a cada rincón del mundo. Publicamos un nuevo porqué cada semana.',
    sourcesHeading: 'Fuentes',
    h2Opening: 'Qué está pasando realmente', h2Origin: 'De dónde viene todo esto', h2Beyond: 'Más allá de lo básico',
    h2Tips: 'Qué debes saber si viajas', h2Closing: 'El panorama completo',
    relatedIntro: '¿Tienes curiosidad por saber cómo culturas cercanas manejan reglas parecidas? No te pierdas nuestros artículos sobre',
    relatedAnd: 'y',
    keepReading: 'Sigue leyendo',
    archiveKicker: 'Archivo completo',
    archiveTitle: 'Las 25 costumbres, país por país',
    archiveDek: 'Del deshielo de un fiordo noruego al plato roto de una taberna griega: así explica el mundo entero sus propias reglas no escritas.',
    articlesWord: function (n) { return n === 1 ? 'artículo' : 'artículos'; },
    creditsKicker: 'Transparencia',
    creditsTitle: 'Créditos de imágenes',
    creditsDek: 'Todas las fotografías de WHYFARER provienen de Openverse y se publican bajo licencia Creative Commons. Gracias a cada autor y autora por compartir su trabajo.',
    footerTagline: 'Revista de curiosidades culturales del mundo. Veinticinco porqués, contados con calma, un país a la vez.',
    footerSections: 'Secciones', footerMagazine: 'Revista',
    footerHome: 'Portada', footerArchive: 'Archivo completo', footerCredits: 'Créditos de imágenes',
    copyright: '© 2026 WHYFARER. Contenido editorial con fines informativos.',
    photosNote: 'Fotografías bajo licencia Creative Commons — ver',
    creditsLinkWord: 'créditos',
    skipLink: 'Saltar al contenido',
    openMenu: 'Abrir menú', closeMenu: 'Cerrar menú',
    langLabel: 'Idioma',
    footerLegal: 'Legal',
    footerAbout: 'Acerca de', footerContact: 'Contacto', footerPrivacy: 'Política de Privacidad', footerTerms: 'Términos de Uso',
    cookieMsg: 'Usamos cookies para que Whyfarer funcione bien y, cuando estén activas, para mostrar anuncios relevantes.',
    cookieAccept: 'Entendido', cookieLearnMore: 'Política de Privacidad'
  }
};

const LOCALES = {
  en: { code: 'en', assetPrefix: '', outDir: ROOT, articles: zip(ARTICLES_EN), s: STRINGS.en },
  es: { code: 'es', assetPrefix: '../', outDir: path.join(ROOT, 'es'), articles: zip(ARTICLES_ES), s: STRINGS.es }
};

function bySlug(loc, slug) { return loc.articles.find(function (a) { return a.slug === slug; }); }

/* ---------------------------------------------------------------- */
/* HEAD / HEADER / FOOTER / SCRIPTS                                  */
/* ---------------------------------------------------------------- */

// Google Analytics 4, wired to Google's Consent Mode v2: analytics_storage
// (and the ad_* signals, unused here but required by the API) default to
// "denied" until the visitor accepts our cookie banner — checked synchronously
// against localStorage so a returning visitor who already accepted doesn't
// get a flash of denied-then-granted. See main.js `initCookieBanner`, which
// calls `gtag('consent','update', ...)` on click.
function gaSnippet() {
  if (!GA_MEASUREMENT_ID) return '';
  const id = escHTML(GA_MEASUREMENT_ID);
  return `<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){ dataLayer.push(arguments); }
  (function () {
    var granted = false;
    try { granted = localStorage.getItem('wf-cookie-consent') === 'accepted'; } catch (e) {}
    var state = granted ? 'granted' : 'denied';
    gtag('consent', 'default', { ad_storage: state, ad_user_data: state, ad_personalization: state, analytics_storage: state });
  })();
</script>
<script async src="https://www.googletagmanager.com/gtag/js?id=${id}"></script>
<script>
  gtag('js', new Date());
  gtag('config', '${id}');
</script>`;
}

function head(loc, opts) {
  const s = loc.s;
  const ap = loc.assetPrefix;
  const title = escHTML(opts.title);
  const desc = escHTML(opts.desc || s.desc);
  const heroImg = opts.heroImage ? ap + opts.heroImage : '';
  const preload = heroImg
    ? `<link rel="preload" as="image" href="${heroImg}" fetchpriority="high">`
    : '';

  let seoLinks = '';
  if (opts.filename) {
    const enURL = SITE_URL + '/' + opts.filename;
    const esURL = SITE_URL + '/es/' + opts.filename;
    const canonical = loc.code === 'en' ? enURL : esURL;
    seoLinks = `<link rel="canonical" href="${canonical}">
<link rel="alternate" hreflang="en" href="${enURL}">
<link rel="alternate" hreflang="es" href="${esURL}">
<link rel="alternate" hreflang="x-default" href="${enURL}">
<meta property="og:url" content="${canonical}">`;
  }

  return `<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
${gaSnippet()}
<title>${title}</title>
<meta name="description" content="${desc}">
<meta name="color-scheme" content="light">
${GOOGLE_SITE_VERIFICATION ? `<meta name="google-site-verification" content="${escHTML(GOOGLE_SITE_VERIFICATION)}">` : ''}
<meta property="og:title" content="${title}">
<meta property="og:description" content="${desc}">
<meta property="og:type" content="${opts.ogType || 'website'}">
<meta property="og:site_name" content="${escHTML(s.brand)}">
${opts.heroImage ? `<meta property="og:image" content="${SITE_URL}/${opts.heroImage}">` : ''}
<meta name="twitter:card" content="summary_large_image">
${seoLinks}
${preload}
<link rel="icon" href="${ap}assets/favicon.svg" type="image/svg+xml">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,400;0,9..144,600;0,9..144,700;1,9..144,500;1,9..144,600&family=Source+Serif+4:ital,opsz,wght@0,8..60,400;0,8..60,500;0,8..60,600;1,8..60,400;1,8..60,500&family=Inter:wght@400;500;600;700&display=swap">
<link rel="stylesheet" href="${ap}styles.css?v=${V}">`;
}

// filename -> href to the SAME page in the OTHER locale
function otherLocaleHref(loc, filename) {
  return loc.code === 'en' ? 'es/' + filename : '../' + filename;
}

function navList(loc, active) {
  const s = loc.s;
  const items = [
    { href: 'index.html', label: s.navHome, key: 'home' },
    { href: 'archive.html#europe', label: s.categories.europe, key: 'europe' },
    { href: 'archive.html#asia', label: s.categories.asia, key: 'asia' },
    { href: 'archive.html#americas', label: s.categories.americas, key: 'americas' },
    { href: 'archive.html#africa', label: s.categories.africa, key: 'africa' },
    { href: 'archive.html', label: s.navArchive, key: 'archive' }
  ];
  return items.map(function (it) {
    const cls = 'nav-link' + (it.key === active ? ' is-active' : '');
    return `<a class="${cls}" href="${it.href}">${it.label}</a>`;
  }).join('\n        ');
}

function langSwitch(loc, filename) {
  const s = loc.s;
  const otherHref = otherLocaleHref(loc, filename);
  const isEn = loc.code === 'en';
  return `<div class="lang-switch" aria-label="${s.langLabel}">
        <a class="lang-link${isEn ? ' is-active' : ''}" href="${isEn ? '#' : otherHref}"${isEn ? ' aria-current="true"' : ''}>EN</a>
        <span class="lang-sep">/</span>
        <a class="lang-link${!isEn ? ' is-active' : ''}" href="${!isEn ? '#' : otherHref}"${!isEn ? ' aria-current="true"' : ''}>ES</a>
      </div>`;
}

function header(loc, active, filename) {
  const s = loc.s;
  return `<a class="skip-link" href="#main">${s.skipLink}</a>
  <header class="masthead" data-masthead>
    <div class="container masthead-bar">
      <a href="index.html" class="brand"><span>${s.brand}</span><span class="brand-dot">·</span></a>
      <nav class="masthead-nav" aria-label="Main">
        <div class="nav-list">
        ${navList(loc, active)}
        </div>
        ${langSwitch(loc, filename)}
        <button class="nav-toggle" aria-label="${s.openMenu}" aria-expanded="false" aria-controls="mobile-nav">
          <span class="bar"></span>
        </button>
      </nav>
    </div>
  </header>
  <div class="mobile-nav" id="mobile-nav">
    <div class="container mobile-nav-head">
      <a href="index.html" class="brand"><span>${s.brand}</span><span class="brand-dot">·</span></a>
      <button class="mobile-nav-close nav-toggle" aria-label="${s.closeMenu}"><span class="bar"></span></button>
    </div>
    <nav class="container mobile-nav-list" aria-label="Mobile">
      ${navList(loc, active)}
      ${langSwitch(loc, filename)}
    </nav>
  </div>`;
}

function footer(loc) {
  const s = loc.s;
  const cats = CATEGORY_ORDER.map(function (c) {
    return `<li><a class="nav-link" href="archive.html#${c}">${s.categories[c]}</a></li>`;
  }).join('\n          ');
  return `<footer class="site-footer">
    <div class="container">
      <div class="footer-top">
        <div class="footer-brand">
          <p class="brand"><span>${s.brand}</span><span class="brand-dot">·</span></p>
          <p>${s.footerTagline}</p>
        </div>
        <div class="footer-col">
          <h3>${s.footerSections}</h3>
          <ul>
          ${cats}
          </ul>
        </div>
        <div class="footer-col">
          <h3>${s.footerMagazine}</h3>
          <ul>
            <li><a class="nav-link" href="index.html">${s.footerHome}</a></li>
            <li><a class="nav-link" href="archive.html">${s.footerArchive}</a></li>
            <li><a class="nav-link" href="credits.html">${s.footerCredits}</a></li>
            <li><a class="nav-link" href="about.html">${s.footerAbout}</a></li>
            <li><a class="nav-link" href="contact.html">${s.footerContact}</a></li>
          </ul>
        </div>
        <div class="footer-col">
          <h3>${s.footerLegal}</h3>
          <ul>
            <li><a class="nav-link" href="privacy.html">${s.footerPrivacy}</a></li>
            <li><a class="nav-link" href="terms.html">${s.footerTerms}</a></li>
          </ul>
        </div>
      </div>
      <div class="footer-bottom">
        <p>${s.copyright}</p>
        <p>${s.photosNote} <a href="credits.html">${s.creditsLinkWord}</a>.</p>
      </div>
    </div>
  </footer>`;
}

function cookieBanner(loc) {
  const s = loc.s;
  return `<div class="cookie-banner" id="cookie-banner" hidden>
    <div class="container cookie-banner-inner">
      <p>${s.cookieMsg} <a href="privacy.html">${s.cookieLearnMore}</a></p>
      <button class="btn btn-primary" id="cookie-accept">${s.cookieAccept}</button>
    </div>
  </div>`;
}

function scripts(loc) {
  const ap = loc.assetPrefix;
  return `<script defer src="${ap}lib/gsap.min.js"></script>
  <script defer src="${ap}lib/ScrollTrigger.min.js"></script>
  <script defer src="${ap}main.js?v=${V}"></script>`;
}

function page(loc, opts) {
  return `<!doctype html>
<html lang="${loc.s.htmlLang}" class="no-js">
<head>
${head(loc, opts)}
</head>
<body>
  ${opts.body}
  ${cookieBanner(loc)}
  ${scripts(loc)}
</body>
</html>
`;
}

function write(loc, filename, html) {
  const dir = loc.outDir;
  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(path.join(dir, filename), html);
}

/* ---------------------------------------------------------------- */
/* CARD COMPONENTS                                                   */
/* ---------------------------------------------------------------- */

function card(loc, a) {
  const ap = loc.assetPrefix;
  return `<li>
          <a class="card reveal" href="article-${a.slug}.html">
            <div class="card-media">
              <img src="${ap}${a.hero}" alt="${escHTML(a.alt)}" loading="lazy" decoding="async">
              <span class="card-flag" aria-hidden="true">${a.flag}</span>
            </div>
            <div class="card-body">
              <p class="kicker">${escHTML(a.kicker)}</p>
              <h3 class="card-title">${escHTML(a.title)}</h3>
              <p class="card-dek">${escInline(a.dek)}</p>
              <p class="card-foot meta-row"><span>${escHTML(a.readTime)} ${loc.s.minRead}</span></p>
            </div>
          </a>
        </li>`;
}

function archiveRow(loc, a) {
  const ap = loc.assetPrefix;
  return `<li>
        <a class="archive-row reveal" href="article-${a.slug}.html">
          <div class="archive-row-media"><img src="${ap}${a.hero}" alt="${escHTML(a.alt)}" loading="lazy" decoding="async"></div>
          <div>
            <p class="kicker">${a.flag} ${escHTML(a.country)}</p>
            <h3 class="archive-row-title">${escHTML(a.title)}</h3>
            <p class="archive-row-dek">${escInline(a.dek)}</p>
            <p class="meta-row"><span>${escHTML(a.readTime)} ${loc.s.minRead}</span></p>
          </div>
        </a>
      </li>`;
}

/* ---------------------------------------------------------------- */
/* INDEX                                                              */
/* ---------------------------------------------------------------- */

function buildIndex(loc) {
  const s = loc.s;
  const ap = loc.assetPrefix;
  const feature = bySlug(loc, 'japan-nose-blowing');

  const groups = CATEGORY_ORDER.map(function (cat, i) {
    const items = loc.articles.filter(function (a) { return a.category === cat; });
    return `<h3 class="department-heading">${s.categories[cat]} <span aria-hidden="true">(${items.length})</span></h3>
        <ul class="grid-articles${i === 0 ? ' first-group' : ''}">
        ${items.map(function (a) { return card(loc, a); }).join('\n        ')}
        </ul>`;
  }).join('\n        ');

  const body = `${header(loc, 'home', 'index.html')}
  <main id="main">
    <div class="issue-strip"><div class="container"><span>${s.issue}</span><span>${s.issueSub}</span></div></div>

    <section class="hero-article">
      <div class="hero-media hero-parallax"><img src="${ap}${feature.hero}" alt="${escHTML(feature.alt)}" fetchpriority="high"></div>
      <div class="hero-inner container">
        <p class="kicker">${s.coverStory}</p>
        <h1>${s.heroTitlePlain} <em>${s.heroTitleEm}</em></h1>
        <p class="dek">${s.desc}</p>
        <p class="meta-row">${s.startWith} ${feature.flag} ${escHTML(feature.title)}</p>
        <div class="hero-actions">
          <a class="btn btn-primary" href="article-${feature.slug}.html">${s.readFirst} <span class="btn-arrow">→</span></a>
          <a class="btn btn-ghost" href="archive.html">${s.seeArchive}</a>
        </div>
      </div>
    </section>

    <section class="section">
      <div class="container">
        <div class="section-head reveal">
          <div>
            <p class="kicker">${s.the25kicker}</p>
            <h2>${s.sectionHeadTitle}</h2>
          </div>
          <p class="dek">${s.sectionHeadDek}</p>
        </div>
        ${groups}
      </div>
    </section>

    <section class="cta-band reveal">
      <div class="container">
        <h2>${s.ctaPlain} <em>${s.ctaEm}</em></h2>
        <p class="dek">${s.ctaDek}</p>
        <a class="btn btn-primary" href="archive.html">${s.goToArchive} <span class="btn-arrow">→</span></a>
      </div>
    </section>
  </main>
  ${footer(loc)}`;

  write(loc, 'index.html', page(loc, {
    title: `${s.brand} — ${s.tagline}`,
    desc: s.desc,
    heroImage: feature.hero,
    filename: 'index.html',
    body
  }));
}

/* ---------------------------------------------------------------- */
/* ARTICLE PAGES                                                     */
/* ---------------------------------------------------------------- */

function relatedFor(loc, a) {
  const sameCat = loc.articles.filter(function (x) { return x.category === a.category && x.slug !== a.slug; });
  const others = loc.articles.filter(function (x) { return x.category !== a.category; });
  const picks = sameCat.slice(0, 2);
  let i = 0;
  while (picks.length < 3 && i < others.length) { picks.push(others[i]); i++; }
  return picks.slice(0, 3);
}

function renderBody(loc, a) {
  const s = loc.s;
  const ap = loc.assetPrefix;
  const p = a.content.map(function (para, idx) {
    const cls = idx === 0 ? ' class="lede"' : '';
    return `<p${cls}>${escInline(para)}</p>`;
  });

  const pullHTML = `<blockquote class="pull-quote">${escInline(a.pullQuote)}</blockquote>`;
  const datoHTML = `<aside class="dato-box"><span class="glyph" aria-hidden="true">✦</span><p><strong>${a.factLabel}</strong> ${escInline(a.fact)}</p></aside>`;

  const inline = INLINE_IMAGES[a.slug];
  const imgHTML = inline
    ? `<figure class="inline-figure"><img src="${ap}${inline.file}" alt="${escHTML(inline.alt[loc.code])}" loading="lazy" decoding="async"></figure>`
    : '';

  // --- "What to know if you visit" section: genuinely practical content ---
  const tipData = TIPS[loc.code][a.slug];
  const tipsHTML = tipData
    ? `<p>${escInline(tipData.intro)}</p>
      <ul class="tips-list">
      ${tipData.tips.map(function (t) { return `<li>${escInline(t)}</li>`; }).join('\n      ')}
      </ul>`
    : '';

  // --- Related-articles sentence: real contextual internal links ---
  const linkSlugs = LINKS[a.slug] || [];
  let relatedHTML = '';
  if (linkSlugs.length === 2) {
    const l1 = bySlug(loc, linkSlugs[0]);
    const l2 = bySlug(loc, linkSlugs[1]);
    if (l1 && l2) {
      relatedHTML = `<p class="in-article-links">${escHTML(s.relatedIntro)} <a href="article-${l1.slug}.html">${escHTML(l1.title)}</a> ${escHTML(s.relatedAnd)} <a href="article-${l2.slug}.html">${escHTML(l2.title)}</a>.</p>`;
    }
  }

  return [
    `<h2>${escHTML(s.h2Opening)}</h2>`,
    p[0], p[1], p[2],
    pullHTML,
    `<h2>${escHTML(s.h2Origin)}</h2>`,
    p[3], p[4],
    datoHTML,
    `<h2>${escHTML(s.h2Beyond)}</h2>`,
    p[5], p[6], p[7],
    imgHTML,
    `<h2>${escHTML(s.h2Tips)}</h2>`,
    tipsHTML,
    `<h2>${escHTML(s.h2Closing)}</h2>`,
    p[8],
    relatedHTML
  ].filter(Boolean).join('\n      ');
}

function renderSources(loc, a) {
  if (!a.sources || !a.sources.length) return '';
  const items = a.sources.map(function (src) {
    return `<li><a href="${escHTML(src.url)}" target="_blank" rel="noopener noreferrer">${escHTML(src.title)}</a> — ${escHTML(src.publisher)}</li>`;
  }).join('\n          ');
  return `<div class="sources-box">
          <h2>${loc.s.sourcesHeading}</h2>
          <ul>
          ${items}
          </ul>
        </div>`;
}

function buildArticle(loc, a) {
  const s = loc.s;
  const ap = loc.assetPrefix;
  const creditId = a.hero.match(/([a-z]+)\.jpg$/)[1];
  const credit = require('../assets/credits.json')[creditId];
  const related = relatedFor(loc, a);
  a.factLabel = loc.code === 'en' ? 'Fun fact.' : 'Dato curioso.';

  const body = `${header(loc, a.category, `article-${a.slug}.html`)}
  <div class="progress-bar" aria-hidden="true"></div>
  <main id="main">
    <article>
      <div class="article-hero">
        <p class="kicker">${escHTML(a.kicker)}</p>
        <h1>${escHTML(a.title)}</h1>
        <p class="dek">${escInline(a.dek)}</p>
        <p class="meta-row"><span>${s.byline}</span><span class="dot"></span><span>${escHTML(a.readTime)} ${s.minRead}</span><span class="dot"></span><span>${a.flag} ${escHTML(a.country)}</span></p>
      </div>
      <figure class="article-hero-figure">
        <div class="hero-parallax photo-frame">
          <img src="${ap}${a.hero}" alt="${escHTML(a.alt)}" fetchpriority="high">
        </div>
        ${credit ? `<figcaption><span>${s.photoBy} ${escHTML(credit.creator)}, ${s.licensedUnder} ${escHTML((credit.license || '').toUpperCase())} ${escHTML(credit.license_version || '')}</span><a href="${escHTML(credit.foreign_landing_url)}" target="_blank" rel="noopener noreferrer">${s.seeOriginal}</a></figcaption>` : ''}
      </figure>

      <div class="container">
        <div class="article-body">
          ${renderBody(loc, a)}
        </div>
        <div class="article-foot">
          ${renderSources(loc, a)}
          <p class="about-blurb">${s.aboutBlurb}</p>
        </div>
      </div>
    </article>

    <section class="section is-tight">
      <div class="container">
        <h2 class="related-heading reveal">${s.keepReading}</h2>
        <ul class="grid-articles reveal">
        ${related.map(function (r) { return card(loc, r); }).join('\n        ')}
        </ul>
      </div>
    </section>
  </main>
  ${footer(loc)}`;

  write(loc, `article-${a.slug}.html`, page(loc, {
    title: `${a.title} — ${s.brand}`,
    desc: a.dek,
    heroImage: a.hero,
    ogType: 'article',
    filename: `article-${a.slug}.html`,
    body
  }));
}

/* ---------------------------------------------------------------- */
/* ARCHIVE                                                            */
/* ---------------------------------------------------------------- */

function buildArchive(loc) {
  const s = loc.s;
  const sections = CATEGORY_ORDER.map(function (cat) {
    const items = loc.articles.filter(function (a) { return a.category === cat; })
      .slice()
      .sort(function (x, y) { return x.country.localeCompare(y.country, loc.code); });
    return `<div class="archive-section" id="${cat}">
        <div class="archive-section-head reveal">
          <h2>${s.categories[cat]}</h2>
          <span class="count">${items.length} ${s.articlesWord(items.length)}</span>
        </div>
        <ul>
        ${items.map(function (a) { return archiveRow(loc, a); }).join('\n        ')}
        </ul>
      </div>`;
  }).join('\n      ');

  const pills = CATEGORY_ORDER.map(function (cat) {
    return `<a class="pill" href="#${cat}">${s.categories[cat]}</a>`;
  }).join('\n          ');

  const body = `${header(loc, 'archive', 'archive.html')}
  <main id="main">
    <div class="container archive-head">
      <p class="kicker">${s.archiveKicker}</p>
      <h1>${s.archiveTitle}</h1>
      <p class="dek">${s.archiveDek}</p>
    </div>
    <div class="archive-nav">
      <div class="container pill-row">
        ${pills}
      </div>
    </div>
    <div class="container">
      ${sections}
    </div>
  </main>
  ${footer(loc)}`;

  write(loc, 'archive.html', page(loc, {
    title: `${s.archiveTitle} — ${s.brand}`,
    desc: s.archiveDek,
    filename: 'archive.html',
    body
  }));
}

/* ---------------------------------------------------------------- */
/* CREDITS                                                            */
/* ---------------------------------------------------------------- */

function buildCredits(loc) {
  const s = loc.s;
  const credits = require('../assets/credits.json');
  const rows = Object.keys(credits).map(function (id) {
    const c = credits[id];
    return `<div class="credits-row">
        <span>${escHTML(c.title)} — ${escHTML(c.creator)}</span>
        <span><a href="${escHTML(c.license_url)}" target="_blank" rel="noopener noreferrer">CC ${escHTML((c.license || '').toUpperCase())} ${escHTML(c.license_version || '')}</a> · <a href="${escHTML(c.foreign_landing_url)}" target="_blank" rel="noopener noreferrer">${s.seeOriginal}</a></span>
      </div>`;
  }).join('\n      ');

  const body = `${header(loc, '', 'credits.html')}
  <main id="main">
    <div class="container archive-head">
      <p class="kicker">${s.creditsKicker}</p>
      <h1>${s.creditsTitle}</h1>
      <p class="dek">${s.creditsDek}</p>
    </div>
    <div class="container credits-list">
      ${rows}
    </div>
  </main>
  ${footer(loc)}`;

  write(loc, 'credits.html', page(loc, {
    title: `${s.creditsTitle} — ${s.brand}`,
    desc: s.creditsDek,
    filename: 'credits.html',
    body
  }));
}

/* ---------------------------------------------------------------- */
/* STATIC PAGES (privacy / terms / about / contact)                  */
/* ---------------------------------------------------------------- */

const STATIC_PAGE_KEYS = ['about', 'contact', 'privacy', 'terms'];

function renderDocSections(sections) {
  return sections.map(function (sec) {
    const heading = sec.h ? `<h2>${escHTML(sec.h)}</h2>` : '';
    // Section paragraphs already contain hand-written <a>/<em> tags — trusted
    // static copy (not user input), so it's inserted as-is rather than escaped.
    const paras = sec.p.map(function (p) { return `<p>${p}</p>`; }).join('\n      ');
    return `${heading}\n      ${paras}`;
  }).join('\n      ');
}

function buildStaticPage(loc, key) {
  const s = loc.s;
  const data = PAGES[loc.code][key];

  const extra = key === 'contact'
    ? `<p class="contact-cta"><a class="btn btn-primary" href="mailto:${data.email}">${data.emailCta} <span class="btn-arrow">→</span></a></p>`
    : '';

  const body = `${header(loc, '', `${data.slug}.html`)}
  <main id="main">
    <div class="container archive-head">
      <p class="kicker">${escHTML(data.kicker)}</p>
      <h1>${escHTML(data.title)}</h1>
      <p class="dek">${escHTML(data.dek)}</p>
      ${data.meta ? `<p class="doc-meta">${escHTML(data.meta)}</p>` : ''}
    </div>
    <div class="container">
      <div class="doc-body">
        ${renderDocSections(data.sections)}
        ${extra}
      </div>
    </div>
  </main>
  ${footer(loc)}`;

  write(loc, `${data.slug}.html`, page(loc, {
    title: `${data.title} — ${s.brand}`,
    desc: data.dek,
    filename: `${data.slug}.html`,
    body
  }));
}

/* ---------------------------------------------------------------- */
/* SITEMAP + ROBOTS                                                   */
/* ---------------------------------------------------------------- */

function buildSitemapAndRobots() {
  const filenames = ['index.html', 'archive.html', 'credits.html', 'about.html', 'contact.html', 'privacy.html', 'terms.html']
    .concat(META.map(function (m) { return `article-${m.slug}.html`; }));

  const today = new Date().toISOString().slice(0, 10);

  const urlEntries = [];
  filenames.forEach(function (filename) {
    const enURL = SITE_URL + '/' + filename;
    const esURL = SITE_URL + '/es/' + filename;
    [{ loc: enURL }, { loc: esURL }].forEach(function (entry) {
      urlEntries.push(`  <url>
    <loc>${entry.loc}</loc>
    <lastmod>${today}</lastmod>
    <xhtml:link rel="alternate" hreflang="en" href="${enURL}"/>
    <xhtml:link rel="alternate" hreflang="es" href="${esURL}"/>
    <xhtml:link rel="alternate" hreflang="x-default" href="${enURL}"/>
  </url>`);
    });
  });

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${urlEntries.join('\n')}
</urlset>
`;
  fs.writeFileSync(path.join(ROOT, 'sitemap.xml'), sitemap);

  const robots = `User-agent: *
Allow: /

Sitemap: ${SITE_URL}/sitemap.xml
`;
  fs.writeFileSync(path.join(ROOT, 'robots.txt'), robots);
}

/* ---------------------------------------------------------------- */

['en', 'es'].forEach(function (code) {
  const loc = LOCALES[code];
  buildIndex(loc);
  loc.articles.forEach(function (a) { buildArticle(loc, a); });
  buildArchive(loc);
  buildCredits(loc);
  STATIC_PAGE_KEYS.forEach(function (key) { buildStaticPage(loc, key); });
});

buildSitemapAndRobots();

console.log('Generated EN (root) + ES (/es) — index, archive, credits + ' + META.length + ' articles each.');
console.log('Generated sitemap.xml + robots.txt for ' + SITE_URL);
