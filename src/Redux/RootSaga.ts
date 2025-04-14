
import { all } from 'redux-saga/effects';
import { registerSaga } from '../Components/Register/RegisterSaga';

export default function* rootSaga() {
  yield all([
    registerSaga(),
    // other sagas
  ]);
}
