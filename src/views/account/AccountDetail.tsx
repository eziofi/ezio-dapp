import styles from './account.module.less';
import { TRANSFER_TYPE } from '../wallet/helpers/constant';
import { timestampFormat } from '../wallet/helpers/utilities';
import { t } from 'i18next';
import { useRecord } from '../../hooks/useRecord';
import { PurchaseRecord, RedeemRecord } from '../wallet/helpers/contract_call';

export default function AccountDetail() {
  const recordList = useRecord();

  return (
    <div className={styles.accountDetailBox}>
      {recordList?.map((record, index) => (
        <DetailItem record={record} key={record.timestamp} />
      ))}
    </div>
  );
}

const DetailItem = ({ record }: { record: PurchaseRecord | RedeemRecord }) => {
  const { transferType: type, timestamp, amt, qty } = record;
  const titleMap = {
    [TRANSFER_TYPE.PURCHASE]: t('account.recordPurchaseAction'),
    [TRANSFER_TYPE.REDEEM]: t('account.recordRedeemAction'),
  };
  return (
    <div className={styles.detailItemBox}>
      <div className={styles.detailItem}>
        <div className={styles.column1}>
          <div className={styles.title}>
            {titleMap[type]}
            {/*{type === TRANSFER_TYPE.PURCHASE && <span>{ezat ? ' EZAT' : ezbt ? ' EZBT' : ''}</span>}*/}
          </div>
          <div className={styles.timestamp}>{timestampFormat(timestamp)}</div>
        </div>
        <div className={styles.column2}>
          {type === TRANSFER_TYPE.PURCHASE ? (
            <>
              <div className={styles.valueOut}>-{amt} USDT</div>
              <div className={styles.valueIn}>
                +{qty} {record.tokenType === 0 ? 'EZAT' : 'EZBT'}
              </div>
            </>
          ) : type === TRANSFER_TYPE.REDEEM ? (
            <>
              <div className={styles.valueIn}>+{amt} USDT</div>
              <div className={styles.valueOut}>
                -{qty} {record.tokenType === 0 ? 'EZAT' : 'EZBT'}
              </div>
            </>
          ) : (
            <></>
          )}
        </div>
      </div>
    </div>
  );
};
