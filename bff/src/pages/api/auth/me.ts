import UserModel from '@/models/UserModel';
import { myConfig } from '@/myConfig';
import { Data } from '@/types';
import dbConnect from '@/utils/dbConnect';
import jwt from 'jsonwebtoken';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method !== 'GET') {
    return res.status(405).json({
      success: false,
      message: 'Method Not Allowed',
    });
  }

  try {
    await dbConnect();
    const token = req.headers.authorization?.replace('Bearer ', '');
    if (!token) {
      return res.status(401).json({
        success: false,
        message: 'Please autheticate using valid token',
      });
    }
    // const user = req.id;
    const jwtData: any = jwt.verify(token, myConfig.JWT_KEY);
    const user = await UserModel.findById(jwtData.id).select([
      '-password',
      '-__v',
    ]);

    res.status(200).json({
      success: true,
      message: 'User Verified Successfully',
      data: user,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      message: 'Server Error',
    });
  }
}
