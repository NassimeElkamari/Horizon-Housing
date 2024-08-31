import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret';

export async function authenticateToken(request: NextRequest) {
  log
  const authHeader = request.headers.get('Authorization');
  const token = authHeader?.split(' ')[1]; // Extract token from "Bearer <token>"

  if (!token) {
    return new NextResponse(JSON.stringify({ message: 'Token required' }), { status: 401 });
  }

  try {
    const user = jwt.verify(token, JWT_SECRET);
    // Attach user information to the request object
    (request as any).user = user;
    return null; // No response, proceed to the route handler
  } catch (err) {
    return new NextResponse(JSON.stringify({ message: 'Invalid token' }), { status: 403 });
  }
}
