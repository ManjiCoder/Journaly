import type { User } from '@/types';
import { createSlice } from '@reduxjs/toolkit';

const initialState: User | null = null;
const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    Login(state, action) {
      return action.payload;
    },
    Logout() {
      return null;
    },
  },
});

export const { Login, Logout } = userSlice.actions;
export const UserSlice = userSlice.reducer;
