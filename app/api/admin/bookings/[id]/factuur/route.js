import { NextResponse } from 'next/server';
import connectDB from '../../../../../../lib/mongodb.js';
import Booking from '../../../../../../lib/models/Booking.js';
import { uploadBlob, deleteBlobSafe } from '../../../../../../lib/blob.js';

// POST /api/admin/bookings/:id/factuur — invoice upload (PDF/image)
export async function POST(request, { params }) {
  await connectDB();
  const booking = await Booking.findById(params.id);
  if (!booking) return NextResponse.json({ error: 'Boeking niet gevonden' }, { status: 404 });

  const form = await request.formData();
  const file = form.get('factuur');
  if (!file) return NextResponse.json({ error: 'Geen bestand ontvangen' }, { status: 400 });

  const oldUrl = booking.factuur?.url;
  const blob = await uploadBlob(`facturen/${params.id}-${file.name}`, file, file.type);
  booking.factuur = { naam: file.name, url: blob.url };
  await booking.save();
  await deleteBlobSafe(oldUrl);

  return NextResponse.json(booking);
}
