// component
import SvgColor from '../../../components/svg-color';

// ----------------------------------------------------------------------
const icon = (name: string) => <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />;

const navConfig = [
  {
    title: 'Dashboard',
    path: '/dashboard/homePage',
    icon: icon('ic_dashboard'),
  },
  {
    title: 'Swap',
    path: '/dashboard/purchase',
    icon: icon('ic_cart'),
  },
  // {
  //   title: 'Redeem',
  //   path: '/dashboard/redeem',
  //   icon: icon('ic_cart'),
  // },
  {
    title: 'Account',
    path: '/dashboard/account',
    icon: icon('ic_user'),
  },
  // {
  //   title: 'login',
  //   path: '/login',
  //   icon: icon('ic_lock'),
  // },
  // {
  //   title: 'Not found',
  //   path: '/404',
  //   icon: icon('ic_disabled'),
  // },
];

export default navConfig;
