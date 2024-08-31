import { NextRequest, NextResponse } from 'next/server';
import knex from 'knex';
import knexfile from '../../../../knexfile';
import jwt from 'jsonwebtoken';

const db = knex(knexfile.development);
const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret';

const verifyToken = (token: string) => {
  return new Promise((resolve, reject) => {
    jwt.verify(token, JWT_SECRET, (err, decoded) => {
      if (err) {
        reject(err);
      } else {
        resolve(decoded);
      }
    });
  });
};

export async function GET(request: NextRequest) {
  try {
    const authHeader = request.headers.get('Authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json({ message: 'Authorization header missing or invalid' }, { status: 401 });
    }

    const token = authHeader.replace('Bearer ', '');
    await verifyToken(token);

    const properties = await db('payments').select('*');
    return NextResponse.json(properties);
  } catch (error) {
    return NextResponse.json({ message: 'Invalid or expired token' }, { status: 401 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const authHeader = request.headers.get('Authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json({ message: 'Authorization header missing or invalid' }, { status: 401 });
    }

    const token = authHeader.replace('Bearer ', '');
    await verifyToken(token);

    const { tenant_id, amount, date_paid, settled } = await request.json();
    await db('payments').insert({ tenant_id, amount, date_paid, settled });

    return NextResponse.json({ message: 'Payment added successfully' });
  } catch (error) {
    return NextResponse.json({ message: 'Invalid or expired token' }, { status: 401 });
  }
}
