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

export interface Tab {
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
}

export type UIState = {
  tabs: Tab[];
};

const initialState: UIState = {
  tabs: [],
};

export const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    setTabs: (state, action: PayloadAction<Tab[]>) => {
      state.tabs = action.payload;
    },
  },
});

export default uiSlice.reducer;
