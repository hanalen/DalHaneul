import {
  ProfileViewBasic,
  ProfileViewDetailed,
} from '@atproto/api/dist/client/types/app/bsky/actor/defs';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';

export enum ETabType {
  HOME,
  NOTIFICATION,
  FEED,
  LIST,
  PROFILE,
  SEARCH,
  FAVORITE,
}

export interface TabInfo {
  /**
   * 계정 고유 ID
   */
  did: string;
  /**
   * 계정명
   */
  handle: string;
  /**
   * 탭 타입
   */
  tabType: ETabType;
  /**
   * 메뉴 너비
   */
  width: number;
  /**
   * ProfileData
   */
  profileData?: ProfileViewBasic;
}

export type UIState = {
  tabs: TabInfo[];
};

const initialState: UIState = {
  tabs: [],
};

export const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    setTabs: (state, action: PayloadAction<TabInfo[]>) => {
      state.tabs = action.payload;
    },
    addTab(state, action: PayloadAction<TabInfo>) {
      state.tabs.push(action.payload);
    },
  },
});

export default uiSlice.reducer;
