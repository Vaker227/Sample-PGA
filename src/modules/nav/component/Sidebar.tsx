import React from 'react';
import { ROUTES } from '../../../configs/routes';
import Dropdown from './sidebar/Dropdown';
import CustomNavLink from './sidebar/CustomNavLink';
import { useLocation } from 'react-router';
import { useSelector } from 'react-redux';
import { AppState } from '../../../redux/reducer';

const Sidebar = () => {
  const sidebarExpand = useSelector<AppState, boolean>((state) => state.nav.sidebarExpand);
  const location = useLocation();
  return (
    <div className={`${sidebarExpand ? 'w-64' : 'w-16'} divide-y divide-secondary bg-primary pt-3 text-white`}>
      <Dropdown label={'Catalog'} icon={<i className="fa-solid fa-tag"></i>} expand={sidebarExpand} active={false}>
        <CustomNavLink to={ROUTES.listProducts} label="Products" />
      </Dropdown>
      <Dropdown active={true} label={'User'} icon={<i className="fa-solid fa-user-group"></i>} expand={sidebarExpand}>
        <CustomNavLink to={ROUTES.listUsers} label="User list" />
      </Dropdown>
    </div>
  );
};

export default Sidebar;
