import styled from '@emotion/styled';
import {
  Card,
  CardContent,
  Dialog,
  Divider,
  FormControl,
  FormHelperText,
  IconButton,
  InputAdornment,
  InputBase,
  List,
  ListItem,
  OutlinedInput,
  Paper,
  TextField,
  Typography,
} from '@mui/material';
import { Box } from '@mui/system';
import React, { ElementType, useEffect } from 'react';
import { TOKEN_TYPE } from '../../wallet/helpers/constant';
import ClearIcon from '@mui/icons-material/Clear';
import { MiscellaneousServicesOutlined } from '@mui/icons-material';
import SearchIcon from '@mui/icons-material/Search';
import BaseIconFont from '../../components/BaseIconFont';
import useWallet from '../../hooks/useWallet';
import { StyleProps } from '../../../types/styleType';
import CheckIcon from '@mui/icons-material/Check';

interface IOptions {
  value: TOKEN_TYPE;
  iconParentStyle: { margin: string; background: string };
  iconName: string;
  iconStyle: { width: number; height: number; fill: string };
}

interface IProps {
  openDialog: boolean;
  handleColse: (tokenType?: TOKEN_TYPE) => void;
  Options: IOptions[];
  tokenType: TOKEN_TYPE;
}

const Tag = styled('div')(() => {
  return {
    padding: '6px 12px 6px 6px',
    border: '1px solid #ccc',
    borderRadius: '16px',
    marginRight: '10px',
    display: 'flex',
    alignItems: 'center',
    marginBottom: '10px',
    ':hover': {
      cursor: 'pointer',
    },
  };
});

const TagActive = {
  background: 'rgba(76, 130, 251, 0.24)',
  border: '1px solid rgb(76, 130, 251)',
  color: 'rgb(76, 130, 251)',
};

const MyPaper = styled((props: any) => {
  return <Paper {...props} />;
})(() => {
  return {
    height: 40,
    p: '2px 4px',
    display: 'flex',
    alignItems: 'center',
    border: '1px solid rgb(210, 217, 238)',
    bgcolor: '#F5F6FC',
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
  return {
    padding: '10px 0',
    display: 'flex',
    justifyContent: 'space-between',
    ':hover': {
      cursor: 'pointer',
      background: 'rgb(247,248,250)',
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
export default function TokenTypeDialog({ openDialog, handleColse, Options, tokenType }: IProps) {
  const { reverseCoin, networkName } = useWallet();

  const [searchList, setSearchList] = React.useState<IOptions[]>([]);

  function search(searchValue: string) {
    const list = Options.filter(item => TOKEN_TYPE[item.value].toLowerCase().includes(searchValue.toLowerCase()));
    setSearchList([...list]);
  }

  const [checkToken, setCheckToken] = React.useState<TOKEN_TYPE | null>(null);

  useEffect(() => {
    Options && setSearchList(Options);

    setCheckToken(tokenType);
  }, [tokenType]);

  function renderIcon(item: IOptions) {
    return (
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <div style={{ ...MenuItemStyle, ...item.iconParentStyle }}>
          <BaseIconFont
            name={item.iconName === 'icon-wstETH1' ? `icon-${reverseCoin}` : item.iconName}
            style={{ ...item.iconStyle }}
          />
        </div>
        {item.value === TOKEN_TYPE['ReverseCoin'] ? reverseCoin : TOKEN_TYPE[item.value]}
      </div>
    );
  }

  return (
    <Dialog
      open={openDialog}
      onClose={() => handleColse()}
      sx={{
        '.css-1is6lpg-MuiPaper-root-MuiDialog-paper': {
          borderRadius: '20px',
        },
      }}
    >
      <Card sx={{ height: 500, display: 'flex', flexDirection: 'column' }}>
        <CardContent sx={{ width: '480px', flex: 1 }}>
          <Box sx={{ display: 'flex', alignItems: 'cneter', justifyContent: 'space-between' }}>
            <Typography component="div" sx={{ fontWeight: 'bold' }}>
              选择代币
            </Typography>
            <Typography component="div" sx={{ fontWeight: 'bold' }}>
              <ClearIcon sx={{ ':hover': { cursor: 'pointer' } }} onClick={() => handleColse()} />
            </Typography>
          </Box>

          {/* header */}
          <MyPaper component="form">
            <IconButton type="button" sx={{ p: '10px' }} aria-label="search">
              <SearchIcon />
            </IconButton>
            <InputBase
              sx={{ ml: 1, flex: 1 }}
              placeholder="搜索名称"
              inputProps={{ 'aria-label': '搜索名称' }}
              // @ts-ignore
              onInput={e => search(e.target.value)}
            />
          </MyPaper>

          {/* main */}
          <Box sx={{ display: 'flex', flexWrap: 'wrap', mb: '20px' }}>
            {searchList.map(item => {
              return (
                <Tag
                  key={item.value}
                  style={TOKEN_TYPE[tokenType] === TOKEN_TYPE[item.value] ? { ...TagActive } : {}}
                  onClick={() => handleColse(item.value)}
                >
                  {renderIcon(item)}
                </Tag>
              );
            })}
          </Box>
        </CardContent>

        {/* footer */}
        <TokenList>
          <Divider />

          <nav aria-label="main mailbox folders">
            <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
              {searchList.map(item => {
                return (
                  <MyListItem
                    key={item.value}
                    // @ts-ignore
                    sx={TOKEN_TYPE[tokenType] === TOKEN_TYPE[item.value] ? { opacity: '0.4' } : {}}
                    onClick={() => handleColse(item.value)}
                  >
                    <div style={{ margin: '0 auto', width: '90%', display: 'flex', justifyContent: 'space-between' }}>
                      {renderIcon(item)}

                      {TOKEN_TYPE[tokenType] === TOKEN_TYPE[item.value] && (
                        <CheckIcon sx={{ color: 'rgb(251, 17, 142)' }} />
                      )}
                    </div>
                  </MyListItem>
                );
              })}
            </List>
          </nav>
        </TokenList>
      </Card>
    </Dialog>
  );
}
