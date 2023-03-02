import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
// @mui
import { css, styled } from '@mui/material/styles';
//
import Header from './header';
import Nav from './nav';
import { Backdrop, Box, CircularProgress } from '@mui/material';

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

  const UIContextValue = { openBackLoading, closeBackLoading, setBackLoadingText: _setBackLoadingText };

  return (
    <UIContext.Provider value={UIContextValue}>
      <StyledRoot>
        <Backdrop sx={{ color: '#fff', zIndex: 2001 }} open={backLoadingOpen} onClick={closeBackLoading}>
          <BackDropContent>
            <CircularProgress color="inherit" />
            <Box sx={{ marginTop: 1 }}>{backLoadingText}</Box>
          </BackDropContent>
        </Backdrop>
        <Header onOpenNav={() => setOpen(true)} />

        <Nav openNav={open} onCloseNav={() => setOpen(false)} />

        <Main>
          <Outlet />
        </Main>
      </StyledRoot>
    </UIContext.Provider>
  );
}
