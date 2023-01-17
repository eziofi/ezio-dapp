import { IconButton } from '@mui/material';
import Brightness5Icon from '@mui/icons-material/Brightness5';
import NightlightIcon from '@mui/icons-material/Nightlight';

export default function ThemeSwitcher() {
  return (
    <>
      <IconButton aria-label="delete">
        <Brightness5Icon />
      </IconButton>
      <IconButton aria-label="delete">
        <NightlightIcon />
      </IconButton>
    </>
  );
}
