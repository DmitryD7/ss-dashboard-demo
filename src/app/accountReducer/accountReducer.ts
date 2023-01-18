import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {accAPI, LoginParamsType, LoginResponseType} from "../../api/api";
import {handleAsyncServerAppError, handleAsyncServerNetworkError, ThunkError} from "../../utils/errorUtils";
import {appCommonActions} from "../applicationCommonActions";

const {setAppStatus, setAppError} = appCommonActions;

const fetchDashboardData = createAsyncThunk('account/fetchDashboard', async (param, thunkAPI) => {
    try {
        const res = await accAPI.fetchDashboardData();
        console.log(res)
        return res.data;
    } catch (error: unknown | any) {
        console.log(error);
        return error;
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
})

const logout = createAsyncThunk('account/logout', async (param, thunkAPI) => {
    thunkAPI.dispatch(setAppStatus({status: 'loading'}));
    try {
        const res = await accAPI.logout();
        if (res.status === 200) {
            thunkAPI.dispatch(setAppStatus({status: 'succeeded'}));
            thunkAPI.dispatch(setAppError({error: null}));
            return res.data.ok;
        } else {
            return handleAsyncServerAppError(res.data, thunkAPI);
        }
    } catch (error: unknown | any) {
        return handleAsyncServerNetworkError(error, thunkAPI);
    }
})

export const accountSlice = createSlice({
    name: 'account',
    initialState: {
        isLoggedIn: false,
        email: '',
    },
    reducers: {},
    extraReducers: builder => {
        builder.addCase(fetchDashboardData.fulfilled, (state, action) => {
            state.email = action.payload.email;
        });
        builder.addCase(login.fulfilled, (state, action) => {
            state.isLoggedIn = true;
        });
        builder.addCase(logout.fulfilled, (state, action) => {
            state.isLoggedIn = false;
        });
    },
});

export const accountAsync = {fetchDashboardData, logout, login};