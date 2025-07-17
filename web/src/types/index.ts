export interface User {
  _id: string;
  name: string;
  email: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Data {
  success: boolean;
  message: string;
  data?: unknown;
  error?: unknown;
}
