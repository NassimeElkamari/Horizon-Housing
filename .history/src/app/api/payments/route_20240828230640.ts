import { NextRequest, NextResponse } from 'next/server';
import knex from 'knex';
import knexfile from '../../../../knexfile';

const db = knex(knexfile.development);

export async function GET(request: NextRequest) {
  
    const properties = await db('payments').select('*');
    return NextResponse.json(properties);
}

export async function POST(request: NextRequest) {
  const { tenant_id, amount, date_paid, settled } = await request.json();

  await db('payments').insert({ tenant_id, amount, date_paid, settled });

  return NextResponse.json({ message: 'Payment added successfully' });
}
