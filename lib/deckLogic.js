// Pure helper that turns (settings, cabins-from-API) into the 5 marketing
// type cards for the Suites & prijzen page — one per real cabin category.

const CARD_DEFS = [
  { type: 'double', naam: 'Double Cabin', badge: 'Voordeligst', maat: '15 m²', omschrijving: 'Comfortabele tweepersoonshut met patrijsraam.', fotoKey: 'kamerDouble' },
  { type: 'junior', naam: 'Junior Suite', badge: 'Op de hoek', maat: '18 m²', omschrijving: 'Ruimer dan de Double Cabin, met Frans balkon.', fotoKey: 'kamerJunior' },
  { type: 'suite', naam: 'Suite', badge: 'Populairst', maat: '22 m²', omschrijving: 'Ruime suite met Frans balkon — de rivier aan uw voeten.', fotoKey: 'kamerSuite' },
  { type: 'vide', naam: 'Vide Suite', badge: 'Mooiste zithoek', maat: '22 m²', omschrijving: 'Suite die zich over twee dekken uitstrekt, met een eigen zithoek.', fotoKey: 'kamerVide' },
  { type: 'master', naam: 'Mastersuite', badge: 'Meest luxe', maat: '30 m²', omschrijving: 'De ruimste categorie aan boord, met Frans balkon en extra zitgelegenheid.', fotoKey: 'kamerMaster' },
];

const PRIJS_VELD = { double: null, junior: 'juniorPrijs', suite: 'suitePrijs', vide: 'videSuitePrijs', master: 'mastersuitePrijs' };

export function buildTypeCards(settings, cabins, fotos) {
  const dekken = settings.dekken || [];
  const dubbelPrijs = dekken.length ? dekken[dekken.length - 1].prijs : 0;

  return CARD_DEFS.map((def) => {
    const matched = cabins.filter((c) => c.type === def.type);
    const vrij = matched.filter((c) => c.status === 'vrij').length;
    const tot = matched.length;
    const prijsVeld = PRIJS_VELD[def.type];
    return {
      type: def.type,
      naam: def.naam,
      badge: def.badge,
      maat: def.maat,
      omschrijving: def.omschrijving,
      prijs: prijsVeld ? settings[prijsVeld] : dubbelPrijs,
      foto: (fotos || {})[def.fotoKey],
      beschikbaar: tot === 0 ? '' : vrij > 0 ? `${vrij} van ${tot} beschikbaar` : 'Uitverkocht',
      beschKleur: vrij > 0 ? '#7fb069' : '#c96b5c',
    };
  });
}
