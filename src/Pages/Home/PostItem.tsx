import React, { useCallback, useEffect, useState } from 'react';
import { AppBskyActorDefs, AppBskyFeedDefs, BskyAgent } from '@atproto/api';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { ETabType, TabInfo, uiSlice } from '@/store/UISlice';
import HomeIcon from '@mui/icons-material/Home';
import DragIndicatorIcon from '@mui/icons-material/DragIndicator';
import MenuIcon from './MenuIcon';
import { useCommon } from '../../Providers/CommonProvider';
import { SvgIcon, Icon, IconButton, Box } from '@mui/material';
import { RootState } from '../../store/Store';
import { Record } from '@/Interfaces/Record';
import {
  EDialogType,
  useGlobalDialog,
} from '../../Dialogs/GlobalDialogProvider';

export interface TimeLineProp {
  feed: AppBskyFeedDefs.FeedViewPost;
}

function PostItem(prop: TimeLineProp) {
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

  const ConfirmReply = useCallback(() => {
    console.log('on confirm');
  }, []);

  const OnClickRepost = useCallback(() => {
    dialog.OpenDialog({
      content: '리포스트 하시겠습니까?',
      title: '알림',
      onConfirm: () => RequestRepost,
      type: EDialogType.CONFIRM,
    });
  }, []);

  const OnClickReply = useCallback(() => {
    //
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
        <div className="flex flex-col">
          {/* 텍스트영역 */}
          <div>{`${author?.displayName} / ${author?.handle}`}</div>
          <div>{record?.text}</div>
          <div className="text-sm flex justify-between w-full grow">
            {/* 카운터영역 */}
            <button className="mr-1" onClick={OnClickReply}>
              <div className="flex justify-center">
                <div className="flex flex-col justify-center">
                  <Icon fontSize="inherit" className="mr-1">
                    reply
                  </Icon>
                </div>
                <span>{prop.feed.post.replyCount}</span>
              </div>
            </button>
            <button className="mr-1" onClick={OnClickRepost}>
              <div className="flex justify-center">
                <div className="flex flex-col justify-center">
                  <Icon fontSize="inherit" className="mr-1">
                    sync alt
                  </Icon>
                </div>
                <span>{prop.feed.post.repostCount}</span>
              </div>
            </button>
          </div>
        </div>
      </div>

      <div>{/* 이미지영역 */}</div>
    </div>
  );
}

export default PostItem;
