import React, { useEffect } from 'react';
import { BskyAgent } from '@atproto/api';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { uiSlice } from '@/store/UISlice';
import SvgIcon from '@mui/material/SvgIcon';
import HomeIcon from '@mui/icons-material/Home';
import MenuIcon from './MenuIcon';
import Notification from '@mui/icons-material/Notifications';

function Menus() {
  return (
    <div className="flex flex-col h-screen w-10 bg-slate-200">
      <div>프로필아이콘</div>
      <MenuIcon icon={HomeIcon} />
      <MenuIcon icon={Notification} />
    </div>
  );
}

export default Menus;
