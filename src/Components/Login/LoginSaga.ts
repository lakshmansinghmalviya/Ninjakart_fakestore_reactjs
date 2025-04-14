
import { PayloadAction } from '@reduxjs/toolkit';
import { call, put, takeLatest } from 'redux-saga/effects';
import { apiCall } from '../../Common/CommonApiCall/ApiCall';
import { getPublicHeader } from '../../Common/CommonHeader/Headers';
import { apiBaseUrl } from '../../Common/CommonValueVariable/CommonValueVariable';
import {
    loginUserFailure,
    loginUserRequest,
    loginUserSuccess,
} from './LoginSlice';
import { LoginRequest, LoginResponse } from './LoginTypes';

function* handleLoginUser(action: PayloadAction<LoginRequest>) {
    const url = `${apiBaseUrl}/auth/login`
    console.log(url+JSON.stringify(action.payload));
    try {
        const response: LoginResponse = yield call(apiCall, url, 'POST', getPublicHeader(), action.payload);
        yield put(loginUserSuccess({ msg: "Logged in successfully ", data: response }));
    } catch (error: unknown) {
        yield put(loginUserFailure((error as Error).message));
    }
}

export function* loginSaga() {
    yield takeLatest(loginUserRequest.type, handleLoginUser);
}
