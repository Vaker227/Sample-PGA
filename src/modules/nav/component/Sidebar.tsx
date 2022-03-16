import React, { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router';
import { productRoute, ROUTES, userRoute } from '../../../configs/routes';
import { AppState } from '../../../redux/reducer';
import CustomNavLink from './sidebar/CustomNavLink';
import Dropdown from './sidebar/Dropdown';

const Sidebar = () => {
  const sidebarExpand = useSelector<AppState, boolean>((state) => state.nav.sidebarExpand);
  const location = useLocation();
  const CatalogAddresses = useMemo(() => [productRoute], []);
  const UserAddresses = useMemo(() => [userRoute], []);
  return (
    <div
      className={`${
        sidebarExpand ? 'w-64' : 'w-16'
      } h-100 rign- fixed z-10 h-screen divide-y divide-secondary border-r border-secondary bg-primary pt-3 text-white shadow-[0_0.5rem_1rem_0_#1a1f33] lg:relative`}
    >
      <Dropdown
        active={CatalogAddresses.some((address) => location.pathname.startsWith(address))}
        label={'Catalog'}
        icon={<i className="fa-solid fa-tag"></i>}
        expand={sidebarExpand}
      >
        <CustomNavLink active={location.pathname.startsWith(productRoute)} to={ROUTES.listProducts} label="Products" />
      </Dropdown>
      <Dropdown
        active={UserAddresses.some((address) => location.pathname.startsWith(address))}
        label={'User'}
        icon={<i className="fa-solid fa-user-group"></i>}
        expand={sidebarExpand}
      >
        <CustomNavLink active={location.pathname.startsWith(userRoute)} to={ROUTES.listUsers} label="User list" />
      </Dropdown>
    </div>
  );
};

export default React.memo(Sidebar);
