# Whyfarer

*A magazine of world curiosities.*

Why does blowing your nose in public embarrass people in Japan? Why does Bhutan track happiness instead of GDP? Why do Swedish offices stop everything for coffee, twice a day? Twenty-five customs from twenty-five countries, each one given an actual answer — not just a fun fact, the history and reasoning behind it.

🔗 **Live:** [whyfarer.world](https://whyfarer.world) · 🌐 English + Spanish, with a language switcher on every page.

No ads, no tracking, no build step — just HTML, CSS, and a sprinkle of JS.

## Features

- **25 long-form articles** (~1,000 words each), fully bilingual with mirrored URLs (`/article-x.html` ↔ `/es/article-x.html`).
- **Editorial magazine design** — drop caps, pull quotes, a reading-progress bar, subtle scroll parallax — that still reads perfectly with JavaScript off.
- **Zero runtime dependencies**: plain HTML/CSS/JS. GSAP is loaded only for a couple of scroll effects.
- **SEO-ready out of the box**: canonical URLs, `hreflang` alternates between locales, an auto-generated `sitemap.xml`.
- **Content is data-driven** — articles live in a couple of JS files, not scattered across 56 hand-edited HTML pages.

## Structure

- `index.html`, `archive.html`, `article-*.html`, `credits.html` — English (root).
- `es/` — the same pages in Spanish.
- `styles.css`, `main.js`, `lib/` — shared styling and behavior.
- `assets/img/`, `assets/credits.json` — photography (Creative Commons, see `credits.html`).
- `sitemap.xml`, `robots.txt` — generated automatically, see below.

## Editing content

Don't edit the `.html` files by hand — they're generated. Edit the source instead:

- `tools/meta.js` — shared per-article data (slug, category, flag, hero image, sources).
- `tools/content.en.js` / `tools/content.es.js` — the article prose, per language (9 paragraphs, spread across H2 sections at generation time).
- `tools/tips.js` — the "What to Know If You Visit" practical tips + the related-article link pairing for each piece.
- `tools/inline-images.js` — the second, mid-article photo per piece.
- `tools/pages.js` — Privacy/Terms/About/Contact copy.
- `tools/generate.js` — page templates, section headings, site strings, and the `SITE_URL` constant.

Then rebuild:

```bash
npm run generate
# or: node tools/generate.js
```

To preview locally:

```bash
npm run serve
# open http://localhost:8765
```

To re-optimize images after adding new ones (resizes to 1400px max width, re-encodes at quality 78 — install `npm install` first, `jimp` is a dev-only tool, never shipped):

```bash
npm run optimize-images
```

## Deploying

1. Update `SITE_URL` at the top of `tools/generate.js` to your real domain, then re-run `node tools/generate.js`.
2. Push to GitHub and import the repo on [vercel.com](https://vercel.com) — no build command needed (Framework Preset: "Other").
3. Submit `https://<your-domain>/sitemap.xml` in Google Search Console.

`tools/` is excluded from the deployed site via `.vercelignore` — it's dev-only.
