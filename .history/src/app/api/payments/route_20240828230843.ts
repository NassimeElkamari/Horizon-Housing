import { NextRequest, NextResponse } from 'next/server';
import knex from 'knex';
import knexfile from '../../../../knexfile';
import { authenticateToken } from '../../../../middleware'; // Adjust the import based on your actual file structure

const db = knex(knexfile.development);

export async function GET(request: NextRequest) {
  // Apply authentication middleware
  const authResponse = await authenticateToken(request);
  if (authResponse) return authResponse;

  try {
    const payments = await db('payments').select('*');
    return new NextResponse(JSON.stringify(payments), { status: 200 });
  } catch (error) {
    return new NextResponse(JSON.stringify({ message: 'Error fetching payments', error: error.message }), { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  // Apply authentication middleware
  const authResponse = await authenticateToken(request);
  if (authResponse) return authResponse;

  try {
    const { tenant_id, amount, date_paid, settled } = await request.json();
    await db('payments').insert({ tenant_id, amount, date_paid, settled });
    return new NextResponse(JSON.stringify({ message: 'Payment added successfully' }), { status: 201 });
  } catch (error) {
    return new NextResponse(JSON.stringify({ message: 'Error adding payment', error: error.message }), { status: 500 });
  }
}
