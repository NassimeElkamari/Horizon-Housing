import { NextRequest, NextResponse } from 'next/server';
import knex from 'knex';
import config from '../../../../../knexfile';

const db = knex(config);

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
