import { RootState, store } from '../store/Store';
import { useSelector } from 'react-redux';
import { useGlobalDialog } from './GlobalDialogProvider';

export default function DialogConfirm() {
  const { title, content, OnCancel, OnConfirm } = useGlobalDialog();

  const OnClickCancel = (
    e: React.MouseEvent<HTMLButtonElement | HTMLDivElement>
  ) => {
    e.preventDefault();
    e.stopPropagation();
    OnCancel();
  };

  const OnClickConfirm = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
    OnConfirm(true);
  };
  return <div className="dialog-Confirm"></div>;
}
