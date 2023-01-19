import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {accAPI, LoginParamsType, LoginResponseType, SetPasswordDataType, SetPasswordResponseType} from "../../api/api";
import {handleAsyncServerAppError, handleAsyncServerNetworkError, ThunkError} from "../../utils/errorUtils";
import {appCommonActions} from "../applicationCommonActions";
import {IAccount} from "../../api/dataTypes";

const {setAppStatus, setAppError} = appCommonActions;

const fetchDashboardData = createAsyncThunk<IAccount, undefined, ThunkError>('account/fetchDashboard', async (param, thunkAPI) => {
    thunkAPI.dispatch(setAppStatus({status: 'loading'}));
    try {
        const res = await accAPI.fetchDashboardData();
        if (res.data.id) {
            thunkAPI.dispatch(setAppStatus({status: 'succeeded'}));
            thunkAPI.dispatch(setAppError({error: null}));
            return res.data;
        } else {
            return handleAsyncServerAppError(res.data, thunkAPI);
        }
    } catch (error: unknown | any) {
        return handleAsyncServerNetworkError(error, thunkAPI);
    }
});

const login = createAsyncThunk<LoginResponseType, LoginParamsType, ThunkError>('account/login', async (params, thunkAPI) => {
    thunkAPI.dispatch(setAppStatus({status: 'loading'}));
    try {
        const res = await accAPI.login(params);
        if (res.data.email) {
            thunkAPI.dispatch(setAppStatus({status: 'succeeded'}));
            thunkAPI.dispatch(setAppError({error: null}));
            return res.data.email
        } else {
            return handleAsyncServerAppError(res.data, thunkAPI);
        }
    } catch (error: unknown | any) {
        return handleAsyncServerNetworkError(error, thunkAPI);
    }
});

const logout = createAsyncThunk('account/logout', async (param, thunkAPI) => {
    thunkAPI.dispatch(setAppStatus({status: 'loading'}));
    try {
        const res = await accAPI.logout();
        if (res.status === 200) {
            thunkAPI.dispatch(setAppStatus({status: 'succeeded'}));
            thunkAPI.dispatch(setAppError({error: null}));
            return res.data;
        } else {
            return handleAsyncServerAppError(res.data, thunkAPI);
        }
    } catch (error: unknown | any) {
        return handleAsyncServerNetworkError(error, thunkAPI);
    }
});

const changePassword = createAsyncThunk<SetPasswordResponseType, SetPasswordDataType, ThunkError>('auth/change_password', async (param, thunkAPI) => {
    thunkAPI.dispatch(setAppStatus({status: 'loading'}));
    try {
        const res = await accAPI.setPassword(param);
        if (!res.data.error) {
            thunkAPI.dispatch(setAppStatus({status: 'succeeded'}));
            thunkAPI.dispatch(setAppError({error: null}));
            return res.data;
        } else {
            handleAsyncServerAppError(res.data, thunkAPI);
            return res.data
        }
    } catch (error: unknown | any) {
        return handleAsyncServerNetworkError(error, thunkAPI);
    }
});

export const accountSlice = createSlice({
    name: 'account',
    initialState: {
        isLoggedIn: false,
        user: {
            id: '',
            email: '',
            created: '',
            name: '' as string | undefined,
            role: '',
            test: false,
        }
    },
    reducers: {},
    extraReducers: builder => {
        builder.addCase(fetchDashboardData.fulfilled, (state, action) => {
            const {id, email, created, name, role, test} = action.payload;
            state.user = {id, email, created, name, role, test};
            if (action.payload.email) {
                state.isLoggedIn = true;
            }
        });
        builder.addCase(login.fulfilled, (state, action) => {
            if (action.payload.email) {
                state.isLoggedIn = true;
            }
        });
        builder.addCase(logout.fulfilled, (state) => {
            state.isLoggedIn = false;
        });
    },
});

export const accountAsync = {fetchDashboardData, logout, login, changePassword};