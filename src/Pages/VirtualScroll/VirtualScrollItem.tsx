import React, { useEffect, useState } from 'react';
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
  item: AppBskyFeedDefs.FeedViewPost;
}

function VirtualScrollItem(prop: VirtualScrollItemProp) {
  return (
    <div className="virtual-scroll-item">
      <PostItem feed={prop.item} />
    </div>
  );
}

export default VirtualScrollItem;
