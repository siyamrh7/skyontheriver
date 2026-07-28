import { NextResponse } from 'next/server';
import { getAdminPhotoSlots } from '../../../../lib/queries.js';

export const dynamic = 'force-dynamic';

// GET /api/admin/photos — slot metadata grouped per page, current photo, and the shared library
export async function GET() {
  const data = await getAdminPhotoSlots();
  return NextResponse.json(data);
}
