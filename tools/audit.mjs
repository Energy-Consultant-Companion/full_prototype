import { chromium } from 'playwright';
import fs from 'node:fs';
const screens = JSON.parse(fs.readFileSync('tools/screens.json','utf8'));
const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1560, height: 1000 } });
const rows = [];
page.on('pageerror', e => console.log('  !! pageerror', e.message));
for (const s of screens) {
  await page.goto(`http://localhost:4311/${s.slug}`, { waitUntil: 'networkidle' });
  await page.waitForTimeout(250);
  const n = await page.locator('[data-hotspot]').count();
  const targets = await page.$$eval('[data-hotspot]', els => [...new Set(els.map(e => e.getAttribute('data-to')))]);
  rows.push({ slug: s.slug, n, targets: targets.length });
  if (n === 0) console.log(`ZERO  ${s.slug}`);
}
console.log(rows.map(r => `${r.n.toString().padStart(3)}  ${r.slug}`).join('\n'));
await browser.close();
