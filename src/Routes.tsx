import React from 'react';
import { Redirect } from 'react-router';
import { Route, Switch, useLocation } from 'react-router-dom';
import { ROUTES } from './configs/routes';
import LoginPage from './modules/auth/pages/LoginPage';
import ProtectedRoute from './modules/common/components/ProtectedRoute';
import ProductCreatePage from './modules/products/pages/ProductCreatePage';
import ProductDetailPage from './modules/products/pages/ProductDetailPage';
import ProductListPage from './modules/products/pages/ProductListPage';
import UserCreatePage from './modules/users/pages/UserCreatePage';
import UserDetailPage from './modules/users/pages/UserDetailPage';
import UserListPage from './modules/users/pages/UserListPage';

export const Routes = () => {
  const location = useLocation();

  return (
    <Switch location={location}>
      <Route path={ROUTES.login} component={LoginPage} />
      <ProtectedRoute path={ROUTES.listUsers} component={UserListPage} />
      <ProtectedRoute path={ROUTES.detailUser + '/:id'} component={UserDetailPage} />
      <ProtectedRoute path={ROUTES.createUser} component={UserCreatePage} />
      <ProtectedRoute path={ROUTES.listProducts} component={ProductListPage} />
      <ProtectedRoute path={ROUTES.createProduct} component={ProductCreatePage} />
      <ProtectedRoute path={ROUTES.detailProduct + '/:id'} component={ProductDetailPage} />
      <ProtectedRoute path={'/'} render={() => <Redirect to={ROUTES.listProducts} />} />
    </Switch>
  );
};
