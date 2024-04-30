import { useSelector } from 'react-redux';
import { RootState, store } from '../store/Store';
import React, { createContext, useContext, ReactNode, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router';
import { TimeLineTab } from '@/store/UISlice';
import { OutputSchema } from '@atproto/api/dist/client/types/com/atproto/server/createSession';
import { userSlice } from '../store/UserSlice';

interface CommonContextProps {
  RouteToPath: (path: string) => void;
  SaveSession: (session: OutputSchema) => void;
  LoadSession: () => OutputSchema | undefined;
}

const CommonContext = createContext<CommonContextProps | undefined>(undefined);

export const CommonProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const location = useLocation();
  const navigate = useNavigate();
  const uiState = useSelector((state: RootState) => state.uiState);
  const RouteToPath = (path: string) => {
    navigate(`${path}`);
  };

  const SaveSession = (agent: OutputSchema) => {
    localStorage.setItem('session', JSON.stringify(agent));
    RouteToPath('/home');
  };

  const LoadSession = () => {
    const jsonSession = localStorage.getItem('session');
    if (jsonSession) {
      try {
        const session = JSON.parse(jsonSession) as OutputSchema;
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

  const SaveMenus = (menus: TimeLineTab) => {};

  const LoadAgent = () => {};

  return (
    <CommonContext.Provider value={{ RouteToPath, SaveSession, LoadSession }}>
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
