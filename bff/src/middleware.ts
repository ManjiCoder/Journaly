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
  // Public API
  const url = req.nextUrl;
  const origin = req.headers.get('origin');
  const whileListOrigin = ['http://localhost:5173'];
  const { method } = req;

  if (url.pathname === '/api/hello') {
    const res = NextResponse.next();
    res.headers.set('Access-Control-Allow-Origin', '*');
    res.headers.set('Access-Control-Allow-Methods', 'GET');
    return res;
  }
  // Private API
  else {
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
      return new NextResponse(
        JSON.stringify({
          success: false,
          message: 'Forbidden Access',
        }),
        { status: 403 }
      );
    }

    const res = NextResponse.next();
    res.headers.set('Access-Control-Allow-Origin', origin);
    res.headers.set(
      'Access-Control-Allow-Methods',
      'GET, POST, PATCH, PUT, DELETE'
    );
    res.headers.set(
      'Access-Control-Allow-Headers',
      'Content-Type, Authorization'
    );
    console.log(origin, res.headers);
    return res;
  }
}

export const config = {
  matcher: ['/api/:path*'],
};
