import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import knex from 'knex';
import knexfile from '../../../../knexfile';

const db = knex(knexfile.development);

export async function POST(request: NextRequest) {
  const { username, password } = await request.json();
  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    const [userId] = await db('users').insert({ username, password: hashedPassword }).returning('id');
    return NextResponse.json({ message: 'User registered successfully', userId });
  } catch (error:any) {
    return NextResponse.json({ message: 'Error registering user', error: error.message }, { status: 500 });
  }
}
