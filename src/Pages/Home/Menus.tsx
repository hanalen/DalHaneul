import React, { useEffect } from 'react';
import MenuIcon from './MenuIcon';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/Store';

function Menus() {
  const { tabs } = useSelector((state: RootState) => state.uiState);
  return (
    <div className="flex flex-col h-screen w-10 bg-slate-200">
      <div>프로필아이콘</div>
      {tabs.map((tab) => {
        return <MenuIcon icon={tab.icon} />;
      })}
      <MenuIcon icon={'add-circle'} />
    </div>
  );
}

export default Menus;
