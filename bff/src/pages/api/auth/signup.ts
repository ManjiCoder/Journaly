import UserModel from '@/models/UserModel';
import userSchema from '@/schemas/userSchema';
import { Data } from '@/types';
import dbConnect from '@/utils/dbConnect';
import bcrypt from 'bcryptjs';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method !== 'POST') {
    return res
      .status(405)
      .json({ success: false, message: 'Method Not Allowed' });
  }

  const result = userSchema.safeParse(req.body);
  //   console.log(result.error?.flatten()); // for debug

  if (!result.success) {
    return res.status(400).json({
      success: false,
      message: 'Invalid data',
      error: result.error?.flatten(),
    });
  }

  try {
    await dbConnect();
    const exisitingUser = await UserModel.findOne({ email: result.data.email });
    if (exisitingUser) {
      return res.status(400).json({
        success: false,
        message: `You already have an account with this ${result.data.email}`,
      });
    }

    const hassPass = await bcrypt.hash(result.data.password, 10);

    const newUser = await UserModel.create({
      ...result.data,
      password: hassPass,
    });
    return res.status(201).json({
      success: true,
      message: 'Account Created Successfully',
      data: newUser,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      success: false,
      message: 'Server Error',
    });
  }
}
