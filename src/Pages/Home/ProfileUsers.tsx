import React, { useEffect, useState } from 'react';
import { AppBskyFeedDefs, BskyAgent } from '@atproto/api';
import VirtualScrollPanel from '../VirtualScroll/VirtualScrollPanel';
import { ProfileView } from '@atproto/api/dist/client/types/app/bsky/actor/defs';

export interface ProfileUsersProp {
  users: ProfileView[];
}

function ProfileUsers(prop: ProfileUsersProp) {
  return (
    <div className="p-1 h-full grow shrink overflow-hidden">
      <VirtualScrollPanel
        items={prop.users}
        minHeight={40}
        maxItemCount={1000}
      />
    </div>
  );
}

export default ProfileUsers;
