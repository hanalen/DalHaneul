import React, { createRef, useEffect, useRef, useState } from 'react';
import { AppBskyFeedDefs, BskyAgent } from '@atproto/api';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { ETabType, Tab, uiSlice } from '../../store/UISlice';
import HomeIcon from '@mui/icons-material/Home';
import DragIndicatorIcon from '@mui/icons-material/DragIndicator';
import { useCommon } from '../../Providers/CommonProvider';
import { SvgIcon, Icon, IconButton, Box } from '@mui/material';
import { RootState } from '../../store/Store';
import PostItem from '../Home/PostItem';

export interface VirtualScrollItemProp {
  onChangeHeight: (index: number, changeHeight: number) => void;
  index: number;
  height: number;
  item: AppBskyFeedDefs.FeedViewPost;
}

function VirtualScrollItem(prop: VirtualScrollItemProp) {
  const childrenRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const observer = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const { height } = entry.contentRect;
        if (prop.onChangeHeight) {
          prop.onChangeHeight(prop.index, height - prop.height);
        }
      }
    });

    if (childrenRef.current) {
      observer.observe(childrenRef.current);
    }

    return () => {
      if (childrenRef.current) {
        observer.disconnect();
      }
    };
  }, []);

  return (
    <div className="virtual-scroll-item" ref={childrenRef}>
      <PostItem feed={prop.item} />
    </div>
  );
}

export default VirtualScrollItem;
