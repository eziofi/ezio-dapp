import styled from '@emotion/styled';
import {
  Card,
  CardContent,
  Dialog,
  Divider,
  Drawer,
  IconButton,
  InputBase,
  List,
  ListItem,
  Paper,
  Typography,
  useTheme,
} from '@mui/material';
import { Box } from '@mui/system';
import React, { useEffect } from 'react';
import { AToken, ATokenMap, NETWORK_TYPE, TOKEN_TYPE } from '../../wallet/helpers/constant';
import ClearIcon from '@mui/icons-material/Clear';
import SearchIcon from '@mui/icons-material/Search';
import BaseIconFont from '../../components/BaseIconFont';
import useWallet from '../../../hooks/useWallet';
import { StyleProps } from '../../../types/styleType';

import { useTranslation } from 'react-i18next';
import BalanceList from './BalanceList';
import useResponsive from '../../../hooks/useResponsive';

interface IOptions {
  value: TOKEN_TYPE;
  iconParentStyle: { margin: string; background: string };
  iconName: string;
  iconStyle: { width: number; height: number; fill: string };
}

interface IProps {
  openDialog: boolean;
  handleClose: (tokenType?: TOKEN_TYPE) => void;
  Options: IOptions[];
  tokenType: TOKEN_TYPE;
}

const MyPaper = styled((props: any) => {
  return <Paper {...props} />;
})(() => {
  const theme = useTheme();
  return {
    height: 40,
    p: '2px 4px',
    display: 'flex',
    alignItems: 'center',
    border: `1px solid ${theme.palette.mode === 'dark' ? 'rgba(152, 161, 192, 0.24)' : 'rgb(210, 217, 238)'}`,
    background: theme.palette.background.default,
    margin: '15px 0 15px 0',
  };
});

const TokenList = styled((props: StyleProps) => {
  return <Box {...props} />;
})(() => {
  return {
    flex: 1.3,
    overflow: 'auto',
    display: 'flex',
    flexDirection: 'column',
  };
});

const MyListItem = styled((props: StyleProps) => <ListItem {...props} disablePadding />)(() => {
  const theme = useTheme();
  return {
    padding: '10px 0',
    display: 'flex',
    justifyContent: 'space-between',
    ':hover': {
      cursor: 'pointer',
      // @ts-ignore
      background: theme.palette.purchase.tokenDialog.hover,
    },
  };
});

const MenuItemStyle = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: 30,
  height: 30,
  borderRadius: '50%',
};
export default function TokenTypeDialog({ openDialog, handleClose, Options, tokenType }: IProps) {
  const { t } = useTranslation();
  const { reverseCoin, networkName } = useWallet();

  const [searchList, setSearchList] = React.useState<IOptions[]>([]);

  function search(searchValue: string) {
    const list = Options.filter(item =>
      // 网络为polygon时,TOKEN_TYPE为1时,用M2LP去查询
      // TOKEN_TYPE为ReverseCoin 用变量reverseCoin查询
      (networkName === NETWORK_TYPE.polygon
        ? item.value === TOKEN_TYPE.E2LP
          ? AToken.M2LP
          : item.value === TOKEN_TYPE.ReverseCoin
          ? reverseCoin
          : TOKEN_TYPE[item.value]
        : item.value === TOKEN_TYPE.ReverseCoin
        ? reverseCoin
        : TOKEN_TYPE[item.value]
      )
        .toLowerCase()
        .includes(searchValue.toLowerCase()),
    );
    setSearchList([...list]);
  }

  useEffect(() => {
    Options && setSearchList(Options);
  }, [tokenType]);

  function renderIcon(item: IOptions) {
    return (
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <div style={{ ...MenuItemStyle, ...item.iconParentStyle, marginLeft: 0 }}>
          <BaseIconFont
            name={item.iconName === 'icon-wstETH1' ? `icon-${reverseCoin}` : item.iconName}
            style={{ ...item.iconStyle }}
          />
        </div>
        {item.value === TOKEN_TYPE['ReverseCoin']
          ? reverseCoin
          : networkName === NETWORK_TYPE.polygon && item.value === TOKEN_TYPE.E2LP
          ? ATokenMap[networkName]
          : TOKEN_TYPE[item.value as TOKEN_TYPE]}
      </div>
    );
  }

  const Tag = styled('div')(() => {
    const theme = useTheme();
    return {
      padding: '6px',
      // @ts-ignore
      border: `1px solid ${theme.palette.purchase.tokenDialog.tag.default}`,
      borderRadius: '16px',
      marginRight: '10px',
      display: 'flex',
      alignItems: 'center',
      marginBottom: '10px',
      ':hover': {
        cursor: 'pointer',
        // @ts-ignore
        background: theme.palette.purchase.tokenDialog.hover,
      },
    };
  });

  const theme = useTheme();

  const isDesktop = useResponsive('up', 'sm', 'sm');

  return (
    <>
      {isDesktop ? (
        <Dialog open={openDialog} onClose={() => handleClose()}>
          <Card
            sx={{
              height: 500,
              display: 'flex',
              flexDirection: 'column',
              background: theme.palette.background.default,
            }}
          >
            <CardContent sx={{ width: '480px', flex: 1 }}>
              <Box sx={{ display: 'flex', alignItems: 'cneter', justifyContent: 'space-between' }}>
                <Typography component="div" sx={{ fontWeight: 'bold' }}>
                  {t('purchase.selectiveToken')}
                </Typography>
                <Typography component="div" sx={{ fontWeight: 'bold' }}>
                  <ClearIcon sx={{ ':hover': { cursor: 'pointer' } }} onClick={() => handleClose()} />
                </Typography>
              </Box>

              {/* header */}
              <MyPaper component="form" sx={{ borderRadius: '12px' }}>
                <IconButton type="button" sx={{ p: '10px' }} aria-label="search">
                  <SearchIcon />
                </IconButton>
                <InputBase
                  sx={{ ml: 1, flex: 1 }}
                  placeholder={t('purchase.searchName')}
                  inputProps={{ 'aria-label': t('purchase.searchName') }}
                  // @ts-ignore
                  onInput={e => search(e.target.value)}
                  onKeyDown={e => e.key === 'Enter' && e.preventDefault()}
                />
              </MyPaper>

              {/* main */}
              <Box sx={{ display: 'flex', flexWrap: 'wrap', mb: '20px' }}>
                {searchList.map(item => {
                  return (
                    <Tag
                      key={item.value}
                      style={
                        TOKEN_TYPE[tokenType as TOKEN_TYPE] === TOKEN_TYPE[item.value as TOKEN_TYPE]
                          ? {
                              // @ts-ignore
                              borderColor: `rgb(${theme.palette.purchase.tokenDialog.tag.active})`,
                              // @ts-ignore
                              background: `rgba(${theme.palette.purchase.tokenDialog.tag.active},0.24)`,
                              // @ts-ignore
                              color: `rgb(${theme.palette.purchase.tokenDialog.tag.active})`,
                            }
                          : {}
                      }
                      onClick={() => handleClose(item.value)}
                    >
                      {renderIcon(item)}
                    </Tag>
                  );
                })}
              </Box>
            </CardContent>

            {/* footer */}
            <Divider />
            <TokenList>
              <nav aria-label="main mailbox folders">
                <List sx={{ width: '100%' }}>
                  {searchList.map(item => {
                    return (
                      <MyListItem
                        key={item.value}
                        // @ts-ignore
                        sx={TOKEN_TYPE[tokenType] === TOKEN_TYPE[item.value] ? { opacity: '0.4' } : {}}
                        onClick={() => handleClose(item.value)}
                      >
                        <div
                          style={{
                            margin: '0 auto',
                            width: '90%',
                            display: 'flex',
                            justifyContent: 'space-between',
                            padding: '0px 6px',
                          }}
                        >
                          {renderIcon(item)}
                          <BalanceList item={item} tokenType={tokenType} />
                        </div>
                      </MyListItem>
                    );
                  })}
                </List>
              </nav>
            </TokenList>
          </Card>
        </Dialog>
      ) : (
        <Drawer
          anchor="bottom"
          open={openDialog}
          onClose={() => handleClose()}
          sx={{
            '.MuiPaper-root': {
              borderTopLeftRadius: '12px',
              borderTopRightRadius: '12px',
            },
          }}
        >
          <Card
            sx={{
              height: 'calc(100vh - 128px)',
              display: 'flex',
              flexDirection: 'column',
              background: theme.palette.background.default,
            }}
          >
            <CardContent sx={{ flex: 1 }}>
              <Box sx={{ display: 'flex', alignItems: 'cneter', justifyContent: 'space-between' }}>
                <Typography component="div" sx={{ fontWeight: 'bold' }}>
                  {t('purchase.selectiveToken')}
                </Typography>
                <Typography component="div" sx={{ fontWeight: 'bold' }}>
                  <ClearIcon sx={{ ':hover': { cursor: 'pointer' } }} onClick={() => handleClose()} />
                </Typography>
              </Box>

              {/* header */}
              <MyPaper component="form" sx={{ borderRadius: '12px' }}>
                <IconButton type="button" sx={{ p: '10px' }} aria-label="search">
                  <SearchIcon />
                </IconButton>
                <InputBase
                  sx={{ ml: 1, flex: 1 }}
                  placeholder={t('purchase.searchName')}
                  inputProps={{ 'aria-label': t('purchase.searchName') }}
                  // @ts-ignore
                  onInput={e => search(e.target.value)}
                  onKeyDown={e => e.key === 'Enter' && e.preventDefault()}
                />
              </MyPaper>

              {/* main */}
              <Box sx={{ display: 'flex', flexWrap: 'wrap', mb: '20px' }}>
                {searchList.map(item => {
                  return (
                    <Tag
                      key={item.value}
                      style={
                        TOKEN_TYPE[tokenType as TOKEN_TYPE] === TOKEN_TYPE[item.value as TOKEN_TYPE]
                          ? {
                              // @ts-ignore
                              borderColor: `rgb(${theme.palette.purchase.tokenDialog.tag.active})`,
                              // @ts-ignore
                              background: `rgba(${theme.palette.purchase.tokenDialog.tag.active},0.24)`,
                              // @ts-ignore
                              color: `rgb(${theme.palette.purchase.tokenDialog.tag.active})`,
                            }
                          : {}
                      }
                      onClick={() => handleClose(item.value)}
                    >
                      {renderIcon(item)}
                    </Tag>
                  );
                })}
              </Box>
            </CardContent>

            {/* footer */}
            <Divider />
            <TokenList>
              <nav aria-label="main mailbox folders">
                <List sx={{ width: '100%' }}>
                  {searchList.map(item => {
                    return (
                      <MyListItem
                        key={item.value}
                        // @ts-ignore
                        sx={TOKEN_TYPE[tokenType] === TOKEN_TYPE[item.value] ? { opacity: '0.4' } : {}}
                        onClick={() => handleClose(item.value)}
                      >
                        <div
                          style={{
                            margin: '0 auto',
                            width: '90%',
                            display: 'flex',
                            justifyContent: 'space-between',
                            padding: '0px 6px',
                          }}
                        >
                          {renderIcon(item)}
                          <BalanceList item={item} tokenType={tokenType} />
                        </div>
                      </MyListItem>
                    );
                  })}
                </List>
              </nav>
            </TokenList>
          </Card>
        </Drawer>
      )}
    </>
  );
}
