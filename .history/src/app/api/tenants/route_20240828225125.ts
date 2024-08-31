import { NextRequest, NextResponse } from 'next/server';
import knex from 'knex';
import knexfile from '../../../../knexfile';
import { authenticateToken } from '../../../../middleware';

const db = knex(knexfile.development);

export async function GET(request: NextRequest) {
  // Apply authentication middleware
  const authResponse = authenticateToken(request, NextResponse, () => {});
  if (authResponse) return authResponse;

  const url = new URL(request.url);
  const propertyId = url.searchParams.get('property_id');
  
  const query = db('tenants').select('*');
  
  if (propertyId) {
    query.where('property_id', propertyId);
  }
  
  const tenants = await query;
  return NextResponse.json(tenants);
}

export async function POST(request: NextRequest) {
  // Apply authentication middleware
  const authResponse = authenticateToken(request, NextResponse, () => {});
  if (authResponse) return authResponse;

  const { name, contact_details, section, property_id } = await request.json();

  await db('tenants').insert({ name, contact_details, section, property_id });

  return NextResponse.json({ message: 'Tenant added successfully' });
}
