import fs from 'node:fs';
const ids = process.argv.slice(2);
for (const id of ids) {
  const s = fs.readFileSync(`tools/raw/${id}.jsx.txt`, 'utf8');
  const out = new Set();
  // JSX text nodes: between ">" and "<", trimmed, non-empty, no braces
  for (const m of s.matchAll(/>\s*\n\s*([^<>{}\n][^<>{}\n]*?)\s*\n\s*</g)) {
    const t = m[1].trim();
    if (t && t.length < 70) out.add(t);
  }
  console.log(`\n===== ${id} (${out.size}) =====`);
  console.log([...out].join(' | '));
}
