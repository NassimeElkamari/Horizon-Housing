import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import knex from 'knex';
import knexfile from '../../../../knexfile';

const db = knex(knexfile.development);
const JWT_SECRET = 'your_jwt_secret'; // Use an environment variable for the secret

export async function POST(request: NextRequest) {
  const { username, password } = await request.json();

  try {
    const [user] = await db('users').where({ username });
    if (!user) {
      return NextResponse.json({ message: 'Invalid credentials' }, { status: 401 });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return NextResponse.json({ message: 'Invalid credentials' }, { status: 401 });
    }

    const token = jwt.sign({ id: user.id, username: user.username }, JWT_SECRET, { expiresIn: '1h' });
    return NextResponse.json({ message: 'Login successful', token });
  } catch (error:any) {
    return NextResponse.json({ message: 'Error logging in', error: error.message }, { status: 500 });
  }
}
