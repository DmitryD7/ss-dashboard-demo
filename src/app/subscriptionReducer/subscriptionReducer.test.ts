import {studioLicenseDataType} from "../../api/dataTypes";
import {accountActions} from "../accountReducer";
import {subscriptionReducer} from "./index";
import {userData} from "../accountReducer/accountReducer.test";

const {fetchDashboardData} = accountActions;

let startState: SubInitialStateType;

beforeEach(() => {
    startState = {
        has_studio_trial: false,
        studio: {
            sub: '',
            n: 0,
            cancelled: false,
            end: 0,
            trial: false,
        },
    };
});

test("correct user's subscription data must be set", () => {
    const action = fetchDashboardData.fulfilled(userData, '', undefined);

    const endState = subscriptionReducer(startState, action);
    expect(endState.has_studio_trial).toBeTruthy();
    expect(endState.studio?.sub).toBe('sub_1MOqXoKXL9xcMNDBzd15EI7k');
    expect(endState.studio?.trial).toBeTruthy();
    expect(endState.studio?.cancelled).toBeFalsy();
});

type SubInitialStateType = {
    has_studio_trial: boolean | undefined,
    studio: studioLicenseDataType | undefined,
}