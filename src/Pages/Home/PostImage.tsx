import SvgIcon from '@mui/icons-material/Home';
import CancelIcon from '@mui/icons-material/Cancel';
import CloseIcon from '@mui/icons-material/Close';
import React, { useEffect, useState } from 'react';

export interface PropPostImage {
  src: string;
}

function PostImage(prop: PropPostImage) {
  const OnClick = () => {
    //
  };
  return (
    <div className="flex justify-center mb-2 relative">
      <div className="relative">
        <SvgIcon
          component={CancelIcon}
          className="absolute right-1 top-1 cursor-pointer bg-white rounded-full"
          color="inherit"
          onClick={OnClick}
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
