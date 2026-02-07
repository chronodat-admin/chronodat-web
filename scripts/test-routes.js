#!/usr/bin/env node
/**
 * Route and page test script for Chronodat static site.
 * Tests all vercel.json rewrites, static assets, and blog posts.
 *
 * Usage:
 *   node scripts/test-routes.js                    # default: http://localhost:3000
 *   node scripts/test-routes.js https://your-app.vercel.app
 *   BASE_URL=https://chronodat.vercel.app node scripts/test-routes.js
 *
 * Requires Node 18+ (for fetch).
 */

const fs = require('fs');
const path = require('path');

const BASE_URL = process.env.BASE_URL || process.argv[2] || 'http://localhost:3000';
const base = BASE_URL.replace(/\/$/, '');

// Routes from vercel.json (source path only; we assert 200 and HTML where expected)
const vercelPath = path.join(__dirname, '..', 'vercel.json');
let rewrites = [];
if (fs.existsSync(vercelPath)) {
  const config = JSON.parse(fs.readFileSync(vercelPath, 'utf8'));
  rewrites = config.rewrites || [];
}

// Additional static and important paths to check
const staticPaths = [
  '/sitemap.xml',
  '/robots.txt',
  '/header.html',
  '/css/main.css',
  '/js/scripts.js',
  '/Images/sitelogo.png',
];

// Blog post URLs (paths under /blogs/)
const blogSlugs = [
  'introducing-quizflex-ai.html',
  'a-beginners-guide-to-building-dynamics-365-model-driven-apps.html',
  'How-To-Add-Apps-To-Your-Office-365-SharePoint-Online-Site.html',
  'How-To-Remove-App-for-SharePoint-instances-from-a-SharePoint-site.html',
  'Receiving-help-desk-requests-by-email.html',
];

const blogPaths = blogSlugs.map((s) => `/blogs/${s}`);

// Optional: /Home with hash (server should still get /Home)
const routePaths = [
  '/',
  '/Home',
  '/Home#hero',
  ...rewrites.map((r) => r.source).filter((s) => s !== '/' && s !== '/Home'),
];

// Dedupe and build full list of URLs to test
const pathSet = new Set([...routePaths, ...staticPaths, ...blogPaths]);
const pathsToTest = Array.from(pathSet);

async function fetchStatus(url) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 10000);
  try {
    const res = await fetch(url, {
      method: 'GET',
      redirect: 'follow',
      signal: controller.signal,
      headers: { 'User-Agent': 'Chronodat-Route-Test/1.0' },
    });
    clearTimeout(timeout);
    return { status: res.status, ok: res.ok, url: res.url };
  } catch (err) {
    clearTimeout(timeout);
    return { status: null, ok: false, url, error: err.message };
  }
}

async function run() {
  console.log(`\nTesting base URL: ${base}\n`);
  console.log('Route tests (from vercel.json + static + blogs)\n');

  const results = [];
  for (const p of pathsToTest) {
    const url = `${base}${p}`;
    const r = await fetchStatus(url);
    results.push({ path: p, ...r });
    const icon = r.status === 200 ? '\u2713' : '\u2717';
    const status = r.status != null ? r.status : r.error;
    console.log(`  ${icon} ${p.padEnd(50)} ${status}`);
  }

  const passed = results.filter((r) => r.status === 200).length;
  const failed = results.filter((r) => r.status !== 200);
  const total = results.length;

  console.log('\n' + '─'.repeat(60));
  console.log(`Total: ${passed}/${total} passed`);
  if (failed.length) {
    console.log('\nFailed:');
    failed.forEach((r) => {
      console.log(`  ${r.path} -> ${r.status != null ? r.status : r.error}`);
    });
    process.exit(1);
  }
  console.log('');
  process.exit(0);
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
