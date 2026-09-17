import fs from 'node:fs';
import path from 'node:path';

const RAW = 'tools/raw';
const OUT = 'src/screens';
fs.mkdirSync(OUT, { recursive: true });

// Paper asset ids -> the optimized copies in /public/assets
const ASSETS = {
  '01M2GQN4CR7RWW9Y5PHMVV4N85.png': '/assets/avatar-katrin.png',
  '01M2J6RREYA0EZVW4Q4W0W2DZT.png': '/assets/avatar-katrin-2.png',
  '01M0AQE0NY00BQTTV2FPVP3V6B.jpg': '/assets/portrait-katrin.jpg',
  '01M2JVS9FNA6Q5SJWEKNVFQE4J.png': '/assets/hero-haus.jpg',
};

// artboard id -> [component name, route slug]
const SCREENS = JSON.parse(fs.readFileSync('tools/screens.json', 'utf8'));

let written = 0;
for (const { id, component } of SCREENS) {
  const file = path.join(RAW, `${id}.jsx.txt`);
  if (!fs.existsSync(file)) { console.warn('missing', id); continue; }
  let jsx = fs.readFileSync(file, 'utf8');

  for (const [remote, local] of Object.entries(ASSETS)) {
    jsx = jsx.replaceAll(`https://app.paper.design/file-assets/01KYW948ZCHHGYZSKYHX8FC4E5/${remote}`, local);
  }

  // A bare "<" in copy (e.g. "zvE < 40.000 €") is a JSX parse error.
  jsx = jsx.replace(/<(?![a-zA-Z/!])/g, '&lt;');

  // Paper exports SVG <defs> ids that collide once several screens share a DOM.
  jsx = jsx.replace(/id="_([a-z0-9]+)"/g, (_, k) => `id="${id}_${k}"`)
           .replace(/url\(#_([a-z0-9]+)\)/g, (_, k) => `url(#${id}_${k})`);

  fs.writeFileSync(
    path.join(OUT, `${component}.tsx`),
    `// Generated from Paper artboard ${id}. Do not edit by hand.\n` +
    `export default function ${component}() {\n  return ${jsx.trim()};\n}\n`
  );
  written++;
}
console.log(`generated ${written} screen components`);
