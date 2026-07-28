async function handle(res) {
  if (!res.ok) {
    let message = 'Er ging iets mis';
    try {
      const data = await res.json();
      message = data.error || message;
    } catch {}
    const err = new Error(message);
    err.status = res.status;
    throw err;
  }
  if (res.status === 204) return null;
  return res.json();
}

// Same-origin app — no base URL, no credentials option needed (browsers send
// same-origin cookies automatically).
export async function apiGet(path) {
  const res = await fetch(path, { cache: 'no-store' });
  return handle(res);
}

export async function apiPost(path, body) {
  const isForm = body instanceof FormData;
  const res = await fetch(path, {
    method: 'POST',
    headers: isForm ? undefined : { 'Content-Type': 'application/json' },
    body: isForm ? body : JSON.stringify(body),
  });
  return handle(res);
}

export async function apiPatch(path, body) {
  const isForm = body instanceof FormData;
  const res = await fetch(path, {
    method: 'PATCH',
    headers: isForm ? undefined : { 'Content-Type': 'application/json' },
    body: isForm ? body : JSON.stringify(body),
  });
  return handle(res);
}

export async function apiPut(path, body) {
  const res = await fetch(path, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) });
  return handle(res);
}

export async function apiDelete(path) {
  const res = await fetch(path, { method: 'DELETE' });
  return handle(res);
}
