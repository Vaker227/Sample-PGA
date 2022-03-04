import { connectRouter, RouterState } from 'connected-react-router';
import { History } from 'history';
import { combineReducers } from 'redux';
import authReducer, { AuthState } from '../modules/auth/redux/authReducer';
import navReducer, { NavState } from '../modules/nav/redux/navReducer';

export interface AppState {
  router: RouterState;
  profile: AuthState;
  nav: NavState
}

export default function createRootReducer(history: History) {
  return combineReducers({
    router: connectRouter(history),
    profile: authReducer,
    nav: navReducer
  });
}
