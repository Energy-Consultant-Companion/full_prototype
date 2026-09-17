import { chromium } from 'playwright';

const steps = [
  ['website',                    'Anfrage erstellen',                'anfrage-gebaeude'],
  ['anfrage-gebaeude',           'Weiter',                           'anfrage-vorhaben'],
  ['anfrage-vorhaben',           'Weiter',                           'anfrage-zeitpunkt'],
  ['anfrage-zeitpunkt',          'Weiter',                           'anfrage-kontakt'],
  ['anfrage-kontakt',            'Anfrage senden',                   'anfragen'],
  ['anfragen',                   'Annehmen und Zugang senden',       'mail-zugang'],
  ['mail-zugang',                'Per Mail antworten',               'mail-antwort'],
  ['mail-zugang',                'Zu Ihrem Bereich',                 'portal-informationen'],
  ['portal-informationen',       'Weiter',                           'klientenportal'],
  ['ueberblick',                 'Fälle',                            'faelle'],
  ['faelle',                     'Familie Reuter',                   'fall-uebersicht'],
  ['fall-uebersicht',            'Alle zwölf Schritte →',            'fall-schritte'],
  ['fall-uebersicht',            'Ablage',                           'fall-unterlagen-ordner'],
  ['fall-unterlagen-ordner',     'Gebäudedaten',                     'fall-unterlagen-geoeffnet'],
  ['fall-uebersicht',            'Fehlend',                          'fall-unterlagen-fehlend'],
  ['fall-unterlagen-fehlend',    'Erinnern',                         'mail-erinnerung'],
  ['fall-uebersicht',            'Alle Aktionen',                    'fall-aktionen'],
  ['fall-aktionen',              'Unterlagen auf Vollständigkeit …', 'fall-unterlagen-fehlend'],
  ['fall-aktionen',              'Förderweg prüfen',                 'foerderung-pruefung'],
  ['frage-stellen',              'Frage senden',                     'fragen'],
  ['suche-fall',                 'NUR FAMILIE REUTER',               'fall-uebersicht'],
  ['mail-antwort',               'Senden',                           'mail-bestaetigt'],
  ['fragen',                     'Fenster-Frage',                    'frage-entwurf'],
  ['frage-entwurf',              'Freigeben und senden',             'fragen'],
  ['fragen',                     'Frage stellen',                    'frage-stellen'],
  ['suche-global',               'BUCHENWEG 14 · BAFA EBW',          'suche-fall'],
  ['unterlagen-eingang',         'Selber prüfen',                    'unterlagen-pruefung'],
  ['foerderung-pruefung',        'Förderung prüfen',                 'foerderung-ergebnisse'],
  ['foerderung-ergebnisse',      'Prüfung ansehen',                  'foerderung-programm'],
  ['foerderung-programm',        'Für diesen Fall übernehmen',       'fall-uebersicht'],
  ['regulierungen',              '1 Änderung ansehen',               'regulierungen-aenderungen'],
  ['regulierungen-aenderungen',  'Drei Beratungen',                  'faelle'],
  ['einstellungen-profil',       'Projektvorlagen',                  'einstellungen-vorlagen'],
];

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1560, height: 1000 } });
let pass = 0, fail = 0;

for (const [from, label, expected] of steps) {
  await page.goto(`http://localhost:4311/${from}`, { waitUntil: 'networkidle' });
  await page.waitForTimeout(260);
  const target = page.locator(`[data-hotspot][data-to="${expected}"]`).first();
  if (!(await target.count())) {
    console.log(`FAIL  ${from} — no hotspot to "${expected}" (${label})`);
    fail++; continue;
  }
  await target.click({ force: true });
  await page.waitForTimeout(520);
  const got = new URL(page.url()).pathname.replace(/^\//, '');
  if (got === expected) { pass++; }
  else { console.log(`FAIL  ${from} + "${label}" -> ${got} (want ${expected})`); fail++; }
}
console.log(`\n${pass} passed, ${fail} failed`);
await browser.close();
process.exit(fail ? 1 : 0);
