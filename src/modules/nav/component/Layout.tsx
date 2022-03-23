import React from 'react';
import { useSelector } from 'react-redux';
import { loadingProcess } from '../../../configs/loadingProcess';
import { AppState } from '../../../redux/reducer';
import LoadingScreen from '../../common/components/LoadingScreen';
import Header from './Header';
import Sidebar from './Sidebar';

interface Props {
  children: React.ReactNode;
}

const Layout = (props: Props) => {
  const loading = useSelector<AppState, loadingProcess[]>((state) => state.common.loading);
  return (
    <>
      <div className={`flex h-screen overflow-y-hidden pt-[76px]`}>
        <Header />
        <Sidebar />
        {!!loading.length && <LoadingScreen />}
        <div id="scrollable-container" className="ml-16 flex-1 overflow-auto bg-[#1B1B38] lg:ml-0">
          {props.children}
        </div>
      </div>
    </>
  );
};

export default Layout;
