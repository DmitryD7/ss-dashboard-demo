import {appSlice} from "./appReducer";
import {AppRootStateType} from "../types";

const selectStatus = (state: AppRootStateType) => state.app.status;
const selectError = (state: AppRootStateType) => state.app.error;

const appReducer = appSlice.reducer;

const appSelectors = {
    selectStatus,
    selectError,
}

const appActions = {
    ...appSlice.actions,
};

export {
    appReducer,
    appActions,
    appSelectors,
};