import { NextResponse } from 'next/server';
import { getSettingsDoc } from '../../../../../lib/queries.js';
import { PHOTO_SLOTS, defaultFotos } from '../../../../../lib/utils/photoSlots.js';
import { uploadBlob, deleteBlobSafe } from '../../../../../lib/blob.js';

function slotExists(slotKey) {
  return PHOTO_SLOTS.some((s) => s.key === slotKey);
}

// POST /api/admin/photos/:slotKey — multipart upload for one photo slot
export async function POST(request, { params }) {
  const { slotKey } = params;
  if (!slotExists(slotKey)) return NextResponse.json({ error: 'Onbekende fotoplek' }, { status: 404 });

  const form = await request.formData();
  const file = form.get('foto');
  if (!file) return NextResponse.json({ error: 'Geen bestand ontvangen' }, { status: 400 });

  const settings = await getSettingsDoc();
  const oldUrl = settings.fotos?.[slotKey];

  const blob = await uploadBlob(`fotos/${slotKey}-${file.name}`, file, file.type);
  settings.fotos = { ...settings.fotos, [slotKey]: blob.url };
  settings.markModified('fotos');
  await settings.save();
  await deleteBlobSafe(oldUrl);

  return NextResponse.json({ key: slotKey, src: blob.url });
}

// PATCH /api/admin/photos/:slotKey — pick an existing library photo for this slot, body: { src }
export async function PATCH(request, { params }) {
  const { slotKey } = params;
  if (!slotExists(slotKey)) return NextResponse.json({ error: 'Onbekende fotoplek' }, { status: 404 });
  const { src } = await request.json();
  if (!src) return NextResponse.json({ error: 'src is verplicht' }, { status: 400 });

  const settings = await getSettingsDoc();
  const oldUrl = settings.fotos?.[slotKey];
  settings.fotos = { ...settings.fotos, [slotKey]: src };
  settings.markModified('fotos');
  await settings.save();
  await deleteBlobSafe(oldUrl);

  return NextResponse.json({ key: slotKey, src });
}

// DELETE /api/admin/photos/:slotKey — revert this slot to its default photo
export async function DELETE(request, { params }) {
  const { slotKey } = params;
  const settings = await getSettingsDoc();
  const oldUrl = settings.fotos?.[slotKey];
  const fotos = { ...settings.fotos };
  delete fotos[slotKey];
  settings.fotos = fotos;
  settings.markModified('fotos');
  await settings.save();
  await deleteBlobSafe(oldUrl);

  return NextResponse.json({ ok: true, src: defaultFotos()[slotKey] });
}
