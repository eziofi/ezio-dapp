import styles from './account.module.less';
import { TOKEN_TYPE, TRANSFER_TYPE } from '../wallet/helpers/constant';
import { timestampFormat } from '../wallet/helpers/utilities';
import { t } from 'i18next';
import { useRecord } from '../../hooks/useRecord';
import { PurchaseRecord, RedeemRecord } from '../wallet/helpers/contract_call';
import { Avatar, CardContent, List, ListItem, ListItemAvatar, ListItemText, useTheme } from '@mui/material';
import WorkIcon from '@mui/icons-material/Work';
import ImageIcon from '@mui/icons-material/Image';
import BeachAccessIcon from '@mui/icons-material/BeachAccess';
import Divider from '@mui/material/Divider';
import { Box } from '@mui/system';
import BaseIconFont from '../components/BaseIconFont';
export default function AccountDetail() {
  // const recordList = useRecord();
  const recordList: (RedeemRecord | PurchaseRecord)[] = [];

  return (
    <>
      {recordList?.map((record, index) => (
        <DetailItem record={record} key={record.timestamp} />
      ))}
    </>
  );
}

const DetailItem = ({ record }: { record: PurchaseRecord | RedeemRecord }) => {
  const theme = useTheme();
  const { transferType: type, timestamp, amt, qty } = record;
  const titleMap = {
    [TRANSFER_TYPE.PURCHASE]: t('account.recordPurchaseAction'),
    [TRANSFER_TYPE.REDEEM]: t('account.recordRedeemAction'),
  };

  const fontStyle = {
    width: 20,
    height: 20,
    fill:
      theme.palette.mode === 'dark'
        ? 'white'
        : titleMap[type] === t('account.recordPurchaseAction')
        ? 'rgba(125, 149, 250, 1)'
        : 'rgba(255, 141, 26, 1)',
  };

  return (
    <List sx={{ width: '97%', paddingBottom: 0 }}>
      <ListItem>
        <ListItemAvatar>
          <Avatar
            sx={{
              background: `${
                theme.palette.mode === 'dark'
                  ? titleMap[type] === t('account.recordPurchaseAction')
                    ? 'rgba(125, 149, 250, 1)'
                    : 'rgba(255, 141, 26, 1)'
                  : 'rgba(247, 248, 250, 1)'
              }`,
            }}
          >
            {/* <ImageIcon /> */}
            <BaseIconFont
              name={titleMap[type] === t('account.recordPurchaseAction') ? 'icon-maihuo' : 'icon-basket-fill'}
              style={fontStyle}
            />
          </Avatar>
        </ListItemAvatar>
        <Box sx={{ display: 'flex', alignItem: 'center', width: '100%' }}>
          <ListItemText
            primary={
              type === TRANSFER_TYPE.PURCHASE ? (
                (record.tokenType === 0 ? TOKEN_TYPE.ezUSD : TOKEN_TYPE.ezMatic) + titleMap[type]
              ) : type === TRANSFER_TYPE.REDEEM ? (
                (record.tokenType === 0 ? TOKEN_TYPE.ezUSD : TOKEN_TYPE.ezMatic) + titleMap[type]
              ) : (
                <></>
              )
            }
            secondary={<span style={{ fontSize: 12 }}>{timestampFormat(timestamp)}</span>}
          />
          <div
            style={{
              fontSize: 20,
              color: 'rgba(67, 207, 124, 1)',
              margin: '0 10px 0 0',
              textAlign: 'end',
            }}
          >
            {type === TRANSFER_TYPE.PURCHASE ? (
              <>
                <div style={{ color: '#e63212', fontSize: '1rem' }}>
                  -{amt} {TOKEN_TYPE.USDT}
                </div>
                <div style={{ fontSize: '1rem' }}>
                  +{qty} {record.tokenType === 0 ? TOKEN_TYPE.ezUSD : TOKEN_TYPE.ezMatic}
                </div>
              </>
            ) : type === TRANSFER_TYPE.REDEEM ? (
              <>
                <div style={{ fontSize: '1rem' }}>
                  +{amt} {TOKEN_TYPE.USDT}
                </div>
                <div style={{ color: '#e63212', fontSize: '1rem' }}>
                  -{qty} {record.tokenType === 0 ? TOKEN_TYPE.ezUSD : TOKEN_TYPE.ezMatic}
                </div>
              </>
            ) : (
              <></>
            )}
          </div>
        </Box>
      </ListItem>
      <Divider sx={{ marginTop: '8px' }} />
    </List>
  );
};
