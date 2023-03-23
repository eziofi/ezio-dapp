import React, { Dispatch, SetStateAction, useState } from 'react';
import { Outlet } from 'react-router-dom';
import { styled } from '@mui/material/styles';
//
import Header from './header/Header';
import Nav from './nav/Nav';
import { Alert, AlertColor, Snackbar } from '@mui/material';
import useResponsive from '../../hooks/useResponsive';

// ----------------------------------------------------------------------

const APP_BAR_MOBILE = 64;
const APP_BAR_DESKTOP = 92;

const StyledRoot = styled('div')({
  display: 'flex',
  minHeight: '100%',
  overflow: 'hidden',
  // background: 'red',
});

const Main = styled('div')(({ theme }) => ({
  flexGrow: 1,
  overflow: 'auto',
  minHeight: '100%',
  paddingTop: APP_BAR_MOBILE + 24,
  paddingBottom: theme.spacing(10),
  // [theme.breakpoints.up('md')]: {
  //   paddingTop: APP_BAR_DESKTOP + 24,
  //   paddingLeft: theme.spacing(2),
  //   paddingRight: theme.spacing(2),
  // },
}));

const BackDropContent = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
});

// ----------------------------------------------------------------------
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
}

export const UIContext = React.createContext<IUIContext>({} as IUIContext);

export default function DashboardLayout() {
  const [open, setOpen] = useState(false);

  // 控制loading遮罩层
  const [backLoadingOpen, setBackLoadingOpen] = useState(false);
  //控制loading遮罩层文字
  const [backLoadingText, setBackLoadingText] = useState('');

  const isDesktop = useResponsive('up', 'md', 'md');

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
  };

  return (
    <UIContext.Provider value={UIContextValue}>
      <StyledRoot>
        {/*提示信息*/}
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
        {/*全局loading遮罩层*/}
        {/*<Backdrop sx={{ color: '#fff', zIndex: 2001 }} open={backLoadingOpen} onClick={closeBackLoading}>*/}
        {/*  <BackDropContent>*/}
        {/*    <CircularProgress color="inherit" />*/}
        {/*    <Box sx={{ marginTop: 1 }}>{backLoadingText}</Box>*/}
        {/*  </BackDropContent>*/}
        {/*</Backdrop>*/}
        <Header onOpenNav={() => setOpen(true)} loadingOpen={backLoadingOpen} loadingText={backLoadingText} />

        {!isDesktop && <Nav openNav={open} onCloseNav={() => setOpen(false)} />}

        <Main>
          <Outlet />
        </Main>
      </StyledRoot>
    </UIContext.Provider>
  );
}
