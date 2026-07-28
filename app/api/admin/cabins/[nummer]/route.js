import { NextResponse } from 'next/server';
import connectDB from '../../../../../lib/mongodb.js';
import Cabin from '../../../../../lib/models/Cabin.js';
import Settings from '../../../../../lib/models/Settings.js';
import { effectiveCabin } from '../../../../../lib/utils/pricing.js';

// PATCH /api/admin/cabins/:nummer — blokkeren (+notitie), vrijgeven, of prijsOverride zetten/wissen
export async function PATCH(request, { params }) {
  await connectDB();
  const nummer = parseInt(params.nummer, 10);
  const cabin = await Cabin.findOne({ nummer });
  if (!cabin) return NextResponse.json({ error: 'Hut niet gevonden' }, { status: 404 });

  const body = await request.json();
  const { actie, notitie, prijsOverride } = body;

  if (actie === 'blokkeren') {
    if (cabin.status !== 'vrij') return NextResponse.json({ error: 'Alleen een vrije hut kan geblokkeerd worden' }, { status: 409 });
    cabin.status = 'geblokkeerd';
    cabin.blokNotitie = notitie || '';
  } else if (actie === 'vrijgeven') {
    if (cabin.status !== 'geblokkeerd') return NextResponse.json({ error: 'Hut is niet geblokkeerd' }, { status: 409 });
    cabin.status = 'vrij';
    cabin.blokNotitie = '';
  }

  if (prijsOverride !== undefined) {
    cabin.prijsOverride = prijsOverride === null || prijsOverride === '' ? null : Number(prijsOverride);
  }

  await cabin.save();
  const settings = await Settings.findOne();
  return NextResponse.json(effectiveCabin(cabin, settings));
}
