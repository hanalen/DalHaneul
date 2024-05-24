import { RootState } from '../store/Store';
import { useSelector } from 'react-redux';
import DialogAlert from './DialogAlert';
import { useEffect } from 'react';
import { JsxElement } from 'typescript';
import { EDialogType, useGlobalDialog } from './GlobalDialogProvider';
import DialogConfirm from './DialogConfirm';

export default function GlobalDialog() {
  const { isOpen, type } = useGlobalDialog();
  let renderDialog: JSX.Element | undefined = undefined;
  if (type === EDialogType.ALERT) {
    renderDialog = <DialogAlert />;
  } else if (type === EDialogType.CONFIRM) {
    renderDialog = <DialogConfirm />;
  } else if (type === EDialogType.CONFIRM_ERROR) {
    return <div></div>;
  }
  if (!renderDialog || !isOpen) {
    return <div></div>;
  } else {
    return (
      <div className="fixed left-0 top-0 z-10 h-screen w-screen flex justify-center text-center">
        <div className="w-full h-full bg-black opacity-20 fixed left-0 top-0 z-20"></div>
        <div className="flex flex-col justify-center z-30">{renderDialog}</div>
      </div>
    );
  }
}
