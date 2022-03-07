import React, { lazy, Suspense } from 'react';
import { Route, Switch, useLocation } from 'react-router-dom';
import { ROUTES } from './configs/routes';
import LoadingScreen from './modules/common/components/LoadingScreen';
import ProtectedRoute from './modules/common/components/ProtectedRoute';
import Layout from './modules/nav/component/Layout';

const HomePage = lazy(() => import('./modules/home/pages/HomePage'));
const LoginPage = lazy(() => import('./modules/auth/pages/LoginPage'));
const UserListPage = lazy(() => import('./modules/users/pages/UserListPage'));
const ProductListPage = lazy(() => import('./modules/products/pages/ProductListPage'));

export const Routes = () => {
  const location = useLocation();

  return (
    <Suspense fallback={<LoadingScreen />}>
      <Switch location={location}>
        <Route path={ROUTES.login} component={LoginPage} />
        <Route path="/">
          <Layout>
            <Switch>
              <ProtectedRoute exact path={ROUTES.home} component={HomePage} />
              <Route path={ROUTES.listUsers} component={UserListPage} />
              <Route path={ROUTES.listProducts} component={ProductListPage} />
            </Switch>
          </Layout>
        </Route>
      </Switch>
    </Suspense>
  );
};
