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

function InputMenu() {
  const { postings } = useSelector((state: RootState) => state.postState);

  const OnChange = (index: number, text: string) => {
    store.dispatch(
      postSlice.actions.onChangePosting({
        index,
        content: text,
        images: postings[index].images,
      })
    );
  };

  const OnClickAdd = () => {
    store.dispatch(postSlice.actions.addPost());
  };

  const OnClickRemove = (index: number) => {
    postings.splice(index, 1);
    store.dispatch(postSlice.actions.removePost(index));
  };

  const OnChangeImages = (index: number, images: string[]) => {
    store.dispatch(
      postSlice.actions.onChangePosting({
        index,
        content: postings[index].content,
        images: images,
      })
    );
  };

  return (
    <div className="w-60 p-2 flex flex-col h-full bg-slate-400 border-r-2 border-slate-700">
      {postings.map((post, index) => {
        return (
          <PostInput
            onChange={OnChange}
            onClickRemove={OnClickRemove}
            onChangeImages={OnChangeImages}
            content={post.content}
            images={post.images}
            index={index}
            key={index}
          />
        );
      })}
      <div className="flex justify-between">
        <div className="cursor-pointer" onClick={OnClickAdd}>
          <SvgIcon component={AddIcon} />
        </div>
        <button className="py-1 px-4 text-white rounded-lg bg-blue-500">
          {postings.length === 1 ? '보내기' : '모두 보내기'}
        </button>
      </div>
    </div>
  );
}

export default InputMenu;
