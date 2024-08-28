import { NextRequest, NextResponse } from 'next/server';
import knex from 'knex';-----------------------------------------------------------;

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  const id = parseInt(params.id, 10);
  const { name, address, type, number_of_units, rental_cost } = await request.json();

  await db('properties').where('id', id).update({ name, address, type, number_of_units, rental_cost });

  return NextResponse.json({ message: 'Property updated successfully' });
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  const id = parseInt(params.id, 10);
  await db('properties').where('id', id).del();

  return NextResponse.json({ message: 'Property deleted successfully' });
}
