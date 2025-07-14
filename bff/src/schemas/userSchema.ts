import { z } from 'zod';

const userSchema = z.object({
  name: z.string().nonempty('Name is required'),
  email: z.email().nonempty('Email is required'),
  password: z
    .string()
    .nonempty('Password is required')
    .min(3, 'Password should be atleast 3 characters')
    .max(50, 'Password should be maximum of 50 characters'),
});

export default userSchema;
