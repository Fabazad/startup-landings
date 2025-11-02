import { NextResponse } from 'next/server';
import { supabase } from 'src/lib/supabase';
import { z } from 'zod';

// Schéma Zod pour valider le corps de la requête
const createUserSchema = z.object({
  email: z.string().email('Invalid email address'),
  product: z.string().min(1, 'Product is required'),
});

// POST /api/users
export const POST = async (request: Request) => {
  const body = await request.json();

  // Valider avec Zod
  const validatedBody = createUserSchema.safeParse(body);

  if (!validatedBody.success) {
    return NextResponse.json(
      { error: 'Validation failed', details: validatedBody.error.errors },
      { status: 400 }
    );
  }

  const { data, error } = await supabase.from('subscriptions').insert({
    email: validatedBody.data.email,
    product: validatedBody.data.product,
  });

  if (error) {
    if (error.code === '23505') {
      return NextResponse.json({ error: 'already-subscribed', details: error }, { status: 400 });
    }
    return NextResponse.json({ error: 'failed-to-subscribe', details: error }, { status: 500 });
  }

  return NextResponse.json({ subscription: data }, { status: 201 });
};
