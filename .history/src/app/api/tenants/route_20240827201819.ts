import { NextRequest, NextResponse } from 'next/server';
import knex from 'knex';
import knexfile from '../../../../knexfile';

const db = knex(knexfile.development);

export async function GET(request: NextRequest) {
    await middleware(request);
  
    const properties = await db('properties').select('*');
    return NextResponse.json(properties);
  }
  

export async function POST(request: NextRequest) {
  const { name, contact_details, section, property_id } = await request.json();

  await db('tenants').insert({ name, contact_details, section, property_id });

  return NextResponse.json({ message: 'Tenant added successfully' });
}
