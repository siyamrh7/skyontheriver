import { NextResponse } from 'next/server';
import { getSettingsDoc } from '../../../../lib/queries.js';

// PUT /api/admin/settings — dekken/hutnummers/prijzen, suites, junior, programma
export async function PUT(request) {
  const settings = await getSettingsDoc();
  const body = await request.json();
  const { dekken, suites, suitePrijs, junior, juniorPrijs, programma } = body;
  if (dekken !== undefined) settings.dekken = dekken;
  if (suites !== undefined) settings.suites = suites;
  if (suitePrijs !== undefined) settings.suitePrijs = suitePrijs;
  if (junior !== undefined) settings.junior = junior;
  if (juniorPrijs !== undefined) settings.juniorPrijs = juniorPrijs;
  if (programma !== undefined) settings.programma = programma;
  await settings.save();
  return NextResponse.json(settings);
}
