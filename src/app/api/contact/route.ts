import { cookies } from 'next/headers';
import { Resend } from 'resend';
import { NextRequest, NextResponse } from 'next/server';
import { encodeContactSession } from '@/lib/contact-session';

export async function POST(request: NextRequest) {
  try {
    const resend = new Resend(process.env.RESEND_API_KEY || '');
    const { name, email, phone, message } = await request.json();

    if (!name || !email || !phone) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      );
    }

    const projectMessage = typeof message === 'string' && message.trim()
      ? message
      : `Initial contact submitted from the homepage contact form.`;

    if (!process.env.RESEND_API_KEY) {
      console.warn('RESEND_API_KEY is not set; skipping email delivery.');
      return NextResponse.json(
        { success: true, note: 'Email service not configured locally.' },
        { status: 200 }
      );
    }

    const sessionPayload = encodeContactSession({
      email,
      phone,
      name,
    });

    const cookieStore = await cookies();
    cookieStore.set('contact-session', sessionPayload, {
      httpOnly: true,
      sameSite: 'lax',
      secure: process.env.NODE_ENV === 'production',
      path: '/',
      maxAge: 60 * 10,
    });

    const response = await resend.emails.send({
      from: 'Perfect Light <noreply@perfectlightchicago.com>',
      to: 'contact@perfectlightchicago.com',
      replyTo: email,
      subject: `New lead from ${name}`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px;">
          <h2>New Lead Submission</h2>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Phone:</strong> ${phone}</p>
          <p><strong>Project Note:</strong></p>
          <p style="white-space: pre-wrap;">${projectMessage}</p>
        </div>
      `,
    });

    if (response.error) {
      console.error('Resend error:', response.error);
      return NextResponse.json(
        { error: 'Failed to send email. Please try again later.' },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { success: true, id: response.data?.id },
      { status: 200 }
    );
  } catch (error) {
    console.error('Contact form error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
