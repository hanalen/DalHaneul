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
    return <div>{renderDialog}</div>;
  }
}
