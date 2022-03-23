import { push } from 'connected-react-router';
import Cookies from 'js-cookie';
import React, { useMemo, useState } from 'react';
import { SubmitHandler } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { Redirect } from 'react-router';
import { API_PATHS } from '../../../configs/api';
import { ROUTES } from '../../../configs/routes';
import { ILoginParams } from '../../../models/auth';
import { getErrorObjectResponse } from '../../../utils';
import { ACCESS_TOKEN_KEY } from '../../../utils/constants';
import LoadingScreen from '../../common/components/LoadingScreen';
import { CustomFetch } from '../../common/utils';
import { getErrorToastAction } from '../../toast/utils';
import LoginComponent from '../components/LoginComponent';
import { setAuthorization, setUserInfo } from '../redux/authReducer';

const LoginPage = () => {
  const token = useMemo(() => Cookies.get(ACCESS_TOKEN_KEY), []);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const handleSubmit: SubmitHandler<ILoginParams> = async (data) => {
    setLoading(true);
    const reponse = await CustomFetch(API_PATHS.signIn, 'post', data);
    setLoading(false);
    if (reponse.errors) {
      const errorObj: any = getErrorObjectResponse(reponse);
      Object.keys(errorObj).forEach((error) => dispatch(getErrorToastAction(errorObj[error])));

      return;
    }
    Cookies.set(ACCESS_TOKEN_KEY, reponse.user_cookie, { expires: 7 });
    dispatch(setAuthorization(reponse.user_cookie));
    dispatch(setUserInfo(reponse.user));
    dispatch(push(ROUTES.listProducts));
  };
  return (
    <>
      {token && <Redirect to={ROUTES.listProducts} />}
      <div className="flex h-screen items-center justify-center">
        {loading && <LoadingScreen />}
        <LoginComponent onSubmit={handleSubmit} />
      </div>
    </>
  );
};

export default LoginPage;
