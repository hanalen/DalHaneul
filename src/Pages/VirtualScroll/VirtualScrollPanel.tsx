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
import VirtualScrollItem from './VirtualScrollItem';

export interface VirtualScrollPanelProp {
  items: AppBskyFeedDefs.FeedViewPost[];
}

function VirtualScrollPanel(prop: VirtualScrollPanelProp) {
  return (
    <div className="virtual-scroll-panel">
      {prop.items.map((item, index) => {
        return <VirtualScrollItem key={index} item={item} />;
      })}
    </div>
  );
}

export default VirtualScrollPanel;
