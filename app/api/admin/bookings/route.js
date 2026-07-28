import { NextResponse } from 'next/server';
import connectDB from '../../../../lib/mongodb.js';
import Cabin from '../../../../lib/models/Cabin.js';
import Booking from '../../../../lib/models/Booking.js';
import { getAdminBookings } from '../../../../lib/queries.js';

// GET /api/admin/bookings?status=
export async function GET(request) {
  const status = request.nextUrl.searchParams.get('status');
  const bookings = await getAdminBookings(status);
  return NextResponse.json(bookings);
}

// POST /api/admin/bookings — manual booking, cabin goes straight to 'geboekt'
export async function POST(request) {
  await connectDB();
  const body = await request.json();
  const cabinNummer = parseInt(body.cabinNummer, 10);
  const { naam, email, tel } = body;
  if (!cabinNummer || !naam || !naam.trim()) return NextResponse.json({ error: 'Hutnummer en naam zijn verplicht' }, { status: 400 });

  const cabin = await Cabin.findOneAndUpdate({ nummer: cabinNummer, status: 'vrij' }, { status: 'geboekt', optieTot: null }, { new: true });
  if (!cabin) return NextResponse.json({ error: 'Hut is niet vrij' }, { status: 409 });

  const booking = await Booking.create({
    cabinNummer,
    naam,
    email: email || '',
    tel: tel || '',
    status: 'bevestigd',
    betaald: false,
  });
  return NextResponse.json(booking, { status: 201 });
}
