# SkillBridge API

Express and MongoDB API for SkillBridge, designed for deployment on Render. Feature modules own the Mongoose models and routes for their domain.

## Local setup

```powershell
cd backend
npm install
Copy-Item .env.example .env
npm run dev
```

Set `MONGODB_URI` to a MongoDB Atlas connection string. Without it, the health and pure matching endpoints still work in demo mode; database-backed endpoints need MongoDB.

## API starter endpoints

- `GET /health`
- `POST /api/v1/auth/register`
- `POST /api/v1/auth/login`
- `GET|POST /api/v1/opportunities`
- `POST /api/v1/matches/analyze`
- `GET /api/v1/dashboard/overview`

## Deploy on Render

Create a Web Service with `backend` as its root directory, `npm install` as its build command, and `npm start` as its start command. Set `MONGODB_URI`, `JWT_SECRET`, `CLIENT_URL`, and `NODE_ENV=production` in Render environment variables.
