# BetterHealth website

This repository contains the BetterHealth website, separate from Curavita.

The site is a self-contained HTML/CSS/JavaScript page. For reliable transfer into GitHub, the source HTML is stored as compressed chunks under `site-parts/`; `scripts/build-site.mjs` reconstructs the page during deployment.

The current version includes the mobile timeline layout fix so process text remains in the readable content column on small screens.

## Deployment

A GitHub Actions workflow builds the site and publishes the finished `index.html` and `404.html` to the `gh-pages` branch.

## Before production publication

The page still contains content placeholders such as `to be confirmed`, `to be completed`, and `to be supplied`. Legal pages and final contact-form handling should also be completed before a production launch.

The interactive roadmap runs in the browser. Its optional AI-written reflection paragraph requires a separate server endpoint outside the original artifact environment.
