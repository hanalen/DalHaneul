import React, { useEffect, useState } from 'react';
import { BskyAgent } from '@atproto/api';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { uiSlice } from '@/store/UISlice';
import { SvgIcon } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import PostInput from './PostInput';

export interface Posting {
  content: string;
  image?: string;
}

function InputMenu() {
  const [postings, setPostings] = useState<Posting[]>([]);

  const OnChange = (index: number, text: string) => {
    postings[index].content = text;
    setPostings([...postings]);
  };

  const OnClickAdd = () => {
    postings.push({ content: '', image: '' });
    setPostings([...postings]);
  };

  const OnClickRemove = (index: number) => {
    postings.splice(index, 1);
    setPostings([...postings]);
    console.log(postings);
  };

  useEffect(() => {
    postings.push({ content: '', image: '' });
    setPostings([...postings]);
  }, []);

  return (
    <div className="w-60 p-2 flex flex-col h-full bg-slate-400 border-r-2 border-slate-700">
      {postings.map((post, index) => {
        return (
          <PostInput
            onChange={OnChange}
            onClickRemove={OnClickRemove}
            content={post.content}
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
