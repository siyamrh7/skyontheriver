import { NextResponse } from 'next/server';
import { getSettingsDoc } from '../../../../lib/queries.js';

// PUT /api/admin/settings — dekken/hutnummers/prijzen, suites, junior, programma
export async function PUT(request) {
  const settings = await getSettingsDoc();
  const body = await request.json();
  const { dekken, suites, suitePrijs, junior, juniorPrijs, videSuites, videSuitePrijs, mastersuites, mastersuitePrijs, programma } = body;
  if (dekken !== undefined) settings.dekken = dekken;
  if (suites !== undefined) settings.suites = suites;
  if (suitePrijs !== undefined) settings.suitePrijs = suitePrijs;
  if (junior !== undefined) settings.junior = junior;
  if (juniorPrijs !== undefined) settings.juniorPrijs = juniorPrijs;
  if (videSuites !== undefined) settings.videSuites = videSuites;
  if (videSuitePrijs !== undefined) settings.videSuitePrijs = videSuitePrijs;
  if (mastersuites !== undefined) settings.mastersuites = mastersuites;
  if (mastersuitePrijs !== undefined) settings.mastersuitePrijs = mastersuitePrijs;
  if (programma !== undefined) settings.programma = programma;
  await settings.save();
  return NextResponse.json(settings);
}
