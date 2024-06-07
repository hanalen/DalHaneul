import { ETabType, uiSlice } from '../../../store/UISlice';
import { RootState, store } from '../../../store/Store';
import {
  ProfileView,
  ProfileViewBasic,
} from '@atproto/api/dist/client/types/app/bsky/actor/defs';
import React, { useCallback, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

export interface UserItemProp {
  user: ProfileView;
}

function UserItem(prop: UserItemProp) {
  const { agent } = useSelector((state: RootState) => state.userState);
  const [user, setUser] = useState<ProfileView>(prop.user as ProfileView);
  const {
    did,
    handle,
    associated,
    avatar,
    description,
    displayName,
    indexedAt,
    viewer,
  } = { ...user };

  const [classButton, setClassButton] = useState<string>('bg-blue-400');
  const [textFollow, setTextFollow] = useState<string>('팔로우하기');

  const RequestFollow = useCallback(async () => {
    try {
      const result = await agent.follow(did);
      console.log(result);
      if (result.cid && result.uri) {
        setUser({ ...user, viewer: { following: result.uri } });
      }
    } catch (e) {
      console.log(e);
    }
  }, [user]);

  const RequestUnFollow = useCallback(async () => {
    try {
      if (!viewer?.following) return;
      const result = await agent.deleteFollow(viewer.following);
      console.log(result);
      setUser({ ...user, viewer: { following: '' } });
    } catch (e) {
      console.log(e);
    }
  }, [user]);

  const OnClickFollowButton = useCallback(() => {
    if (viewer?.following) {
      RequestUnFollow();
    } else {
      RequestFollow();
    }
  }, [user]);

  const OnClickAvatar = useCallback(() => {
    store.dispatch(
      uiSlice.actions.addTab({
        tabType: ETabType.PROFILE,
        width: 450,
        did: did,
        handle: handle,
        profileData: prop.user as ProfileViewBasic,
      })
    );
  }, []);

  useEffect(() => {
    if (!viewer) return;
    setClassButton(viewer?.following ? 'bg-red-400' : 'bg-blue-400');
    setTextFollow(viewer?.following ? '언팔로우하기' : '팔로우하기');
    if (prop.user.did === agent.session?.did) {
      setClassButton('bg-gray-400');
      setTextFollow('나예요');
    }
  }, [user]);

  return (
    <div className="p-1 w-full">
      <div className="w-full flex">
        <div className="shrink-0 p-1 cursor-pointer" onClick={OnClickAvatar}>
          {/* 프로필사진 영역 */}
          <img src={avatar} alt="profile" className="w-10 h-10 rounded" />
        </div>
        <div className="flex flex-col grow shrink p-1">
          {/* 텍스트영역 */}
          <div>
            <label className="text-wrap break-all">{`${displayName} / ${handle}`}</label>
          </div>
          <div>
            <label className="text-wrap break-all">{description}</label>
          </div>
        </div>
        <div className="w-24 shrink-0 text-center">
          <button
            className={`py-1 px-2 rounded-lg text-white w-full ${classButton}`}
            onClick={OnClickFollowButton}
          >
            {textFollow}
          </button>
        </div>
      </div>
    </div>
  );
}

export default UserItem;
