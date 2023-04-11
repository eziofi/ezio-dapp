import {
  Avatar,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Snackbar,
} from '@mui/material';
import useWallet from '../../../hooks/useWallet';
import { useTranslation } from 'react-i18next';
import { useState } from 'react';
import KeyboardArrowDownOutlinedIcon from '@mui/icons-material/KeyboardArrowDownOutlined';
import metamaskBtn from '../../../assets/home/metamask@3x.png';
import useResponsive from '../../../hooks/useResponsive';
import DrawerSetting from './DrawerSetting';

export default function AddressPopover() {
  const { connectState, connect, account } = useWallet();

  const [dialogOpen, setDialogOpen] = useState<boolean>(false);
  const [copyFlag, setCopyFlag] = useState<boolean>(false);
  const { t } = useTranslation();

  const isDesktop = useResponsive('up', 'md', 'md');

  const addressToShow = account.substring(0, 5) + '...' + account.substring(account.length - 5, account.length);

  const copyClose = (event: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    setCopyFlag(false);
  };

  const [openDrawer, setOpenDrawer] = useState(false);

  return (
    <>
      {connectState === 'connected' ? (
        <Button
          onClick={event => {
            setOpenDrawer(true);
          }}
          endIcon={<KeyboardArrowDownOutlinedIcon />}
        >
          <Avatar src={metamaskBtn} sx={{ width: 24, height: 24, marginRight: isDesktop ? 1 : 0 }} />
          {isDesktop ? addressToShow : ''}
        </Button>
      ) : connectState === 'connecting' ? (
        <Button>{t('home.connecting')}</Button>
      ) : (
        <Button onClick={connect}>{t('home.login')}</Button>
      )}

      <DrawerSetting open={openDrawer} setOpen={setOpenDrawer} setCopyFlag={setCopyFlag} />
      <Snackbar
        open={copyFlag}
        autoHideDuration={1000}
        onClose={copyClose}
        message={t('home.copyText')}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
      />
      <Dialog open={dialogOpen} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description">
        <DialogTitle id="alert-dialog-title">{t('common.warning')}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">{t('message.errorNetTip')}</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDialogOpen(false)}>{t('common.ok')}</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
