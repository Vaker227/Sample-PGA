import { push } from 'connected-react-router';
import Cookies from 'js-cookie';
import React from 'react';
import { useDispatch } from 'react-redux';
import { ROUTES } from '../../../../configs/routes';
import { ACCESS_TOKEN_KEY } from '../../../../utils/constants';
import { clearUserInfo } from '../../../auth/redux/authReducer';

const Account = () => {
  const dispatch = useDispatch();
  const handleLogout = () => {
    Cookies.remove(ACCESS_TOKEN_KEY);
    dispatch(clearUserInfo());
    dispatch(push(ROUTES.login));
  };
  return (
    <div className="group relative">
      <i className="fa-solid fa-user py-4 text-gray-300 hover:text-white"></i>
      <div
        className="invisible absolute -right-full top-6 w-64 rounded-lg pt-5  
      duration-500 group-hover:visible "
      >
        <div className="bg-white p-3 text-black opacity-0 transition-opacity duration-500 group-hover:opacity-100">
          <div className="cursor-pointer" onClick={handleLogout}>
            Logout
          </div>
        </div>
      </div>
    </div>
  );
};

export default Account;
