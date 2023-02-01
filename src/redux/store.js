import {configureStore,getDefaultMiddleware} from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import rootSaga from "./rootSaga";
import logger from 'redux-logger';
import {persistStore} from "redux-persist";
import rootReducer from "./rootReducer";

const sagaMiddleware = createSagaMiddleware();

const middleware = [
  ...getDefaultMiddleware({
    immutableCheck: false,
    serializableCheck: false
  }),
  sagaMiddleware
];


if (process.env.NODE_ENV === 'development') {
  middleware.push(logger);
}

const store = configureStore({
    reducer:rootReducer,
    middleware
});

sagaMiddleware.run(rootSaga);
export const persistor = persistStore(store);
export default store;