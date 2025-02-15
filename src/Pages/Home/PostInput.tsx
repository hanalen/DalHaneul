import React, { useEffect, useState } from 'react';
import { BskyAgent } from '@atproto/api';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { uiSlice } from '@/store/UISlice';
import { SvgIcon } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import PostImage from './PostImage';
import { RootState, store } from '../../store/Store';
import { Posting, postSlice } from '../../store/PostSlice';

export interface PropPostInput {
  index: number;
  posting: Posting;
}

function PostInput(prop: PropPostInput) {
  const [inputText, setInputText] = useState('');
  const refInput = React.createRef<HTMLInputElement>();

  const OnChangeTextArea = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInputText(e.target.value);
    store.dispatch(
      postSlice.actions.onChangePosting({
        index: prop.index,
        text: e.target.value,
        images: prop.posting.images,
      })
    );
  };

  const OnClickRemove = () => {
    store.dispatch(postSlice.actions.removePost(prop.index));
  };

  const OnClickAddImage = () => {
    refInput.current?.click();
  };

  const OnChangeFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target) return;
    const target = e.target as HTMLInputElement;
    const files = target.files;
    if (!files) return;
    if (!files.length) return;
    const images: string[] = [];
    for (let i = 0; i < files.length; i++) {
      const img = await FileToString(files[i]);
      images.push(img);
    }
    store.dispatch(
      postSlice.actions.onChangePosting({
        index: prop.index,
        text: prop.posting.text,
        images: [...prop.posting.images, ...images],
      })
    );
  };

  const FileToString = (file: File | null): Promise<string> => {
    return new Promise((resolve, reject) => {
      if (!file) return;
      const reader = new FileReader();
      console.log('file:', file);
      reader.onload = (e) => {
        const img = e.target?.result as string;
        resolve(img);
      };
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  };

  const classCountLabel =
    inputText.length > 300 ? 'text-red-500' : 'text-black';

  useEffect(() => {
    setInputText(prop.posting.text);
  }, [prop.posting.text]);

  return (
    <div className="w-full relative">
      {prop.index > 0 && (
        <SvgIcon
          className="cursor-pointer absolute top-1 right-1"
          component={CloseIcon}
          fontSize={'small'}
          onClick={OnClickRemove}
        />
      )}
      <textarea
        className="w-full p-2 pr-6 border border-gray-400 outline-neutral-400 rounded-lg bg-white resize-none mb-1"
        onChange={OnChangeTextArea}
        value={inputText}
      />
      <input
        className="hidden"
        ref={refInput}
        type="file"
        accept="image/gif, image/jpeg, image/png"
        onChange={OnChangeFile}
        multiple
      />
      <div className="flex justify-between text-xs mb-2">
        <div className="text-black">
          <SvgIcon
            component={AddPhotoAlternateIcon}
            fontSize={'medium'}
            className="cursor-pointer"
            onClick={OnClickAddImage}
          />
        </div>
        <div className="flex flex-col justify-center">
          <label
            className={classCountLabel}
          >{`${inputText.length} / 300`}</label>
        </div>
      </div>
      <div className="mb-2">
        {prop.posting.images.map((img, index) => {
          return (
            <PostImage
              src={img}
              key={index}
              postIndex={prop.index}
              imageIndex={index}
            />
          );
        })}
      </div>
    </div>
  );
}

export default PostInput;
