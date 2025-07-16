import { z } from 'zod';

const dairySchema = z.object({
  userId: z.string().nonempty('UserId is required'),
  content: z.string().nonempty('Content is required'),
  // tags: z.string().nullable(),
});

export default dairySchema;
