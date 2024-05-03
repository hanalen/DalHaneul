import React, { useEffect } from 'react';
import { BskyAgent } from '@atproto/api';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { ETabType, Tab, uiSlice } from '@/store/UISlice';
import HomeIcon from '@mui/icons-material/Home';
import DragIndicatorIcon from '@mui/icons-material/DragIndicator';
import MenuIcon from './MenuIcon';
import { useCommon } from '../../Providers/CommonProvider';
import { SvgIcon, Icon, IconButton, Box } from '@mui/material';

export interface TimeLineProp {
  tab: Tab;
}

function TimeLine(prop: TimeLineProp) {
  const common = useCommon();
  return (
    <div className="w-80 p-1 h-full">
      <div className="bg-white border border-slate-300 rounded-lg w-full h-full">
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
      </div>
    </div>
  );
}

export default TimeLine;
