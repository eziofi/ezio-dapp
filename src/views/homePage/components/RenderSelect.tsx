import React from 'react';
import { FormControl, MenuItem, Select } from '@mui/material';
import { useTranslation } from 'react-i18next';

interface IProps {
  value: string;
  onChange: (newValue: string) => void;
}

export default function RenderSelect({ value, onChange }: IProps) {
  enum QueryType {
    day = 'day',
    hour = 'hour',
  }

  const { t } = useTranslation();

  return (
    <FormControl sx={{ margin: '24px 24px 0 0' }}>
      <Select className="homeCard_select" size="small" value={value} onChange={e => onChange(e.target.value)}>
        <MenuItem value={QueryType.day}>{t('home.ShowSevenDays')}</MenuItem>
        <MenuItem value={QueryType.hour}>{t('home.ShowTwelveHours')}</MenuItem>
      </Select>
    </FormControl>
  );
}
