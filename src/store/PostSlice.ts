import { FeedViewPost } from '@atproto/api/dist/client/types/app/bsky/feed/defs';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';

export interface Posting {
  text: string;
  images: string[];
}

export type PostState = {
  postings: Posting[];
  replyFeed: FeedViewPost | undefined;
};

const initialState: PostState = {
  postings: [{ text: '', images: [] }],
  replyFeed: undefined,
};

export interface ActionChangePosting {
  index: number;
  text: string;
  images: string[];
}

export interface ActionRemoveImage {
  postIndex: number;
  imageIndex: number;
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
    removeImage: (state, action: PayloadAction<ActionRemoveImage>) => {
      const { postings } = { ...state };
      const post = postings[action.payload.postIndex];
      post.images.splice(action.payload.imageIndex, 1);
    },
    setReplyFeed: (state, action: PayloadAction<FeedViewPost | undefined>) => {
      state.replyFeed = action.payload;
    },
    clear: (state) => {
      state.postings = [{ text: '', images: [] }];
      state.replyFeed = undefined;
    },
  },
});

export default postSlice.reducer;
