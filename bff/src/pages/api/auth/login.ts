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
  if (!result.success) {
    return res.status(400).json({
      success: false,
      message: 'Invalid Data',
      error: result.error.flatten(),
    });
  }

  try {
    await dbConnect();

    const exisitingUser = await UserModel.findOne({ email: result.data.email });
    if (!exisitingUser) {
      return res.status(404).json({
        success: false,
        message: `We do not have any account with this ${result.data.email}`,
      });
    }

    const isSamePass = await bcrypt.compare(
      result.data.password,
      exisitingUser.password
    );
    if (!isSamePass) {
      return res.status(400).json({
        success: false,
        message: 'Incorrect Password',
      });
    }
    return res.status(200).json({
      success: true,
      message: 'Login Successfully',
      data: exisitingUser,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      message: 'Server Error',
    });
  }
}
