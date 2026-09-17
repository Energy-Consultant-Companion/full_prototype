import fs from 'node:fs';
import path from 'node:path';

const TRANSCRIPT = process.argv[2];
const OUT = process.argv[3] || 'tools/raw';
fs.mkdirSync(OUT, { recursive: true });

const idToNode = new Map();   // tool_use_id -> nodeId
const results = new Map();    // tool_use_id -> text payload

for (const line of fs.readFileSync(TRANSCRIPT, 'utf8').split('\n')) {
  if (!line.trim()) continue;
  let e; try { e = JSON.parse(line); } catch { continue; }
  const content = e?.message?.content;
  if (!Array.isArray(content)) continue;
  for (const c of content) {
    if (c.type === 'tool_use' && /paper__get_jsx$/.test(c.name || '') && c.input?.nodeId) {
      idToNode.set(c.id, c.input.nodeId);
    }
    if (c.type === 'tool_result') {
      let text = c.content;
      if (Array.isArray(text)) text = text.map(p => p.text ?? '').join('');
      if (typeof text === 'string') results.set(c.tool_use_id, text);
    }
  }
}

let n = 0;
for (const [id, nodeId] of idToNode) {
  let text = results.get(id);
  if (!text) continue;

  // Large results are persisted to a side file; follow the pointer.
  const m = text.match(/saved to:?\s*(\S+\.(?:json|txt))/);
  if (m && fs.existsSync(m[1])) {
    const raw = fs.readFileSync(m[1], 'utf8');
    if (m[1].endsWith('.json')) {
      const outer = JSON.parse(raw);
      text = Array.isArray(outer) ? outer.map(p => p.text ?? '').join('') : String(outer);
    } else {
      text = raw;            // plain-text dumps hold the JSON payload directly
    }
  }

  let parsed; try { parsed = JSON.parse(text); } catch { continue; }
  if (!parsed?.jsx) continue;
  fs.writeFileSync(path.join(OUT, `${nodeId}.jsx.txt`), parsed.jsx);
  n++;
}
console.log(`extracted ${n} artboards ->`, fs.readdirSync(OUT).join(' '));
