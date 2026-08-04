import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import { COOKIE_NAME, decodeContactSession } from '@/lib/contact-session';

export async function GET() {
  try {
    const cookieStore = await cookies();
    const session = cookieStore.get(COOKIE_NAME)?.value;

    if (!session) {
      return NextResponse.json({ name: 'there', email: '', phone: '' }, { status: 200 });
    }

    const payload = decodeContactSession(session);

    return NextResponse.json({
      name: payload?.name || 'there',
      email: payload?.email || '',
      phone: payload?.phone || '',
    });
  } catch (error) {
    console.error('Contact session retrieval error:', error);
    return NextResponse.json({ name: 'there', email: '', phone: '' }, { status: 200 });
  }
}
