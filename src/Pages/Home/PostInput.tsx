import React, { useEffect, useState } from 'react';
import { BskyAgent } from '@atproto/api';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { uiSlice } from '@/store/UISlice';
import { SvgIcon } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import PostImage from './PostImage';

export interface PropPostInput {
  index: number;
  content: string;
  images: string[];
  onChange: (index: number, text: string) => void;
  onClickRemove: (index: number) => void;
  onChangeImages: (index: number, img: string[]) => void;
}

function PostInput(prop: PropPostInput) {
  const [inputText, setInputText] = useState('');
  const refInput = React.createRef<HTMLInputElement>();

  const OnChangeTextArea = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInputText(e.target.value);
    prop.onChange(prop.index, e.target.value);
  };

  const OnClickRemove = () => {
    prop.onClickRemove(prop.index);
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
    prop.onChangeImages(prop.index, [...prop.images, ...images]);
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
      <input
        className="hidden"
        ref={refInput}
        type="file"
        accept="image/gif, image/jpeg, image/png"
        onChange={OnChangeFile}
        multiple
      />
      <div className="flex justify-between text-xs mb-1 text-white">
        <div>
          <SvgIcon
            component={AddPhotoAlternateIcon}
            fontSize={'small'}
            className="cursor-pointer"
            onClick={OnClickAddImage}
          />
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
      <div>
        {prop.images.map((img, index) => {
          return <PostImage src={img} key={index} />;
        })}
      </div>
    </div>
  );
}

export default PostInput;
