import fs from 'node:fs';
const screens = JSON.parse(fs.readFileSync('tools/screens.json', 'utf8'));

const imports = screens
  .map((s) => `import ${s.component} from "@/screens/${s.component}";`)
  .join('\n');

const entries = screens
  .map(
    (s) => `  {
    slug: ${JSON.stringify(s.slug)},
    title: ${JSON.stringify(s.title)},
    note: ${JSON.stringify(s.note)},
    chapter: ${JSON.stringify(s.chapter)},
    artboard: ${JSON.stringify(s.id)},
    Component: ${s.component},
  },`
  )
  .join('\n');

fs.writeFileSync(
  'src/lib/screens.ts',
  `// Generated from tools/screens.json. Run \`node tools/gen-registry.mjs\` to refresh.
import type { ComponentType } from "react";
${imports}

export type ChapterId =
  | "kundschaft"
  | "annahme"
  | "weg-mail"
  | "weg-portal"
  | "beratung"
  | "fall"
  | "arbeit"
  | "unterlagen"
  | "foerderung"
  | "regeln"
  | "einstellungen";

export type Screen = {
  slug: string;
  title: string;
  note: string;
  chapter: ChapterId;
  artboard: string;
  Component: ComponentType;
};

export const CHAPTERS: { id: ChapterId; title: string; persona: "Kundschaft" | "Beraterin" }[] = [
  { id: "kundschaft", title: "Anfrage stellen", persona: "Kundschaft" },
  { id: "annahme", title: "Anfrage annehmen", persona: "Beraterin" },
  { id: "weg-mail", title: "Weg 2 · Per Mail", persona: "Kundschaft" },
  { id: "weg-portal", title: "Weg 1 · Im Portal", persona: "Kundschaft" },
  { id: "beratung", title: "Fälle", persona: "Beraterin" },
  { id: "fall", title: "Ein Fall", persona: "Beraterin" },
  { id: "arbeit", title: "Schritte, Fragen, Suche", persona: "Beraterin" },
  { id: "unterlagen", title: "Unterlagen prüfen", persona: "Beraterin" },
  { id: "foerderung", title: "Förderung", persona: "Beraterin" },
  { id: "regeln", title: "Regulierungen", persona: "Beraterin" },
  { id: "einstellungen", title: "Einstellungen", persona: "Beraterin" },
];

export const SCREENS: Screen[] = [
${entries}
];

export const SLUGS = SCREENS.map((s) => s.slug);

export function screenAt(slug: string | undefined): Screen {
  return SCREENS.find((s) => s.slug === slug) ?? SCREENS[0];
}

export function chapterOf(id: ChapterId) {
  return CHAPTERS.find((c) => c.id === id) ?? CHAPTERS[0];
}
`
);
console.log(`registry written with ${screens.length} screens`);
