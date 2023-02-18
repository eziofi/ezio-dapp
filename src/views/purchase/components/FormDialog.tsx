import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { styled } from '@mui/system';
import {
  useTheme,
  InputAdornment,
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from '@mui/material';
export default function FormDialog({
  open,
  setOpen,
  slippage,
  setSlippage,
}: {
  open: boolean;
  setOpen: (openFlag: boolean) => void;
  slippage: number;
  setSlippage: (count: number) => void;
}) {
  const handleClose = () => {
    setOpen(false);
  };

  const handleOk = () => {
    setOpen(false);
  };

  const { t } = useTranslation();

  const theme = useTheme();

  function setAmountFormat(val: string) {
    if (val) return parseFloat(val).toFixed(2) || '';
  }

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      sx={{
        width: 'lg',
        '.css-8umbsu-MuiPaper-root-MuiDialog-paper': {
          boxShadow: 'none',
        },
      }}
    >
      <DialogTitle>{t('purchase.slippageSetting')}</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          id="name"
          label={t('purchase.PleaseEnterTheSlipPoint')}
          fullWidth
          variant="standard"
          type="number"
          value={slippage}
          onChange={(e: any) => setSlippage(e.target.value.replace(/^\D*(\d*(?:\.\d{0,2})?).*$/g, '$1'))}
          InputProps={{
            endAdornment: <InputAdornment position="end">%</InputAdornment>,
          }}
        />
        {/* <FormattedInputs /> */}
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>{t('purchase.cancel')}</Button>
        <Button onClick={handleOk}>{t('purchase.ok')}</Button>
      </DialogActions>
    </Dialog>
  );
}
