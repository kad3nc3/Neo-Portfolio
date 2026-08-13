# Neo Jedrick Belolo — Full-Stack Portfolio

A recruiter-focused, one-page portfolio built with React, JavaScript, Tailwind CSS, Framer Motion, Python, and Flask. The Flask backend sends contact-form messages by email and stores no data.

## Project structure

```text
neo-portfolio/
├── frontend/   React portfolio and downloadable résumé
├── backend/    Flask contact API and tests
├── resume/     Editable HTML source for the résumé
└── README.md
```

## Requirements

- Node.js and npm
- Python 3.11 or newer
- Git
- Visual Studio Code

## Run locally in VS Code

1. Extract the ZIP and open the `neo-portfolio` folder in VS Code.
2. Open **Terminal → New Terminal**.
3. Set up the Flask backend:

```powershell
cd backend
python -m venv .venv
.\.venv\Scripts\Activate.ps1
python -m pip install -r requirements-dev.txt
Copy-Item .env.example .env
python app.py
```

If PowerShell blocks activation, run the backend without activating:

```powershell
.\.venv\Scripts\python.exe app.py
```

4. Open a second terminal and start React:

```powershell
cd frontend
npm install
npm run dev
```

If PowerShell blocks `npm`, use `npm.cmd install` and `npm.cmd run dev`.

5. Open the local address printed by Vite, normally `http://localhost:5173`.

## Configure the contact form

The form works through SMTP. Open `backend/.env` and replace the sample values:

```dotenv
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASSWORD=your-app-password
SMTP_FROM=your-email@gmail.com
CONTACT_TO=Neojedrick@gmail.com
CORS_ORIGINS=http://localhost:5173,http://127.0.0.1:5173
```

Use an app-specific password or SMTP credential from your email provider; do not use your normal account password. Never commit `.env`. The included `.gitignore` excludes it.

Without SMTP settings, the site still runs and provides a direct email link, but form submission returns a configuration message.

## Tests and production build

Backend tests:

```powershell
cd backend
.\.venv\Scripts\python.exe -m pytest -q
```

Frontend tests and build:

```powershell
cd frontend
npm.cmd test
npm.cmd run build
```

## Publish the source code to GitHub

Publishing the repository makes your code visible on your GitHub profile. It does not put the complete Flask application online.

1. Sign in to [GitHub](https://github.com/) as `kad3nc3`.
2. Create a new public repository named `neo-fullstack-portfolio`.
3. Leave **README**, **.gitignore**, and **license** unchecked because this project already contains a README and `.gitignore`.
4. In the VS Code terminal, run these commands from the extracted `neo-portfolio` folder:

```powershell
git init
git add .
git commit -m "feat: add full-stack developer portfolio"
git branch -M main
git remote add origin https://github.com/kad3nc3/neo-fullstack-portfolio.git
git remote -v
git push -u origin main
```

5. Refresh the repository page and confirm the source appears. Check that `.env`, `.venv`, and `node_modules` are absent.
6. When you make changes later:

```powershell
git add .
git commit -m "describe the portfolio update"
git push
```

Official reference: [Adding locally hosted code to GitHub](https://docs.github.com/en/migrations/importing-source-code/using-the-command-line-to-import-source-code/adding-locally-hosted-code-to-github).

## Hosting later

GitHub Pages hosts static frontend files and does not run Python/Flask. To put the full site online later, deploy the React build to a static host and the Flask API to a Python-capable host, then configure the frontend API URL and CORS origin.

Official reference: [Creating a GitHub Pages site](https://docs.github.com/en/pages/getting-started-with-github-pages/creating-a-github-pages-site).

## Before applying for internships

- Push the finished project to GitHub.
- Replace the project link with the exact repository URL after publishing.
- Add a short repository description and relevant topics such as `react`, `flask`, and `portfolio`.
- Pin the repository on your GitHub profile.
- Test the résumé link and contact form from another device before sharing the site.

