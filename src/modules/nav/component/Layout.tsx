import React, { Children } from 'react';
import Header from './Header';
import Sidebar from './Sidebar';

interface Props {
  children: React.ReactNode;
}

const Layout = (props: Props) => {
  return (
    <>
      <div className={`flex h-screen overflow-y-hidden pt-[76px]`}>
        <Header />
        <Sidebar />
        <div className="flex-1 overflow-auto bg-[#1B1B38]">
          {props.children}
        </div>
      </div>
    </>
  );
};

export default Layout;
