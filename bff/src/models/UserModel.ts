import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
  {
    name: { type: String, trim: true, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
  },
  { timestamps: true }
);

type UserType = mongoose.InferSchemaType<typeof userSchema>;

const UserModel =
  (mongoose.models.User as mongoose.Model<UserType>) ||
  mongoose.model<UserType>('User', userSchema);
export default UserModel;
