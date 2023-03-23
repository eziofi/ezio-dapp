import React, { useEffect } from 'react';
import { Button, useTheme } from '@mui/material';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Popover from '@mui/material/Popover';
import BaseIconFont from '../../../views/components/BaseIconFont';
import styled from '@emotion/styled';
import { Box } from '@mui/system';
import { NETWORK_ID, NETWORK_TYPE } from '../../../views/wallet/helpers/constant';
import CheckIcon from '@mui/icons-material/Check';
import useWallet from '../../../views/hooks/useWallet';

export default function NetWorkPopover() {
  const [flag, setFlag] = React.useState(false); // 控制上下箭头icon的切换
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null);
  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;
  const [checkNetworkId, setCheckNetworkId] = React.useState<NETWORK_ID | null>(null);
  const { networkId, switchNetwork } = useWallet();

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setFlag(true);
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setFlag(false);
  };

  function handleCheckNetWork(network: NETWORK_ID) {
    const networkToSwitch = NETWORK_ID[network];
    switchNetwork(networkToSwitch).then(() => {
      setCheckNetworkId(null);
      setCheckNetworkId(network);
      handleClose();
    });
  }

  useEffect(() => {
    setCheckNetworkId(networkId as NETWORK_ID);
  }, [networkId]);

  const PopoverStyle = styled(Box)(() => {
    return {
      display: 'flex',
      flexDirection: 'column',
    };
  });

  const theme = useTheme();

  const btnStyle = {
    borderRadius: '12px',
    color: theme.palette.text.primary,
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '10px 8px',
  };

  const networkIconStyle = {
    width: 24,
    height: 24,
    marginRight: '10px',
  };

  return (
    <>
      <Button onClick={handleClick} aria-describedby={id}>
        {checkNetworkId &&
          (checkNetworkId === NETWORK_ID.arbitrum ? (
            <BaseIconFont name="icon-arbitrum" style={{ width: 24, height: 24, marginRight: '4px' }} />
          ) : (
            <BaseIconFont name="icon-Polygon" style={{ width: 24, height: 24, marginRight: '4px' }} />
          ))}
        {flag ? <ExpandLessIcon /> : <ExpandMoreIcon />}
      </Button>

      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        PaperProps={{ sx: { width: 300, p: '10px' } }}
      >
        <PopoverStyle>
          <Button sx={{ ...btnStyle }} onClick={() => handleCheckNetWork(NETWORK_ID.polygon)}>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <BaseIconFont name="icon-Polygon" style={{ ...networkIconStyle }} />
              {NETWORK_TYPE.polygon}
            </div>
            {checkNetworkId === NETWORK_ID.polygon && <CheckIcon />}
          </Button>

          <Button sx={{ ...btnStyle }} onClick={() => handleCheckNetWork(NETWORK_ID.arbitrum)}>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <BaseIconFont name="icon-arbitrum" style={{ ...networkIconStyle }} />
              {NETWORK_TYPE.arbitrum}
            </div>
            {checkNetworkId === NETWORK_ID.arbitrum && <CheckIcon />}
          </Button>
        </PopoverStyle>
      </Popover>
    </>
  );
}
