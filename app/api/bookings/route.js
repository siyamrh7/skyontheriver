import { NextResponse } from 'next/server';
import connectDB from '../../../lib/mongodb.js';
import Cabin from '../../../lib/models/Cabin.js';
import Booking from '../../../lib/models/Booking.js';
import { releaseExpiredOptions } from '../../../lib/utils/cabinExpiry.js';

// POST /api/bookings — { cabinNummer, naam, email, tel } → atomic 24h option hold
export async function POST(request) {
  await connectDB();
  const body = await request.json();
  const cabinNummer = parseInt(body.cabinNummer, 10);
  const { naam, email, tel } = body;
  if (!cabinNummer || !naam) return NextResponse.json({ error: 'Hutnummer en naam zijn verplicht' }, { status: 400 });

  await releaseExpiredOptions();

  const optieTot = new Date(Date.now() + 24 * 3600 * 1000);
  const cabin = await Cabin.findOneAndUpdate({ nummer: cabinNummer, status: 'vrij' }, { status: 'optie', optieTot }, { new: true });
  if (!cabin) return NextResponse.json({ error: 'Hut zojuist vergeven' }, { status: 409 });

  const booking = await Booking.create({
    cabinNummer,
    naam,
    email: email || '',
    tel: tel || '',
    status: 'pending',
    vervaltOp: optieTot,
  });

  return NextResponse.json({ booking, optieTot }, { status: 201 });
}
