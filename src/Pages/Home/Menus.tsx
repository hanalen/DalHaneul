import React, { useEffect } from 'react';
import MenuIcon from './MenuIcon';

function Menus() {
  return (
    <div className="flex flex-col h-screen w-10 bg-slate-200">
      <div>프로필아이콘</div>
      <MenuIcon icon={'home'} />
      <MenuIcon icon={'notifications'} />
      <MenuIcon icon={'add-circle'} />
    </div>
  );
}

export default Menus;
