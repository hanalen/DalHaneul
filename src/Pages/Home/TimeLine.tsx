import React, { useEffect, useState } from 'react';
import { AppBskyFeedDefs, BskyAgent } from '@atproto/api';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { ETabType, Tab, uiSlice } from '../../store/UISlice';
import HomeIcon from '@mui/icons-material/Home';
import DragIndicatorIcon from '@mui/icons-material/DragIndicator';
import MenuIcon from './MenuIcon';
import { useCommon } from '../../Providers/CommonProvider';
import { SvgIcon, Icon, IconButton, Box } from '@mui/material';
import { RootState } from '../../store/Store';
import PostItem from './PostItem';
import VirtualScrollPanel from '../VirtualScroll/VirtualScrollPanel';

export interface TimeLineProp {
  tab: Tab;
}

function TimeLine(prop: TimeLineProp) {
  const common = useCommon();
  const [feeds, setFeeds] = useState<AppBskyFeedDefs.FeedViewPost[]>([]);

  const { agent } = useSelector((state: RootState) => state.userState);

  const GetTimeLine = async () => {
    try {
      if (!agent.session) return;
      const response = await agent.getTimeline({
        cursor: '',
        limit: 100,
      });
      console.log(response);
      setFeeds(response.data.feed);
    } catch (e) {
      //
    }
  };

  const GetPosts = () => {
    const { tabType } = { ...prop.tab };

    if (tabType === ETabType.HOME) {
      GetTimeLine();
    }
  };

  useEffect(() => {
    GetPosts();
  }, []);

  return (
    <div className="w-full p-1 h-full">
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
        <VirtualScrollPanel items={feeds} minHeight={40} maxItemCount={1000} />
      </div>
    </div>
  );
}

export default TimeLine;
