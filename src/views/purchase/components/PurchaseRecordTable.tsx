import { Paper, Table, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { TOKEN_TYPE } from '../../wallet/helpers/constant';
export default function PurchaseRecordTable({ tokenType }: { tokenType: TOKEN_TYPE }) {
  const { t } = useTranslation();
  return (
    <TableContainer component={Paper} sx={{ maxHeight: '500px' }}>
      <Table aria-label="simple table" sx={{ backgroundColor: 'rgba(26, 32, 47, 1)' }}>
        <TableHead
          sx={{
            '.MuiTableCell-root': {
              color: 'rgba(120, 125, 145, 1)',
              fontWeight: 400,
            },
          }}
        >
          <TableRow>
            <TableCell align="center" />
            <TableCell align="center">{t('purchase.ivtSeq')}</TableCell>
            <TableCell align="center">{t('purchase.amount')}</TableCell>
            <TableCell align="center">{t('purchase.action')}</TableCell>
            {/*<TableCell align="center">*/}
            {/*  <RefreshIcon sx={{ width: 16 }} />*/}
            {/*</TableCell>*/}
          </TableRow>
        </TableHead>
        {/*<TableBody>*/}
        {/*  {allPurchaseRecord.map((row, index) => (*/}
        {/*    <>*/}
        {/*      <TableRow*/}
        {/*        key={index}*/}
        {/*        sx={{ color: 'red', '&:last-child td, &:last-child th': { border: 0 } }}*/}
        {/*        onClick={() => {*/}
        {/*          if (openIndex === index) setOpenIndex(-1);*/}
        {/*          else setOpenIndex(index);*/}
        {/*        }}*/}
        {/*      >*/}
        {/*        /!*父表格*!/*/}
        {/*        <TableCell style={{ width: '30px' }}>*/}
        {/*          <IconButton aria-label="expand row" size="small">*/}
        {/*            {openIndex === index ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}*/}
        {/*          </IconButton>*/}
        {/*        </TableCell>*/}
        {/*        <TableCell align="center">{row.ivtSeq}</TableCell>*/}
        {/*        <TableCell align="center">{row.amt} USDT</TableCell>*/}
        {/*      </TableRow>*/}
        {/*      <TableRow>*/}
        {/*        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>*/}
        {/*          <Collapse in={openIndex === index} timeout="auto" unmountOnExit>*/}
        {/*            <Box sx={{ margin: 1 }}>*/}
        {/*              <Table size="small" aria-label="purchases">*/}
        {/*                <TableHead*/}
        {/*                  sx={{*/}
        {/*                    '.MuiTableCell-root': {*/}
        {/*                      color: 'rgba(120, 125, 145, 1)',*/}
        {/*                      fontWeight: 400,*/}
        {/*                    },*/}
        {/*                  }}*/}
        {/*                >*/}
        {/*                  <TableRow>*/}
        {/*                    <TableCell>{t('purchase.time')}</TableCell>*/}
        {/*                    <TableCell>{t('purchase.tokenName')}</TableCell>*/}
        {/*                    <TableCell>{t('purchase.amount')}</TableCell>*/}
        {/*                  </TableRow>*/}
        {/*                </TableHead>*/}
        {/*                <TableBody>*/}
        {/*                  {row.children.map((historyRow, index) => (*/}
        {/*                    <TableRow key={index}>*/}
        {/*                      <TableCell component="th" scope="row">*/}
        {/*                        {timestampFormat(historyRow.timestamp)}*/}
        {/*                      </TableCell>*/}
        {/*                      <TableCell>{TOKEN_TYPE[historyRow.tokenType]}</TableCell>*/}
        {/*                      <TableCell>{historyRow.amt}</TableCell>*/}
        {/*                    </TableRow>*/}
        {/*                  ))}*/}
        {/*                </TableBody>*/}
        {/*              </Table>*/}
        {/*            </Box>*/}
        {/*          </Collapse>*/}
        {/*        </TableCell>*/}
        {/*      </TableRow>*/}
        {/*    </>*/}
        {/*  ))}*/}
        {/*</TableBody>*/}
      </Table>
    </TableContainer>
  );
}
