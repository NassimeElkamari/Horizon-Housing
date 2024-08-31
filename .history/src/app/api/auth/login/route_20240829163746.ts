import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import knex from 'knex';
import knexfile from '../../../../../knexfile';

const db = knex(knexfile.development);
const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret'; // Use an environment variable for security

export async function POST(request: NextRequest) {
  const { identifier, password } = await request.json(); // identifier can be email or username

  console.log('Received credentials:', { identifier, password }); // Debug log

  try {
    if (!identifier) {
      throw new Error('Identifier is required');
    }

    const user = await db('users')
      .where({ email: identifier }) 
      .orWhere({ username: identifier }) 
      .first(); 

    console.log('User found:', user); 

    if (!user) {
      return new NextResponse(JSON.stringify({ message: 'Invalid credentials' }), { status: 401 });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return new NextResponse(JSON.stringify({ message: 'Invalid credentials' }), { status: 401 });
    }

    // Generate JWT token
    const token = jwt.sign({ id: user.id, username: user.username }, JWT_SECRET, { expiresIn: '1h' });
    return new NextResponse(JSON.stringify({ message: 'Login successful', token }), { status: 200 });
  } catch (error: any) {
    console.error('Error logging in:', error); // Debug log
    return new NextResponse(JSON.stringify({ message: 'Error logging in', error: error.message }), { status: 500 });
  }
}
