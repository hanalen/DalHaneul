import React, { useCallback, useEffect, useState } from 'react';
import { AppBskyFeedDefs, BskyAgent } from '@atproto/api';
import VirtualScrollPanel from '../VirtualScroll/VirtualScrollPanel';
import FeedItem from './Items/FeedItem';

export interface TimeLineProp {
  posts: AppBskyFeedDefs.FeedViewPost[];
}

function TimeLine(prop: TimeLineProp) {
  const RenderFeedItem = useCallback((item: AppBskyFeedDefs.FeedViewPost) => {
    return <FeedItem feed={item} />;
  }, []);

  return (
    <div className="p-1 h-full grow shrink overflow-hidden">
      <VirtualScrollPanel
        items={prop.posts}
        itemKey="post.cid"
        minHeight={40}
        maxItemCount={1000}
        renderItem={RenderFeedItem}
      />
    </div>
  );
}

export default TimeLine;
