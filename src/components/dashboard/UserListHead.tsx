import PropTypes from 'prop-types';
// @mui
import { Box, Checkbox, TableRow, TableCell, TableHead, TableSortLabel } from '@mui/material';

// ----------------------------------------------------------------------
interface IHeadLabel {
  id: string;
  label?: string;
  alignRight?: boolean;
}
export default function UserListHead({ headLabel }: { headLabel: IHeadLabel[] }) {
  return (
    <TableHead>
      <TableRow>
        {headLabel.map(headCell => (
          <TableCell key={headCell.id} align={headCell.alignRight ? 'right' : 'left'}>
            <TableSortLabel hideSortIcon>{headCell.label}</TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}
