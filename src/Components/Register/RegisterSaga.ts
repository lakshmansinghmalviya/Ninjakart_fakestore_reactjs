
import { PayloadAction } from '@reduxjs/toolkit';
import { call, delay, put, takeLatest } from 'redux-saga/effects';
import { apiCall } from '../../Common/CommonApiCall/ApiCall';
import { getPublicHeader } from '../../Common/CommonHeader/Headers';
import { apiBaseUrl } from '../../Common/CommonValueVariable/CommonValueVariable';
import {
    registerUserFailure,
    registerUserRequest,
    registerUserSuccess,
} from './RegisterSlice';
import { Register } from './RegisterTypes';

function* handleRegisterUser(action: PayloadAction<Register>) {
    const url = `${apiBaseUrl}/users`
    console.log("The payload in saga "+JSON.stringify(action.payload));
    try {
        const response: Register = yield call(apiCall, url, 'POST', getPublicHeader(), action.payload);
        yield put(registerUserSuccess({ msg: "Registered successfully! Please login now !! ", data: response }));
    } catch (error: unknown) {
        yield put(registerUserFailure((error as Error).message));
    }
}

export function* registerSaga() {
    yield takeLatest(registerUserRequest.type, handleRegisterUser);
}
