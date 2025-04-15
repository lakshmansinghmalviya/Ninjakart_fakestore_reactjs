import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { LoginRequest, LoginResponse } from './LoginTypes';

interface LoginState {
    loginUser: LoginResponse;
    loginLoading: boolean;
    loginError: string;
    loginMessage: string;
}

const initialState: LoginState = {
    loginUser: {
        token: localStorage.getItem('token') ?? ''
    },
    loginLoading: false,
    loginError: '',
    loginMessage: ''
};

const loginSlice = createSlice({
    name: 'login',
    initialState,
    reducers: {
        resetSomeLoginState: (state) => {
            state.loginError = '';
            state.loginMessage = '';
        },
        logoutUserRequest: (state) => {
            state.loginUser.token = ''
        },
        loginUserRequest: (state, action: PayloadAction<LoginRequest>) => {
            state.loginLoading = true;
        },
        loginUserSuccess: (state, action: PayloadAction<{ msg: string, data: LoginResponse }>) => {
            state.loginLoading = false;
            state.loginMessage = action.payload.msg;
            state.loginUser = action.payload.data;
        },
        loginUserFailure: (state, action: PayloadAction<string>) => {
            state.loginLoading = false;
            state.loginError = action.payload;
        },
    },
});

export const { loginUserRequest, loginUserSuccess, loginUserFailure, resetSomeLoginState,logoutUserRequest } = loginSlice.actions;

export default loginSlice.reducer;
