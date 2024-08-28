import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

const JWT_SECRET = 'a'; // Use an environment variable for the secret

export function middleware(request: NextRequest) {
  const protectedRoutes = ['/api/tenants'];

  if (protectedRoutes.some((route) => request.nextUrl.pathname.startsWith(route))) {
    const authHeader = request.headers.get('Authorization');
    console.log('Authorization Header:', authHeader);

    const token = authHeader?.split(' ')[1];
    console.log('Token:', token);

    if (!token) {
      return NextResponse.json({ message: 'No token provided' }, { status: 401 });
    }

    try {
      jwt.verify(token, JWT_SECRET);
      return NextResponse.next();
    } catch (error) {
      console.error('Token verification error:', error);
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: '/api/:path*',
};
