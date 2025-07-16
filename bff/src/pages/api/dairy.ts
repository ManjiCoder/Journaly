// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import DairyModel from '@/models/DairyModel';
import dairySchema from '@/schemas/dairySchema';
import { Data } from '@/types';
import dbConnect from '@/utils/dbConnect';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const { method } = req;

  switch (method) {
    case 'GET':
      try {
        await dbConnect();
        const data = await DairyModel.find({});
        res.status(200).json({ success: true, data });
      } catch (err) {
        console.error(err);
        res
          .status(500)
          .json({ success: false, message: 'Server Error', error: err });
      }
      break;

    case 'POST':
      try {
        const result = dairySchema.safeParse(req.body);
        if (!result.success) {
          return res.status(400).json({
            success: false,
            message: 'Invalid Data',
            error: result.error.flatten(),
          });
        }
        await dbConnect();
        const newEntry = await DairyModel.create(result.data);
        res.status(201).json({
          success: true,
          message: 'New Memory Added Successfully',
          data: newEntry,
        });
      } catch (err) {
        console.error(err);
        res
          .status(500)
          .json({ success: false, message: 'Server Error', error: err });
      }
      break;

    default:
      res.status(405).json({ success: false, message: 'Method Not Allowed' });
      break;
  }
}
