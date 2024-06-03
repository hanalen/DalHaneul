import React, { useCallback, useEffect, useState } from 'react';
import { AppBskyActorDefs, AppBskyFeedDefs, BskyAgent } from '@atproto/api';
import { ERecordType, Record } from '../../../Interfaces/Record';
import PostItem from './PostItem';
import FollowItem from './FollowItem';
import LikeItem from './LikeItem';

export interface TimeLineProp {
  feed: AppBskyFeedDefs.FeedViewPost;
}

function FeedItem(prop: TimeLineProp) {
  const [drawElement, setDrawElement] = useState<React.ReactNode>();

  useEffect(() => {
    const record = prop.feed.post.record as Record;
    if (record.$type === ERecordType.post) {
      setDrawElement(<PostItem feed={prop.feed} />);
    } else if (record.$type === ERecordType.follow) {
      setDrawElement(<FollowItem feed={prop.feed} />);
    } else if (record.$type === ERecordType.like) {
      setDrawElement(<LikeItem feed={prop.feed} />);
    }
  }, [prop.feed]);
  return <div>{drawElement}</div>;
}

export default FeedItem;
