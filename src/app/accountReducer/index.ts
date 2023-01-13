import {AppRootStateType} from "../types";
import {accountAsync, accountSlice} from "./accountReducer";

const accountReducer = accountSlice.reducer;

const selectAccEmail = (state: AppRootStateType) => state.account.email;

const accountSelectors = {
    selectAccEmail,
};

const accountActions = {
    ...accountSlice.actions,
    ...accountAsync,
};

export {
    accountReducer,
    accountActions,
    accountSelectors,
};