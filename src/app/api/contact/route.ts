import { NextResponse } from 'next/server';
import { Resend } from 'resend';
import { CONFIG } from 'src/config-global';
import { z } from 'zod';

const resend = new Resend(CONFIG.resend.apiKey);

const sendContactMessage = z.object({
  email: z.string().email('Invalid email address'),
  product: z.string().min(1, 'Product is required'),
  message: z.string().min(1, 'Message is required'),
});

export const POST = async (request: Request) => {
  const body = await request.json();

  const validatedBody = sendContactMessage.safeParse(body);

  if (!validatedBody.success) {
    return NextResponse.json(
      { error: 'Validation failed', details: validatedBody.error.errors },
      { status: 400 }
    );
  }

  const { email, message, product } = validatedBody.data;

  const emailHtml = await resend.emails.send({
    from: 'Onama <contact@onama.io>',
    to: 'fabien.turgut@gmail.com',
    subject: 'Contact message for ' + product,
    html: `<div><p>From: ${email} for ${product}</p><p>Message: ${message}</p></div>`,
  });

  if (emailHtml.error) {
    return NextResponse.json(
      { error: 'failed-to-send-email', details: emailHtml.error },
      { status: 500 }
    );
  }

  return NextResponse.json({ message: 'Contact form submitted' });
};
