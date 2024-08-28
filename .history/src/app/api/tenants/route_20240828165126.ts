import { NextRequest, NextResponse } from 'next/server';
import knex from 'knex';
import knexfile from '../../../../knexfile';
import { middleware } from '../../../../middleware';

const db = knex(knexfile.development);

export async function GET(request: NextRequest) {

    const properties = await db('tenants').select('*');
    return NextResponse.json(properties);
}
  

export async function POST(request: NextRequest) {
  const { name, contact_details, section, property_id } = await request.json();

  await db('tenants').insert({ name, contact_details, section, property_id });

  return NextResponse.json({ message: 'Tenant added successfully' });
}

export async function GET(request: NextRequest) {
  const url = new URL(request.url);
  const propertyId = url.searchParams.get('property_id');
  
  const query = db('tenants').select('*');
  
  if (propertyId) {
    query.where('property_id', propertyId);
  }
  
  const tenants = await query;
  return NextResponse.json(tenants);
}