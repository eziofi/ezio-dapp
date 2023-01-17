import { ChangeEvent, useState } from 'react';
// @mui
import { alpha } from '@mui/material/styles';
import { Box, MenuItem, Stack, IconButton, Popover } from '@mui/material';

// ----------------------------------------------------------------------

type langType = 'en' | 'zh';
const LANGS = {
  en: {
    value: 'en',
    label: 'English',
    icon: '/assets/icons/ic_flag_en.svg',
  },
  zh: {
    value: 'zh',
    label: '简体中文',
    icon: '/assets/icons/ic_flag_cn.svg',
  },
};

// ----------------------------------------------------------------------

export default function LanguagePopover() {
  const [open, setOpen] = useState(false);

  const lang = localStorage.getItem('lang');

  const handleClose = () => {
    setOpen(false);
  };

  const changeLang = (_lang: string) => {
    if (_lang === lang) {
      handleClose();
      return;
    }
    localStorage.setItem('lang', _lang);
    window.location.reload();
  };

  return (
    <>
      <IconButton
        onClick={event => {
          setOpen(true);
        }}
        sx={{
          padding: 0,
          width: 44,
          height: 44,
          ...(open && {
            bgcolor: theme => alpha(theme.palette.primary.main, theme.palette.action.focusOpacity),
          }),
        }}
      >
        <img src={LANGS[(lang || 'en') as langType].icon} alt={LANGS[(lang || 'en') as langType].label} />
      </IconButton>

      <Popover
        open={open}
        // anchorEl={open}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        PaperProps={{
          sx: {
            p: 1,
            mt: 1.5,
            ml: 0.75,
            width: 180,
            '& .MuiMenuItem-root': {
              px: 1,
              typography: 'body2',
              borderRadius: 0.75,
            },
          },
        }}
      >
        <Stack spacing={0.75}>
          {Object.values(LANGS).map(option => (
            <MenuItem key={option.value} selected={option.value === lang} onClick={() => changeLang(option.value)}>
              <Box component="img" alt={option.label} src={option.icon} sx={{ width: 28, mr: 2 }} />

              {option.label}
            </MenuItem>
          ))}
        </Stack>
      </Popover>
    </>
  );
}
