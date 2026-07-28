import { NextResponse } from 'next/server';
import { getCabins } from '../../../lib/queries.js';

export const dynamic = 'force-dynamic';

export async function GET() {
  const cabins = await getCabins();
  return NextResponse.json(cabins);
}
