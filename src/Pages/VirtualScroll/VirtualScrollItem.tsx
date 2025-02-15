import React, {
  createRef,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import { AppBskyFeedDefs, BskyAgent } from '@atproto/api';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { ETabType, TabInfo, uiSlice } from '../../store/UISlice';
import HomeIcon from '@mui/icons-material/Home';
import DragIndicatorIcon from '@mui/icons-material/DragIndicator';
import { useCommon } from '../../Providers/CommonProvider';
import { SvgIcon, Icon, IconButton, Box } from '@mui/material';
import { RootState } from '../../store/Store';
import PostItem from '../Home/Items/PostItem';
import FeedItem from '../Home/Items/FeedItem';

export interface VirtualScrollItemProp {
  onChangeHeight: (itemKey: string, changeHeight: number) => void;
  height: number;
  scrollTop: number;
  itemKey: string;
  item: any;
  children: React.ReactNode;
}

function VirtualScrollItem(prop: VirtualScrollItemProp) {
  const [style, setStyle] = useState<React.CSSProperties>({});
  const childrenRef = useRef<HTMLDivElement>(null);
  const prevHeight = useRef<number>(0);

  const GetValueByKey = useCallback((obj: any) => {
    return prop.itemKey.split('.').reduce((acc, part) => acc && acc[part], obj);
  }, []);

  useEffect(() => {
    setStyle({
      transform: `translateY(${prop.scrollTop}px)`,
    });
  }, [prop.scrollTop]);

  useEffect(() => {
    prevHeight.current = prop.height;
    const observer = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const { height } = entry.contentRect;
        //높이 변경이 없을 경우
        if (height === 0) return;
        if (prop.onChangeHeight) {
          // const changeHeight = height - prevHeight.current;
          prop.onChangeHeight(GetValueByKey(prop.item), height);
        }
        prevHeight.current = height;
      }
    });

    if (childrenRef.current) {
      observer.observe(childrenRef.current);
    }

    return () => {
      if (childrenRef.current) {
        observer.disconnect();
      }
    };
  }, []);

  return (
    <div
      className="virtual-scroll-item absolute left-0 top-0 w-full border-t-2 border-gray-200"
      ref={childrenRef}
      style={style}
    >
      {prop.children}
    </div>
  );
}

export default VirtualScrollItem;
