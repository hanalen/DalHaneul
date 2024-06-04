import { ProfileViewDetailed } from '@atproto/api/dist/client/types/app/bsky/actor/defs';
import { RootState } from '../../store/Store';
import React, { useCallback, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

export interface ProfileTabProp {
  userHandle: string | undefined;
}

function ProfileTab(prop: ProfileTabProp) {
  const { agent } = useSelector((state: RootState) => state.userState);
  const [profile, setProfile] = useState<ProfileViewDetailed | undefined>();

  const RequestProfile = useCallback(async () => {
    if (!agent.session) return;
    try {
      const response = await agent.getProfile({
        actor: prop?.userHandle || '',
      });
      setProfile(response.data);
      console.log(response);
    } catch (e) {
      console.log(e);
    }
  }, []);

  useEffect(() => {
    RequestProfile();
  }, []);
  if (!profile) return <div></div>;
  else
    return (
      <div>
        <div>{profile.displayName}</div>
      </div>
    );
}

export default ProfileTab;
