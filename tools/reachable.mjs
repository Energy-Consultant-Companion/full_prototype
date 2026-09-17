import { chromium } from 'playwright';
import fs from 'node:fs';
const screens = JSON.parse(fs.readFileSync('tools/screens.json','utf8'));
const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1560, height: 1000 } });

for (const s of screens) {
  await page.goto(`http://localhost:4311/${s.slug}`, { waitUntil: 'networkidle' });
  await page.waitForTimeout(220);
  const blocked = await page.evaluate(() => {
    const out = [];
    for (const el of document.querySelectorAll('[data-hotspot]')) {
      const r = el.getBoundingClientRect();
      if (!r.width || !r.height) { out.push([el.getAttribute('data-to'), 'zero-size', (el.textContent||'').trim().slice(0,32)]); continue; }
      const x = r.left + r.width / 2, y = r.top + r.height / 2;
      if (y < 0 || y > innerHeight) continue;
      const top = document.elementFromPoint(x, y);
      if (!top || !(el.contains(top) || top.closest('[data-hotspot]') === el)) {
        out.push([el.getAttribute('data-to'), 'covered', (el.textContent||'').trim().slice(0,32)]);
      }
    }
    return out;
  });
  if (blocked.length) {
    console.log(`\n${s.slug}  (${blocked.length} unreachable)`);
    for (const [to, why, txt] of blocked) console.log(`   ${why.padEnd(10)} -> ${String(to).padEnd(26)} "${txt}"`);
  }
}
await browser.close();
