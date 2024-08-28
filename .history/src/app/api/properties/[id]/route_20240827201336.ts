import { NextRequest, NextResponse } from 'next/server';
import knex from 'knex';
import knexfile from '../../../../../knexfile';

const db = knex(knexfile.development);

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  const id = parseInt(params.id, 10);

  try {
    const property = await db('properties').where('id', id).first();

    if (!property) {
      return NextResponse.json({ message: 'Property not found' }, { status: 404 });
    }

    return NextResponse.json(property);
  } catch (error) {
    return NextResponse.json({ message: 'Error fetching property', error: error.message }, { status: 500 });
  }
}

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  const id = parseInt(params.id, 10);
  const { name, address, type, number_of_units, rental_cost } = await request.json();

  try {
    const updatedRows = await db('properties').where('id', id).update({ name, address, type, number_of_units, rental_cost });

    if (updatedRows === 0) {
      return NextResponse.json({ message: 'Property not found' }, { status: 404 });
    }

    return NextResponse.json({ message: 'Property updated successfully' });
  } catch (error) {
    return NextResponse.json({ message: 'Error updating property', error: error.message }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  const id = parseInt(params.id, 10);

  try {
    const deletedRows = await db('properties').where('id', id).del();

    if (deletedRows === 0) {
      return NextResponse.json({ message: 'Property not found' }, { status: 404 });
    }

    return NextResponse.json({ message: 'Property deleted successfully' });
  } catch (error) {
    return NextResponse.json({ message: 'Error deleting property', error: error.message }, { status: 500 });
  }
}
