import { NextResponse } from 'next/server';
import { getPublicSettings } from '../../../../lib/queries.js';

export const dynamic = 'force-dynamic';

export async function GET() {
  const settings = await getPublicSettings();
  return NextResponse.json(settings);
}
