import React, { ChangeEvent } from 'react';
import Popover from '@mui/material/Popover';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import BaseIconFont from '../../components/BaseIconFont';
import { CardContent, IconButton, useTheme, InputAdornment, OutlinedInput } from '@mui/material';
import { SlippagePopoverContent } from '../PurchaseStyle';
import { useTranslation } from 'react-i18next';

export default function SlippagePopover({
  slippage,
  setSlippage,
}: {
  slippage: number;
  setSlippage: (count: number) => void;
}) {
  const { t } = useTranslation();

  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  const toFixedSlippage = (e: ChangeEvent<HTMLInputElement | any>) => {
    if (e.target.value !== '') {
      // @ts-ignore
      setSlippage(e.target.value.replace(/^\D*(\d*(?:\.\d{0,1})?).*$/g, '$1'));
      setIsAutomation(false);
    } else {
      e.target.value = e.target.value.replace(/[e\+\-]/, '');
      setSlippage(e.target.value);
      setIsAutomation(true);
    }
  };

  const [isAutomation, setIsAutomation] = React.useState(true);

  return (
    <div>
      <IconButton title="滑点设置" aria-describedby={id} onClick={handleClick}>
        <BaseIconFont
          name={useTheme().palette.mode === 'dark' ? 'icon-shezhi-copy2' : 'icon-shezhi'}
          style={{ width: 20, height: 20 }}
        />
      </IconButton>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
      >
        <SlippagePopoverContent>
          <CardContent>
            <Typography sx={{ fontSize: 20 }} gutterBottom>
              设置
            </Typography>
            <div>
              <header>
                <p>
                  滑点容差 <BaseIconFont name="icon-wenhaoxiao" />
                </p>
              </header>
              <footer>
                <Button size="small" variant="contained" disabled={!isAutomation}>
                  自动
                </Button>
                <OutlinedInput
                  id="outlined-adornment-weight"
                  endAdornment={
                    <InputAdornment position="end">
                      {isAutomation ? (
                        <>
                          {0.5} <span style={{ color: 'white', marginLeft: 5 }}>%</span>
                        </>
                      ) : (
                        <span style={{ color: 'white' }}>%</span>
                      )}
                    </InputAdornment>
                  }
                  value={slippage}
                  onInput={(e: ChangeEvent<HTMLInputElement>) => toFixedSlippage(e)}
                  sx={{ width: 200, marginLeft: '5px' }}
                />
              </footer>
            </div>
          </CardContent>
        </SlippagePopoverContent>
      </Popover>
    </div>
  );
}
