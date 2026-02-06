# 🚀 Deployment Guide for Render

This guide will help you deploy the Vived Expense application to Render.

## 📋 Prerequisites

1. A [Render](https://render.com) account (free tier available)
2. A MongoDB database (MongoDB Atlas recommended)
3. Git repository (GitHub, GitLab, or Bitbucket)

## 🔧 Step 1: Prepare Your MongoDB Database

1. Create a MongoDB Atlas account at [mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas)
2. Create a new cluster (free tier available)
3. Create a database user and note the credentials
4. Whitelist IP addresses (or use `0.0.0.0/0` for Render)
5. Get your connection string (format: `mongodb+srv://username:password@cluster.mongodb.net/`)

## 🌐 Step 2: Deploy Backend Service

### Option A: Using render.yaml (Recommended)

1. Push your code to GitHub/GitLab/Bitbucket
2. Go to [Render Dashboard](https://dashboard.render.com)
3. Click "New +" → "Blueprint"
4. Connect your repository
5. Render will automatically detect `render.yaml` and create both services

### Option B: Manual Setup

1. Go to [Render Dashboard](https://dashboard.render.com)
2. Click "New +" → "Web Service"
3. Connect your repository
4. Configure the backend service:
   - **Name**: `vividexpense-backend`
   - **Environment**: `Python 3`
   - **Build Command**: `pip install -r backend/requirements.txt`
   - **Start Command**: `cd backend && uvicorn server:app --host 0.0.0.0 --port $PORT`
   - **Root Directory**: Leave empty (or set to root)

5. Add Environment Variables:
   ```
   MONGO_URL=mongodb+srv://username:password@cluster.mongodb.net/
   DB_NAME=vividexpense
   JWT_SECRET=<generate-a-random-secret-key>
   CORS_ORIGINS=https://your-frontend-url.onrender.com
   ```

6. Click "Create Web Service"
7. Note the backend URL (e.g., `https://vividexpense-backend.onrender.com`)

## 🎨 Step 3: Deploy Frontend Service

1. In Render Dashboard, click "New +" → "Web Service"
2. Connect the same repository
3. Configure the frontend service:
   - **Name**: `vividexpense-frontend`
   - **Environment**: `Node`
   - **Build Command**: `cd frontend && npm install && npm run build`
   - **Start Command**: `cd frontend && npx serve -s build -l $PORT`
   - **Root Directory**: Leave empty

4. Add Environment Variable:
   ```
   REACT_APP_BACKEND_URL=https://vividexpense-backend.onrender.com
   ```

5. Click "Create Web Service"
6. Note the frontend URL

## 🔄 Step 4: Update CORS Settings

1. Go back to your backend service settings
2. Update the `CORS_ORIGINS` environment variable:
   ```
   CORS_ORIGINS=https://vividexpense-frontend.onrender.com
   ```
3. Save and redeploy

## ✅ Step 5: Verify Deployment

1. Visit your frontend URL
2. Try registering a new user
3. Test adding expenses
4. Check backend logs in Render dashboard for any errors

## 🔐 Environment Variables Reference

### Backend (.env)
```bash
MONGO_URL=mongodb+srv://username:password@cluster.mongodb.net/
DB_NAME=vividexpense
JWT_SECRET=your-random-secret-key-here
CORS_ORIGINS=https://your-frontend-url.onrender.com
```

### Frontend (.env)
```bash
REACT_APP_BACKEND_URL=https://your-backend-url.onrender.com
```

## 🐛 Troubleshooting

### Backend Issues

- **Connection refused**: Check MongoDB connection string and IP whitelist
- **Port errors**: Render automatically sets `$PORT`, ensure your start command uses it
- **Import errors**: Verify all dependencies are in `requirements.txt`

### Frontend Issues

- **API calls failing**: Check `REACT_APP_BACKEND_URL` is set correctly
- **Build fails**: Check Node version compatibility (use Node 18.x)
- **CORS errors**: Update `CORS_ORIGINS` in backend to include frontend URL

### General Tips

- Check Render logs for detailed error messages
- Ensure environment variables are set correctly
- Wait for builds to complete before testing
- Free tier services spin down after inactivity - first request may be slow

## 📝 Notes

- Free tier services on Render may take 30-60 seconds to wake up after inactivity
- For production, consider upgrading to a paid plan for better performance
- Keep your `.env` files local and never commit them to Git
- Use Render's environment variable management for secrets

## 🔗 Useful Links

- [Render Documentation](https://render.com/docs)
- [MongoDB Atlas Setup](https://www.mongodb.com/docs/atlas/getting-started/)
- [FastAPI Deployment](https://fastapi.tiangolo.com/deployment/)
