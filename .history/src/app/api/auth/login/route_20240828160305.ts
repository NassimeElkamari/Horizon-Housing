import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import knex from 'knex';
import knexfile from '../../../../../knexfile';

const db = knex(knexfile.development);
const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret'; // Use an environment variable for security

export async function POST(request: NextRequest) {
  const { identifier, password } = await request.json(); // identifier can be email or username

  try {
    // Search for the user by email or username
    const [user] = await db('users')
      .where({ username: identifier })
      .orWhere({ email: identifier });

    if (!user) {
      return NextResponse.json({ message: 'Invalid credentials' }, { status: 401 });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return NextResponse.json({ message: 'Invalid credentials' }, { status: 401 });
    }

    // Generate JWT token
    const token = jwt.sign({ id: user.id, username: user.username }, JWT_SECRET, { expiresIn: '1h' });
    return NextResponse.json({ message: 'Login successful', token });
  } catch (error: any) {
    return NextResponse.json({ message: 'Error logging in', error: error.message }, { status: 500 });
  }
}
