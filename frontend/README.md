# SkillBridge Frontend

React + Vite single-page application for deployment on Vercel.

## Local setup

```powershell
npm install
npm run dev
```

Open `http://localhost:5173`. Set `VITE_API_URL` from `.env.example` when connecting to the Express API.

## Source map

- `components/`: shared shell, skill map, and opportunity UI
- `pages/`: Student, Industry, Institution, and Faculty workspaces
- `services/`: API, authentication, and matching clients
- `context/`, `hooks/`, `utils/`, `routes/`: frontend platform concerns
- `assets/`: local images, typography, and visual assets

## Deploy on Vercel

Import the repository and set `frontend` as the Root Directory. Vercel detects Vite; use `npm run build` and publish `dist`. Set `VITE_API_URL` to the deployed Render API URL plus `/api/v1`.
