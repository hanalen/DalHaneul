import React, { createContext, useContext, ReactNode, useState } from 'react';
import GlobalDialog from './GlobalDialog';
export enum EDialogType {
  CONFIRM = 'confirm',
  ALERT = 'alert',
  CONFIRM_ERROR = 'confirm_error',
}

export interface ActionShowDialog {
  title: string;
  content: string;
  confirmText?: string;
  cancelText?: string;
  onConfirm?: (result: boolean) => void;
  type: EDialogType;
}

interface GlobalDialogContextProps {
  isOpen: boolean;
  OpenDialog: (action: ActionShowDialog) => void;
  CloseDialog: () => void;
  OnCancel: () => void;
  OnConfirm: (result: boolean) => void;
  title?: string;
  content?: string;
  type?: EDialogType;
}

const GlobalDialogContext = createContext<GlobalDialogContextProps | undefined>(
  undefined
);

export const GlobalDialogProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [title, setTitle] = useState<string | undefined>(undefined);
  const [content, setContent] = useState<string | undefined>(undefined);
  const [type, setType] = useState<EDialogType | undefined>(undefined);
  const [onConfirm, setOnConfirm] = useState<(result: boolean) => void>();

  const OpenDialog = (action: ActionShowDialog) => {
    const { title, content, type, onConfirm } = action;
    setIsOpen(true);
    setType(type);
    setTitle(title);
    setContent(content);
    setOnConfirm(onConfirm);
  };

  const CloseDialog = () => {
    setIsOpen(false);
    onConfirm && onConfirm(false);
  };

  const OnCancel = () => {
    setIsOpen(false);
    onConfirm && onConfirm(false);
  };

  const OnConfirm = () => {
    setIsOpen(false);
    onConfirm && onConfirm(true);
  };

  return (
    <GlobalDialogContext.Provider
      value={{
        OnCancel,
        CloseDialog,
        OpenDialog,
        OnConfirm,
        isOpen,
        type,
        content,
        title,
      }}
    >
      {children}
      {isOpen && <GlobalDialog />}
    </GlobalDialogContext.Provider>
  );
};

export const useGlobalDialog = () => {
  const context = useContext(GlobalDialogContext);
  if (!context) {
    throw new Error(
      'useGlobalDialog must be used within a GlobalDialogProvider'
    );
  }
  return context;
};
