# Chronodat Website (Vercel Static)

Static rewrite of the Chronodat site for deployment on **Vercel**. All previous ASP.NET (.aspx) and PHP have been replaced with static HTML. URL routes are preserved for SEO.

## Deploy to Vercel

1. **From Git (recommended)**  
   - Push this folder to a GitHub/GitLab/Bitbucket repo.  
   - In [Vercel](https://vercel.com), click **Add New Project** and import the repo.  
   - Set the project root to this folder if the repo contains more than this site.  
   - Add your domain (e.g. `chronodat.com`) in Project Settings → Domains.

2. **From CLI**  
   - Install Vercel CLI: `npm i -g vercel`  
   - In this folder run: `vercel`  
   - Follow the prompts and link your domain in the Vercel dashboard.

## What’s included

- **vercel.json** – Rewrites so `/helpdesk`, `/Products`, `/blog`, etc. serve the correct HTML (same URLs as before).
- **index.html** – Homepage (replaces `Default.aspx`).
- **aboutus.html, services.html, contact.html** – Legacy “master” pages converted to static HTML.
- **products.html, blog.html, privacy.html, terms-conditions.html** – Main content pages.
- **helpdesk.html, helpdesk-lite.html, issue-tracker.html, people-finder.html** – Product pages.
- **change-request-management.html, change-request-management-plus.html** – Change management pages.
- **risk-management.html, risk-matrix.html, task-tracker.html** – Other product pages.
- **eula.html** – EULA page.
- **header.html** – Shared nav fragment loaded by product pages via jQuery.
- **sitemap.xml** – Updated with current URLs and dates.
- **robots.txt** – Allows crawlers and points to the sitemap.

Static assets (css, js, img, Images, fonts, Docs, AppIcons, blogs, Build) are copied from the original project.

## Contact form & backend

- The contact form is handled by **client-side JavaScript** (`utils.js`) and posts to your existing **Azure Function** (`chronodatfunctionapp.azurewebsites.net/api/NotifyApp`). No server-side code runs on Vercel for the form.
- Ensure the Azure Function remains deployed and that CORS allows requests from your Vercel domain (e.g. `https://www.chronodat.com`).

## SEO

- All previous public URLs are preserved via `vercel.json` rewrites.  
- Canonical and meta tags are kept.  
- Use the same domain (e.g. `chronodat.com`) when going live to avoid losing existing Google index.
