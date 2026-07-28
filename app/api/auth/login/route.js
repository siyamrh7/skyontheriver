import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import connectDB from '../../../../lib/mongodb.js';
import User from '../../../../lib/models/User.js';
import { signToken, COOKIE_NAME, COOKIE_OPTS } from '../../../../lib/auth.js';

export async function POST(request) {
  await connectDB();
  const { email, password } = await request.json();
  if (!email || !password) return NextResponse.json({ error: 'E-mailadres en wachtwoord zijn verplicht' }, { status: 400 });

  const user = await User.findOne({ email: String(email).toLowerCase() });
  if (!user) return NextResponse.json({ error: 'Onjuiste inloggegevens' }, { status: 401 });

  const ok = await bcrypt.compare(password, user.passwordHash);
  if (!ok) return NextResponse.json({ error: 'Onjuiste inloggegevens' }, { status: 401 });

  const token = await signToken({ sub: user._id.toString(), email: user.email });
  const res = NextResponse.json({ email: user.email });
  res.cookies.set(COOKIE_NAME, token, COOKIE_OPTS);
  return res;
}
