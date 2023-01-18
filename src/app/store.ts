import {combineReducers, configureStore} from "@reduxjs/toolkit";
import thunkMiddleware from "redux-thunk";
import {accountReducer} from "./accountReducer";
import {appReducer} from "./appReducer";

export const rootReducer = combineReducers({
    app: appReducer,
    account: accountReducer,
});

export const store = configureStore({
    reducer: rootReducer,
    middleware: getDefaultMiddleware => getDefaultMiddleware().prepend(thunkMiddleware),
});