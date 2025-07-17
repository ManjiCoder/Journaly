// store/userSlice.ts
import type { User } from '@/types';
import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

type UserState = User | null;

const userSlice = createSlice({
  name: 'user',
  initialState: null as UserState,
  reducers: {
    Login(_state, action: PayloadAction<User>) {
      return action.payload;
    },
    Logout() {
      return null;
    },
  },
});

export const { Login, Logout } = userSlice.actions;

export default userSlice.reducer;
