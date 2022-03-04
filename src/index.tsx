import { ConnectedRouter } from 'connected-react-router';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import smoothscroll from 'smoothscroll-polyfill';
import App from './App';
import './index.css';
import ToastProvider from './modules/toast/ToastProvier';
import configureStore, { history } from './redux/configureStore';
import reportWebVitals from './reportWebVitals';

smoothscroll.polyfill();

const { store, persistor } = configureStore({});

declare global {
  interface Window {
    store: any;
  }
}
window.store = store;

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ConnectedRouter history={history}>
          <ToastProvider>
            <App />
          </ToastProvider>
        </ConnectedRouter>
      </PersistGate>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root'),
);
