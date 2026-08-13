import { NextResponse } from 'next/server';
import connectDB from '../../../lib/mongodb.js';
import Cabin from '../../../lib/models/Cabin.js';
import Booking from '../../../lib/models/Booking.js';
import Settings from '../../../lib/models/Settings.js';
import { releaseExpiredOptions } from '../../../lib/utils/cabinExpiry.js';
import { typeInfo } from '../../../lib/utils/pricing.js';

// Atomically claims the first free cabin from a list of candidate numbers —
// tries each in nummer order so a concurrent claim on one candidate just
// falls through to the next, instead of failing the whole request.
async function claimFirstFree(candidateNummers, optieTot) {
  for (const nummer of candidateNummers) {
    const cabin = await Cabin.findOneAndUpdate({ nummer, status: 'vrij' }, { status: 'optie', optieTot }, { new: true });
    if (cabin) return cabin;
  }
  return null;
}

// POST /api/bookings — either { cabinNummer, naam, email, tel } (legacy,
// caller already picked a specific cabin) or { type, naam, email, tel } (the
// Suites & prijzen cards — server auto-assigns the next free cabin of that
// type) → atomic 24h option hold
export async function POST(request) {
  await connectDB();
  const body = await request.json();
  const { naam, email, tel, type } = body;
  if (!naam) return NextResponse.json({ error: 'Naam is verplicht' }, { status: 400 });

  await releaseExpiredOptions();
  const optieTot = new Date(Date.now() + 24 * 3600 * 1000);

  let cabin;
  if (type) {
    const settings = await Settings.findOne().lean();
    const vrije = await Cabin.find({ status: 'vrij' }).sort({ nummer: 1 }).select('nummer').lean();
    const candidates = vrije.filter((c) => typeInfo(c.nummer, settings).type === type).map((c) => c.nummer);
    cabin = await claimFirstFree(candidates, optieTot);
    if (!cabin) return NextResponse.json({ error: 'Deze categorie is helaas uitverkocht' }, { status: 409 });
  } else {
    const cabinNummer = parseInt(body.cabinNummer, 10);
    if (!cabinNummer) return NextResponse.json({ error: 'Hutnummer en naam zijn verplicht' }, { status: 400 });
    cabin = await Cabin.findOneAndUpdate({ nummer: cabinNummer, status: 'vrij' }, { status: 'optie', optieTot }, { new: true });
    if (!cabin) return NextResponse.json({ error: 'Hut zojuist vergeven' }, { status: 409 });
  }

  const booking = await Booking.create({
    cabinNummer: cabin.nummer,
    naam,
    email: email || '',
    tel: tel || '',
    status: 'pending',
    vervaltOp: optieTot,
  });

  return NextResponse.json({ booking, cabin, optieTot }, { status: 201 });
}
