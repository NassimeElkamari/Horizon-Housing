import { NextRequest, NextResponse } from 'next/server';
import knex from 'knex';
import knexfile from '../../../../knexfile';
import { authenticateToken } from '../../../../middleware'; 
const db = knex(knexfile.development);

export async function GET(request: NextRequest) {
  // Apply authentication middleware
  const authResponse = await authenticateToken(request);
  if (authResponse) return authResponse;

  try {
    const properties = await db('properties').select('*');
    return new NextResponse(JSON.stringify(properties), { status: 200 });
  } catch (error: any) {
    return new NextResponse(JSON.stringify({ message: 'Error fetching properties', error: error.message }), { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  // Apply authentication middleware
  const authResponse = await authenticateToken(request);
  if (authResponse) return authResponse;

  const { name, address, type, number_of_units, rental_cost } = await request.json();

  try {
    await db('properties').insert({ name, address, type, number_of_units, rental_cost });
    return new NextResponse(JSON.stringify({ message: 'Property added successfully' }), { status: 201 });
  } catch (error: any) {
    return new NextResponse(JSON.stringify({ message: 'Error adding property', error: error.message }), { status: 500 });
  }
}
