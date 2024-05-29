import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { ETabType, TabInfo } from '../../store/UISlice';
import DragIndicatorIcon from '@mui/icons-material/DragIndicator';
import { useCommon } from '../../Providers/CommonProvider';
import { SvgIcon, Icon } from '@mui/material';
import { RootState, store } from '../../store/Store';
import TimeLine from './TimeLine';
import {
  FeedViewPost,
  PostView,
} from '@atproto/api/dist/client/types/app/bsky/feed/defs';
import { Notification } from '@atproto/api/dist/client/types/app/bsky/notification/listNotifications';
import { Record } from '@/Interfaces/Record';
import { FeedData, feedSlice } from '../../store/FeedSlice';

export interface TimeLineProp {
  tab: TabInfo;
}

function Tab(prop: TimeLineProp) {
  const feedState = useSelector((state: RootState) => state.feedState);
  const common = useCommon();
  const [style, setStyle] = useState<React.CSSProperties>({});

  const { agent } = useSelector((state: RootState) => state.userState);

  const RequestTimeLine = async () => {
    try {
      if (!agent.session) return;
      const response = await agent.getTimeline({
        cursor: '',
        limit: 100,
      });
      console.log(response);
      const feedData: FeedData = {
        feeds: response.data.feed,
        tabType: ETabType.HOME,
        userCid: agent.session?.did || '',
      };
      store.dispatch(feedSlice.actions.addFeed(feedData));
    } catch (e) {
      console.log(e);
    }
  };

  const CreateFeed = (
    notifications: Notification[],
    posts: PostView[] | undefined
  ): FeedViewPost[] => {
    if (!posts) return [];
    const feeds: FeedViewPost[] = [];

    for (const notification of notifications) {
      const post = posts.find((x) => x.uri === notification.uri);
      if (post) {
        feeds.push({ post: post });
      } else {
        feeds.push({ post: notification });
      }
    }

    return feeds;
  };

  const GetNotifications = async () => {
    const notifications = await RequestNotifications();
    if (!notifications) return;
    const replyUris = notifications
      .filter((x) => x.reason === 'reply')
      .map((x) => x.uri);
    const repostUris = notifications
      .filter((x) => x.reason === 'repost')
      .map((x) => x.uri);
    const likeUris = notifications
      .filter((x) => x.reason === 'like')
      .map((x) => (x.record as Record).subject.uri);
    const followUris = notifications
      .filter((x) => x.reason === 'follow')
      .map((x) => x.uri);
    const postUris = notifications
      .filter((x) => x.reason === 'post')
      .map((x) => x.uri);
    const uris = [
      ...replyUris,
      ...repostUris,
      ...likeUris,
      // ...followUris,
      ...postUris,
    ];
    //notifications에도 record가 있으나 replyCount 등이 없어 posts를 호출해야함
    const posts = await RequestPosts(uris);
    console.log(posts);
    const feeds = CreateFeed(notifications, posts);
    const feedData: FeedData = {
      feeds: feeds,
      tabType: ETabType.NOTIFICATION,
      userCid: agent.session?.did || '',
    };
    store.dispatch(feedSlice.actions.addFeed(feedData));
  };

  const RequestNotifications = async () => {
    try {
      if (!agent.session) return;
      const response = await agent.listNotifications();
      console.log(response);
      return response.data.notifications;
    } catch (e) {
      console.log(e);
    }
  };

  const RequestPosts = async (uris: string[]) => {
    try {
      const response = await agent.getPosts({ uris: uris });
      console.log(response);
      return response.data.posts;
    } catch (e) {
      console.log(e);
    }
  };

  const GetPosts = () => {
    const { tabType } = { ...prop.tab };

    if (tabType === ETabType.HOME) {
      RequestTimeLine();
    } else if (tabType === ETabType.NOTIFICATION) {
      GetNotifications();
    }
  };

  const GetFeed = () => {
    const { tabType } = { ...prop.tab };
    const { did } = { ...agent.session };
    const { feeds } = { ...feedState };

    let ret: FeedViewPost[] | undefined = [];

    if (tabType === ETabType.HOME) {
      ret = feeds.find(
        (x) => x.tabType === ETabType.HOME && x.userCid === did
      )?.feeds;
    } else if (tabType === ETabType.NOTIFICATION) {
      ret = feeds.find(
        (x) => x.tabType === ETabType.NOTIFICATION && x.userCid === did
      )?.feeds;
    }

    if (!ret) return [];
    else return ret;
  };

  useEffect(() => {
    GetPosts();
    setStyle({ width: `${prop.tab.width}px` });
  }, []);

  return (
    <div className="p-1 h-full grow-0 shrink-0" style={style}>
      <div className="bg-white border border-slate-300 rounded-lg w-full h-full flex flex-col">
        <div className="px-1 py-2 flex justify-between">
          <div className="flex">
            <div className="">
              <SvgIcon component={DragIndicatorIcon} color="disabled" />
            </div>
            <div>
              <div className="flex items-center">
                <Icon>{common.GetIconName(prop.tab.tabType)}</Icon>
                <label className="ml-2">
                  {common.GetTabName(prop.tab.tabType)}
                </label>
              </div>
              <label>{prop.tab.handle}</label>
            </div>
          </div>
          <div className="p-2">버튼</div>
        </div>
        <TimeLine posts={GetFeed()} />
      </div>
    </div>
  );
}

export default Tab;
