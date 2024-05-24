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
  return (
    <div className="flex min-w-80 min-h-32 w-full justify-center bg-slate-100 rounded-xl">
      <div className="flex justify-center">
        <div className="flex flex-col justify-between p-2">
          <span>{title}</span>
          <span>{content}</span>
          <div className="flex justify-between">
            <button
              onClick={OnClickConfirm}
              className="w-20 rounded-md py-1 px-2 bg-blue-400 mr-4"
            >
              확인
            </button>
            <button
              onClick={OnClickCancel}
              className="w-20 rounded-md py-1 px-2 bg-white"
            >
              취소
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
