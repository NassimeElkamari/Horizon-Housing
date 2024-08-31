import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret';

export async function authenticateToken(request: NextRequest) {
  console.log('running..');
  
  const authHeader = request.headers.get('Authorization');
  const token = authHeader?.split(' ')[1];

  if (!token) {
    return new NextResponse(JSON.stringify({ message: 'Unothorized' }), { status: 401 });
  }

  try {
    const user = jwt.verify(token, JWT_SECRET);
    (request as any).user = user;
    return null;
  } catch (err) {
    return new NextResponse(JSON.stringify({ message: 'Unothorized' }), { status: 403 });
  }
}
