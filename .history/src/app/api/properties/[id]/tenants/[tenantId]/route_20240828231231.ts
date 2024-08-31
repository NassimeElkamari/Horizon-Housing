import { NextRequest, NextResponse } from 'next/server';
import knex from 'knex';
import knexfile from '../../../../../../../knexfile';
import { authenticateToken } from '../../../../../../../middleware'; // Adjust the path as necessary

const db = knex(knexfile.development);

export async function POST(request: NextRequest, { params }: { params: { propertyId: string, tenantId: string } }) {
  // Apply authentication middleware
  const authResponse = await authenticateToken(request);
  if (authResponse) return authResponse;

  const { propertyId, tenantId } = params;

  try {
    await db('property_tenants').insert({ property_id: propertyId, tenant_id: tenantId });
    return NextResponse.json({ message: 'Tenant added to property' });
  } catch (error: any) {
    return NextResponse.json({ message: 'Error adding tenant to property', error: error.message }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest, { params }: { params: { propertyId: string, tenantId: string } }) {
  // Apply authentication middleware
  const authResponse = await authenticateToken(request);
  if (authResponse) return authResponse;

  const { propertyId, tenantId } = params;

  try {
    await db('property_tenants').where({ property_id: propertyId, tenant_id: tenantId }).del();
    return NextResponse.json({ message: 'Tenant removed from property' });
  } catch (error: any) {
    return NextResponse.json({ message: 'Error removing tenant from property', error: error.message }, { status: 500 });
  }
}
