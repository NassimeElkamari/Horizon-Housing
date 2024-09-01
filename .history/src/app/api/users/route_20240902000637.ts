import { NextRequest, NextResponse } from 'next/server';
import knex from 'knex';
import knexfile from '../../../../knexfile';
import { authenticateToken } from '../../../../middleware';

const db = knex(knexfile.development);

export async function GET(request: NextRequest) {
  
  const authResponse = await authenticateToken(request);
  if (authResponse) return authResponse;


  
  const query = db('users').select('*');
 
  const users = await query;
  return new NextResponse(JSON.stringify(users), { status: 200 });
}

export async function POST(request: NextRequest) {
  
  const authResponse = await authenticateToken(request);
  if (authResponse) return authResponse;

  const { name, contact_details, section, property_id } = await request.json();

  await db('tenants').insert({ name, contact_details, section, property_id });

  return new NextResponse(JSON.stringify({ message: 'Tenant added successfully' }), { status: 201 });
}
