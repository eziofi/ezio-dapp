// ----------------------------------------------------------------------
import { Alert, AlertColor, Snackbar } from '@mui/material';
import React, { Dispatch, ReactElement, SetStateAction, useState } from 'react';
import useResponsive from '../../hooks/useResponsive';

interface IUIContext {
  loadingOpen: boolean;
  loadingText: string;
  openBackLoading: () => void;
  closeBackLoading: () => void;
  setBackLoadingText: (text: string) => void;
  openMsg: (msg: string, type?: AlertColor, closeTime?: number) => void;
  closeMsg: () => void;
  setMsg: (msg: string) => void;
  setMsgType: Dispatch<SetStateAction<AlertColor>>;
  backLoadingOpen: boolean;
  backLoadingText: string;
}
export const UIContext = React.createContext<IUIContext>({} as IUIContext);

export default function UIProvider({ children }: { children: ReactElement }) {
  // 控制loading遮罩层
  const [backLoadingOpen, setBackLoadingOpen] = useState(false);
  //控制loading遮罩层文字
  const [backLoadingText, setBackLoadingText] = useState('');

  const openBackLoading = () => {
    setBackLoadingOpen(true);
  };
  const closeBackLoading = () => {
    setBackLoadingOpen(false);
  };
  const _setBackLoadingText = (text: string) => {
    setBackLoadingText(text);
  };

  const [msgOpen, setMsgOpen] = useState(false);
  const [msgType, setMsgType] = useState<AlertColor>('error');
  const [msg, setMsg] = useState('');
  const [msgCloseTime, setMsgCloseTime] = useState(6000);

  const openMsg = (msg: string, type: AlertColor = 'error', closeTime: number = 6000) => {
    setMsgType(type);
    setMsg(msg);
    setMsgCloseTime(closeTime);
    setMsgOpen(true);
  };
  const closeMsg = () => setMsgOpen(false);
  const _setMsg = (msg: string) => setMsg(msg);

  const UIContextValue = {
    loadingOpen: backLoadingOpen,
    loadingText: backLoadingText,
    openBackLoading,
    closeBackLoading,
    setBackLoadingText: _setBackLoadingText,
    openMsg,
    setMsg: _setMsg,
    setMsgType,
    closeMsg,
    backLoadingOpen,
    backLoadingText,
  };
  return (
    <UIContext.Provider value={UIContextValue}>
      <Snackbar
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
        open={msgOpen}
        onClose={() => setMsgOpen(false)}
        message={msg}
        sx={{ position: 'fixed' }}
        autoHideDuration={msgCloseTime}
      >
        <Alert onClose={() => setMsgOpen(false)} severity={msgType} sx={{ width: '100%' }}>
          {msg}
        </Alert>
      </Snackbar>
      {children}
    </UIContext.Provider>
  );
}
