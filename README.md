# Whyfarer

A magazine of world curiosities — 25 cultural customs explained, in English and Spanish. Static HTML/CSS/JS, no framework, no build step.

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
