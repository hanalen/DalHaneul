import React, { useEffect } from 'react';
import { BskyAgent } from '@atproto/api';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { uiSlice } from '@/store/UISlice';
import { SvgIcon } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';

export interface MenuIconProp {
  icon: typeof SvgIcon;
}

function MenuIcon(prop: MenuIconProp) {
  return (
    <div className="w-10 h-10 flex justify-center cursor-pointer mb-1">
      <div className="flex flex-col justify-center">
        <SvgIcon component={prop.icon} />
      </div>
    </div>
  );
}

export default MenuIcon;
