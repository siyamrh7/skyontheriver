import { NextResponse } from 'next/server';
import { getSettingsDoc } from '../../../../../lib/queries.js';
import Cabin from '../../../../../lib/models/Cabin.js';
import { deleteBlobSafe } from '../../../../../lib/blob.js';
import {
  DEFAULT_DEKKEN,
  DEFAULT_SUITES,
  DEFAULT_SUITE_PRIJS,
  DEFAULT_JUNIOR,
  DEFAULT_JUNIOR_PRIJS,
  DEFAULT_PROGRAMMA,
} from '../../../../../lib/utils/defaults.js';

// POST /api/admin/settings/reset — { wat: 'programma' | 'fotos' | 'prijzen' }
export async function POST(request) {
  const settings = await getSettingsDoc();
  const { wat } = await request.json();

  if (wat === 'programma') {
    settings.programma = DEFAULT_PROGRAMMA;
  } else if (wat === 'fotos') {
    const oldUrls = Object.values(settings.fotos || {});
    settings.fotos = {};
    await Promise.all(oldUrls.map(deleteBlobSafe));
  } else if (wat === 'prijzen') {
    settings.dekken = DEFAULT_DEKKEN;
    settings.suites = DEFAULT_SUITES;
    settings.suitePrijs = DEFAULT_SUITE_PRIJS;
    settings.junior = DEFAULT_JUNIOR;
    settings.juniorPrijs = DEFAULT_JUNIOR_PRIJS;
    await Cabin.updateMany({}, { prijsOverride: null });
  } else {
    return NextResponse.json({ error: 'Onbekend reset-doel' }, { status: 400 });
  }

  await settings.save();
  return NextResponse.json(settings);
}
