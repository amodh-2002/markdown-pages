# Interview Questions & Study Guide

A simple, clean website to view and study your interview preparation materials.

## Deployment to Vercel

### Option 1: Deploy via Vercel CLI

1. Install Vercel CLI (if not already installed):
```bash
npm i -g vercel
```

2. Deploy:
```bash
vercel
```

3. Follow the prompts to link your project and deploy.

### Option 2: Deploy via GitHub

1. Push this repository to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Import your GitHub repository
4. Vercel will automatically detect it as a static site and deploy it

### Option 3: Deploy via Vercel Dashboard

1. Go to [vercel.com](https://vercel.com)
2. Click "Add New Project"
3. Drag and drop the entire folder or connect via Git
4. Deploy!

## Features

- Clean, modern UI
- Responsive design (works on mobile, tablet, desktop)
- Fast markdown rendering
- Easy navigation between documents
- No build process required - pure HTML/CSS/JS

## Files Structure

- `index.html` - Main landing page
- `styles.css` - Styling
- `app.js` - JavaScript for document loading and rendering
- `vercel.json` - Vercel configuration
- `*.md` - Your markdown files (fault-tolert.md, Velocity.md, DMS.md, CaptionCraft.md)

## Local Testing

You can test locally by opening `index.html` in a browser, but for full functionality (loading markdown files), use a local server:

```bash
# Using Python
python -m http.server 8000

# Using Node.js
npx serve
```

Then visit `http://localhost:8000`

