import { NextResponse } from 'next/server';
import { verifyToken, COOKIE_NAME } from './lib/auth.js';

export async function middleware(request) {
  const { pathname } = request.nextUrl;
  const isAdminApi = pathname.startsWith('/api/admin');
  const isAdminPage = pathname.startsWith('/admin') && pathname !== '/admin/login';

  const token = request.cookies.get(COOKIE_NAME)?.value;
  const payload = token ? await verifyToken(token) : null;

  if (payload) return NextResponse.next();

  if (isAdminApi) return NextResponse.json({ error: 'Niet ingelogd' }, { status: 401 });
  if (isAdminPage) return NextResponse.redirect(new URL('/admin/login', request.url));
  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*', '/api/admin/:path*'],
};
