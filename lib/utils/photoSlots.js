// Single source of truth for the 13 editable photo slots. Default images ship
// as static files under public/photos (persist fine on Vercel's read-only
// runtime filesystem); admin-uploaded replacements go to Vercel Blob and are
// referenced by their full https:// URL — both are usable directly as <img src>.
export const PHOTO_SLOTS = [
  { key: 'hero', label: 'Grote openingsfoto', pagina: 'Home', formaat: 'Liggend, min. 1920 × 1080 px', bestand: 'ms-joy-exterior-hero.jpg' },
  { key: 'introA', label: 'Fotoraster — linksboven', pagina: 'Home', formaat: 'Liggend of vierkant, min. 800 × 600 px', bestand: 'ms-joy-bar-rond.jpg' },
  { key: 'introB', label: 'Fotoraster — rechtsboven', pagina: 'Home', formaat: 'Liggend of vierkant, min. 800 × 600 px', bestand: 'ms-joy-suite-raam.jpg' },
  { key: 'introC', label: 'Fotoraster — linksonder', pagina: 'Home', formaat: 'Liggend of vierkant, min. 800 × 600 px', bestand: 'ms-joy-bistro-tafel.jpg' },
  { key: 'introD', label: 'Fotoraster — rechtsonder', pagina: 'Home', formaat: 'Liggend of vierkant, min. 800 × 600 px', bestand: 'ms-joy-lounge-groen.jpg' },
  { key: 'schipA', label: 'Grote foto links', pagina: 'Het schip', formaat: 'Liggend, min. 1400 × 900 px', bestand: 'ms-joy-restaurant-panorama.jpg' },
  { key: 'schipB', label: 'Kleine foto rechtsboven', pagina: 'Het schip', formaat: 'Liggend, min. 800 × 500 px', bestand: 'ms-joy-zonnedek-loungestoelen.jpg' },
  { key: 'schipC', label: 'Kleine foto rechtsonder', pagina: 'Het schip', formaat: 'Liggend, min. 800 × 500 px', bestand: 'ms-joy-zonnedek-jacuzzi.jpg' },
  { key: 'schipD', label: 'Onderste rij — links', pagina: 'Het schip', formaat: 'Liggend, min. 800 × 550 px', bestand: 'ms-joy-bar-flessen.jpg' },
  { key: 'schipE', label: 'Onderste rij — midden', pagina: 'Het schip', formaat: 'Liggend, min. 800 × 550 px', bestand: 'ms-joy-lounge-creme.jpg' },
  { key: 'schipF', label: 'Onderste rij — rechts', pagina: 'Het schip', formaat: 'Liggend, min. 800 × 550 px', bestand: 'BW-fitness-spa-kapper-4352-scaled.jpg' },
  { key: 'kamerDouble', label: 'Foto — Double Cabin', pagina: 'Suites & prijzen', formaat: 'Liggend, min. 900 × 600 px', bestand: 'ms-joy-kamer-double.jpg' },
  { key: 'kamerJunior', label: 'Foto — Junior Suite', pagina: 'Suites & prijzen', formaat: 'Liggend, min. 900 × 600 px', bestand: 'ms-joy-kamer-junior.jpg' },
  { key: 'kamerSuite', label: 'Foto — Suite', pagina: 'Suites & prijzen', formaat: 'Liggend, min. 900 × 600 px', bestand: 'ms-joy-kamer-suite.jpg' },
  { key: 'kamerVide', label: 'Foto — Vide Suite', pagina: 'Suites & prijzen', formaat: 'Liggend, min. 900 × 600 px', bestand: 'ms-joy-kamer-vide.jpg' },
  { key: 'kamerMaster', label: 'Foto — Mastersuite', pagina: 'Suites & prijzen', formaat: 'Liggend, min. 900 × 600 px', bestand: 'ms-joy-kamer-master.jpg' },
  { key: 'gastheer', label: 'Foto van Denny Braaf', pagina: 'Gastheer', formaat: 'Staand of vierkant, min. 900 × 1100 px', bestand: 'captain-denny.jpg' },
];

export function defaultFotos() {
  const out = {};
  for (const slot of PHOTO_SLOTS) out[slot.key] = `/photos/${slot.bestand}`;
  return out;
}

export function photoLibrary() {
  return [...new Set(PHOTO_SLOTS.map((s) => s.bestand))].map((bestand) => ({
    naam: bestand,
    src: `/photos/${bestand}`,
  }));
}

// merges an admin's custom photo choices (Blob URLs) over the static defaults
export function resolvedFotos(settingsFotos) {
  const defaults = defaultFotos();
  const custom = settingsFotos || {};
  const out = {};
  for (const key of Object.keys(defaults)) out[key] = custom[key] || defaults[key];
  return out;
}
