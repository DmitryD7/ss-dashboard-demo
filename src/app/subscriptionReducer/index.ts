import {AppRootStateType} from "../types";
import {subscriptionAsync, subscriptionSlice} from "./subscriptionReducer";

const subscriptionReducer = subscriptionSlice.reducer;

const selectHasStudioTrial = (state: AppRootStateType) => state.subscription.has_studio_trial;
const selectStudio = (state: AppRootStateType) => state.subscription.studio;

const subscriptionSelectors = {
    selectHasStudioTrial,
    selectStudio,
};

const subscriptionActions = {
    ...subscriptionSlice.actions,
    ...subscriptionAsync,
};

export {
    subscriptionReducer,
    subscriptionSelectors,
    subscriptionActions,
};