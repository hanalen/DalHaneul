import React, { useCallback, useEffect, useState } from 'react';
import { AppBskyActorDefs, AppBskyFeedDefs, BskyAgent } from '@atproto/api';
import { ERecordType, Record } from '../../../Interfaces/Record';
import PostItem from './PostItem';
import FollowItem from './FollowItem';
import LikeItem from './LikeItem';
import { PostView } from '@atproto/api/dist/client/types/app/bsky/feed/defs';

export interface TimeLineProp {
  feed: AppBskyFeedDefs.FeedViewPost;
}

function FeedItem(prop: TimeLineProp) {
  const [drawElement, setDrawElement] = useState<React.ReactNode>();

  useEffect(() => {
    const record = prop.feed.post.record as Record;
    if (record.$type === ERecordType.post) {
      setDrawElement(
        <div>
          {prop.feed.reply && (
            <PostItem
              feed={prop.feed}
              post={prop.feed.reply.parent as PostView}
            />
          )}
          <PostItem feed={prop.feed} post={prop.feed.post} />
        </div>
      );
    } else if (record.$type === ERecordType.follow) {
      setDrawElement(<FollowItem feed={prop.feed} />);
    } else if (record.$type === ERecordType.like) {
      setDrawElement(<LikeItem feed={prop.feed} />);
    }
  }, [prop.feed]);
  return <div>{drawElement}</div>;
}

export default FeedItem;
