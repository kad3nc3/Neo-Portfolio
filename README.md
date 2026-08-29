# Neo Jedrick Belolo Portfolio

A React and Vite portfolio presenting selected projects through accessible screenshot case studies. The featured projects are R.M Mendezabal Construction Supplies Trading and Flexsol Storage Corp.

## Project structure

- `frontend/` contains the React portfolio, screenshot assets, tests, and Vite deployment configuration.
- `backend/` contains the optional Flask contact service and its tests.
- `QA_PATCHES.md` records the quality-assurance fixes and the reason for each patch.

## Run the frontend locally

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

## Run the optional backend locally

```powershell
Set-Location backend
py -3 -m venv .venv
.\.venv\Scripts\Activate.ps1
python -m pip install -r requirements.txt
python -m pytest -q
python app.py
```

Keep SMTP credentials in local or Vercel environment variables only. Never commit `.env`, passwords, API keys, or private inquiry data.

## Deployment and security

Set the Vercel project root to `frontend` so its `vercel.json`, `public/robots.txt`, Vite build, and static assets are used. The frontend configuration adds browser security headers and cooperative crawler rules without blocking normal employers. Enable Vercel Bot Protection in `Log` mode first to observe traffic without affecting visitors. Review the logs before adding a conservative managed challenge or rate limit.

`robots.txt` is advisory and is not access control. Vercel Bot Management and Firewall rules provide the deployment-level controls for automated traffic. Review `QA_PATCHES.md` before changing the contact form, security headers, screenshot viewer, or deployment settings.
