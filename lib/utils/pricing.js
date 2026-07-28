// Computes deck/type/price for a cabin number purely from the current Settings
// document — nothing is denormalized onto the Cabin doc, so editing a deck's
// range/price or the suite/junior lists in "Prijzen & indeling" is instantly
// reflected everywhere, with no sync step.

export function dekVoorNummer(num, settings) {
  const dekken = settings.dekken || [];
  return dekken.find((d) => num >= d.van && num <= d.tot) || null;
}

export function typeInfo(num, settings, cabinPrijsOverride) {
  const dekken = settings.dekken || [];
  const dekIndex = dekken.findIndex((d) => num >= d.van && num <= d.tot);
  const onderste = dekIndex === dekken.length - 1;
  const basisPrijs = (fallback) => (cabinPrijsOverride != null ? cabinPrijsOverride : fallback);

  if ((settings.suites || []).includes(num)) {
    return { type: 'suite', typeNaam: 'Suite', prijs: basisPrijs(settings.suitePrijs), kleur: '#2c4f7c', raam: 'Balkon met zitgelegenheid' };
  }
  if ((settings.junior || []).includes(num)) {
    return { type: 'junior', typeNaam: 'Junior Suite', prijs: basisPrijs(settings.juniorPrijs), kleur: '#4d729e', raam: 'Schuifpui met Frans balkon' };
  }
  const dek = dekken[dekIndex] || dekken[0] || { prijs: 0 };
  if (onderste) {
    return { type: 'double', typeNaam: 'Double Cabin', prijs: basisPrijs(dek.prijs), kleur: '#8a7347', raam: 'Patrijsramen' };
  }
  return { type: 'double', typeNaam: 'Double Cabin', prijs: basisPrijs(dek.prijs), kleur: '#8a7347', raam: 'Schuifpui met Frans balkon' };
}

export function effectiveCabin(cabinDoc, settings) {
  const dek = dekVoorNummer(cabinDoc.nummer, settings);
  const info = typeInfo(cabinDoc.nummer, settings, cabinDoc.prijsOverride);
  return {
    nummer: cabinDoc.nummer,
    status: cabinDoc.status,
    blokNotitie: cabinDoc.blokNotitie || '',
    optieTot: cabinDoc.optieTot,
    prijsOverride: cabinDoc.prijsOverride,
    dek: dek ? dek.naam : '',
    type: info.type,
    typeNaam: info.typeNaam,
    raam: info.raam,
    prijs: info.prijs,
  };
}

export function basisPrijsVoorNummer(num, settings) {
  if ((settings.suites || []).includes(num)) return settings.suitePrijs;
  if ((settings.junior || []).includes(num)) return settings.juniorPrijs;
  const dek = dekVoorNummer(num, settings);
  return dek ? dek.prijs : 0;
}
