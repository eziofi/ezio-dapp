import PropTypes from 'prop-types';
import { NavLink as RouterLink } from 'react-router-dom';
// @mui
import { Box, List, ListItemText } from '@mui/material';
//
import { StyledNavItem, StyledNavItemIcon } from './styles';
import { BoxTypeMap } from '@mui/material/Box/Box';

// ----------------------------------------------------------------------

NavSection.propTypes = {
  data: PropTypes.array,
};

interface INavConfig {
  title: string;
  path: string;
  icon?: JSX.Element;
  info?: string;
}

export default function NavSection({ data = [], ...other }: { data: INavConfig[] }) {
  return (
    <Box {...other}>
      <List disablePadding sx={{ p: 1 }}>
        {data.map(item => (
          <NavItem key={item.title} item={item} />
        ))}
      </List>
    </Box>
  );
}

// ----------------------------------------------------------------------

NavItem.propTypes = {
  item: PropTypes.object,
};

function NavItem({ item }: { item: INavConfig }) {
  const { title, path, icon, info } = item;

  return (
    // @ts-ignore
    <StyledNavItem
      component={RouterLink}
      to={path}
      sx={{
        color: theme => (theme.palette.mode === 'light' ? theme.palette.grey[600] : theme.palette.grey[400]),

        '&.active': {
          color: 'text.primary',
          bgcolor: 'action.selected',
          fontWeight: 'fontWeightBold',
        },
      }}
    >
      <StyledNavItemIcon>{icon && icon}</StyledNavItemIcon>

      <ListItemText disableTypography primary={title} sx={{}} />

      {info && info}
    </StyledNavItem>
  );
}
