import React from 'react';
import { useBalance } from '../../../hooks/useBalance';
import { TOKEN_TYPE } from '../../wallet/helpers/constant';
import CheckIcon from '@mui/icons-material/Check';
import { formatString } from '../../wallet/helpers/utilities';
import { InlineSkeleton } from '../../components/Skeleton';

interface IOptions {
  value: TOKEN_TYPE;
  iconParentStyle: { margin: string; background: string };
  iconName: string;
  iconStyle: { width: number; height: number; fill: string };
}

export default function BalanceList({ item, tokenType }: { item: IOptions; tokenType: TOKEN_TYPE }) {
  const { balance } = useBalance(item.value);

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
      }}
    >
      {balance ? balance : <InlineSkeleton width={40} />}

      {TOKEN_TYPE[tokenType as TOKEN_TYPE] === TOKEN_TYPE[item.value as TOKEN_TYPE] && (
        <CheckIcon sx={{ color: 'rgb(251, 17, 142)', marginLeft: '5px' }} />
      )}
    </div>
  );
}
