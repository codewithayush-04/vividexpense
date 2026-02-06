# ⚡ Quick Start: Deploy to Render

## 🚀 Fastest Way (Using Blueprint)

1. **Push your code to GitHub/GitLab/Bitbucket**

2. **Go to [Render Dashboard](https://dashboard.render.com)**

3. **Click "New +" → "Blueprint"**

4. **Connect your repository**

5. **Render will auto-detect `render.yaml` and create both services**

6. **Set Environment Variables:**

   **Backend:**
   - `MONGO_URL` - Your MongoDB connection string
   - `DB_NAME` - Database name (e.g., `vividexpense`)
   - `JWT_SECRET` - Random secret (Render can generate this)
   - `CORS_ORIGINS` - Your frontend URL (set after frontend deploys)

   **Frontend:**
   - `REACT_APP_BACKEND_URL` - Your backend URL (e.g., `https://vividexpense-backend.onrender.com`)

7. **After both services deploy, update `CORS_ORIGINS` in backend with your frontend URL**

8. **Done! 🎉**

## 📝 Manual Setup (Alternative)

See [DEPLOYMENT.md](./DEPLOYMENT.md) for detailed manual setup instructions.

## 🔗 What Gets Created

- **Backend Service**: FastAPI server running on Python
- **Frontend Service**: React app served as static files

Both services will auto-deploy on every git push to your main branch.
