import { NextRequest, NextResponse } from 'next/server';
import { myConfig } from './myConfig';
import { verifyToken } from './utils/auth';

export async function middleware(req: NextRequest) {
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
}
