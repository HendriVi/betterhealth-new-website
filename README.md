# BetterHealth

A multi-page version of the original BetterHealth website. The approved one-page source is preserved in `src/original-site.html`. The build reuses its typography, charcoal/cream/teal palette, diamond logo, sections and interactive tools. Corporate education and the education hub use the same design.

Run `npm install`, `npm run build`, and `npm run preview`. Run `npm run check:site` with the preview running and Playwright Chromium installed. CI checks both languages, internal links, mobile layout and visitor interactions before publishing `dist` to GitHub Pages.

Education does not invent blog posts, social profiles, course dates, testimonials or credentials. Enquiries open the visitor's email client; the site does not submit form data. The roadmap runs locally without AI services.
