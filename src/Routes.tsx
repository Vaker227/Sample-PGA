import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Route, Switch, useLocation } from 'react-router-dom';
import { ROUTES } from './configs/routes';
import LoginPage from './modules/auth/pages/LoginPage';
import ProtectedRoute from './modules/common/components/ProtectedRoute';
import { getCommonValues } from './modules/common/redux/commonSagas';
import ProductCreatePage from './modules/products/pages/ProductCreatePage';
import ProductDetailPage from './modules/products/pages/ProductDetailPage';
import ProductListPage from './modules/products/pages/ProductListPage';
import UserCreatePage from './modules/users/pages/UserCreatePage';
import UserDetailPage from './modules/users/pages/UserDetailPage';
import UserListPage from './modules/users/pages/UserListPage';
import { AppState } from './redux/reducer';

export const Routes = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const auth = useSelector<AppState, string | undefined>((state) => state.profile.auth);
  useEffect(() => {
    if (auth) {
      dispatch(getCommonValues.request());
    }
  }, [dispatch, auth]);

  return (
    <Switch location={location}>
      <Route path={ROUTES.login} component={LoginPage} />
      <ProtectedRoute path={ROUTES.listUsers} component={UserListPage} />
      <ProtectedRoute path={ROUTES.detailUser + '/:id'} component={UserDetailPage} />
      <ProtectedRoute path={ROUTES.createUser} component={UserCreatePage} />
      <ProtectedRoute path={ROUTES.listProducts} component={ProductListPage} />
      <ProtectedRoute path={ROUTES.createProduct} component={ProductCreatePage} />
      <ProtectedRoute path={ROUTES.detailProduct + '/:id'} component={ProductDetailPage} />
      <ProtectedRoute path={'/'} component={ProductListPage} />
    </Switch>
  );
};
