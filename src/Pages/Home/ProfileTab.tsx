import {
  ProfileView,
  ProfileViewDetailed,
} from '@atproto/api/dist/client/types/app/bsky/actor/defs';
import { RootState } from '../../store/Store';
import React, { CSSProperties, useCallback, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { FeedViewPost } from '@atproto/api/dist/client/types/app/bsky/feed/defs';
import Timeline from './TimeLine';
import ProfileUsers from './ProfileUsers';

export interface ProfileTabProp {
  userHandle: string | undefined;
}

enum TabType {
  POST,
  FOLLOWING,
  FOLLOWER,
  MEDIA,
}

interface Tab {
  name: string;
  type: TabType;
  onClick: () => void;
}

function ProfileTab(prop: ProfileTabProp) {
  const { agent } = useSelector((state: RootState) => state.userState);
  const [profile, setProfile] = useState<ProfileViewDetailed | undefined>();
  const [tabs, setTabs] = useState<Tab[]>();
  const [selectedTab, setSelectedTab] = useState<TabType>(TabType.POST);

  const [postCursor, setPostCursor] = useState<string>('');
  const [posts, setPosts] = useState<FeedViewPost[]>([]);

  const [following, setFollowing] = useState<ProfileView[]>([]);
  const [follower, setFollower] = useState<ProfileView[]>([]);
  const [followingCursor, setFollowingCursor] = useState<string>('');
  const [followerCursor, setFollowerCursor] = useState<string>('');

  const [mediaPosts, setMediaPosts] = useState<FeedViewPost[]>([]);
  const [mediaCursor, setMediaCursor] = useState<string>('');

  const GetStyleTab = useCallback(
    (tabType: TabType): CSSProperties => {
      return { display: selectedTab === tabType ? 'block' : 'none' };
    },
    [selectedTab]
  );

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

  const RequestPosts = useCallback(async () => {
    if (!agent.session) return;
    try {
      const response = await agent.getAuthorFeed({
        actor: prop.userHandle || '',
        cursor: postCursor,
        limit: 100,
      });
      console.log(response);
      if (response.data.cursor) {
        setPostCursor(response.data.cursor);
      }
      setPosts(response.data.feed);
    } catch (e) {
      console.log(e);
    }
  }, []);

  const RequestFollowing = useCallback(async () => {
    try {
      const result = await agent.getFollows({ actor: prop.userHandle || '' });
      console.log(result);
      setFollowing(result.data.follows);
      setFollowingCursor(result.data.cursor || '');
    } catch (e) {
      console.log(e);
    }
  }, []);

  const RequestFollower = useCallback(async () => {
    try {
      const result = await agent.getFollowers({ actor: prop.userHandle || '' });
      console.log(result);
      setFollower(result.data.followers);
      setFollowerCursor(result.data.cursor || '');
    } catch (e) {
      console.log(e);
    }
  }, []);

  useEffect(() => {
    RequestProfile();
    RequestPosts();
    RequestFollowing();
    RequestFollower();
  }, []);

  useEffect(() => {
    setTabs([
      {
        name: '포스트',
        type: TabType.POST,
        onClick: () => {
          setSelectedTab(TabType.POST);
        },
      },
      {
        name: '팔로잉',
        type: TabType.FOLLOWING,
        onClick: () => {
          setSelectedTab(TabType.FOLLOWING);
        },
      },
      {
        name: '팔로워',
        type: TabType.FOLLOWER,
        onClick: () => {
          setSelectedTab(TabType.FOLLOWER);
        },
      },
      {
        name: '미디어',
        type: TabType.MEDIA,
        onClick: () => {
          setSelectedTab(TabType.MEDIA);
        },
      },
    ]);
  }, []);

  if (!profile) return <div></div>;
  else
    return (
      <div className="p-2 shrink grow flex flex-col h-full overflow-hidden">
        <div className="w-full mb-4 h-[141px] shrink-0">
          <img className="rounded-2xl" src={profile.banner} />
        </div>
        <div className="flex">
          <div className="mr-2 shrink-0">
            <img className="w-16 h-16 rounded-lg" src={profile.avatar} />
          </div>
          <div>
            <div>
              <div>{profile.displayName}</div>
              <div>{profile.handle}</div>
            </div>
            <div className="flex">
              <div className="mr-2">
                <div>팔로워</div>
                <div className="text-gray-500"> {profile.followersCount}</div>
              </div>
              <div className="mr-2">
                <div>팔로잉</div>
                <div className="text-gray-500">{profile.followsCount}</div>
              </div>
              <div className="mr-2">
                <div>포스트</div>
                <div className="text-gray-500">{profile.postsCount}</div>
              </div>
            </div>
            <div>자기소개</div>
            <div>{profile.description}</div>
          </div>
        </div>
        <div className="mb-2 h-full grow shrink overflow-hidden flex flex-col">
          <div className="tab flex justify-between mb-2">
            {tabs?.map((tab, index) => {
              return (
                <div
                  key={index}
                  onClick={tab.onClick}
                  className={`cursor-pointer grow text-center rounded-t-lg p-2 ${
                    selectedTab === tab.type ? 'bg-blue-500 text-white' : ''
                  }`}
                >
                  {tab.name}
                </div>
              );
            })}
          </div>
          <div className="flex h-full overflow-hidden">
            <div
              style={GetStyleTab(TabType.POST)}
              className="overflow-hidden grow shrink-0"
            >
              <Timeline posts={posts} />
            </div>
            <div
              style={GetStyleTab(TabType.FOLLOWING)}
              className="overflow-hidden grow shrink-0"
            >
              <ProfileUsers users={following} />
            </div>
            <div
              style={GetStyleTab(TabType.FOLLOWER)}
              className="overflow-hidden grow shrink-0"
            >
              <ProfileUsers users={follower} />
            </div>
            <div style={GetStyleTab(TabType.MEDIA)}>미디어</div>
          </div>
        </div>
      </div>
    );
}

export default ProfileTab;
