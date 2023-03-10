import React, { ChangeEvent, ChangeEventHandler } from 'react';
import { useTranslation } from 'react-i18next';
import { InputAdornment, Button, TextField, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
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
    setSlippage(1);
  };

  const handleOk = () => {
    setOpen(false);
  };

  const { t } = useTranslation();

  const toFixedSlippage = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.value !== '') {
      setSlippage(+e.target.value.replace(/^\D*(\d*(?:\.\d{0,1})?).*$/g, '$1'));
    } else {
      e.target.value = e.target.value.replace(/[e\+\-]/, '');
      setSlippage(+e.target.value);
    }
  };

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
          onInput={(e: ChangeEvent<HTMLInputElement>) => toFixedSlippage(e)}
          InputProps={{
            endAdornment: <InputAdornment position="start">%</InputAdornment>,
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
