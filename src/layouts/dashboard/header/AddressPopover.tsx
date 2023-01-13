import { Box, Button, Divider, MenuItem, Popover, Stack, Typography } from '@mui/material';
import useWallet from '../../../views/hooks/useWallet';
import { useTranslation } from 'react-i18next';
import account from '../../../_mock/account';
import { useState } from 'react';
import KeyboardArrowDownOutlinedIcon from '@mui/icons-material/KeyboardArrowDownOutlined';

export default function AddressPopover() {
  const { connectState, connect, disconnect, account, ethersProvider } = useWallet();
  const [open, setOpen] = useState<(EventTarget & HTMLButtonElement) | null>(null);
  const { t } = useTranslation();

  const addressToShow = account.substring(0, 7) + '...' + account.substring(account.length - 7, account.length);

  const logout = () => {
    disconnect();
    handleClose();
  };

  const handleClose = () => {
    setOpen(null);
  };
  return (
    <>
      {connectState === 'connected' ? (
        <Button
          variant="outlined"
          onClick={event => {
            setOpen(event.currentTarget);
          }}
          endIcon={<KeyboardArrowDownOutlinedIcon />}
        >
          {addressToShow}
        </Button>
      ) : connectState === 'connecting' ? (
        <Button variant="outlined">{t('home.connecting')}</Button>
      ) : (
        <Button variant="outlined" onClick={connect}>
          {t('home.login')}
        </Button>
      )}
      <Popover
        open={Boolean(open)}
        anchorEl={open}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        PaperProps={{
          sx: {
            p: 0,
            mt: 1.5,
            ml: 0.75,
            width: 180,
            '& .MuiMenuItem-root': {
              typography: 'body2',
              borderRadius: 0.75,
            },
          },
        }}
      >
        <Box sx={{ my: 1.5, px: 2.5 }}>
          <Typography variant="subtitle2" noWrap>
            {account}
          </Typography>
        </Box>

        <Divider sx={{ borderStyle: 'dashed' }} />

        <MenuItem onClick={logout} sx={{ m: 1 }}>
          {t('home.logout')}
        </MenuItem>
      </Popover>
    </>
  );
}
