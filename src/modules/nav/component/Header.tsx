import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useLocation } from 'react-router';
import { Link } from 'react-router-dom';
import LoadingBar from 'react-top-loading-bar';
import { ROUTES } from '../../../configs/routes';
import { toggleSidebarExpand } from '../redux/navReducer';
import Account from './header/Account';

const Header = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const [progress, setProgress] = useState(0);

  // loading bar
  useEffect(() => {
    setTimeout(() => setProgress(30), 100);
    setTimeout(() => setProgress(40), 200);
    setTimeout(() => setProgress(70), 500);
    setTimeout(() => setProgress(100), 600);
  }, [location]);

  const handleToggleSidebar = () => {
    dispatch(toggleSidebarExpand());
  };
  return (
    <>
      <div className="fixed top-0 h-[76px] w-screen bg-primary shadow-lg shadow-slate-900">
        <div className="mx-7 flex h-full items-center text-white">
          <div className="flex items-center">
            <i
              onClick={handleToggleSidebar}
              className="fa-solid fa-bars relative top-0.5 cursor-pointer text-xl text-gray-300 hover:text-white"
            ></i>
            <Link to={ROUTES.home} className="ml-5 mr-3 text-3xl">
              Gear Focus Admin
            </Link>
            <i className="fa-solid fa-bell"></i>
          </div>
          <div className="ml-auto">
            <Account />
          </div>
        </div>
        <LoadingBar
          color="#A16EFF"
          height={2}
          progress={progress}
          onLoaderFinished={() => setProgress(0)}
          waitingTime={200}
        />
      </div>
    </>
  );
};

export default React.memo(Header);
