import React from 'react';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router';
import { productRoute, ROUTES, userRoute } from '../../../configs/routes';
import { ISidebarMap } from '../../../models/nav';
import { AppState } from '../../../redux/reducer';
import CustomNavLink from './sidebar/CustomNavLink';
import Dropdown from './sidebar/Dropdown';

const sidebarMap: ISidebarMap = [
  {
    label: 'Catalog',
    icon: <i className="fa-solid fa-tag"></i>,
    list: [{ label: 'Products', path: productRoute, to: ROUTES.listProducts }],
  },
  {
    label: 'User',
    icon: <i className="fa-solid fa-user-group"></i>,
    list: [{ label: 'User List', path: userRoute, to: ROUTES.listUsers }],
  },
];

const Sidebar = () => {
  const sidebarExpand = useSelector<AppState, boolean>((state) => state.nav.sidebarExpand);
  const location = useLocation();
  return (
    <div
      className={`${
        sidebarExpand ? 'w-64' : 'w-16'
      } h-100 rign- fixed z-10 h-screen divide-y divide-secondary border-r border-secondary bg-primary pt-3 text-white shadow-[0_0.5rem_1rem_0_#1a1f33] lg:relative`}
    >
      {sidebarMap.map((field) => (
        <Dropdown
          key={field.label}
          active={field.list.some((address) => location.pathname.startsWith(address.path))}
          label={field.label}
          icon={field.icon}
          expand={sidebarExpand}
        >
          {field.list.map((address) => (
            <CustomNavLink
              key={address.path}
              active={location.pathname.startsWith(address.path)}
              label={address.label}
              to={address.to}
            />
          ))}
        </Dropdown>
      ))}
    </div>
  );
};

export default React.memo(Sidebar);
