# Neo Jedrick Belolo Portfolio

Personal portfolio for **Neo Jedrick Belolo**, an aspiring full-stack web developer and BS Information Technology student specializing in Web and Mobile Applications.

The portfolio presents freelance and personal work through responsive project case studies, optimized homepage screenshots, technical details, contact actions, and a downloadable resume.

## Featured projects

- **R.M. Mendezabal Construction Supplies Trading Website**
  - Live website: https://www.rmmendezabal.com/
  - React.js, Python, HTML, CSS
- **Flexsol Storage Corp. Website**
  - Live website: https://flexsolstoragecorp.com/
  - Flask, Jinja, Python, HTML, CSS, JavaScript

## Technologies and tools

React, Vite, Tailwind CSS, JavaScript, HTML, CSS, Python, Flask, Jinja, REST API fundamentals, Git, GitHub, VS Code, npm, Vitest, Pytest, Vercel, responsive QA, WebP image optimization, and mobile-first layout.

## Project structure

```text
frontend/    React and Vite portfolio, assets, tests, and deployment files
backend/     Optional Flask contact service and tests
resume/      Source HTML for the downloadable resume
QA_PATCHES.md
.gitignore
```

## Run the frontend

From the project root:

```powershell
Set-Location frontend
npm install
npm run dev
```

Open the local URL printed by Vite. Run the frontend tests and production build with:

```powershell
npm test -- --run
npm run build
```

## Run the optional backend

From the project root:

```powershell
Set-Location backend
py -3 -m venv .venv
.\.venv\Scripts\Activate.ps1
python -m pip install -r requirements.txt
python -m pytest -q
python app.py
```

Keep email credentials in environment variables. Copy `backend/.env.example` to a local `.env` file and fill in the values locally. Never commit `.env`, passwords, API keys, or private inquiry data.

## Deployment and security

Set the Vercel project root to `frontend`. The frontend contains the Vite configuration, public assets, resume PDF, `robots.txt`, and `vercel.json` security headers.

The deployed configuration includes Content Security Policy, HSTS, clickjacking protection, MIME-sniffing protection, referrer controls, browser permission restrictions, and cross-origin policies. The backend applies request-size limits, contact validation, CORS restrictions, safe error responses, and API response headers.

`robots.txt` is guidance for cooperative crawlers, not access control. Use your hosting provider’s firewall, bot protection, rate limiting, and environment-variable settings for deployment-level protection.
