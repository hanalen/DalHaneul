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

function LikeItem(prop: TimeLineProp) {
  const [record, setRecord] = useState<Record>();
  const [author, setAuthor] = useState<AppBskyActorDefs.ProfileViewBasic>();
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
  return <div className="p-1">likeItem</div>;
}

export default LikeItem;
