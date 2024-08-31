import { NextRequest, NextResponse } from 'next/server';
import knex from 'knex';
import knexfile from '../../../../../knexfile';
import { authenticateToken } from '../../../../../middleware';

const db = knex(knexfile.development);

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  // Apply authentication middleware
  const authResponse = await authenticateToken(request);
  if (authResponse) return authResponse;

  const id = parseInt(params.id, 10);

  try {
    const property = await db('properties').where('id', id).first();

    if (!property) {
      return new NextResponse(JSON.stringify({ message: 'Property not found' }), { status: 404 });
    }

    return new NextResponse(JSON.stringify(property), { status: 200 });
  } catch (error: any) {
    return new NextResponse(JSON.stringify({ message: 'Error fetching property', error: error.message }), { status: 500 });
  }
}

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  // Apply authentication middleware
  const authResponse = await authenticateToken(request);
  if (authResponse) return authResponse;

  const id = parseInt(params.id, 10);
  const { name, address, type, number_of_units, rental_cost } = await request.json();

  try {
    const updatedRows = await db('properties').where('id', id).update({ name, address, type, number_of_units, rental_cost });

    if (updatedRows === 0) {
      return new NextResponse(JSON.stringify({ message: 'Property not found' }), { status: 404 });
    }

    return new NextResponse(JSON.stringify({ message: 'Property updated successfully' }), { status: 200 });
  } catch (error: any) {
    return new NextResponse(JSON.stringify({ message: 'Error updating property', error: error.message }), { status: 500 });
  }
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  // Apply authentication middleware
  const authResponse = await authenticateToken(request);
  if (authResponse) return authResponse;

  const id = parseInt(params.id, 10);

  try {
    const deletedRows = await db('properties').where('id', id).del();

    if (deletedRows === 0) {
      return new NextResponse(JSON.stringify({ message: 'Property not found' }), { status: 404 });
    }

    return new NextResponse(JSON.stringify({ message: 'Property deleted successfully' }), { status: 200 });
  } catch (error: any) {
    return new NextResponse(JSON.stringify({ message: 'Error deleting property', error: error.message }), { status: 500 });
  }
}
