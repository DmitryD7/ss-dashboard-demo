import {combineReducers, configureStore} from "@reduxjs/toolkit";
import thunkMiddleware from "redux-thunk";
import {accountReducer} from "./accountReducer";
import {appReducer} from "./appReducer";
import {subscriptionReducer} from "./subscriptionReducer";

export const rootReducer = combineReducers({
    app: appReducer,
    account: accountReducer,
    subscription: subscriptionReducer,
});

export const store = configureStore({
    reducer: rootReducer,
    middleware: getDefaultMiddleware => getDefaultMiddleware().prepend(thunkMiddleware),
});