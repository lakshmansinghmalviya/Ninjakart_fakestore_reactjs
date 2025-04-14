
import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga'; 
import rootSaga from './RootSaga';
import registerReducer from '../Components/Register/RegisterSlice';
import loginReducer from '../Components/Login/LoginSlice';

const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
  reducer: {
    register: registerReducer,
    login : loginReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(sagaMiddleware),
});

sagaMiddleware.run(rootSaga);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
