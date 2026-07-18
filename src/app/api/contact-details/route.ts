import { Resend } from 'resend';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const resend = new Resend(process.env.RESEND_API_KEY || '');
    const { name, email, projectType, timeline, projectDetails } = await request.json();

    if (!name || !email || !projectType || !timeline || !projectDetails) {
      return NextResponse.json(
        { error: 'Please complete all fields before submitting.' },
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

    if (!process.env.RESEND_API_KEY) {
      console.warn('RESEND_API_KEY is not set; skipping project detail emails.');
      return NextResponse.json(
        { success: true, note: 'Email service not configured locally.' },
        { status: 200 }
      );
    }

    const businessHtml = `
      <div style="font-family: sans-serif; max-width: 640px;">
        <h2>New Project Details Submission</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Project Type:</strong> ${projectType}</p>
        <p><strong>Timeline:</strong> ${timeline}</p>
        <p><strong>Project Details:</strong></p>
        <p style="white-space: pre-wrap;">${projectDetails}</p>
      </div>
    `;

    const confirmationHtml = `
      <div style="font-family: sans-serif; max-width: 640px;">
        <h2>Thanks for reaching out to Perfect Light</h2>
        <p>We received your project details and will follow up soon.</p>
        <p><strong>Project Type:</strong> ${projectType}</p>
        <p><strong>Timeline:</strong> ${timeline}</p>
        <p><strong>Project Details:</strong></p>
        <p style="white-space: pre-wrap;">${projectDetails}</p>
      </div>
    `;

    const response = await resend.emails.send({
      from: 'Perfect Light <noreply@perfectlightchicago.com>',
      to: ['contact@perfectlightchicago.com', email],
      replyTo: email,
      subject: `New project inquiry from ${name}`,
      html: businessHtml,
    });

    const confirmationResponse = await resend.emails.send({
      from: 'Perfect Light <noreply@perfectlightchicago.com>',
      to: email,
      replyTo: 'contact@perfectlightchicago.com',
      subject: 'We received your project request',
      html: confirmationHtml,
    });

    if (response.error || confirmationResponse.error) {
      console.error('Resend error:', response.error || confirmationResponse.error);
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
    console.error('Contact details error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
