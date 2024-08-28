import { NextRequest, NextResponse } from 'next/server';
import knex from 'knex';
import config from '../../../../../knexfile';

const db = knex(knexfile.development);

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  const id = parseInt(params.id, 10);
  const { amount, date_paid, settled } = await request.json();

  await db('payments').where('id', id).update({ amount, date_paid, settled });

  return NextResponse.json({ message: 'Payment updated successfully' });
}
