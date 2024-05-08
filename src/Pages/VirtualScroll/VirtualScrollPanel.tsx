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
  scrollTop: number;
  height: number;
}

function VirtualScrollPanel(prop: VirtualScrollPanelProp) {
  const scrollHeight = useRef(0);
  const [virtualItems, setVirtualItems] = useState<VirtualScrollItemData[]>([]);
  const [renderItems, setRenderItems] = useState<VirtualScrollItemData[]>([]);
  const [updateTime, setUpdateTime] = useState<number>(0);
  const refScrollPanel = useRef<HTMLDivElement>(null);
  const [styleVirtualPanel, setStyleVirtualPanel] =
    useState<React.CSSProperties>({});
  const setKeys = useRef(new Set<string>());

  const OnChangeChildHeight = (key: string, height: number) => {
    const newVirtualItems = [...virtualItems];
    const index = newVirtualItems.findIndex(
      (item) => item.item.post.cid === key
    );
    if (index === -1) return;
    newVirtualItems[index].height = height;
    let total =
      newVirtualItems[index].scrollTop + newVirtualItems[index].height;
    for (let i = index + 1; i < newVirtualItems.length; i++) {
      newVirtualItems[i].scrollTop = total;
      total += newVirtualItems[i].height;
    }
    setUpdateTime(new Date().getTime());
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

      const newItem = {
        item: item,
        height: prop.minHeight,
        scrollTop: 0,
        key: item.post.cid,
      };
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
    for (let i = 0; i < newVirtualItems.length; i++) {
      const item = newVirtualItems[i];
      if (i === 0) {
        item.scrollTop = 0;
      } else {
        const prevItem = newVirtualItems[i - 1];
        newVirtualItems[i].scrollTop = prevItem.scrollTop + prevItem.height;
      }
    }
    setVirtualItems(newVirtualItems);
    setUpdateTime(new Date().getTime());
  };

  const UpdateVirtualScrollPanel = () => {
    if (refScrollPanel.current === null) return;
    const lastVirtualItem = virtualItems[virtualItems.length - 1];
    if (lastVirtualItem) {
      scrollHeight.current = lastVirtualItem.scrollTop + lastVirtualItem.height;
    }
    setStyleVirtualPanel({ height: `${scrollHeight.current}px` });
  };

  const UpdateRenderItems = () => {
    if (refScrollPanel.current === null) return;
    const scrollTop = refScrollPanel.current.scrollTop;
    const scrollBottom = scrollTop + refScrollPanel.current.clientHeight;
    let startIndex = 0;
    let endIndex = 0;
    for (let i = 0; i < virtualItems.length; i++) {
      const item = virtualItems[i];
      const top = item.scrollTop;
      const bottom = top + item.height;
      if (top <= scrollTop && scrollTop <= bottom) {
        startIndex = i - 3;
        if (startIndex < 0) {
          startIndex = 0;
        }
      }
      if (top <= scrollBottom && scrollBottom <= bottom) {
        endIndex = i;
        break;
      }
    }
    console.log(startIndex, endIndex);
    const newRenderItems = virtualItems.slice(startIndex, endIndex + 3);
    setRenderItems(newRenderItems);
  };

  const OnScroll = () => {
    UpdateRenderItems();
  };

  useEffect(() => {
    OnChangeItems(prop.items);
  }, [prop.items]);

  useEffect(() => {
    UpdateVirtualScrollPanel();
    UpdateRenderItems();
  }, [updateTime]);

  return (
    <div
      className="overflow-y-auto h-full"
      ref={refScrollPanel}
      onScroll={OnScroll}
    >
      <div className="virtual-scroll-panel relative" style={styleVirtualPanel}>
        {renderItems.map((item, index) => {
          return (
            <VirtualScrollItem
              key={index}
              item={item.item}
              height={item.height}
              scrollTop={item.scrollTop}
              onChangeHeight={OnChangeChildHeight}
            />
          );
        })}
      </div>
    </div>
  );
}

export default VirtualScrollPanel;
