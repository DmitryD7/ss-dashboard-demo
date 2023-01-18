import {AppRootStateType} from "../types";
import {accountAsync, accountSlice} from "./accountReducer";

const accountReducer = accountSlice.reducer;

const selectAccEmail = (state: AppRootStateType) => state.account.email;
const selectIsLoggedIn = (state: AppRootStateType) => state.account.isLoggedIn;

const accountSelectors = {
    selectAccEmail,
    selectIsLoggedIn,
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