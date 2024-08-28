// pages/api/properties/[propertyId]/tenants/[tenantId].ts

import { NextRequest, NextResponse } from 'next/server';
import knex from 'knex';
import knexfile from '../../../../knexfile';

const db = knex(knexfile.development);

export async function POST(request: NextRequest, { params }: { params: { propertyId: string, tenantId: string } }) {
  const { propertyId, tenantId } = params;

  try {
    await db('property_tenants').insert({ property_id: propertyId, tenant_id: tenantId });
    return NextResponse.json({ message: 'Tenant added to property' });
  } catch (error) {
    return NextResponse.json({ message: 'Error adding tenant to property', error: error.message }, { status: 500 });
  }
}
