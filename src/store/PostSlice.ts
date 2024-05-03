import { PayloadAction, createSlice } from '@reduxjs/toolkit';

export interface Posting {
  text: string;
  images: string[];
}

export type PostState = {
  postings: Posting[];
};

const initialState: PostState = {
  postings: [{ text: '', images: [] }],
};

export interface ActionChangePosting {
  index: number;
  text: string;
  images: string[];
}

export const postSlice = createSlice({
  name: 'post',
  initialState,
  reducers: {
    onChangePosting: (state, action: PayloadAction<ActionChangePosting>) => {
      state.postings[action.payload.index] = {
        text: action.payload.text,
        images: action.payload.images,
      };
    },
    addPost: (state) => {
      state.postings.push({ text: '', images: [] });
    },
    removePost: (state, action: PayloadAction<number>) => {
      state.postings.splice(action.payload, 1);
    },
  },
});

export default postSlice.reducer;
