# SkillBridge

SkillBridge connects academic potential to industry opportunities using explainable skill mapping, gap analysis, targeted learning paths, and role-aware collaboration.

## Stack

- React + Vite frontend, deployable on Vercel
- Express + Mongoose API, deployable on Render
- MongoDB Atlas for persistent users, role profiles, skills, opportunities, applications, and recommendations

## Product surfaces

- Student: readiness, skill profile, learning path, opportunity matches, and applications
- Industry: opportunity authoring, requirements, candidate discovery, and shortlisting
- Institution: cohort readiness, skill gap analytics, and industry engagement
- Faculty: student monitoring, mentorship, and collaboration requests

## Local development

```powershell
cd backend
Copy-Item .env.example .env
npm install
npm run dev
```

In another terminal:

```powershell
cd frontend
npm install
npm run dev
```

Open `http://localhost:5173`. Full deployment guidance is in [frontend](frontend/README.md) and [backend](backend/README.md).
