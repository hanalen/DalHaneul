import React, { useCallback, useEffect, useState } from 'react';
import {
  AppBskyFeedPost,
  BskyAgent,
  ComAtprotoRepoUploadBlob,
} from '@atproto/api';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { uiSlice } from '@/store/UISlice';
import { SvgIcon } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import PostInput from './PostInput';
import { Posting, postSlice } from '../../store/PostSlice';
import { RootState, store } from '../../store/Store';
import { Response } from '@atproto/api/dist/client/types/com/atproto/admin/deleteAccount';
import { Image } from '@atproto/api/src/client/types/app/bsky/embed/images';
import { encode } from 'punycode';
import PostItem from './Items/PostItem';
import { PostView } from '@atproto/api/dist/client/types/app/bsky/feed/defs';

function InputMenu() {
  const [isSending, setIsSending] = useState(false);
  const { postings, replyFeed } = useSelector(
    (state: RootState) => state.postState
  );
  const { agent } = useSelector((state: RootState) => state.userState);

  const OnClickAdd = () => {
    store.dispatch(postSlice.actions.addPost());
  };
  function Base64ToUint8Array(base64Data: string): {
    array: Uint8Array;
    contentType: string;
  } {
    // Split the base64 data into two parts: metadata and actual data
    const parts = base64Data.split(';base64,');
    const contentType = parts[0].split(':')[1];
    const raw = window.atob(parts[1]);

    // Create an ArrayBuffer object to represent the raw binary data
    const arrayBuffer = new ArrayBuffer(raw.length);
    const view = new Uint8Array(arrayBuffer);

    // Copy the raw binary data into the ArrayBuffer
    for (let i = 0; i < raw.length; i++) {
      view[i] = raw.charCodeAt(i);
    }
    return { array: view, contentType: contentType };
    // Create a Blob object from the ArrayBuffer
    // return new Blob([arrayBuffer], { type: contentType });
  }

  const OnClickSend = async () => {
    setIsSending(true);
    let isSuccess = true;

    //포스트 보내기 전 root포스트와 부모 포스트를 설정
    let root: PostView | undefined;
    let parent: PostView | undefined;
    if (replyFeed) {
      root =
        (replyFeed.reply?.root as PostView) ?? (replyFeed.post as PostView);
      parent = replyFeed.post;
    }

    for (const posting of postings) {
      const images: Image[] = [];
      const promises: Promise<ComAtprotoRepoUploadBlob.Response>[] = [];
      for (const image of posting.images) {
        {
          const { array, contentType } = Base64ToUint8Array(image);
          promises.push(agent.uploadBlob(array, { encoding: contentType }));
        }
      }
      const results = await Promise.all(promises);
      for (const result of results) {
        images.push({ image: result.data.blob, alt: '' });
      }
      try {
        const record: AppBskyFeedPost.Record = {
          text: posting.text,
          embed: { $type: 'app.bsky.embed.images', images: images },
          createdAt: new Date().toISOString(),
        };
        if (root && parent) {
          console.log('set root and parent');
          record.reply = { root: root, parent: parent };
        }
        console.log('-----');
        console.log('root:', root);
        console.log('parent:', parent);
        const result = await agent.post(record);
        parent = { uri: result.uri, cid: result.cid } as PostView;
        if (!root) {
          //스레드 첫글을 등록했을 경우 root를 설정
          root = { uri: result.uri, cid: result.cid } as PostView;
        }
      } catch (e) {
        console.log(e);
        isSuccess = false;
      }
    }
    if (isSuccess) {
      store.dispatch(postSlice.actions.clear());
    }
    setIsSending(false);
  };

  const isDisabledAddThread =
    postings.length > 0 && postings[postings.length - 1].text === '';

  return (
    <div className="w-80 p-2 flex flex-col h-full bg-white relative shrink-0">
      {replyFeed && (
        <div className="p-2 text-gray-500">
          <PostItem
            feed={replyFeed}
            post={replyFeed.post}
            isShowBottom={false}
          />
        </div>
      )}
      <div className="border p-2 grow overflow-y-auto border-gray-400 rounded-lg">
        <div className="flex justify-between mb-2">
          <div></div>
          <button
            className="py-1 px-4 text-white rounded-lg bg-blue-500"
            onClick={OnClickSend}
          >
            {postings.length === 1 ? '보내기' : '모두 보내기'}
          </button>
        </div>
        {postings.map((post, index) => {
          return <PostInput posting={post} index={index} key={index} />;
        })}
        <div className="flex justify-end">
          <button
            disabled={isDisabledAddThread}
            className={`bg-blue-500 text-white py-1 px-2 rounded-md ${isDisabledAddThread ? 'bg-gray-200 text-gray-400 cursor-not-allowed' : ''}`}
            onClick={OnClickAdd}
          >
            <SvgIcon component={AddIcon} />
            <span>스레드 추가</span>
          </button>
        </div>
      </div>
      {isSending && (
        <div className="w-80 h-screen cursor-wait bg-black opacity-30 absolute left-0 top-0"></div>
      )}
    </div>
  );
}

export default InputMenu;
