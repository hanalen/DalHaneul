import React, { useEffect } from 'react';
import { BskyAgent } from '@atproto/api';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { uiSlice } from '@/store/UISlice';
import { SvgIcon } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';

function PostInput() {
  return (
    <div className="w-60 p-2 h-full bg-slate-400 border-r-2 border-slate-700">
      <textarea className="w-56 p-2 outline-neutral-400 rounded-lg bg-white resize-none mb-1" />
      <div className="flex justify-end">
        <button className="py-1 px-4 text-white rounded-lg bg-blue-500">
          보내기
        </button>
      </div>
    </div>
  );
}

export default PostInput;
