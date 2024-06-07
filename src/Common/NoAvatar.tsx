import React, { useCallback, useEffect, useState } from 'react';
import { Icon } from '@mui/material';
function NoAvatar() {
  return (
    <div className="text-4xl flex justify-center text-gray-400">
      <div className="flex flex-col justify-center">
        <Icon fontSize="inherit">person</Icon>
      </div>
    </div>
  );
}

export default NoAvatar;
