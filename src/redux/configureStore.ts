import { routerMiddleware } from 'connected-react-router';
import { createBrowserHistory } from 'history';
import { applyMiddleware, compose, createStore } from 'redux';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage/session';
import createSagaMiddleware from 'redux-saga';
import thunk from 'redux-thunk';
import createRootReducer from './reducer';
import rootSaga from './sagas';


export const history = createBrowserHistory();
const sagaMiddleware = createSagaMiddleware()

const composeEnhancers =
  (typeof window !== 'undefined' &&
    (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
  compose;

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['profile']
};

export default function configureStore(preloadedState: any) {

  const persistedReducer = persistReducer(
    persistConfig,
    createRootReducer(history),
  );

  const store = createStore(
    persistedReducer, // root reducer with router state
    preloadedState,
    composeEnhancers(
      applyMiddleware(
        routerMiddleware(history), // for dispatching history actions
        thunk,
        sagaMiddleware
        // ... other middlewares ...
      ),
    ),
  );

  
  sagaMiddleware.run(rootSaga)

  const persistor = persistStore(store);


  return { store, persistor };
}
