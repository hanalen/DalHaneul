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
import { RootState, store } from '../../../store/Store';
import { Record } from '@/Interfaces/Record';
import {
  EDialogType,
  useGlobalDialog,
} from '../../../Dialogs/GlobalDialogProvider';
import { postSlice } from '../../../store/PostSlice';
import { feedSlice } from '../../../store/FeedSlice';

export interface TimeLineProp {
  isShowBottom: boolean;
  feed: AppBskyFeedDefs.FeedViewPost;
  post: AppBskyFeedDefs.PostView;
}

function PostItem(prop: TimeLineProp) {
  const [record, setRecord] = useState<Record>();
  const [author, setAuthor] = useState<AppBskyActorDefs.ProfileViewBasic>();
  const [classRepost, setClassRepost] = useState<string>('');
  const [classLike, setClassLike] = useState<string>('');
  const { agent } = useSelector((state: RootState) => state.userState);

  const dialog = useGlobalDialog();

  useEffect(() => {
    if (!prop.post) return;
    setRecord(prop.post.record as Record);
    setAuthor(prop.post.author);
    const isRepost = prop.post.viewer?.repost || false;
    setClassRepost(isRepost ? 'text-blue-500' : '');
    const isLike = prop.post.viewer?.like || false;
    setClassLike(isLike ? 'text-red-500' : '');
  }, [prop.post]);

  const ConfirmRepost = useCallback(async (result: boolean) => {
    if (!result) return;
    let resultRepost = undefined;
    if (prop.post.viewer?.repost) {
      resultRepost = await RequestDeleteRepost();
    } else {
      resultRepost = await RequestRepost();
    }
    if (!resultRepost) return;
    const post = await RequestPost();
    if (!post) return;

    if (post.posts.length !== 1) return;

    const updatedPost = post.posts[0];
    store.dispatch(feedSlice.actions.updateFeed({ post: updatedPost }));
  }, []);

  const RequestPost = useCallback(async () => {
    try {
      const post = await agent.getPosts({
        uris: [prop.post.uri],
      });
      return post.data;
    } catch (e) {
      console.log(e);
    }
  }, []);

  const RequestDeleteRepost = useCallback(async () => {
    const { repost } = { ...prop.post.viewer };
    if (!repost) return;

    try {
      await agent.deleteRepost(repost);
      //no response
      return true;
    } catch (e) {
      console.log(e);
    }
  }, []);

  const RequestRepost = useCallback(async () => {
    const { uri, cid } = { ...prop.post };
    try {
      const result = await agent.repost(uri, cid);
      console.log(result);
      return result;
    } catch (e) {
      console.log(e);
    }
  }, []);

  const ConfirmReply = useCallback(() => {
    console.log('on confirm');
  }, []);

  const OnClickRepost = useCallback(() => {
    const { post } = { ...prop };
    const message = post.viewer?.repost
      ? '리포스트를 취소하시겠습니까?'
      : '리포스트 하시겠습니까?';
    dialog.OpenDialog({
      content: message,
      title: '알림',
      onConfirm: () => ConfirmRepost,
      type: EDialogType.CONFIRM,
    });
  }, [prop.post]);

  const OnClickReply = useCallback(() => {
    store.dispatch(postSlice.actions.setReplyFeed(prop.feed));
  }, []);

  useEffect(() => {
    // record가 {} 타입이라 새로 타입 정의하여 사용
    setRecord(prop.post.record as Record);
    setAuthor(prop.post.author);
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
        <div className="flex flex-col grow">
          {/* 텍스트영역 */}
          <div>{`${author?.displayName} / ${author?.handle}`}</div>
          <div>{record?.text}</div>
          {prop.isShowBottom && (
            <div className="text-sm flex justify-between w-full grow">
              {/* 카운터영역 */}
              <button className="mr-1" onClick={OnClickReply}>
                <div className="flex justify-center">
                  <div className="flex flex-col justify-center">
                    <Icon fontSize="inherit" className="mr-1">
                      reply
                    </Icon>
                  </div>
                  <span>{prop.post.replyCount}</span>
                </div>
              </button>
              <button className="mr-1" onClick={OnClickRepost}>
                <div className={`flex justify-center ${classLike}`}>
                  <div className="flex flex-col justify-center mr-1">
                    <Icon fontSize="inherit" className="mr-2 ">
                      favorite
                    </Icon>
                  </div>
                  <span>{prop.post.likeCount}</span>
                </div>
              </button>

              <button className="mr-1" onClick={OnClickRepost}>
                <div className={`flex justify-center ${classRepost}`}>
                  <div className="flex flex-col justify-center mr-1">
                    <Icon fontSize="inherit">sync alt</Icon>
                  </div>
                  <span>{prop.post.repostCount}</span>
                </div>
              </button>
            </div>
          )}
        </div>
      </div>

      <div>{/* 이미지영역 */}</div>
    </div>
  );
}

export default PostItem;
