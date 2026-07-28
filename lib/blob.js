import { put, del } from '@vercel/blob';

export async function uploadBlob(pathname, file, contentType) {
  return put(pathname, file, { access: 'public', contentType, addRandomSuffix: true });
}

// Best-effort cleanup — never let a failed/missing delete break the request
// that's replacing or removing a photo/invoice.
export async function deleteBlobSafe(url) {
  if (!url || !url.includes('blob.vercel-storage.com')) return;
  try {
    await del(url);
  } catch (e) {
    // already gone or token missing scope — non-fatal
  }
}
