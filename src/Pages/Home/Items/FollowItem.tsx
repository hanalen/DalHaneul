import React, { useCallback, useEffect, useState } from 'react';
import { AppBskyActorDefs, AppBskyFeedDefs, BskyAgent } from '@atproto/api';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { ETabType, TabInfo, uiSlice } from '@/store/UISlice';
import HomeIcon from '@mui/icons-material/Home';
import DragIndicatorIcon from '@mui/icons-material/DragIndicator';
import MenuIcon from '../MenuIcon';
import { useCommon } from '../../../Providers/CommonProvider';
import { SvgIcon, Icon, IconButton, Box } from '@mui/material';
import { RootState } from '../../../store/Store';
import { Record } from '@/Interfaces/Record';
import {
  EDialogType,
  useGlobalDialog,
} from '../../../Dialogs/GlobalDialogProvider';

export interface TimeLineProp {
  feed: AppBskyFeedDefs.FeedViewPost;
}

function FollowItem(prop: TimeLineProp) {
  const [record, setRecord] = useState<Record>();
  const [author, setAuthor] = useState<AppBskyActorDefs.ProfileView>();
  const { agent } = useSelector((state: RootState) => state.userState);

  const dialog = useGlobalDialog();

  const RequestRepost = useCallback(async () => {
    const { uri, cid } = { ...prop.feed.post };
    try {
      const result = await agent.repost(uri, cid);
      console.log(result);
    } catch (e) {
      console.log(e);
    }
  }, []);

  useEffect(() => {
    // record가 {} 타입이라 새로 타입 정의하여 사용
    setRecord(prop.feed.post.record as Record);
    setAuthor(prop.feed.post.author);
  }, []);
  return (
    <div className="p-1">
      <div className="w-full flex">
        <div className="shrink-0 p-1">
          {/* 프로필사진 영역 */}
          <img
            src={author?.avatar}
            alt="profile"
            className="w-10 h-10 rounded"
          />
        </div>
        <div>
          <label className="text-base">
            {`${author?.displayName} / ${author?.handle}`}님이 팔로우했습니다.
          </label>
          <br />
          <label>{author?.description}</label>
          <br />
          <button className="py-1 px-2 bg-blue-400 rounded-lg text-white">
            {author?.viewer?.following ? '언팔로우하기' : '팔로우하기'}
          </button>
        </div>
      </div>
    </div>
  );
}

export default FollowItem;
