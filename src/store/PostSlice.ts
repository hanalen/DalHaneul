import { PayloadAction, createSlice } from '@reduxjs/toolkit';

export interface Posting {
  content: string;
  images: string[];
}

export type PostState = {
  postings: Posting[];
};

const initialState: PostState = {
  postings: [{ content: '', images: [] }],
};

export interface ActionChangePosting {
  index: number;
  content: string;
  images: string[];
}

export const postSlice = createSlice({
  name: 'post',
  initialState,
  reducers: {
    onChangePosting: (state, action: PayloadAction<ActionChangePosting>) => {
      state.postings[action.payload.index] = {
        content: action.payload.content,
        images: action.payload.images,
      };
    },
    addPost: (state) => {
      state.postings.push({ content: '', images: [] });
    },
    removePost: (state, action: PayloadAction<number>) => {
      state.postings.splice(action.payload, 1);
    },
  },
});

export default postSlice.reducer;
