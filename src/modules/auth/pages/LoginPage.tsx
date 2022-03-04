import { push } from 'connected-react-router';
import Cookies from 'js-cookie';
import React, { useState } from 'react';
import { SubmitHandler } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router';
import { API_PATHS } from '../../../configs/api';
import { ROUTES } from '../../../configs/routes';
import { ILoginParams } from '../../../models/auth';
import { AppState } from '../../../redux/reducer';
import { getErrorObjectResponse } from '../../../utils';
import { ACCESS_TOKEN_KEY } from '../../../utils/constants';
import LoadingScreen from '../../common/components/LoadingScreen';
import { CustomFetch } from '../../common/utils';
import { useToast } from '../../toast/ToastProvier';
import { getErrorToast } from '../../toast/utils';
import LoginComponent from '../components/LoginComponent';
import { setAuthorization, setUserInfo } from '../redux/authReducer';

const LoginPage = () => {
  const token = useSelector<AppState>((state) => state.profile.auth);
  const dispatch = useDispatch();
  const toast = useToast();
  const [loading, setLoading] = useState(false);
  const handleSubmit: SubmitHandler<ILoginParams> = async (data) => {
    setLoading(true);
    const reponse = await CustomFetch(API_PATHS.signIn, 'post', data);
    setLoading(false);
    if (reponse.errors) {
      const errorObj: any = getErrorObjectResponse(reponse);
      Object.keys(errorObj).forEach((error) =>
        toast.pushToast(getErrorToast(errorObj[error])),
      );

      return;
    }
    Cookies.set(ACCESS_TOKEN_KEY, reponse.user_cookie);
    dispatch(setAuthorization(reponse.user_cookie));
    dispatch(setUserInfo(reponse.user));
    dispatch(push(ROUTES.home));
  };
  return (
    <>
      {token && <Redirect to={ROUTES.home} />}
      <div className="flex h-screen items-center justify-center">
        {loading && <LoadingScreen />}
        <LoginComponent onSubmit={handleSubmit} />
      </div>
    </>
  );
};

export default LoginPage;
