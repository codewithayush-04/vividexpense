# Fix CORS + Auth – Step-by-step checklist

Follow these in order. After each section, test before moving on.

---

## 1. Backend on Render

### 1.1 Environment variables (required)

In **Render** → your **backend** service → **Environment**:

| Key         | Value (example) |
|------------|------------------|
| `MONGO_URL` | Your MongoDB Atlas connection string, e.g. `mongodb+srv://user:pass@cluster.mongodb.net/?retryWrites=true&w=majority` |
| `DB_NAME`   | Database name, e.g. `vividexpense` |
| `JWT_SECRET`| A long random string (e.g. generate one online) |

- Do **not** set `CORS_ORIGINS` (backend now allows all origins by default).
- Save after adding/editing.

### 1.2 Deploy latest code

- Push your code to GitHub (so Render has the CORS middleware and auth fixes).
- In Render → **Manual Deploy** → **Deploy latest commit** (or let auto-deploy run).
- Wait until status is **Live** (not "Building" or "Failed").

### 1.3 Check backend is up

- Open in browser: **https://vividexpense-7.onrender.com**
  - You should see: `{"message":"VividExpense API",...}`
- Open: **https://vividexpense-7.onrender.com/api/health**
  - You should see: `{"status":"ok"}`
- If you see 502 / 503 / "Application failed to start":
  - Go to **Logs** and fix the error (usually missing `MONGO_URL` or `DB_NAME`).

---

## 2. Frontend on Vercel

### 2.1 Environment variable

In **Vercel** → your **frontend** project → **Settings** → **Environment Variables**:

| Key                     | Value |
|-------------------------|--------|
| `REACT_APP_BACKEND_URL` | `https://vividexpense-7.onrender.com` |

- No trailing slash.
- Apply to **Production** (and **Preview** if you use it).
- Save.

### 2.2 Root directory

- **Settings** → **General** → **Root Directory**: set to **`frontend`** (if you have a monorepo).
- Save.

### 2.3 Redeploy

- **Deployments** → **⋯** on latest deployment → **Redeploy**.
- Redeploy is required after changing env vars so the new URL is baked into the build.

---

## 3. Test the full flow

1. Open your app: **https://vividexpense-ns1d.vercel.app** (or your Vercel URL).
2. Go to **Sign up**.
3. Fill name, email, password → **Create Account**.
4. You should be logged in and see the dashboard (no “backend may be down or CORS blocked”).

If it still fails:

- **Browser**: DevTools → **Network** → click the red/failed request:
  - **URL** should be `https://vividexpense-7.onrender.com/api/auth/register` or `.../login`.
  - **Status**: 502/503 → backend not running (check Render Logs and env).
  - **Status**: (blocked) or CORS error in Console → backend not sending CORS (ensure you deployed the latest backend code).
- **Render** → **Logs**: confirm no crash and that requests are received.

---

## 4. Local development (optional)

- **Backend** `.env`: `MONGO_URL`, `DB_NAME`, `JWT_SECRET` (same as Render).
- **Frontend** `.env`: `REACT_APP_BACKEND_URL=http://localhost:8000`.
- Run backend: `cd backend && python -m uvicorn server:app --reload --port 8000`.
- Run frontend: `cd frontend && npm start` (or `yarn start`).

---

## Quick reference

| Issue                          | What to do |
|--------------------------------|------------|
| "Backend may be down or CORS"  | 1) Render env: `MONGO_URL`, `DB_NAME`. 2) Redeploy backend. 3) Vercel env: `REACT_APP_BACKEND_URL`. 4) Redeploy frontend. |
| 502 on Render                  | Set `MONGO_URL` and `DB_NAME`; check Logs for errors. |
| CORS error in browser          | Redeploy backend (so CORS middleware is live); do not set `CORS_ORIGINS` on Render. |
| Wrong backend URL             | Set `REACT_APP_BACKEND_URL` on Vercel and redeploy frontend. |
