import { NextRequest, NextResponse } from 'next/server';
import knex from 'knex';
import knexfile from '../../../../../knexfile';

const db = knex(knexfile.development);

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {

    // Apply authentication middleware
    const authResponse = await authenticateToken(request);
    if (authResponse) return authResponse;
  
    const id = parseInt(params.id, 10);
  
    try {
      const property = await db('tenants').where('id', id).first();
  
      if (!property) {
        return NextResponse.json({ message: 'Tenant not found' }, { status: 404 });
      }
  
      return NextResponse.json(property);
    } catch (error:any) {
      return NextResponse.json({ message: 'Error fetching Tenant', error: error.message }, { status: 500 });
    }
  }

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  const id = parseInt(params.id, 10);
  const { name, contact_details, section } = await request.json();

  await db('tenants').where('id', id).update({ name, contact_details, section });

  return NextResponse.json({ message: 'Tenant updated successfully' });
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  const id = parseInt(params.id, 10);
  await db('tenants').where('id', id).del();

  return NextResponse.json({ message: 'Tenant deleted successfully' });
}
