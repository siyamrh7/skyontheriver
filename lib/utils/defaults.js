// Real MS Joy deck plan (Cabin plan/JOY-Cabinplan-2023_cmyk.jpg): Diamant Deck
// 301-324 (301/302 Junior Suite, 303-324 Master Suite — 22 cabins), Rubin Deck
// 201-229 (201/202 Junior Suite, 203-210 the 8 duplex Vide Suites spanning
// Rubin+Smaragd, 211-229 Suite), Smaragd Deck 101-118 (101-105 Suite,
// 106-118 Double Cabin — 13 cabins). Totals: 22 master + 4 junior + 32 suite
// (8 vide + 24 suite) + 13 double = 71 cabins / 142 guests, matching the
// ship's own description text. All fully editable in Prijzen & indeling.
export const DEFAULT_DEKKEN = [
  { naam: 'Diamant Deck', van: 301, tot: 324, prijs: 499 },
  { naam: 'Rubin Deck', van: 201, tot: 229, prijs: 499 },
  { naam: 'Smaragd Deck', van: 101, tot: 118, prijs: 499 },
];
export const DEFAULT_SUITES = [
  211, 212, 213, 214, 215, 216, 217, 218, 219, 220, 221, 222, 223, 224, 225, 226, 227, 228, 229,
  101, 102, 103, 104, 105,
];
export const DEFAULT_SUITE_PRIJS = 599;
export const DEFAULT_JUNIOR = [201, 202, 301, 302];
export const DEFAULT_JUNIOR_PRIJS = 549;
export const DEFAULT_VIDE_SUITES = [203, 204, 205, 206, 207, 208, 209, 210];
export const DEFAULT_VIDE_SUITE_PRIJS = 629;
export const DEFAULT_MASTERSUITES = [
  303, 304, 305, 306, 307, 308, 309, 310, 311, 312, 313, 314, 315, 316, 317, 318, 319, 320, 321, 322, 323, 324,
];
export const DEFAULT_MASTERSUITE_PRIJS = 749;

export const DEFAULT_PROGRAMMA = [
  { nr: '01', naam: 'Vrijdag', datum: '19 maart 2027', items: [
    { tijd: '15:00', wat: 'Inschepen gasten aan de Prins Hendrikkade, Zaandam' },
    { tijd: '16:00 – 17:30', wat: 'High tea in de bistro' },
    { tijd: '19:00 – 21:00', wat: 'Diner in het restaurant, met muzikale begeleiding' },
    { tijd: '21:00 – 23:00', wat: 'Afvaart Zaandam – Arnhem' },
    { tijd: '21:30 – 01:00', wat: 'DJ Barry Brand in de brasserie' },
    { tijd: '01:00', wat: 'Sluiting bar' },
  ]},
  { nr: '02', naam: 'Zaterdag', datum: '20 maart 2027', items: [
    { tijd: '06:30 – 07:30', wat: 'Early birds: koffie en croissants bij de receptie' },
    { tijd: '07:30 – 10:00', wat: 'Ontbijtbuffet in het restaurant' },
    { tijd: '09:00', wat: 'Aankomst Arnhem — vrije tijd in de stad tot 18:00 uur' },
    { tijd: '11:30 – 13:30', wat: 'Light lunch in de bistro (voor gasten aan boord)' },
    { tijd: '12:30 – 14:00', wat: 'À-la-carte lunch in het restaurant' },
    { tijd: '16:00 – 17:00', wat: 'High tea met prosecco' },
    { tijd: '19:00 – 22:30', wat: 'Galadiner en dinershow' },
    { tijd: '22:30 – 02:00', wat: 'Afterparty met DJ Barry Brand' },
    { tijd: '02:00', wat: 'Einde feest' },
  ]},
  { nr: '03', naam: 'Zondag', datum: '21 maart 2027', items: [
    { tijd: '05:00 – 14:00', wat: 'Afvaart Arnhem – Zaandam' },
    { tijd: '06:30 – 07:30', wat: 'Early birds koffie en croissants' },
    { tijd: '07:30 – 10:00', wat: 'Onbijtbuffet' },
    { tijd: '12:30 – 14:00', wat: 'Afscheidslunch aan boord' },
    { tijd: '14:00 – 16:00', wat: 'Uitschepen' },
  ]},
];
