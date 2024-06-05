import React, { useEffect, useState } from 'react';
import { AppBskyFeedDefs, BskyAgent } from '@atproto/api';
import VirtualScrollPanel from '../VirtualScroll/VirtualScrollPanel';

export interface TimeLineProp {
  posts: AppBskyFeedDefs.FeedViewPost[];
}

function TimeLine(prop: TimeLineProp) {
  return (
    <div className="p-1 h-full grow shrink overflow-hidden">
      <VirtualScrollPanel
        items={prop.posts}
        minHeight={40}
        maxItemCount={1000}
      />
    </div>
  );
}

export default TimeLine;
