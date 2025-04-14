// src/features/register/registerSaga.ts

import { call, delay, put, takeLatest } from 'redux-saga/effects';
import { PayloadAction } from '@reduxjs/toolkit';
import {
    registerUserRequest,
    registerUserSuccess,
    registerUserFailure,
} from './RegisterSlice';
import { Register } from './RegisterTypes';
import { registerUser } from './RegisterApi';

function* handleRegisterUser(action: PayloadAction<Register>) {
    try {
        yield delay(1000);//just to see the button disabled not required in production
        const response: Register = yield call(registerUser, action.payload);
        // throw new Error("Creation failed"); // to test the error dispatch
        yield put(registerUserSuccess({ msg: "Registered successfully ", data: response }));
    } catch (error: unknown) {
        yield put(registerUserFailure((error as Error).message));
    }
}

export function* registerSaga() {
    yield takeLatest(registerUserRequest.type, handleRegisterUser);
}
