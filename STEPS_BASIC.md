# Fix Everything – Basic Step-by-Step Guide

Do these steps **in order**. Don’t skip any.

---

## PART 1: Backend on Render (so your API works)

### Step 1: Open Render and your backend service

1. Go to **https://render.com** and log in.
2. On the dashboard, click your **backend** service (the one that runs the Python/FastAPI app).
3. You should see tabs like **Dashboard**, **Logs**, **Environment**, etc.

---

### Step 2: Add environment variables (so the backend can start)

1. Click the **Environment** tab (left side).
2. You will add 3 variables one by one.

**Variable 1 – MONGO_URL**

- Click **Add Environment Variable** (or **+ Add**).
- In **Key**, type: `MONGO_URL`
- In **Value**, paste your **MongoDB connection string**.
  - If you don’t have it: go to **https://cloud.mongodb.com** → your cluster → **Connect** → **Connect your application** → copy the link (it looks like `mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/...`).
- Click **Save** (or **Add**).

**Variable 2 – DB_NAME**

- Click **Add Environment Variable** again.
- **Key:** `DB_NAME`
- **Value:** `vividexpense` (or the name you use for your database).
- Click **Save**.

**Variable 3 – JWT_SECRET**

- Click **Add Environment Variable** again.
- **Key:** `JWT_SECRET`
- **Value:** type any long random text, e.g. `mySecretKey123ChangeThis456`
- Click **Save**.

3. Make sure you see all three: **MONGO_URL**, **DB_NAME**, **JWT_SECRET**.
4. **Important:** If you see a variable named **CORS_ORIGINS**, **delete it** (use the trash icon). We don’t need it anymore.

---

### Step 3: Deploy the backend

1. After saving the environment variables, Render may ask to redeploy. If you see **Deploy** or **Save and Deploy**, click it.
2. If not: go to the **Dashboard** or **Deploy** tab and click **Manual Deploy** → **Deploy latest commit**.
3. Wait 2–5 minutes. At the top you should see status change to **Live** (green).
4. If it says **Failed**, click **Logs** and read the red error. Usually it means **MONGO_URL** or **DB_NAME** is wrong or missing – go back to Step 2 and fix it.

---

### Step 4: Check that the backend is working

1. Open a **new browser tab**.
2. In the address bar type: **https://vividexpense-7.onrender.com**
3. Press Enter.
4. You should see something like: `{"message":"VividExpense API",...}` (some JSON text).
5. If you see “This site can’t be reached” or “502 Bad Gateway”, the backend is not running – go back to Step 2 and Step 3, and check **Logs** on Render.

When Step 4 works, go to Part 2.

---

## PART 2: Frontend on Vercel (so your website talks to the backend)

### Step 5: Open Vercel and your frontend project

1. Go to **https://vercel.com** and log in.
2. Click your **project** (the one that has your React/frontend code – usually named something like **vividexpense** or **frontend**).
3. You should see **Deployments**, **Settings**, etc.

---

### Step 6: Add the backend URL (so the frontend knows where the API is)

1. Click **Settings** (top menu).
2. In the left sidebar, click **Environment Variables**.
3. Under **Key**, type: `REACT_APP_BACKEND_URL`
4. Under **Value**, type: `https://vividexpense-7.onrender.com`
   - Type it exactly. No space, no slash at the end.
5. Choose **Production** (and **Preview** if you want it for preview URLs too).
6. Click **Save**.

---

### Step 7: Set the root folder (if your code is inside a “frontend” folder)

1. Still in **Settings**.
2. In the left sidebar, click **General**.
3. Scroll to **Root Directory**.
4. If your React code is inside a folder named **frontend**, type: `frontend`
5. If your React code is in the main folder (no subfolder), leave this **empty**.
6. Click **Save** if you changed anything.

---

### Step 8: Redeploy the frontend (so it uses the new URL)

1. Click **Deployments** (top menu).
2. Find the **latest** deployment (first in the list).
3. Click the **three dots (⋯)** on the right of that row.
4. Click **Redeploy**.
5. Confirm **Redeploy**.
6. Wait 1–2 minutes until the status is **Ready**.

When Step 8 is done, go to Part 3.

---

## PART 3: Test that everything works

### Step 9: Open your website

1. Open a **new browser tab**.
2. Go to your app URL, e.g. **https://vividexpense-ns1d.vercel.app** (use the URL Vercel gave you).
3. You should see the VividSpend login/signup page.

---

### Step 10: Create an account

1. Click **“Sign up”** or **“Create account”** (if you’re on the login form).
2. Fill in:
   - **Full Name:** any name
   - **Email:** your email
   - **Password:** a password (e.g. 8+ characters)
3. Click **Create Account** (or **Sign up**).
4. You should be taken to the **dashboard** (no error message).

If you see **“Cannot reach server”** or **“CORS blocked”**:

- Go back to **Part 1** and make sure Step 4 works (backend URL opens and shows JSON).
- Make sure you did **Step 8** (Redeploy frontend) after adding **REACT_APP_BACKEND_URL**.

---

## Quick summary (what we did)

| Where   | What we did |
|--------|-------------|
| Render | Added MONGO_URL, DB_NAME, JWT_SECRET. Removed CORS_ORIGINS. Deployed. |
| Vercel | Added REACT_APP_BACKEND_URL = backend URL. Set root folder if needed. Redeployed. |
| You    | Opened the app and created an account to test. |

If any step fails, read the error message (or Render **Logs**) and fix that step before going to the next.
