import { NextRequest, NextResponse } from 'next/server';
import { myConfig } from './myConfig';
import { verifyToken } from './utils/auth';

const verifyUser = async (req: NextRequest) => {
  try {
    const res = NextResponse.next();
    const token = req.headers
      .get('authorization')
      ?.replace('Bearer ', '') as string;
    const payload = await verifyToken(token, myConfig.JWT_KEY);
    // console.log(payload);

    // res.headers.set('x-id', payload.id);

    return res;
  } catch (err) {
    console.error(err);
  }
};
export async function middleware(req: NextRequest) {
  // const url = req.nextUrl;
  const origin = req.headers.get('origin');
  const whileListOrigin = ['http://localhost:5173'];
  const { method } = req;

  // Handle preflight
  if (method === 'OPTIONS') {
    return new NextResponse(null, {
      status: 204,
      headers: {
        'Access-Control-Allow-Origin': whileListOrigin.includes(origin || '')
          ? origin!
          : '',
        'Access-Control-Allow-Methods': 'GET, POST, PATCH, PUT, DELETE',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      },
    });
  }

  // Block unknown origins
  if (!origin || !whileListOrigin.includes(origin)) {
    const token = req.headers
      .get('authorization')
      ?.replace('Bearer ', '') as string;
    if (!token) {
      return new NextResponse(
        JSON.stringify({
          success: false,
          message: 'Please autheticate using a valid token',
        }),
        { status: 401 }
      );
    }
    const payload = await verifyToken(token, myConfig.JWT_KEY);
    // console.log(payload);

    // res.headers.set('x-id', payload.id);
    if (!payload) {
      return new NextResponse(
        JSON.stringify({
          success: false,
          message: 'Invalid token',
        }),
        { status: 401 }
      );
    }
  }

  const res = NextResponse.next();
  res.headers.set('Access-Control-Allow-Origin', origin!);
  res.headers.set(
    'Access-Control-Allow-Methods',
    'GET, POST, PATCH, PUT, DELETE'
  );
  res.headers.set(
    'Access-Control-Allow-Headers',
    'Content-Type, Authorization'
  );
  return res;
}

export const config = {
  matcher: ['/api/dairy'],
};
