import { jwtVerify } from 'jose';

export const verifyToken = async (token: string, secret: string) => {
  try {
    const encodeSecret = new TextEncoder().encode(secret);
    const { payload } = await jwtVerify(token, encodeSecret);
    return payload;
  } catch (err) {
    return null;
  }
};
