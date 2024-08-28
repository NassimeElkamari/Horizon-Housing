import { NextRequest, NextResponse } from 'next/server';
import knex from 'knex';
import config from '../../../../knexfile';

const db = knex(config);

export async function POST(request: NextRequest) {
  const { name, contact_details, section, property_id } = await request.json();

  await db('tenants').insert({ name, contact_details, section, property_id });

  return NextResponse.json({ message: 'Tenant added successfully' });
}
