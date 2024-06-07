import React, { useCallback, useEffect, useState } from 'react';
import { AppBskyFeedDefs, BskyAgent } from '@atproto/api';
import VirtualScrollPanel from '../VirtualScroll/VirtualScrollPanel';
import { ProfileView } from '@atproto/api/dist/client/types/app/bsky/actor/defs';
import UserItem from './Items/UserItem';

export interface ProfileUsersProp {
  users: ProfileView[];
}

function ProfileUsers(prop: ProfileUsersProp) {
  const RenderUserItem = useCallback((item: ProfileView) => {
    return <UserItem user={item} />;
  }, []);

  return (
    <div className="p-1 h-full grow shrink overflow-hidden">
      <VirtualScrollPanel
        renderItem={RenderUserItem}
        itemKey="did"
        items={prop.users}
        minHeight={40}
        maxItemCount={1000}
      />
    </div>
  );
}

export default ProfileUsers;
