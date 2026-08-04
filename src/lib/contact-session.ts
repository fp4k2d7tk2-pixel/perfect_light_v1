import { createHmac, timingSafeEqual } from 'crypto';

const COOKIE_NAME = 'contact-session';
const SECRET = process.env.CONTACT_SESSION_SECRET || 'development-contact-session-secret';

export function encodeContactSession(payload: { name: string; email: string; phone: string }) {
  const encodedPayload = Buffer.from(JSON.stringify(payload), 'utf8').toString('base64url');
  const signature = createHmac('sha256', SECRET)
    .update(encodedPayload)
    .digest('base64url');

  return `${encodedPayload}.${signature}`;
}

export function decodeContactSession(rawValue: string | undefined) {
  if (!rawValue) {
    return null;
  }

  const [encodedPayload, signature] = rawValue.split('.');

  if (!encodedPayload || !signature) {
    return null;
  }

  const expectedSignature = createHmac('sha256', SECRET)
    .update(encodedPayload)
    .digest('base64url');

  const suppliedSignature = Buffer.from(signature, 'base64url');
  const expectedBuffer = Buffer.from(expectedSignature, 'base64url');

  if (
    suppliedSignature.length !== expectedBuffer.length ||
    !timingSafeEqual(suppliedSignature, expectedBuffer)
  ) {
    return null;
  }

  try {
    const decodedPayload = JSON.parse(
      Buffer.from(encodedPayload, 'base64url').toString('utf8')
    ) as { name?: string; email?: string; phone?: string };

    return {
      name: decodedPayload.name || 'there',
      email: decodedPayload.email || '',
      phone: decodedPayload.phone || '',
    };
  } catch {
    return null;
  }
}

export { COOKIE_NAME };
