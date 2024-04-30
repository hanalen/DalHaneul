import { PayloadAction, createSlice } from '@reduxjs/toolkit';

export type UIState = {};
const initialState: UIState = {};

export const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    //
  },
});

export default uiSlice.reducer;
