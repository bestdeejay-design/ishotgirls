/**
 * tools/shoot.mjs — сборка растровых ассетов проекта через headless Chromium.
 *
 * Использование:
 *   CHROMIUM_PATH=/path/to/chromium node tools/shoot.mjs og
 *   CHROMIUM_PATH=/path/to/chromium node tools/shoot.mjs icon
 *   CHROMIUM_PATH=/path/to/chromium node tools/shoot.mjs shot <url> <out.png> [w] [h] [full]
 *
 * Пакеты: puppeteer-core (+ любой Chromium/Chrome, доступный по CHROMIUM_PATH).
 */
import puppeteer from 'puppeteer-core';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const root = process.env.ROOT || path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const exe = process.env.CHROMIUM_PATH || '/usr/bin/chromium';
const base = process.env.SITE_URL || 'file://' + root;
const [, , cmd = 'og', ...rest] = process.argv;

const launch = (w, h) => puppeteer.launch({
  executablePath: exe,
  headless: true,
  args: ['--no-sandbox', '--disable-dev-shm-usage', '--font-render-hinting=none', '--force-color-profile=srgb', '--hide-scrollbars'],
  defaultViewport: { width: w, height: h, deviceScaleFactor: 1 },
});

const jobs = {
  // OG-превью 1200×630 → assets/img/og-cover.jpg
  og: async () => {
    const b = await launch(1200, 630);
    const p = await b.newPage();
    await p.goto(base + '/tools/og.html', { waitUntil: 'networkidle0' });
    await p.evaluate(() => document.fonts.ready);
    await new Promise((r) => setTimeout(r, 300));
    await p.screenshot({ path: path.join(root, 'assets/img/og-cover.jpg'), type: 'jpeg', quality: 88 });
    await b.close();
    console.log('→ assets/img/og-cover.jpg');
  },
  // Иконки → assets/apple-touch-icon.png (180), assets/favicon-512.png
  icon: async () => {
    for (const [size, out] of [[180, 'assets/apple-touch-icon.png'], [512, 'assets/favicon-512.png']]) {
      const b = await launch(size, size);
      const p = await b.newPage();
      await p.goto(base + '/tools/icon.html', { waitUntil: 'networkidle0' });
      await new Promise((r) => setTimeout(r, 150));
      await p.screenshot({ path: path.join(root, out) });
      await b.close();
      console.log('→', out);
    }
  },
  // Произвольный скриншот для визуальной проверки: node tools/shoot.mjs shot http://localhost:8000 out.png 1440 900 full
  shot: async () => {
    const [url, out, w = '1440', h = '900', mode = 'viewport'] = rest;
    const b = await launch(Number(w), Number(h));
    const p = await b.newPage();
    await p.goto(url, { waitUntil: 'networkidle0' });
    await p.evaluate(() => document.fonts.ready);
    if (mode === 'full') {
      await p.evaluate(async () => {
        const s = innerHeight * 0.8;
        for (let y = 0; y < document.body.scrollHeight; y += s) { scrollTo(0, y); await new Promise((r) => setTimeout(r, 60)); }
        scrollTo(0, 0); await new Promise((r) => setTimeout(r, 300));
      });
    }
    await new Promise((r) => setTimeout(r, 600));
    await p.screenshot({ path: out, fullPage: mode === 'full' });
    await b.close();
    console.log('→', out);
  },
};

(jobs[cmd] || jobs.og)().catch((e) => { console.error(e); process.exit(1); });
