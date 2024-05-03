import SvgIcon from '@mui/icons-material/Home';
import CancelIcon from '@mui/icons-material/Cancel';
import CloseIcon from '@mui/icons-material/Close';
import React, { useEffect, useState } from 'react';
import { store } from '../../store/Store';
import { postSlice } from '../../store/PostSlice';

export interface PropPostImage {
  src: string;
  postIndex: number;
  imageIndex: number;
}

function PostImage(prop: PropPostImage) {
  const OnClickRemove = () => {
    store.dispatch(
      postSlice.actions.removeImage({
        postIndex: prop.postIndex,
        imageIndex: prop.imageIndex,
      })
    );
  };

  return (
    <div className="flex justify-center mb-2 relative">
      <div className="relative">
        <SvgIcon
          component={CancelIcon}
          className="absolute right-1 top-1 cursor-pointer bg-white rounded-full"
          color="inherit"
          onClick={OnClickRemove}
        />

        <img
          src={prop.src}
          alt="image"
          className="max-h-[300px] rounded-lg object-contain"
        />
      </div>
    </div>
  );
}

export default PostImage;
