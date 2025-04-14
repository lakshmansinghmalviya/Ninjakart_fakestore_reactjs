import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Register } from './RegisterTypes';

interface RegisterState {
    register: Register;
    registerLoading: boolean;
    registerError: string;
    registerMessage: string;
}

const initialState: RegisterState = {
    register: {
        "id": 0,
        "username": "",
        "email": "",
        "password": ""
    },
    registerLoading: false,
    registerError: '',
    registerMessage: ''
};

const registerSlice = createSlice({
    name: 'register',
    initialState,
    reducers: {
        resetSomeRegisterState: (state) => {
            state.registerError = '';
            state.registerMessage = '';
        },
        registerUserRequest: (state, action: PayloadAction<Register>) => {
            state.registerLoading = true;
        },
        registerUserSuccess: (state, action: PayloadAction<{ msg: string, data: Register }>) => {
            state.registerLoading = false;
            state.registerMessage = action.payload.msg ?? '';
            state.register = action.payload.data
        },
        registerUserFailure: (state, action: PayloadAction<string>) => {
            state.registerLoading = false;
            state.registerError = action.payload;
        },
    },
});

export const { registerUserRequest, registerUserSuccess, registerUserFailure,resetSomeRegisterState } = registerSlice.actions;

export default registerSlice.reducer;
