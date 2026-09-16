# BetterHealth website

One self-contained page: `index.html`. HTML, CSS and JavaScript are all in that single file — nothing to build, bundle, or npm install. Open it directly in a browser, or upload it as-is to any static host, including GitHub Pages.

`information-architecture.md` is the planning document behind the page's structure and copy sequence.

## Before this goes live

Search the page for `to be confirmed`, `to be completed`, and `to be supplied` for remaining content placeholders. The contact form currently opens the visitor's mail app with a prefilled message. Legal pages still need to be added before production publication.

## Interactive roadmap

The roadmap logic itself runs entirely in the browser. The optional AI-written reflection paragraph needs a separate server endpoint on a normal website because `window.claude` only exists inside a Claude artifact. Search `var ROADMAP_ENDPOINT=""` in `index.html` when that backend is ready.

## Deployment

This repository deploys the static site to the `gh-pages` branch via GitHub Actions. The main source file is `index.html`.
