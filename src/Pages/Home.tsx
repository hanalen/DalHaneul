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

function Home() {
  const { tabs } = useSelector((state: RootState) => state.uiState);
  const navigate = useNavigate();

  useEffect(() => {
    const agentToken = localStorage.getItem('agent-token');
    if (agentToken) {
      store.dispatch(userSlice.actions.setSession(JSON.parse(agentToken))); // setSession 액션을 디스패치
    } else {
      navigate('/login');
    }
  }, []);
  return (
    <div className="w-screen h-screen flex">
      <Menus />
      <PostInput />
      {tabs.map((tab) => {
        return <TimeLine tab={tab} />;
      })}
    </div>
  );
}

export default Home;
