import { NextRequest, NextResponse } from 'next/server';
import knex from 'knex';
import knexfile from '../../../../../knexfile';
import { authenticateToken } from '../../../../../middleware';

const db = knex(knexfile.development);


export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {

  const authResponse = await authenticateToken(request);
  if (authResponse) return authResponse;
  
  const id = parseInt(params.id, 10);
  await db('users').where('id', id).del();

  return NextResponse.json({ message: 'User deleted successfully' });
}
