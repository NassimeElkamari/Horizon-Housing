// middleware.ts
import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

const JWT_SECRET = 'J9m!7kL@l23&bX4Fz0^8aR';

export async function middleware(request: NextRequest) {
  const authHeader = request.headers.get('Authorization');
  const token = authHeader?.split(' ')[1];

  if (!token) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  try {
    jwt.verify(token, JWT_SECRET);
    return NextResponse.next();
  } catch (error) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }
}

// Protect specific paths by defining the config
export const config = {
  matcher: ['/api/tenants/:path*'], // Protect all routes under /api/tenants
};
