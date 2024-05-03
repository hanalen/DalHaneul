import React, { useEffect, useState } from 'react';
import { AppBskyActorDefs, AppBskyFeedDefs, BskyAgent } from '@atproto/api';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { ETabType, Tab, uiSlice } from '@/store/UISlice';
import HomeIcon from '@mui/icons-material/Home';
import DragIndicatorIcon from '@mui/icons-material/DragIndicator';
import MenuIcon from './MenuIcon';
import { useCommon } from '../../Providers/CommonProvider';
import { SvgIcon, Icon, IconButton, Box } from '@mui/material';
import { RootState } from '../../store/Store';
import { Record } from '@/Interfaces/Record';

export interface TimeLineProp {
  feed: AppBskyFeedDefs.FeedViewPost;
}

function PostItem(prop: TimeLineProp) {
  const [record, setRecord] = useState<Record>();
  const [author, setAuthor] = useState<AppBskyActorDefs.ProfileViewBasic>();
  console.log(prop.feed.post.record);

  useEffect(() => {
    // record가 {} 타입이라 새로 타입 정의하여 사용
    setRecord(prop.feed.post.record as Record);
    setAuthor(prop.feed.post.author);
  }, []);
  return (
    <div>
      <div className="w-full flex p-1">
        <div>{/* 프로필사진 영역 */}</div>
        <div>
          {/* 텍스트영역 */}
          <div>{author?.displayName}</div>
          <div>{record?.text}</div>
        </div>
      </div>
      <div>{/* 카운터영역 */}</div>
      <div>{/* 이미지영역 */}</div>
    </div>
  );
}

export default PostItem;
