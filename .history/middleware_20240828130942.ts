import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret'; // Use an environment variable for the secret

export function middleware(request: NextRequest) {
  console.log("Middleware is running...");

  const protectedRoutes = ['/api/tenants'];
  
  if (protectedRoutes.some((route) => request.nextUrl.pathname.startsWith(route))) {
    const token = request.headers.get('Authorization')?.split(' ')[1];
    console.log("Token:", token);

    if (!token) {
      console.log("No token provided");
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    try {
      jwt.verify(token, JWT_SECRET);
      console.log("Token verified successfully");
      return NextResponse.next();
    } catch (error) {
      console.log("Token verification failed");
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }
  }

  return NextResponse.next(); // Allow requests to other routes
}


export const config = {
  matcher: '/api/:path*', // Protect all API routes
};
