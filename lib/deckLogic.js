// Pure helpers that turn (settings, cabins-from-API) into the view models the
// deck plan and type cards need. Mirrors the prototype's typeInfo()/deckDefs().

export function buildTypeCards(settings, cabins, kamerFoto) {
  const dekken = settings.dekken || [];
  const laatsteDek = dekken[dekken.length - 1] || { naam: '', prijs: 0 };
  const bovenDekken = dekken.slice(0, -1);
  const bovenNamen = bovenDekken.map((d) => d.naam).join(' & ') || laatsteDek.naam;

  const telVrij = (pred) => {
    const matched = cabins.filter(pred);
    return { vrij: matched.filter((c) => c.status === 'vrij').length, tot: matched.length };
  };

  const mk = (naam, badge, dek, omschrijving, prijs, cnt) => ({
    naam,
    badge,
    dek,
    omschrijving,
    prijs,
    foto: kamerFoto,
    beschikbaar: cnt.vrij > 0 ? `${cnt.vrij} van ${cnt.tot} beschikbaar` : 'Uitverkocht',
    beschKleur: cnt.vrij > 0 ? '#7fb069' : '#c96b5c',
  });

  return [
    mk('Double Cabin', 'Voordeligst', laatsteDek.naam, 'Comfortabele tweepersoonshut met patrijsramen op het onderste dek.', laatsteDek.prijs, telVrij((c) => c.dek === laatsteDek.naam && c.type === 'double')),
    mk('Double Cabin', 'Populair', bovenNamen, 'Tweepersoonshut met schuifpui en Frans balkon — de rivier aan uw voeten.', (bovenDekken[0] || laatsteDek).prijs, telVrij((c) => c.dek !== laatsteDek.naam && c.type === 'double')),
    mk('Junior Suite', 'Extra ruim', bovenNamen, 'Ruimer dan de Double Cabin, met schuifpui en Frans balkon.', settings.juniorPrijs, telVrij((c) => c.type === 'junior')),
    mk('Suite', 'Meest luxe', (bovenDekken[0] || laatsteDek).naam, 'De ruimste categorie, met regulier balkon en zitgelegenheid buiten.', settings.suitePrijs, telVrij((c) => c.type === 'suite')),
  ];
}

const FACILITIES = [
  { achter: [{ label: 'Bistro' }, { label: 'Lift' }], voor: [{ label: 'Receptie' }, { label: 'Bar' }] },
  { achter: [{ label: 'Keuken' }], voor: [{ label: 'Restaurant' }, { label: 'Lift' }] },
  { achter: [{ label: 'Bemanning' }], voor: [{ label: 'Wellness' }, { label: 'Fitness' }, { label: 'Kapper' }] },
];

export function buildDecks(settings, cabins) {
  return (settings.dekken || []).map((d, i) => {
    const inDeck = cabins.filter((c) => c.nummer >= d.van && c.nummer <= d.tot).sort((a, b) => a.nummer - b.nummer);
    const oneven = inDeck.filter((c) => c.nummer % 2 === 1);
    const even = inDeck.filter((c) => c.nummer % 2 === 0);
    const paren = [];
    for (let j = 0; j < inDeck.length; j += 2) paren.push(inDeck.slice(j, j + 2));
    const vrij = inDeck.filter((c) => c.status === 'vrij').length;
    return {
      naam: d.naam,
      sub: 'No. ' + Math.floor(d.van / 100) * 100,
      rows: [oneven, even],
      paren,
      achter: (FACILITIES[i] || { achter: [] }).achter,
      voor: (FACILITIES[i] || { voor: [] }).voor,
      vrijTekst: `${vrij} van ${inDeck.length} vrij`,
    };
  });
}
