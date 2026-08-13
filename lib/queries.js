import connectDB from './mongodb.js';
import Cabin from './models/Cabin.js';
import Booking from './models/Booking.js';
import Settings from './models/Settings.js';
import { effectiveCabin } from './utils/pricing.js';
import { releaseExpiredOptions } from './utils/cabinExpiry.js';
import { PHOTO_SLOTS, resolvedFotos, photoLibrary } from './utils/photoSlots.js';

// Server Components pass their return value as props to Client Components,
// which requires plain-serializable data (no ObjectId/Date instances) — this
// round-trip guarantees that, same as what a JSON API response would produce.
export const serialize = (x) => JSON.parse(JSON.stringify(x));

export async function getSettingsDoc() {
  await connectDB();
  let settings = await Settings.findOne();
  if (!settings) settings = await Settings.create({});
  return settings;
}

export async function getPublicSettings() {
  const settings = await getSettingsDoc();
  return serialize({
    dekken: settings.dekken,
    suites: settings.suites,
    suitePrijs: settings.suitePrijs,
    junior: settings.junior,
    juniorPrijs: settings.juniorPrijs,
    videSuites: settings.videSuites,
    videSuitePrijs: settings.videSuitePrijs,
    mastersuites: settings.mastersuites,
    mastersuitePrijs: settings.mastersuitePrijs,
    programma: settings.programma,
    fotos: resolvedFotos(settings.fotos),
  });
}

export async function getCabins() {
  await connectDB();
  await releaseExpiredOptions();
  const [cabins, settings] = await Promise.all([Cabin.find().sort({ nummer: 1 }).lean(), Settings.findOne().lean()]);
  return serialize(cabins.map((c) => effectiveCabin(c, settings)));
}

export async function getAdminBookings(status) {
  await connectDB();
  const filter = status && status !== 'alle' ? { status } : {};
  const bookings = await Booking.find(filter).sort({ aangemaaktOp: -1 }).lean();
  return serialize(bookings);
}

export async function getStats() {
  await connectDB();
  await releaseExpiredOptions();
  const [cabins, bookings, settings] = await Promise.all([
    Cabin.find().lean(),
    Booking.find().sort({ aangemaaktOp: -1 }).lean(),
    Settings.findOne().lean(),
  ]);

  const prijsPerNummer = new Map(cabins.map((c) => [c.nummer, effectiveCabin(c, settings).prijs]));
  const bezetteNums = new Set(cabins.filter((c) => c.status !== 'vrij').map((c) => c.nummer));
  const bevestigd = bookings.filter((b) => b.status === 'bevestigd');
  const omzet = bevestigd.reduce((sum, b) => sum + (prijsPerNummer.get(b.cabinNummer) || 0) * 2, 0);

  const stats = {
    bezettingPct: cabins.length ? Math.round((bezetteNums.size / cabins.length) * 100) : 0,
    bezetAantal: bezetteNums.size,
    totaalHutten: cabins.length,
    bevestigd: bevestigd.length,
    pending: bookings.filter((b) => b.status === 'pending').length,
    omzet,
  };

  const dekStats = (settings.dekken || []).map((d) => {
    const hutten = cabins.filter((c) => c.nummer >= d.van && c.nummer <= d.tot);
    const bezet = hutten.filter((c) => c.status !== 'vrij').length;
    return { naam: d.naam, bezet, totaal: hutten.length, pct: hutten.length ? Math.round((bezet / hutten.length) * 100) : 0 };
  });

  return serialize({ stats, dekStats, recenteBoekingen: bookings.slice(0, 4) });
}

export async function getAdminPhotoSlots() {
  const settings = await getSettingsDoc();
  const fotos = resolvedFotos(settings.fotos);
  const slots = PHOTO_SLOTS.map((slot) => ({
    ...slot,
    huidigSrc: fotos[slot.key],
    isAangepast: !!(settings.fotos && settings.fotos[slot.key]),
  }));
  return serialize({ slots, library: photoLibrary() });
}
