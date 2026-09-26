# BetterHealth website

A bilingual, static website for BetterHealth, separate from Curavita. The 19 English pages and their German equivalents cover individual enquiries, approach, assessment, corporate services, the stress and burnout workshop, an education hub, science, three articles, courses, short explainers, about, FAQ, contact, privacy, legal and a reflection tool.

## Edit and build

- `src/pages.mjs`: page content, route map and shared content components. English/German pairs sit together.
- `public/assets/site.css`: responsive design and print styles.
- `public/assets/site.js`: navigation, article filters, email preparation, sharing and reflection tool.
- `scripts/build-site.mjs`: generates real HTML pages, page metadata, language links, a sitemap and a real 404 page into `dist/`.
- `site-parts/`: archived compressed source from the former one-page site, retained for reference; no longer used by the build.

Requires Node 20+. Run `npm run build`. There are no production dependencies. The existing GitHub Actions workflow publishes `dist/` to the `gh-pages` branch when `main` changes. Hosting remains at https://hendrivi.github.io/betterhealth-new-website/ .

The base path and public origin are set at the top of `scripts/build-site.mjs`; update these and the legacy bookmark routing in `site.js` if hosting changes.

## Enquiries

The contact form prepares an email locally. It **does not submit to a server**. After validation, the visitor reviews the draft and chooses to open their email application or copy the text. No success message claims delivery. The existing `hello@betterhealth.ch` address is retained from the previous site; the owner must verify that the mailbox is controlled and monitored. Corporate calls to action preselect the corporate enquiry fields. No form entries are saved by the application, and the reflection tool does not transmit answers.

## Content requiring owner confirmation

- Full legal entity name, postal address, responsible person and applicable registration information. The legal page explicitly identifies these as pending; it is not a completed legal-compliance sign-off.
- Names, roles and verified credentials of professionals delivering clinical services. Unverified personal credentials have not been published.
- Inbox availability; any preferred scheduling provider, confirmed fees and response expectations.
- Official social profile URLs and confirmed course dates/curriculum. These are not fabricated; self-paced courses are labelled as in development.

Privacy text describes this static website's actual implementation. Service data handling, retention and provider identity need to be completed before sensitive information is collected or clinical services are contracted. The site deliberately asks for a short general enquiry rather than medical records.

## Checks

Run `npm run build`, serve `dist` under `/betterhealth-new-website/` at port 4173, then run `npm run check:site` with Playwright installed and its Chromium browser available. Set `TEST_ORIGIN` to change the test origin. The check covers all 38 pages, internal links, metadata, desktop/mobile overflow, navigation without JavaScript, filtering, FAQs, reflection state and the enquiry flow. Screenshots and the report are written to ignored `test-results/`.

A convenient preview server: `npm run preview` (http://127.0.0.1:4173/betterhealth-new-website/).
