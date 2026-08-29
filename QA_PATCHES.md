# QA and Patch Notes

## Current checkpoint

The portfolio was tested from the supplied `neo-portfolio.zip`. The temporary live preview remains available during development. The real Flexsol project link remains `https://flexsolstoragecorp.com/`.

## Verified fixes

### Contact form

`frontend/src/components/ContactForm.jsx` now requires a meaningful email address. Values such as `hi` are rejected before the mailto workflow starts. The component keeps the existing direct-email behavior, adds accessible inline feedback, encodes the generated mailto URL, and does not send a real message during automated tests.

`backend/app.py` now validates email syntax server-side, rejects non-JSON requests with HTTP 415, rejects oversized requests with HTTP 413, rejects unsupported methods with HTTP 405, returns generic delivery errors, and adds API response security headers. SMTP credentials remain environment-only.

### Project preview

`frontend/src/components/ProjectSlideshow.jsx` replaces the blocked iframe with local optimized screenshots. It provides previous and next controls, a counter, thumbnail buttons, a lightbox, keyboard support, accessible labels, and Escape-to-close behavior. The code contains comments describing the iframe and keyboard QA fixes.

### Profile interaction

`frontend/src/components/Navbar.jsx` now locks the portrait that is actually visible when clicked, instead of reversing the hover state. The change is documented in the component.

### Resume link

The original verified one-page PDF in `frontend/public/Neo_Jedrick_Belolo_Resume.pdf` is retained. Both resume links point to that existing asset.

### Preview development

`frontend/vite.config.js` includes a development-only allowlist for the temporary preview hostname. It does not change production access control.

## QA results

Five frontend Vitest tests pass. Twelve backend Pytest tests pass. The Vite production build passes. Python syntax checks pass. Local HTTP checks returned HTTP 200 for the homepage, resume PDF, desktop screenshots, and mobile screenshots. Source hygiene checks found no iframe, old Flexsol Vercel URL, temporary resume path, or public secret-like asset.

The lightbox was verified to open with `role=dialog` and an accessible label, and Escape closes it. Submitting the live form with `hi` displayed the inline valid-email error without opening an email client.

## Remaining operational items

The temporary preview is for review only. Deploy the final frontend through the existing GitHub and Vercel workflow after reviewing the changes. If the backend is deployed separately, configure SMTP variables and `CORS_ORIGINS` in the deployment environment only. Do not commit `.env` or credentials.

A screenshot slideshow is a presentation layer, not a substitute for testing the live project. The live Flexsol button remains available so employers can inspect the real deployed website.
## RMMendezabal project addition

RMMendezabal is now the first project case study. The supplied stack is displayed exactly as React.js, Python, HTML, and CSS. Its live link is `https://www.rmmendezabal.com/`. The slideshow uses separate desktop and 390px mobile homepage captures. The captured subpage URLs returned Vercel 404 pages, so those invalid captures were removed rather than presented as project screenshots.

The RMMendezabal assets are WebP files below 500 KB. The Flexsol assets remain separate desktop and mobile captures with desktop dimensions of 1440px wide and mobile dimensions of 390px wide, preventing mobile screenshots from being mislabeled as desktop views.

## Portfolio security follow-up

The Vite frontend now includes `frontend/vercel.json` with CSP, HSTS, clickjacking, MIME-sniffing, referrer, permissions, and cross-origin headers. `frontend/public/robots.txt` provides cooperative crawler guidance while keeping normal public pages crawlable. The root `.gitignore` now excludes environment files, local overrides, dependencies, caches, logs, editor files, and archives while allowing the safe `.env.example` template.

These code-level controls reduce common exposure but do not replace Vercel Bot Management or Firewall rules. Enable Vercel Bot Protection in `Log` mode first to monitor without affecting visitors. Add a conservative managed challenge or rate limit only after reviewing traffic. AI bot blocking is optional and should be chosen based on whether search visibility from AI crawlers is desired.

## Final requested functional updates

Both project slideshows now contain homepage-only WebP captures: one desktop view and one mobile view per project. The old `Homepage and company introduction` caption has been removed and replaced with simple `Desktop view` and `Mobile view` labels. Each asset remains below 500 KB.

RMMendezabal displays the supplied stack `React.js, Python, HTML, CSS` and the tools and deployment field `VS Code, Git, GitHub`. Its live link remains `https://www.rmmendezabal.com/`.

The social icon and contact profile link now open `https://www.linkedin.com/in/neo-jedrick-belolo-5668093b5/` in a new tab. The profile image no longer changes on hover. It changes only after a deliberate click or tap and exposes `aria-pressed` state for accessibility and mobile QA.
