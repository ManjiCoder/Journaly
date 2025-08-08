import { Schema, Types } from 'mongoose';

const expenseScheme = new Schema({
  user: { type: Types.ObjectId },
});
