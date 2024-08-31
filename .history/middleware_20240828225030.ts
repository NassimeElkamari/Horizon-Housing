import jwt from 'jsonwebtoken';
import { NextRequest, NextResponse } from 'next/server';

const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret';

export function authenticateToken(req: NextRequest, res: NextResponse, next: Function) {
  const authHeader = req.headers.get('Authorization');
  const token = authHeader?.split(' ')[1]; // Extract token from "Bearer <token>"

  if (!token) {
    return new NextResponse(JSON.stringify({ message: 'Token required' }), { status: 401 });
  }

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) {
      return new NextResponse(JSON.stringify({ message: 'Invalid token' }), { status: 403 });
    }
    
    // Attach user information to the request object
    (req as any).user = user;
    return next();
  });
}
