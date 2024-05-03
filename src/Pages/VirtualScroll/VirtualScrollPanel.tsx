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

  const OnChangeItems = (items: AppBskyFeedDefs.FeedViewPost[]) => {
    const newVirtualItems = [...virtualItems];
    for (const item of items) {
      const keys = setKeys.current;
      const { post } = { ...item };

      if (keys.has(post.cid)) continue;
      keys.add(post.cid);

      const newItem = { item: item, height: prop.minHeight };
      const newRecord = post.record as Record;
      const newTime = new Date(newRecord.createdAt).getTime();
      let isAdded = false;
      for (let i = 0; i < newVirtualItems.length; i++) {
        const item = newVirtualItems[i];
        const record = item.item.post.record as Record;
        const currentTime = new Date(record.createdAt).getTime();
        if (newTime > currentTime) {
          newVirtualItems.splice(i, 0, newItem);
          setVirtualItems(newVirtualItems);
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
