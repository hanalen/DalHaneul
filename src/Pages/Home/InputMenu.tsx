import React, { useEffect, useState } from 'react';
import { BskyAgent } from '@atproto/api';
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

function InputMenu() {
  const [isSending, setIsSending] = useState(false);
  const { postings } = useSelector((state: RootState) => state.postState);
  const { agent } = useSelector((state: RootState) => state.userState);

  const OnClickAdd = () => {
    store.dispatch(postSlice.actions.addPost());
  };
  const convertDataURIToBinary = (dataURI: string) => {
    return Uint8Array.from(
      window.atob(dataURI.replace(/^data[^,]+,/, '')),
      (v) => v.charCodeAt(0)
    );
  };

  const OnClickSend = async () => {
    setIsSending(true);
    for (let i = 0; i < postings.length; i++) {
      const post = postings[i];
      const images: Image[] = [];
      if (post.images.length > 0) {
        const result = await agent.uploadBlob(post.images[0], {
          encoding: 'base64',
        });
        // const results = await Promise.all(
        //   post.images.map((image) => agent.uploadBlob(image), {
        //     encode: 'base64',
        //   })
        // );
        // for (const image of results) {
        //   images.push({ image: image.data.blob, alt: '' });
        // }
      }

      await agent.post({
        content: post.content,
        embed: { $type: 'app.bsky.embed.images', images: images },
      });
    }
    setIsSending(false);
  };

  return (
    <div className="w-60 p-2 flex flex-col h-full bg-slate-400 border-r-2 border-slate-700 relative">
      {postings.map((post, index) => {
        return <PostInput posting={post} index={index} key={index} />;
      })}
      <div className="flex justify-between">
        <div className="cursor-pointer" onClick={OnClickAdd}>
          <SvgIcon component={AddIcon} />
        </div>
        <button
          className="py-1 px-4 text-white rounded-lg bg-blue-500"
          onClick={OnClickSend}
        >
          {postings.length === 1 ? '보내기' : '모두 보내기'}
        </button>
      </div>
      {isSending && (
        <div className="w-60 h-screen cursor-wait bg-black opacity-30 absolute left-0 top-0"></div>
      )}
    </div>
  );
}

export default InputMenu;
