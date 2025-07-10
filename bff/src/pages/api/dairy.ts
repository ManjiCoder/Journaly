// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import DairyModel from '@/models/DairyModel';
import dbConnect from '@/utils/dbConnect';
import type { NextApiRequest, NextApiResponse } from 'next';

type Data = {
  status: string;
  message?: string;
  data?: any;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const { method } = req;
  await dbConnect();
  switch (method) {
    case 'GET':
      const data = await DairyModel.find({});
      res.status(200).json({ status: 'ok', data });
      break;

    case 'POST':
      console.log(req.body);

      if (!req.body) {
        return res
          .status(400)
          .json({ status: 'err', message: 'No Data Provided' });
      }
      const newEntry = await DairyModel.create(req.body);
      res.status(201).json({ status: 'ok', data: newEntry });
      break;

    default:
      res
        .status(200)
        .json({ status: 'ok', message: 'Jai Shree Ganeshaya Namaha' });
      break;
  }
}
