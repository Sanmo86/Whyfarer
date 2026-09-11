# Whyfarer

*A magazine of world curiosities.*

Why does blowing your nose in public embarrass people in Japan? Why does Bhutan track happiness instead of GDP? Why do Swedish offices stop everything for coffee, twice a day? Twenty-five customs from twenty-five countries, each one given an actual answer — not just a fun fact, the history and reasoning behind it.

🔗 **Live:** [whyfarer.vercel.app](https://whyfarer.vercel.app) · 🌐 English + Spanish, with a language switcher on every page.

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

- `tools/meta.js` — shared per-article data (slug, category, flag, image).
- `tools/content.en.js` / `tools/content.es.js` — the actual article text, per language.
- `tools/generate.js` — page templates, site strings, and the `SITE_URL` constant.

Then rebuild:

```bash
node tools/generate.js
```

To preview locally:

```bash
node tools/serve.js
# open http://localhost:8765
```

## Deploying

1. Update `SITE_URL` at the top of `tools/generate.js` to your real domain, then re-run `node tools/generate.js`.
2. Push to GitHub and import the repo on [vercel.com](https://vercel.com) — no build command needed (Framework Preset: "Other").
3. Submit `https://<your-domain>/sitemap.xml` in Google Search Console.

`tools/` is excluded from the deployed site via `.vercelignore` — it's dev-only.
