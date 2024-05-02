import React, { useEffect } from 'react';
import { BskyAgent } from '@atproto/api';
import { useSelector } from 'react-redux';
import { RootState, store } from '../store/Store';
import { useNavigate } from 'react-router';
import { uiSlice } from '@/store/UISlice';
import { userSlice } from '../store/UserSlice';
import SvgIcon from '@mui/material/SvgIcon';
import HomeIcon from '@mui/icons-material/Home';
import Menus from './Home/Menus';
import PostInput from './Home/PostInput';
import TimeLine from './Home/TimeLine';
import { useCommon } from '../Providers/CommonProvider';
import InputMenu from './Home/InputMenu';

function Home() {
  const common = useCommon();
  const { tabs } = useSelector((state: RootState) => state.uiState);
  const { agent } = useSelector((state: RootState) => state.userState);

  useEffect(() => {
    if (agent.session) {
      common.SaveSession(agent.session);
    }
  }, [agent.session]);

  useEffect(() => {
    common.LoadSession();
    common.LoadTabs();
  }, []);
  return (
    <div className="w-screen h-screen flex">
      <Menus />
      <InputMenu />
      {tabs.map((tab, index) => {
        return <TimeLine tab={tab} key={index} />;
      })}
    </div>
  );
}

export default Home;
