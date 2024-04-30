import React, { useEffect } from 'react';
import { BskyAgent } from '@atproto/api';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { TimeLineTab, uiSlice } from '@/store/UISlice';
import { SvgIcon } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import DragIndicatorIcon from '@mui/icons-material/DragIndicator';

export interface TimeLineProp {
  tab: TimeLineTab;
}

function TimeLine(prop: TimeLineProp) {
  return (
    <div className="w-60 p-1 h-full">
      <div className="bg-white border border-slate-300 rounded-lg w-full h-full">
        <div className="px-1 py-2 flex justify-between">
          <div>
            <SvgIcon component={DragIndicatorIcon} color="disabled" />
            <label>{prop.tab.name}</label>
          </div>
          <div>버튼</div>
        </div>
      </div>
    </div>
  );
}

export default TimeLine;
