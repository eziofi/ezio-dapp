import { ListItem, styled, useTheme } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useBalance } from '../../../hooks/useBalance';
import { usePrice } from '../../../hooks/usePrice';
import { StyleProps } from '../../../types/styleType';
import BaseIconFont from '../../../views/components/BaseIconFont';
import { InlineSkeleton } from '../../../views/components/Skeleton';
import useWallet from '../../../views/hooks/useWallet';
import { ATokenMap, NETWORK_TYPE, TOKEN_TYPE } from '../../../views/wallet/helpers/constant';
import { formatString } from '../../../views/wallet/helpers/utilities';

interface IOptions {
  value: TOKEN_TYPE;
  iconParentStyle: any;
  iconName: string;
  iconStyle: { width: number; height: number; fill: string };
  balance: string | undefined;
}

export default function TokenLIstItem({ item }: { item: IOptions }) {
  const { price } = usePrice(item.value);

  const { reverseCoin, networkName } = useWallet();

  const theme = useTheme();

  const IconStyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: 30,
    height: 30,
    borderRadius: '50%',
  };

  const MyListItem = styled((props: StyleProps) => <ListItem {...props} disablePadding />)(() => {
    const theme = useTheme();
    return {
      marginTop: '10px',
      padding: '10px 20px',
      display: 'flex',
      justifyContent: 'space-between',
      ':hover': {
        cursor: 'pointer',
        // @ts-ignore
        background: theme.palette.purchase.tokenDialog.hover,
      },
    };
  });

  function renderIcon(item: IOptions) {
    return (
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <div style={{ ...IconStyle, ...item.iconParentStyle, marginRight: '10px' }}>
          <BaseIconFont
            name={item.iconName === 'icon-wstETH1' ? `icon-${reverseCoin}` : item.iconName}
            style={{ ...item.iconStyle }}
          />
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-around' }}>
          <span style={{ fontWeight: '500' }}>
            {item.value === TOKEN_TYPE['ReverseCoin']
              ? reverseCoin
              : networkName === NETWORK_TYPE.polygon && item.value === TOKEN_TYPE.E2LP
              ? ATokenMap[networkName]
              : TOKEN_TYPE[item.value as TOKEN_TYPE]}
          </span>
          <span style={{ fontSize: 14, color: theme.palette.text.secondary }}>
            {item.balance ? formatString(item.balance, 6).toString() : <InlineSkeleton width={40} />}
            {TOKEN_TYPE[item.value]}
          </span>
        </div>
      </div>
    );
  }

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
      }}
    >
      {/* <ListItem> {renderIcon(item)}</ListItem> */}
      <MyListItem>
        <>
          {renderIcon(item)}
          <span style={{ fontWeight: '500' }}>
            {item.balance ? (
              '$' + formatString('' + parseFloat(item.balance) * parseFloat(price || '0'), 6).toString()
            ) : (
              <InlineSkeleton width={40} />
            )}
          </span>
        </>
      </MyListItem>
    </div>
  );
}
