import styles from '../purchase.module.less';
import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';

export default function TokenTabs({ tab, tabChange }: { tab: number; tabChange: (tab: number) => void }) {
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    tabChange(newValue);
  };

  interface StyledTabsProps {
    children?: React.ReactNode;
    value: number;
    onChange: (event: React.SyntheticEvent, newValue: number) => void;
    centered: boolean;
  }

  const StyledTabs = styled((props: StyledTabsProps) => (
    <Tabs {...props} TabIndicatorProps={{ children: <span className="MuiTabs-indicatorSpan" /> }} />
  ))({
    '& .MuiTabs-indicator': {
      display: 'flex',
      justifyContent: 'center',
      backgroundColor: 'transparent',
    },
    '& .MuiTabs-indicatorSpan': {
      maxWidth: 70,
      width: '100%',
      backgroundColor: 'rgba(46, 209, 103, 1)',
    },
  });

  interface StyledTabProps {
    label: string;
  }

  const StyledTab = styled((props: StyledTabProps) => <Tab disableRipple {...props} />)(({ theme }) => ({
    textTransform: 'none',
    fontWeight: theme.typography.fontWeightRegular,
    fontSize: theme.typography.pxToRem(20),
    marginRight: theme.spacing(1),
    color: 'rgba(255, 255, 255, 0.7)',
    '&.Mui-selected': {
      color: 'rgba(46, 209, 103, 1)',
    },
    '&.Mui-focusVisible': {
      backgroundColor: 'rgba(100, 95, 228, 0.32)',
    },
  }));
  return (
    <div className={styles.tabsBox}>
      <StyledTabs value={tab} onChange={handleChange} centered>
        <StyledTab label="EZAT" />
        <StyledTab label="EZBT" />
      </StyledTabs>
    </div>
  );
}
