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
};
const initialState: FeedState = {
  feeds: [],
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
      const { userCid, tabType, feeds } = action.payload;
      const idx = state.feeds.findIndex(
        (feed) => feed.userCid === userCid && feed.tabType === tabType
      );
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
