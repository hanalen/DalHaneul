import { PayloadAction, createSlice } from '@reduxjs/toolkit';

const defaultTabs: TimeLineTab[] = [
  {
    name: '홈',
    icon: 'home',
    width: 240,
  },
  {
    name: '알림',
    icon: 'notifications',
    width: 240,
  },
];

export interface TimeLineTab {
  /**
   * 계정 고유 ID
   */
  did?: string;
  /**
   * 계정명
   */
  handle?: string;
  /**
   * 메뉴명
   */
  name: string;
  /**
   * 메뉴 아이콘
   */
  icon: string;
  /**
   * 메뉴 너비
   */
  width: number;
}

export type UIState = {
  tabs: TimeLineTab[];
};

const initialState: UIState = {
  tabs: [
    {
      name: '홈',
      icon: 'home',
      width: 240,
    },
    {
      name: '알림',
      icon: 'notifications',
      width: 240,
    },
  ],
};

export const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    setTabs: (state, action: PayloadAction<TimeLineTab[]>) => {
      state.tabs = action.payload;
    },
  },
});

export default uiSlice.reducer;
