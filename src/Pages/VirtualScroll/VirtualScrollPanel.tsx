import React, { useEffect, useRef, useState, useCallback } from 'react';
import { AppBskyFeedDefs } from '@atproto/api';
import VirtualScrollItem from './VirtualScrollItem';
import { Record } from '@/Interfaces/Record';
import { useSelector } from 'react-redux';
import { RootState, store } from '../../store/Store';
import { feedSlice } from '../../store/FeedSlice';
import { ProfileView } from '@atproto/api/dist/client/types/app/bsky/actor/defs';

export interface VirtualScrollPanelProp {
  minHeight: number;
  maxItemCount: number;
  items: AppBskyFeedDefs.FeedViewPost[] | ProfileView[];
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
  const refScrollPanel = useRef<HTMLDivElement>(null);
  const [styleVirtualPanel, setStyleVirtualPanel] =
    useState<React.CSSProperties>({});
  const setKeys = useRef(new Set<string>());

  const { updatedFeeds } = useSelector((state: RootState) => state.feedState);
  /**
   * 업데이트 된 피드를 가상 스크롤 prop에 적용
   */
  const UpdateFeed = useCallback(() => {
    for (const feed of updatedFeeds) {
      const virtualItem = virtualItems.find(
        (item) => item.item.post.uri === feed.post.uri
      );
      if (virtualItem) {
        virtualItem.item = feed;
      }
      const renderItem = renderItems.find(
        (item) => item.item.post.uri === feed.post.uri
      );
      if (renderItem) {
        renderItem.item = feed;
      }
      store.dispatch(feedSlice.actions.removeUpdateFeed(feed));
    }
  }, [updatedFeeds, virtualItems, renderItems]);

  const OnChangeChildHeight = useCallback((key: string, height: number) => {
    setVirtualItems((prevItems) => {
      const newVirtualItems = [...prevItems];
      const index = newVirtualItems.findIndex(
        (item) => item.item.post.cid === key
      );
      if (index === -1) return prevItems;
      newVirtualItems[index].height = height;
      let total = 0;
      for (let i = 0; i < newVirtualItems.length; i++) {
        if (i > 0) {
          total += newVirtualItems[i - 1].height;
        }
        newVirtualItems[i].scrollTop = total;
      }
      return newVirtualItems;
    });
  }, []);

  const GetCreatedAtTime = (item: AppBskyFeedDefs.FeedViewPost): number => {
    if (item.reason) {
      return new Date(item.reason.indexedAt as string).getTime();
    } else {
      return new Date((item.post.record as Record).createdAt).getTime();
    }
  };

  const OnChangeItems = useCallback(
    (items: AppBskyFeedDefs.FeedViewPost[]) => {
      setVirtualItems((prevItems) => {
        const newVirtualItems = [...prevItems];
        const keys = setKeys.current;
        items.forEach((item) => {
          const { post } = { ...item };
          if (keys.has(post.cid)) return;
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
          if (!isAdded) {
            newVirtualItems.push(newItem);
          }
        });
        let total = 0;
        newVirtualItems.forEach((item, i) => {
          if (i > 0) {
            total += newVirtualItems[i - 1].height;
          }
          item.scrollTop = total;
        });
        return newVirtualItems;
      });
    },
    [prop.minHeight]
  );

  const UpdateVirtualScrollPanel = useCallback(() => {
    if (refScrollPanel.current === null) return;
    const lastVirtualItem = virtualItems[virtualItems.length - 1];
    if (lastVirtualItem) {
      scrollHeight.current = lastVirtualItem.scrollTop + lastVirtualItem.height;
    }
    setStyleVirtualPanel({ height: `${scrollHeight.current}px` });
  }, [virtualItems]);

  const UpdateRenderItems = useCallback(() => {
    if (refScrollPanel.current === null) return;
    const scrollTop = refScrollPanel.current.scrollTop;
    const scrollBottom = scrollTop + refScrollPanel.current.clientHeight;

    let startIndex = 0;
    let endIndex = virtualItems.length - 1;

    for (let i = 0; i < virtualItems.length; i++) {
      const item = virtualItems[i];
      const itemBottom = item.scrollTop + item.height;
      if (itemBottom >= scrollTop) {
        startIndex = i;
        break;
      }
    }

    for (let i = startIndex; i < virtualItems.length; i++) {
      const item = virtualItems[i];
      if (item.scrollTop >= scrollBottom) {
        endIndex = i;
        break;
      }
    }

    const newRenderItems = virtualItems.slice(startIndex, endIndex + 1);
    setRenderItems(newRenderItems);
  }, [virtualItems]);

  const OnScroll = useCallback(() => {
    UpdateRenderItems();
  }, [UpdateRenderItems]);

  useEffect(() => {
    OnChangeItems(prop.items);
  }, [prop.items, OnChangeItems]);

  useEffect(() => {
    UpdateFeed();
  }, [updatedFeeds]);

  useEffect(() => {
    UpdateVirtualScrollPanel();
    UpdateRenderItems();
  }, [virtualItems, UpdateVirtualScrollPanel, UpdateRenderItems]);

  return (
    <div
      className="overflow-y-auto h-full"
      ref={refScrollPanel}
      onScroll={OnScroll}
    >
      <div className="virtual-scroll-panel relative" style={styleVirtualPanel}>
        {renderItems.map((item) => (
          <VirtualScrollItem
            key={item.item.post.cid}
            item={item.item}
            height={item.height}
            scrollTop={item.scrollTop}
            onChangeHeight={OnChangeChildHeight}
          />
        ))}
      </div>
    </div>
  );
}

export default VirtualScrollPanel;
