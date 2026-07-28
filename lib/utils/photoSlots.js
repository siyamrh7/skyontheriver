// Single source of truth for the 13 editable photo slots. Default images ship
// as static files under public/photos (persist fine on Vercel's read-only
// runtime filesystem); admin-uploaded replacements go to Vercel Blob and are
// referenced by their full https:// URL — both are usable directly as <img src>.
export const PHOTO_SLOTS = [
  { key: 'hero', label: 'Grote openingsfoto', pagina: 'Home', formaat: 'Liggend, min. 1920 × 1080 px', bestand: 'BW-diversen-openbare-ruimtes-4813-scaled.jpg' },
  { key: 'introA', label: 'Fotoraster — linksboven', pagina: 'Home', formaat: 'Liggend of vierkant, min. 800 × 600 px', bestand: 'BW-diversen-openbare-ruimtes-4858-scaled.jpg' },
  { key: 'introB', label: 'Fotoraster — rechtsboven', pagina: 'Home', formaat: 'Liggend of vierkant, min. 800 × 600 px', bestand: 'BW-suite-4580-scaled.jpg' },
  { key: 'introC', label: 'Fotoraster — linksonder', pagina: 'Home', formaat: 'Liggend of vierkant, min. 800 × 600 px', bestand: 'BW-bistro-gang-4516-scaled.jpg' },
  { key: 'introD', label: 'Fotoraster — rechtsonder', pagina: 'Home', formaat: 'Liggend of vierkant, min. 800 × 600 px', bestand: 'BW-diversen-openbare-ruimtes-4851-scaled.jpg' },
  { key: 'schipA', label: 'Grote foto links', pagina: 'Het schip', formaat: 'Liggend, min. 1400 × 900 px', bestand: 'BW-diversen-openbare-ruimtes-4813-scaled.jpg' },
  { key: 'schipB', label: 'Kleine foto rechtsboven', pagina: 'Het schip', formaat: 'Liggend, min. 800 × 500 px', bestand: 'BW-diversen-openbare-ruimtes-4845-scaled.jpg' },
  { key: 'schipC', label: 'Kleine foto rechtsonder', pagina: 'Het schip', formaat: 'Liggend, min. 800 × 500 px', bestand: 'BW-fitness-spa-kapper-4364-scaled.jpg' },
  { key: 'schipD', label: 'Onderste rij — links', pagina: 'Het schip', formaat: 'Liggend, min. 800 × 550 px', bestand: 'BW-bistro-gang-4513-scaled.jpg' },
  { key: 'schipE', label: 'Onderste rij — midden', pagina: 'Het schip', formaat: 'Liggend, min. 800 × 550 px', bestand: 'BW-diversen-openbare-ruimtes-4851-scaled.jpg' },
  { key: 'schipF', label: 'Onderste rij — rechts', pagina: 'Het schip', formaat: 'Liggend, min. 800 × 550 px', bestand: 'BW-fitness-spa-kapper-4352-scaled.jpg' },
  { key: 'kamer', label: 'Hutfoto (kaarten en reserveerpaneel)', pagina: 'Hutten & prijzen', formaat: 'Liggend, min. 900 × 600 px', bestand: 'BW-suite-4580-scaled.jpg' },
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
