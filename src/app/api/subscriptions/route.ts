import { NextResponse } from 'next/server';
import { Resend } from 'resend';
import { CONFIG } from 'src/config-global';
import { WelcomeEmail } from 'src/emails/welcomeEmail';
import { supabase } from 'src/lib/supabase';
import { LanguageValue } from 'src/locales';
import { z } from 'zod';

const resend = new Resend(CONFIG.resend.apiKey);

const createUserSchema = z.object({
  email: z.string().email('Invalid email address'),
  product: z.string().min(1, 'Product is required'),
  language: z.nativeEnum(LanguageValue),
});

// POST /api/users
export const POST = async (request: Request) => {
  const body = await request.json();

  const validatedBody = createUserSchema.safeParse(body);

  if (!validatedBody.success) {
    return NextResponse.json(
      { error: 'Validation failed', details: validatedBody.error.errors },
      { status: 400 }
    );
  }

  const { product, email, language } = validatedBody.data;

  const { data, error } = await supabase
    .from('subscriptions')
    .insert({ email, product })
    .select('id')
    .single<{ id: number }>();

  if (error) {
    if (error.code === '23505') {
      return NextResponse.json({ error: 'already-subscribed', details: error }, { status: 400 });
    }
    return NextResponse.json({ error: 'failed-to-subscribe', details: error }, { status: 500 });
  }

  const emailHtml = await resend.emails.send({
    from: `${product} <onboarding@onama.io>`,
    to: email,
    subject: language === LanguageValue.FR ? `Bienvenue sur ${product}` : `Welcome to ${product}`,
    html: WelcomeEmail({ productName: product, language }),
  });

  if (emailHtml.error) {
    return NextResponse.json(
      { error: 'failed-to-send-email', details: emailHtml.error },
      { status: 500 }
    );
  }

  return NextResponse.json({ subscriptionId: data.id }, { status: 201 });
};

const addExpectedFeaturesSchema = z.object({
  subscriptionId: z.number().min(0, 'Subscription id is required'),
  features: z.array(z.string().min(1, 'Feature id is required')),
});

export const PUT = async (request: Request) => {
  const body = await request.json();

  const validatedBody = addExpectedFeaturesSchema.safeParse(body);

  if (!validatedBody.success) {
    return NextResponse.json(
      { error: 'Validation failed', details: validatedBody.error.errors },
      { status: 400 }
    );
  }

  const { subscriptionId, features } = validatedBody.data;

  const userQuery = await supabase
    .from('subscriptions')
    .select('id')
    .match({ id: subscriptionId })
    .maybeSingle<{ id: string }>();

  if (userQuery.error) {
    return NextResponse.json(
      { error: 'failed-to-get-user', details: userQuery.error },
      { status: 500 }
    );
  }

  const user = userQuery.data;

  if (!user) {
    return NextResponse.json(
      { error: 'user-not-found', details: 'User not found' },
      { status: 404 }
    );
  }

  // insert many
  const { error } = await supabase.from('expected_features').insert(
    features.map((f) => ({
      subscriptionId: user.id,
      feature: f,
    }))
  );

  if (error) {
    return NextResponse.json(
      { error: 'failed-to-add-expected-features', details: error },
      { status: 500 }
    );
  }

  return NextResponse.json({}, { status: 200 });
};

export const GET = async (request: Request) => {
  const { searchParams } = new URL(request.url);
  const subscriptionId = searchParams.get('subscriptionId');

  if (!subscriptionId) {
    return NextResponse.json({ error: 'Subscription id is required' }, { status: 400 });
  }

  const { error, count } = await supabase
    .from('expected_features')
    .select('*', { count: 'exact', head: true })
    .match({ subscriptionId });

  if (error) {
    return NextResponse.json(
      { error: 'failed-to-get-expected-features', details: error },
      { status: 500 }
    );
  }

  return NextResponse.json({ hasFeatures: count }, { status: 200 });
};
