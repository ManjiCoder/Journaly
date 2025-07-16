import mongoose from 'mongoose';

const dairySchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.ObjectId, require: true },
    content: { type: String, require: true, trim: true },
    tags: { type: String, trim: true },
  },
  { timestamps: true }
);

const DairyModel =
  mongoose.models.dairy || mongoose.model('dairy', dairySchema);
export default DairyModel;
