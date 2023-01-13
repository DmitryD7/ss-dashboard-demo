import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {accAPI} from "../../api/api";

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

export const accountSlice = createSlice({
    name: 'account',
    initialState: {
        email: 'hello@gmail.com',
    },
    reducers: {},
    extraReducers: builder => {
        builder.addCase(fetchDashboardData.fulfilled, (state, action) => {
            state.email = action.payload;
        });
    },
});

export const accountAsync = {fetchDashboardData};