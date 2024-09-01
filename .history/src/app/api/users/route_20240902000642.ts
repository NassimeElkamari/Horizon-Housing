import { NextRequest, NextResponse } from 'next/server';
import knex from 'knex';
import knexfile from '../../../../knexfile';
import { authenticateToken } from '../../../../middleware';

const db = knex(knexfile.development);

export async function GET(request: NextRequest) {
  
  const authResponse = await authenticateToken(request);
  if (authResponse) return authResponse;


  
  const query = db('users').select('*');
 
  const users = await query;
  return new NextResponse(JSON.stringify(users), { status: 200 });
}

