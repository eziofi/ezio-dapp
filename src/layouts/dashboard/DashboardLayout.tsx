import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { styled } from '@mui/material/styles';
//
import Header from './header';
import Nav from './nav';
import { Alert, Backdrop, Box, CircularProgress, Snackbar } from '@mui/material';

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
  [theme.breakpoints.up('lg')]: {
    paddingTop: APP_BAR_DESKTOP + 24,
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
  },
}));

const BackDropContent = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
});

// ----------------------------------------------------------------------
interface IUIContext {
  openBackLoading: () => void;
  closeBackLoading: () => void;
  setBackLoadingText: (text: string) => void;
  openMsg: () => void;
  closeMsg: () => void;
  setMsg: (msg: string) => void;
}

export const UIContext = React.createContext<IUIContext>({} as IUIContext);

export default function DashboardLayout() {
  const [open, setOpen] = useState(false);

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
  const [msg, setMsg] = useState('');
  const openMsg = () => setMsgOpen(true);
  const closeMsg = () => setMsgOpen(false);
  const _setMsg = (msg: string) => setMsg(msg);

  const UIContextValue = {
    openBackLoading,
    closeBackLoading,
    setBackLoadingText: _setBackLoadingText,
    openMsg,
    setMsg: _setMsg,
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
        >
          <Alert onClose={() => setMsgOpen(false)} severity="error" sx={{ width: '100%' }}>
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

        <Nav openNav={open} onCloseNav={() => setOpen(false)} />

        <Main>
          <Outlet />
        </Main>
      </StyledRoot>
    </UIContext.Provider>
  );
}
