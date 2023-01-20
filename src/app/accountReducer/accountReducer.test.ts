import {IAccount} from "../../api/dataTypes";
import {accountActions, accountReducer} from "./index";

const {fetchDashboardData, login, logout} = accountActions;

export const userData: IAccount = {
    // internal account id
    "id": "f306399632ba24df41915150095c94207e040eb763248c8d346a1d6456cb7090",
    // external account id
    "email": "test@test.com",
    // date account created
    "created": "2023-01-10T22:40:14.547Z",
    // full name (optional)
    "name": "Test",
    // enum: user, dev, admin, warper
    "role": "user",
    // test uses fake stripe
    "test": true,
    // stripe customer (optional)
    "customer": "cus_N98mpJFOTq1ztc",
    // does this user have a trial available? (optional)
    "has_studio_trial": true,
    // studio license information (optional)
    "studio": {
        "sub": "sub_1MOqXoKXL9xcMNDBzd15EI7k", // stripe subscription (if missing, indefinite license)
        "n": 1,
        "cancelled": false, // true if the subscription does not renew
        "end": 1675982627, // UTC date of renew/cancel (eg. new Date(end*1000).toLocaleDateString())
        "trial": true, //
    },
};

let startState: AccInitialStateType;

beforeEach(() => {
    startState = {
        isLoggedIn: false,
        user: {
            id: '',
            email: '',
            created: '',
            name: '',
            role: '',
            test: false,
        },
    };
});

test("correct user's data must be set", () => {
    const action = fetchDashboardData.fulfilled(userData, '', undefined);

    const endState = accountReducer(startState, action);
    expect(endState.user.email).toBe('test@test.com');
    expect(endState.user.role).toBe('user');
    expect(endState.user.test).toBeTruthy();
});

test('truthy isLoggedIn value must be set after login', () => {
    const action = login.fulfilled({email: 'test@test.com'}, '', {email: '', password: ''});

    const endState = accountReducer(startState, action);
    expect(endState.isLoggedIn).toBeTruthy();
});

test('falsy isLoggedIn value must be set after logout', () => {
    const action = logout.fulfilled({}, '');

    const endState = accountReducer(startState, action);
    expect(endState.isLoggedIn).toBeFalsy();
});

type AccInitialStateType = {
    isLoggedIn: false,
    user: {
        id: string,
        email: string,
        created: string,
        name: string | undefined,
        role: string,
        test: boolean,
    },
};



