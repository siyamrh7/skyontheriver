import { NextResponse } from 'next/server';
import connectDB from '../../../../../lib/mongodb.js';
import Cabin from '../../../../../lib/models/Cabin.js';
import Booking from '../../../../../lib/models/Booking.js';
import { deleteBlobSafe } from '../../../../../lib/blob.js';

// PATCH /api/admin/bookings/:id — status, betaald, contact fields; keeps the linked cabin in sync
export async function PATCH(request, { params }) {
  await connectDB();
  const booking = await Booking.findById(params.id);
  if (!booking) return NextResponse.json({ error: 'Boeking niet gevonden' }, { status: 404 });

  const body = await request.json();
  const { status, betaald, naam, email, tel, factuur } = body;
  if (naam !== undefined) booking.naam = naam;
  if (email !== undefined) booking.email = email;
  if (tel !== undefined) booking.tel = tel;
  if (betaald !== undefined) booking.betaald = !!betaald;
  if (factuur === null && booking.factuur) {
    await deleteBlobSafe(booking.factuur.url);
    booking.factuur = null;
  }

  if (status && status !== booking.status) {
    booking.status = status;
    if (status === 'bevestigd') {
      await Cabin.findOneAndUpdate({ nummer: booking.cabinNummer }, { status: 'geboekt', optieTot: null });
    } else if (status === 'geannuleerd') {
      await Cabin.findOneAndUpdate({ nummer: booking.cabinNummer }, { status: 'vrij', optieTot: null });
    }
  }

  await booking.save();
  return NextResponse.json(booking);
}
