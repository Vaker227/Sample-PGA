import Cookies from 'js-cookie';
import React from 'react';
import { Redirect, Route, RouteProps } from 'react-router-dom';
import { ROUTES } from '../../../configs/routes';
import { ACCESS_TOKEN_KEY } from '../../../utils/constants';
import Layout from '../../nav/component/Layout';

interface Props extends RouteProps {}

const ProtectedRoute = (props: Props) => {
  const { ...rest } = props;
  const auth = Cookies.get(ACCESS_TOKEN_KEY);

  if (auth) {
    return (
      <Layout>
        <Route {...rest} />
      </Layout>
    );
  }

  return (
    <Redirect
      to={{
        pathname: ROUTES.login,
      }}
    />
  );
};

export default ProtectedRoute;
