#!/bin/bash
# Start script for Render deployment
# Build the app first
npm run build
# Serve the built files
npx serve -s build -l ${PORT:-3000}
