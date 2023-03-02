import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useTranslation } from 'react-i18next';
import { useQuery } from 'react-query';
import { queryTokenInfo, queryTotalPurchaseBy24h } from '../../../api/api';
import { TOKEN_TYPE } from '../../wallet/helpers/constant';
import { useState } from 'react';
import numeral from 'numeral';
import { formatNetWorth } from '../../wallet/helpers/utilities';
import { Card } from '@mui/material';
import Scrollbar from '../../../components/scrollbar';
import Skeleton from '@mui/material/Skeleton';

interface ITokenInfo {
  type: TOKEN_TYPE;
  netWorth: string;
  oneDayChange: string;
  totalPurchase?: number;
}
export default function PriceTable() {
  const [tokenList, setTokenList] = useState<ITokenInfo[]>([]);
  const { t } = useTranslation();
  useQuery('queryTokenInfo', queryTokenInfo, {
    onSuccess: data => {
      const test = formatNetWorth(1.566);
      const aTodayWorth = formatNetWorth(data.data.data[0].ezatNetWorth);
      const aYestdayWorth = formatNetWorth(data.data.data[1].ezatNetWorth);
      const bTodayWorth = formatNetWorth(data.data.data[0].ezbtNetWorth);
      const bYestdayWorth = formatNetWorth(data.data.data[1].ezbtNetWorth);
      const EZATInfo: ITokenInfo = {
        type: TOKEN_TYPE.ezUSD,
        netWorth: aTodayWorth,
        oneDayChange: numeral((parseFloat(aTodayWorth) - parseFloat(aYestdayWorth)) / parseFloat(aYestdayWorth)).format(
          '0.00%',
        ),
      };
      const EZBTInfo: ITokenInfo = {
        type: TOKEN_TYPE.ezMatic,
        netWorth: bTodayWorth,
        oneDayChange: numeral((parseFloat(bTodayWorth) - parseFloat(bYestdayWorth)) / parseFloat(bYestdayWorth)).format(
          '0.00%',
        ),
      };
      setTokenList([EZATInfo, EZBTInfo]);
    },
  });
  useQuery('queryTotalPurchaseBy24h', queryTotalPurchaseBy24h, {
    enabled: tokenList.length > 0,
    onSuccess: data => {
      const EZATPurchase = data.data.data?.find(i => i.purchaseType === 'A')?.purchaseQty;
      const EZBTPurchase = data.data.data?.find(i => i.purchaseType === 'B')?.purchaseQty;
      const EZATInfo = { ...tokenList[0] };
      const EZBTInfo = { ...tokenList[1] };
      EZATInfo.totalPurchase = EZATPurchase;
      EZBTInfo.totalPurchase = EZBTPurchase;
      setTokenList([EZATInfo, EZBTInfo]);
    },
  });

  const TABLE_HEAD = [
    { id: 'name', label: 'Name', alignRight: false },
    { id: 'company', label: 'Company', alignRight: false },
    { id: 'role', label: 'Role', alignRight: false },
    { id: 'isVerified', label: 'Verified', alignRight: false },
    { id: 'status', label: 'Status', alignRight: false },
    { id: '' },
  ];
  return (
    <>
      <Card>
        <Scrollbar>
          <TableContainer sx={{ minWidth: 800 }}>
            <Table>
              <TableHead
                sx={{
                  '.MuiTableCell-root': {
                    color: 'rgba(120, 125, 145, 1)',
                    fontWeight: 400,
                  },
                }}
              >
                <TableRow>
                  <TableCell align="center">{t('home.coin')}</TableCell>
                  <TableCell align="center">{t('home.price')}</TableCell>
                  <TableCell align="center">{t('home.one_day_purchase')}</TableCell>
                  <TableCell align="center">{t('home.one_day_change')}</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {tokenList?.length >= 1 ? (
                  <>
                    {tokenList.map(row => (
                      <TableRow key={row.type} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                        <TableCell align="center" component="th" scope="row">
                          {row.type === 0 ? 'EZAT' : 'EZBT'}
                        </TableCell>
                        <TableCell align="center">${row.netWorth}</TableCell>
                        <TableCell align="center">{row.totalPurchase}</TableCell>
                        <TableCell
                          align="center"
                          sx={{
                            color: row.oneDayChange.startsWith('-') ? 'rgba(255, 47, 0, 1)' : 'rgba(18, 230, 103, 1)',
                          }}
                        >
                          {row.oneDayChange}
                        </TableCell>
                      </TableRow>
                    ))}
                  </>
                ) : (
                  <>
                    {[1, 2].map(item => {
                      return (
                        <TableRow key={item}>
                          <TableCell>
                            <Skeleton animation={'pulse'} />
                          </TableCell>
                          <TableCell>
                            <Skeleton animation="pulse" />
                          </TableCell>
                          <TableCell>
                            <Skeleton animation={'pulse'} />
                          </TableCell>
                          <TableCell>
                            <Skeleton animation={'pulse'} />
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  </>
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </Scrollbar>
      </Card>

      {/*<TableContainer component={Paper} sx={{ backgroundColor: 'rgba(26, 32, 47, 1)' }}>*/}
      {/*  <Table aria-label="simple table">*/}
      {/*    <TableHead*/}
      {/*      sx={{*/}
      {/*        '.MuiTableCell-root': {*/}
      {/*          color: 'rgba(120, 125, 145, 1)',*/}
      {/*          fontWeight: 400,*/}
      {/*        },*/}
      {/*      }}*/}
      {/*    >*/}
      {/*      <TableRow>*/}
      {/*        <TableCell align="center">{t('home.coin')}</TableCell>*/}
      {/*        <TableCell align="center">{t('home.price')}</TableCell>*/}
      {/*        <TableCell align="center">{t('home.one_day_purchase')}</TableCell>*/}
      {/*        <TableCell align="center">{t('home.one_day_change')}</TableCell>*/}
      {/*      </TableRow>*/}
      {/*    </TableHead>*/}
      {/*    <TableBody>*/}
      {/*      {tokenList.map(row => (*/}
      {/*        <TableRow key={row.type} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>*/}
      {/*          <TableCell align="center" component="th" scope="row">*/}
      {/*            {row.type === 0 ? 'EZAT' : 'EZBT'}*/}
      {/*          </TableCell>*/}
      {/*          <TableCell align="center">${row.netWorth}</TableCell>*/}
      {/*          <TableCell align="center">{row.totalPurchase}</TableCell>*/}
      {/*          <TableCell*/}
      {/*            align="center"*/}
      {/*            sx={{ color: row.oneDayChange.startsWith('-') ? 'rgba(255, 47, 0, 1)' : 'rgba(18, 230, 103, 1)' }}*/}
      {/*          >*/}
      {/*            {row.oneDayChange}*/}
      {/*          </TableCell>*/}
      {/*        </TableRow>*/}
      {/*      ))}*/}
      {/*    </TableBody>*/}
      {/*  </Table>*/}
      {/*</TableContainer>*/}
    </>
  );
}
