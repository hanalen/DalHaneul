import React, { useEffect, useState } from 'react';
import { BskyAgent } from '@atproto/api';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { uiSlice } from '@/store/UISlice';
import { SvgIcon } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';

export interface PropPostInput {
  index: number;
  content: string;
  onChange: (index: number, text: string) => void;
  onClickRemove: (index: number) => void;
}

function PostInput(prop: PropPostInput) {
  const [inputText, setInputText] = useState('');

  const OnChangeTextArea = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInputText(e.target.value);
    prop.onChange(prop.index, e.target.value);
  };

  const OnClickRemove = () => {
    prop.onClickRemove(prop.index);
  };

  useEffect(() => {
    setInputText(prop.content);
  }, [prop.content]);

  return (
    <div className="w-full">
      <textarea
        className="w-56 p-2 outline-neutral-400 rounded-lg bg-white resize-none mb-1"
        onChange={OnChangeTextArea}
        value={inputText}
      />
      <div className="flex justify-between text-xs mb-1 text-white">
        <div>
          <SvgIcon component={AddPhotoAlternateIcon} fontSize={'small'} />
          {prop.index > 0 && (
            <SvgIcon
              className="cursor-pointer"
              component={CloseIcon}
              fontSize={'small'}
              onClick={OnClickRemove}
            />
          )}
        </div>
        <div className="flex flex-col justify-center">
          <label>{`${inputText.length} / 300`}</label>
        </div>
      </div>
    </div>
  );
}

export default PostInput;
