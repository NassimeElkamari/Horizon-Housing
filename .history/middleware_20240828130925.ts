import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret'; // Use an environment variable for the secret

export function middleware(request: NextRequest) {
  console.log("Middleware is running...");

  // Specify which routes to protect
  const protectedRoutes = ['/api/tenants'];

  // Check if the request path matches any of the protected routes
  if (protectedRoutes.some((route) => request.nextUrl.pathname.startsWith(route))) {
    const token = request.headers.get('Authorization')?.split(' ')[1]; // Get the token from the Authorization header
    console.log(token);
    

    if (!token) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    try {
      jwt.verify(token, JWT_SECRET); // Verify the token
      return NextResponse.next(); // Allow the request to proceed
    } catch (error) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }
  }

  return NextResponse.next(); // Allow requests to other routes
}

export const config = {
  matcher: '/api/:path*', // Protect all API routes
};
