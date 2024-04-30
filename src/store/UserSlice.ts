import { AtpSessionData, BskyAgent } from '@atproto/api';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';

export type UserState = {
  /**
   * 선택된 에이전트(유저)
   */
  agent: BskyAgent;
  /**
   * 에이전트(유저) 목록
   */
  agents: BskyAgent[];
};
const initialState: UserState = {
  agent: new BskyAgent({
    service: 'https://bsky.social',
  }),
  agents: [],
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setSelectAgent: (state, action: PayloadAction<BskyAgent>) => {
      Object.assign(state.agent, action.payload);
    },
    setAgents: (state, action: PayloadAction<BskyAgent[]>) => {
      Object.assign(state.agents, action.payload);
    },
    setSession: (state, action: PayloadAction<AtpSessionData>) => {
      state.agent.session = action.payload;
      console.log('setSession', state.agent.session);
    },
  },
});

export default userSlice.reducer;
