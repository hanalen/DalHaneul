import { AppBskyFeedDefs, AtpSessionData, BskyAgent } from '@atproto/api';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { ETabType } from './UISlice';

export interface FeedData {
  userCid: string;
  tabType: ETabType;
  feeds: AppBskyFeedDefs.FeedViewPost[];
}

export type FeedState = {
  feeds: FeedData[];
  updatedFeeds: AppBskyFeedDefs.FeedViewPost[];
};
const initialState: FeedState = {
  feeds: [],
  updatedFeeds: [],
};

export const feedSlice = createSlice({
  name: 'feed',
  initialState,
  reducers: {
    setFeeds: (state, action: PayloadAction<FeedData[]>) => {
      state.feeds = action.payload;
    },
    addFeed: (state, action: PayloadAction<FeedData>) => {
      state.feeds.push(action.payload);
    },
    updateFeed: (
      state,
      action: PayloadAction<AppBskyFeedDefs.FeedViewPost>
    ) => {
      const { cid, uri } = action.payload.post;
      for (const feed of state.feeds) {
        const index = feed.feeds.findIndex((x) => x.post.uri === uri);
        if (index === -1) continue;
        feed.feeds.splice(index, 1, action.payload);
      }
      state.updatedFeeds.push(action.payload);
      console.log('updateFeed', JSON.parse(JSON.stringify(state.updatedFeeds)));
    },
    removeUpdateFeed(
      state,
      action: PayloadAction<AppBskyFeedDefs.FeedViewPost>
    ) {
      const idx = state.updatedFeeds.findIndex(
        (feed) => feed.post.cid === action.payload.post.cid
      );
      if (idx !== -1) {
        state.updatedFeeds.splice(idx, 1);
      }
    },
    deleteFeed: (state, action: PayloadAction<FeedData>) => {
      const { userCid, tabType } = action.payload;
      const idx = state.feeds.findIndex(
        (feed) => feed.userCid === userCid && feed.tabType === tabType
      );
      if (idx !== -1) {
        state.feeds.splice(idx, 1);
      }
    },
  },
});

export default feedSlice.reducer;
