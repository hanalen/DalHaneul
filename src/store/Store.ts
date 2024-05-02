import { configureStore } from '@reduxjs/toolkit';
import uiReducer from './UISlice';
import userSlice from './UserSlice';
import postReducer from './PostSlice';

export const store = configureStore({
  reducer: {
    userState: userSlice,
    uiState: uiReducer,
    postState: postReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      //A non-serializable value was detected in the state, in the path: `userState.agent`. Value
      //위 에러 회피용 코드, serialize가 안 되는 값을 체크하는 미들웨어를 끔
      serializableCheck: false,
    }),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// // Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
// export type AppDispatch = typeof store.dispatch;
