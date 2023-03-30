import React, { Dispatch, SetStateAction, useContext, useState } from 'react';
import { Outlet } from 'react-router-dom';
import { styled } from '@mui/material/styles';
//
import Header from './header/Header';
import Nav from './nav/Nav';
import { Alert, AlertColor, Snackbar } from '@mui/material';
import useResponsive from '../../hooks/useResponsive';
import { UIContext } from '../../views/context/UIProvider';

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

export default function DashboardLayout() {
  const [open, setOpen] = useState(false);
  const { backLoadingOpen, backLoadingText } = useContext(UIContext);
  const isDesktop = useResponsive('up', 'md', 'md');

  return (
    <StyledRoot>
      <Header onOpenNav={() => setOpen(true)} loadingOpen={backLoadingOpen} loadingText={backLoadingText} />

      {!isDesktop && <Nav openNav={open} onCloseNav={() => setOpen(false)} />}

      <Main>
        <Outlet />
      </Main>
    </StyledRoot>
  );
}
