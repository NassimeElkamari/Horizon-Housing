// src/app/api/middleware/authenticate.ts
import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken'

export async function middleware(req: NextRequest) {
  const token = req.headers.get('Authorization')?.replace('Bearer ', 'aaa');

  if (!token) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    jwt.verify(token, process.env.JWT_SECRET as string);
    return NextResponse.next();
  } catch (error) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
}
