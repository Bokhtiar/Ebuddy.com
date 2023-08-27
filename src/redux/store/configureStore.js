import {createStore, compose, applyMiddleware} from 'redux';
import createSagaMiddleware from 'redux-saga'
import rootReducer from '../reducers';
import rootSaga from '../../@state/root.saga';

const sagaMiddleware = createSagaMiddleware();
export default function configureStore() {
  const store = createStore(rootReducer,applyMiddleware(sagaMiddleware));
  sagaMiddleware.run(rootSaga);
  return store;
}

// const createAppStore = (): any => {

//   const Store = createStore(
//     reducer,
//     applyMiddleware(sagaMiddleware)
//   );
//  // use the same saga middleware that you have enhanced your store with
//  sagaMiddleware.run(sagaLogger);
//   return Store;
// }