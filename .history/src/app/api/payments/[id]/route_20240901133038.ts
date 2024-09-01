import { NextRequest, NextResponse } from 'next/server';
import knex from 'knex';
import knexfile from '../../../../../knexfile';
import { authenticateToken } from '../../../../../middleware'; 

const db = knex(knexfile.development);

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  
  const authResponse = await authenticateToken(request);
  if (authResponse) return authResponse;

  const id = parseInt(params.id, 10);

  try {
    const payment = await db('payments').where('id', id).first();

    if (!payment) {
      return new NextResponse(JSON.stringify({ message: 'Payment not found' }), { status: 404 });
    }

    return new NextResponse(JSON.stringify(payment), { status: 200 });
  } catch (error: any) {
    return new NextResponse(JSON.stringify({ message: 'Error fetching payment', error: error.message }), { status: 500 });
  }
}

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  // Apply authentication middleware
  const authResponse = await authenticateToken(request);
  if (authResponse) return authResponse;

  const id = parseInt(params.id, 10);
  const { amount, date_paid, settled } = await request.json();

  try {
    await db('payments').where('id', id).update({ amount, date_paid, settled });
    return new NextResponse(JSON.stringify({ message: 'Payment updated successfully' }), { status: 200 });
  } catch (error: any) {
    return new NextResponse(JSON.stringify({ message: 'Error updating payment', error: error.message }), { status: 500 });
  }
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  // Apply authentication middleware
  const authResponse = await authenticateToken(request);
  if (authResponse) return authResponse;

  const id = parseInt(params.id, 10);

  try {
    await db('payments').where('id', id).del();
    return new NextResponse(JSON.stringify({ message: 'Payment deleted successfully' }), { status: 200 });
  } catch (error: any) {
    return new NextResponse(JSON.stringify({ message: 'Error deleting payment', error: error.message }), { status: 500 });
  }
}
