import React, { useEffect, useRef, useState } from 'react';
import { AppBskyFeedDefs, BskyAgent } from '@atproto/api';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { ETabType, Tab, uiSlice } from '../../store/UISlice';
import HomeIcon from '@mui/icons-material/Home';
import DragIndicatorIcon from '@mui/icons-material/DragIndicator';
import { useCommon } from '../../Providers/CommonProvider';
import { SvgIcon, Icon, IconButton, Box } from '@mui/material';
import { RootState } from '../../store/Store';
import VirtualScrollItem from './VirtualScrollItem';
import { Record } from '@/Interfaces/Record';

export interface VirtualScrollPanelProp {
  minHeight: number;
  maxItemCount: number;
  items: AppBskyFeedDefs.FeedViewPost[];
}

export interface VirtualScrollItemData {
  item: AppBskyFeedDefs.FeedViewPost;
  height: number;
}

function VirtualScrollPanel(prop: VirtualScrollPanelProp) {
  const scrollHeight = useRef(0);
  const [virtualItems, setVirtualItems] = useState<VirtualScrollItemData[]>([]);
  const setKeys = useRef(new Set<string>());

  const OnChangeChildHeight = (index: number, changeHeight: number) => {
    scrollHeight.current += changeHeight;
    const newVirtualItems = [...virtualItems];
    newVirtualItems[index].height += changeHeight;
    setVirtualItems(newVirtualItems);
  };

  const GetCreatedAtTime = (item: AppBskyFeedDefs.FeedViewPost): number => {
    if (item.reason) {
      return new Date(item.reason.indexedAt as string).getTime();
    } else {
      return new Date((item.post.record as Record).createdAt).getTime();
    }
  };

  const OnChangeItems = (items: AppBskyFeedDefs.FeedViewPost[]) => {
    const newVirtualItems = [...virtualItems];
    for (const item of items) {
      const keys = setKeys.current;
      const { post } = { ...item };

      if (keys.has(post.cid)) continue;
      keys.add(post.cid);

      const newItem = { item: item, height: prop.minHeight };
      const newTime = GetCreatedAtTime(item);
      let isAdded = false;
      for (let i = 0; i < newVirtualItems.length; i++) {
        const current = newVirtualItems[i];
        const currentTime = GetCreatedAtTime(current.item);

        if (newTime > currentTime) {
          newVirtualItems.splice(i, 0, newItem);
          isAdded = true;
          break;
        }
      }
      if (newVirtualItems.length === 0 || !isAdded) {
        newVirtualItems.push(newItem);
      }
    }
    setVirtualItems(newVirtualItems);
  };

  useEffect(() => {
    OnChangeItems(prop.items);
  }, [prop.items]);

  useEffect(() => {
    console.log('scrollHeight', scrollHeight);
  }, [scrollHeight]);

  return (
    <div className="virtual-scroll-panel">
      {virtualItems.map((item, index) => {
        return (
          <VirtualScrollItem
            key={index}
            item={item.item}
            index={index}
            height={item.height}
            onChangeHeight={OnChangeChildHeight}
          />
        );
      })}
    </div>
  );
}

export default VirtualScrollPanel;
