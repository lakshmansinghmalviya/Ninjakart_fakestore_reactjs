
import { all } from 'redux-saga/effects';
import { registerSaga } from '../Components/Register/RegisterSaga';
import { loginSaga } from '../Components/Login/LoginSaga';

export default function* rootSaga() {
  yield all([
    registerSaga(),
    loginSaga()
    // other sagas
  ]);
}
