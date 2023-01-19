import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {studioLicenseDataType} from "../../api/dataTypes";
import {studioAPI, SubscribeResponseType, UnsubscribeResponseType} from "../../api/api";
import {handleAsyncServerAppError, handleAsyncServerNetworkError, ThunkError} from "../../utils/errorUtils";
import {appCommonActions} from "../applicationCommonActions";
import {accountActions} from "../accountReducer";

const {setAppStatus, setAppError} = appCommonActions;
const {fetchDashboardData} = accountActions;

const subscribe = createAsyncThunk<SubscribeResponseType, undefined, ThunkError>('subscription/subscribe', async (params, thunkAPI) => {
    thunkAPI.dispatch(setAppStatus({status: 'loading'}));
    try {
        const res = await studioAPI.subscribe();
        if (!res.data.code) {
            thunkAPI.dispatch(setAppStatus({status: 'succeeded'}));
            thunkAPI.dispatch(setAppError({error: null}));
            return res.data;
        } else {
            handleAsyncServerAppError(res.data, thunkAPI);
            return res.data;
        }
    } catch (error: unknown | any) {
        return handleAsyncServerNetworkError(error, thunkAPI);
    }
});

const unsubscribe = createAsyncThunk<UnsubscribeResponseType, undefined, ThunkError>('subscription/unsubscribe', async (params, thunkAPI) => {
    thunkAPI.dispatch(setAppStatus({status: 'loading'}));
    try {
        const res = await studioAPI.unsubscribe();
        if (!res.data.code) {
            thunkAPI.dispatch(setAppStatus({status: 'succeeded'}));
            thunkAPI.dispatch(setAppError({error: null}));
            return res.data;
        } else {
            handleAsyncServerAppError(res.data, thunkAPI);
            return res.data;
        }
    } catch (error: unknown | any) {
        return handleAsyncServerNetworkError(error, thunkAPI);
    }
});

const billing = createAsyncThunk('subscription/billing', async (param, thunkAPI) => {
    thunkAPI.dispatch(setAppStatus({status: 'loading'}));
    try {
        const res = await studioAPI.billing();
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

export const subscriptionSlice = createSlice({
    name: 'subscription',
    initialState: {
        has_studio_trial: false as boolean | undefined,
        studio: {
            sub: '',
            n: 0,
            cancelled: false,
            end: 0,
            trial: false,
        } as studioLicenseDataType | undefined,
    },
    reducers: {},
    extraReducers: builder => {
        builder.addCase(fetchDashboardData.fulfilled, (state, action) => {
            state.has_studio_trial = action.payload.has_studio_trial;
            state.studio = action.payload.studio;
        });
    },
});

export const subscriptionAsync = {subscribe, unsubscribe, billing};