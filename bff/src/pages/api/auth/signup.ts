import UserModel from '@/models/UserModel';
import userSchema from '@/schemas/userSchema';
import { Data } from '@/types';
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
    const newUser = await UserModel.create(result.data);
    return res.status(201).json({
      success: true,
      message: 'Account Created Successfully',
      data: newUser,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: 'Server Error',
      error: err,
    });
  }
}
