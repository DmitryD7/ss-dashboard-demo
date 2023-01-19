import {AppRootStateType} from "../types";
import {accountAsync, accountSlice} from "./accountReducer";

const accountReducer = accountSlice.reducer;

const selectIsLoggedIn = (state: AppRootStateType) => state.account.isLoggedIn;
const selectUser = (state: AppRootStateType) => state.account.user;

const accountSelectors = {
    selectUser,
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