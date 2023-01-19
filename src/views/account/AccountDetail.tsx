import styles from './account.module.less';
import { TRANSFER_TYPE } from '../wallet/helpers/constant';
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
  const recordList = useRecord();

  const list: (RedeemRecord | PurchaseRecord)[] = [
    {
      timestamp: 0,
      amt: 'a',
      qty: 'a',
      transferType: TRANSFER_TYPE.REDEEM,
      tokenType: 1,
    },
    {
      timestamp: 1,
      amt: 'a',
      qty: 'a',
      transferType: TRANSFER_TYPE.PURCHASE,
      tokenType: 0,
    },
  ];

  return (
    // <div className={styles.accountDetailBox}>
    //   {recordList?.map((record, index) => (
    //     <DetailItem record={record} key={record.timestamp} />
    //   ))}
    // </div>
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
  console.log(record);
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
    // <div className={styles.detailItemBox}>
    //   <div className={styles.detailItem}>
    //     <div className={styles.column1}>
    //       <div className={styles.title}>
    //         {titleMap[type]}
    //         {/* {type === TRANSFER_TYPE.PURCHASE && <span>{ezat ? ' EZAT' : ezbt ? ' EZBT' : ''}</span>} */}
    //       </div>
    //     </div>
    //     <div className={styles.column2}>
    //       {type === TRANSFER_TYPE.PURCHASE ? (
    //         <>
    //           <div className={styles.valueOut}>-{amt} USDT</div>
    //           <div className={styles.valueIn}>
    //             +{qty} {record.tokenType === 0 ? 'EZAT' : 'EZBT'}
    //           </div>
    //         </>
    //       ) : type === TRANSFER_TYPE.REDEEM ? (
    //         <>
    //           <div className={styles.valueIn}>+{amt} USDT</div>
    //           <div className={styles.valueOut}>
    //             -{qty} {record.tokenType === 0 ? 'EZAT' : 'EZBT'}
    //           </div>
    //         </>
    //       ) : (
    //         <></>
    //       )}
    //     </div>
    //   </div>
    // </div>
    <List sx={{ width: '97%' }}>
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
                (record.tokenType === 0 ? 'EZAT' : 'EZBT') + titleMap[type]
              ) : type === TRANSFER_TYPE.REDEEM ? (
                (record.tokenType === 0 ? 'EZAT' : 'EZBT') + titleMap[type]
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
                <div style={{ color: '#e63212' }}>-{amt} USDT</div>
                <div className={styles.valueIn}>
                  +{qty} {record.tokenType === 0 ? 'EZAT' : 'EZBT'}
                </div>
              </>
            ) : type === TRANSFER_TYPE.REDEEM ? (
              <>
                <div className={styles.valueIn}>+{amt} USDT</div>
                <div style={{ color: '#e63212' }}>
                  -{qty} {record.tokenType === 0 ? 'EZAT' : 'EZBT'}
                </div>
              </>
            ) : (
              <></>
            )}
          </div>
        </Box>
      </ListItem>
      <Divider />
    </List>
  );
};
