import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {accAPI, LoginParamsType, LoginResponseType} from "../../api/api";

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

const login = createAsyncThunk<LoginResponseType, LoginParamsType>('account/login', async (params, thunkAPI) => {
    try {
        const res = await accAPI.login(params);
        return res.data;
    } catch (error: unknown | any) {
        console.log(error)
        return error;
    }
})

const logout = createAsyncThunk('account/logout', async (param, thunkAPI) => {
    try {
        const res = await accAPI.logout();
        return res.data;
    } catch (error: unknown | any) {
        console.log(error);
        return error;
    }
});

export const accountSlice = createSlice({
    name: 'account',
    initialState: {
        email: 'hello@gmail.com',
    },
    reducers: {},
    extraReducers: builder => {
        builder.addCase(fetchDashboardData.fulfilled, (state, action) => {
            state.email = action.payload.email;
        });
    },
});

export const accountAsync = {fetchDashboardData, logout};