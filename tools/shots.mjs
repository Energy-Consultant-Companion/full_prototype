import { chromium } from 'playwright';
import fs from 'node:fs';
fs.mkdirSync('tools/shots', { recursive: true });
const slugs = process.argv.slice(2);
const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1560, height: 1000 }, deviceScaleFactor: 1 });
for (const slug of slugs) {
  await page.goto(`http://localhost:4311/${slug}`, { waitUntil: 'networkidle' });
  await page.waitForTimeout(700);
  await page.screenshot({ path: `tools/shots/${slug}.png`, fullPage: true });
  const n = await page.locator('[data-hotspot]').count();
  console.log(`${slug}: ${n} hotspots`);
}
await browser.close();
