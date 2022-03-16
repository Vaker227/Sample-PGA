import React, { lazy, Suspense } from 'react';
import { Route, Switch, useLocation } from 'react-router-dom';
import { ROUTES } from './configs/routes';
import LoadingScreen from './modules/common/components/LoadingScreen';
import ProtectedRoute from './modules/common/components/ProtectedRoute';
import Layout from './modules/nav/component/Layout';

const HomePage = lazy(() => import('./modules/home/pages/HomePage'));
const LoginPage = lazy(() => import('./modules/auth/pages/LoginPage'));
const UserListPage = lazy(() => import('./modules/users/pages/UserListPage'));
const UserCreatePage = lazy(() => import('./modules/users/pages/UserCreatePage'));
const UserDetailPage = lazy(() => import('./modules/users/pages/UserDetailPage'));
const ProductListPage = lazy(() => import('./modules/products/pages/ProductListPage'));
const ProductCreatePage = lazy(() => import('./modules/products/pages/ProductCreatePage'));
const ProductDetailPage = lazy(() => import('./modules/products/pages/ProductDetailPage'));

export const Routes = () => {
  const location = useLocation();

  return (
    <Suspense fallback={<LoadingScreen />}>
      <Switch location={location}>
        <Route path={ROUTES.login} component={LoginPage} />
        <ProtectedRoute exact path={ROUTES.home} component={HomePage} />
        <ProtectedRoute path={ROUTES.listUsers} component={UserListPage} />
        <ProtectedRoute path={ROUTES.detailUser + '/:id'} component={UserDetailPage} />
        <ProtectedRoute path={ROUTES.createUser} component={UserCreatePage} />
        <ProtectedRoute path={ROUTES.listProducts} component={ProductListPage} />
        <ProtectedRoute path={ROUTES.createProduct} component={ProductCreatePage} />
        <ProtectedRoute path={ROUTES.detailProduct + '/:id'} component={ProductDetailPage} />
      </Switch>
    </Suspense>
  );
};
