import React, { useEffect, useState } from 'react';
import MenuIcon from './MenuIcon';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/Store';
import { useCommon } from '../../Providers/CommonProvider';

function Menus() {
  const common = useCommon();
  const { agent, agents } = useSelector((state: RootState) => state.userState);
  const { tabs } = useSelector((state: RootState) => state.uiState);

  const [avatar, setAvatar] = useState('');

  const LoadProfile = async () => {
    if (!agent.session) return;
    const profile = await agent.getProfile({ actor: agent.session.did });

    if (profile.data.avatar) {
      setAvatar(profile.data.avatar);
    }
  };

  useEffect(() => {
    LoadProfile();
  }, [agent.session]);

  return (
    <div className="flex flex-col h-screen w-10 bg-slate-200 shrink-0">
      <div className="w-8 h-8 m-1">
        {avatar && (
          <img
            src={avatar}
            alt="avatar"
            className="w-full h-full rounded-md object-scale-down"
          />
        )}
      </div>

      {tabs.map((tab, index) => {
        return <MenuIcon icon={common.GetIconName(tab.tabType)} key={index} />;
      })}
      <MenuIcon icon={'add-circle'} />
    </div>
  );
}

export default Menus;
