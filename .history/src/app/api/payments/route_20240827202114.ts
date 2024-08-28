import { NextRequest, NextResponse } from 'next/server';
import knex from 'knex';
import knexfile from '../../../../knexfile';
import { middleware } from '../middleware/authenticate';

const db = knex(knexfile.development);

export async function GET(request: NextRequest) {
    await middleware(request);
  
    const properties = await db('tenants').select('*');
    return NextResponse.json(properties);
}

export async function POST(request: NextRequest) {
  const { tenant_id, amount, date_paid, settled } = await request.json();

  await db('payments').insert({ tenant_id, amount, date_paid, settled });

  return NextResponse.json({ message: 'Payment added successfully' });
}
