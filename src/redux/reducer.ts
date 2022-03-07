import { connectRouter, RouterState } from 'connected-react-router';
import { History } from 'history';
import { combineReducers } from 'redux';
import authReducer, { AuthState } from '../modules/auth/redux/authReducer';
import brandReducer, { BrandState } from '../modules/brand/redux/brandReducer';
import categoryReducer, { CategoryState } from '../modules/category/redux/categoryReducer';
import commonReducer, { CommonState } from '../modules/common/redux/commonReducer';
import navReducer, { NavState } from '../modules/nav/redux/navReducer';
import vendorReducer, { VendorState } from '../modules/vendor/redux/vendorReducer';
import shippingReducer, { ShippingState } from '../modules/shipping/redux/shippingReducer';
import toastReducer, { ToastState } from '../modules/toast/redux/toastReducer';

export interface AppState {
  router: RouterState;
  profile: AuthState;
  nav: NavState
  category: CategoryState,
  brand: BrandState,
  common: CommonState,
  vendor: VendorState
  shipping: ShippingState
  toast: ToastState
}

export default function createRootReducer(history: History) {
  return combineReducers({
    router: connectRouter(history),
    profile: authReducer,
    nav: navReducer,
    category: categoryReducer,
    brand: brandReducer,
    common: commonReducer,
    vendor: vendorReducer,
    shipping: shippingReducer,
    toast: toastReducer
  });
}
