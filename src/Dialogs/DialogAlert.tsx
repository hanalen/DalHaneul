import { RootState, store } from '../store/Store';
import { useSelector } from 'react-redux';
import { useGlobalDialog } from './GlobalDialogProvider';

export default function DialogAlert() {
  const { title, content, CloseDialog } = useGlobalDialog();

  const OnClickClose = (
    e: React.MouseEvent<HTMLButtonElement | HTMLDivElement>
  ) => {
    e.preventDefault();
    e.stopPropagation();
    CloseDialog();
  };

  return <div className="dialog-alert"></div>;
}
