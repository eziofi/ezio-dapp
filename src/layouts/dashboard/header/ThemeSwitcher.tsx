import { IconButton } from '@mui/material';
import Brightness5Icon from '@mui/icons-material/Brightness5';
import NightlightIcon from '@mui/icons-material/Nightlight';
import { useContext } from 'react';
import { ColorModeContext } from '../../../theme';

export default function ThemeSwitcher() {
  const { mode, toggleColorMode } = useContext(ColorModeContext);
  return (
    <>
      <IconButton aria-label="delete" onClick={toggleColorMode}>
        {mode === 'light' ? <NightlightIcon /> : <Brightness5Icon />}
      </IconButton>
    </>
  );
}
