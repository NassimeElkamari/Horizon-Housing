import { NextRequest, NextResponse } from 'next/server';
import knex from 'knex';
import knexfile from '../../../../../knexfile';

const db = knex(knexfile.development);

export async function GET() {
  const properties = await db('properties').select('*');
  return NextResponse.json(properties);
}

export async function POST(request: NextRequest) {
  const { name, address, type, number_of_units, rental_cost } = await request.json();

  await db('properties').insert({ name, address, type, number_of_units, rental_cost });
  
  return NextResponse.json({ message: 'Property added successfully' });
}
