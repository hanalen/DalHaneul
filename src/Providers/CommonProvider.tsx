import { useSelector } from 'react-redux';
import { RootState, store } from '../store/Store';
import React, { createContext, useContext, ReactNode, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router';
import { ETabType, Tab, uiSlice } from '../store/UISlice';
import { OutputSchema } from '@atproto/api/dist/client/types/com/atproto/server/createSession';
import { userSlice } from '../store/UserSlice';
import { AtpSessionData } from '@atproto/api';

interface CommonContextProps {
  RouteToPath: (path: string) => void;
  SaveSession: (session: AtpSessionData) => void;
  LoadSession: () => AtpSessionData | undefined;
  GetTabName: (tabType: ETabType) => string;
  GetIconName: (tabType: ETabType) => string;
  CreateDefaultMenus: (session: AtpSessionData) => void;
  SaveTabs: (tabs: Tab[]) => void;
  LoadTabs: () => Tab[];
}

const CommonContext = createContext<CommonContextProps | undefined>(undefined);

export const CommonProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const location = useLocation();
  const navigate = useNavigate();
  const uiState = useSelector((state: RootState) => state.uiState);
  const userState = useSelector((state: RootState) => state.userState);
  const RouteToPath = (path: string) => {
    navigate(`${path}`);
  };

  const GetIconName = (tabType: ETabType) => {
    switch (tabType) {
      case ETabType.HOME:
        return 'home';
      case ETabType.PROFILE:
        return 'person';
      case ETabType.NOTIFICATION:
        return 'notifications';
      case ETabType.FEED:
        return 'feeds';
      default:
        return 'home';
    }
  };

  const GetTabName = (tabType: ETabType) => {
    switch (tabType) {
      case ETabType.HOME:
        return '홈';
      case ETabType.PROFILE:
        return '프로필';
      case ETabType.NOTIFICATION:
        return '알림';
      case ETabType.FEED:
        return '피드';
      default:
        return '홈';
    }
  };

  const CreateDefaultMenus = (session: AtpSessionData | undefined) => {
    const tabs: Tab[] = [];
    if (session) {
      tabs.push({
        did: session.did,
        tabType: ETabType.HOME,
        handle: session.handle,
        width: 320,
      });
      tabs.push({
        did: session.did,
        tabType: ETabType.NOTIFICATION,
        handle: session.handle,
        width: 320,
      });
      store.dispatch(uiSlice.actions.setTabs(tabs));
      SaveTabs(tabs);
    }
  };

  const SaveSession = (session: AtpSessionData) => {
    console.log('세션 저장');
    localStorage.setItem('session', JSON.stringify(session));
    RouteToPath('/home');
  };

  const LoadSession = () => {
    const jsonSession = localStorage.getItem('session');
    if (jsonSession) {
      try {
        const session = JSON.parse(jsonSession) as AtpSessionData;
        store.dispatch(userSlice.actions.setSession(session));
        RouteToPath('/home');
        return session;
      } catch (e) {
        console.log(e);
        navigate('/login');
      }
    } else {
      navigate('/login');
    }
  };

  const SaveTabs = (tabs: Tab[]) => {
    localStorage.setItem('tabs', JSON.stringify(tabs));
  };

  const LoadTabs = () => {
    const jsonTabs = localStorage.getItem('tabs');
    if (jsonTabs) {
      try {
        const tabs = JSON.parse(jsonTabs) as Tab[];
        store.dispatch(uiSlice.actions.setTabs(tabs));
        return tabs;
      } catch (e) {
        console.log(e);
      }
    } else {
      CreateDefaultMenus(userState.agent.session);
    }
    return [];
  };

  return (
    <CommonContext.Provider
      value={{
        RouteToPath,
        SaveSession,
        LoadSession,
        CreateDefaultMenus,
        GetIconName,
        GetTabName,
        LoadTabs,
        SaveTabs,
      }}
    >
      {children}
    </CommonContext.Provider>
  );
};

export const useCommon = () => {
  const context = useContext(CommonContext);
  if (!context) {
    throw new Error('useCommon must be used within a CommonProvider');
  }
  return context;
};
