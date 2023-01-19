import axios from 'axios';
import {IAccount} from "./dataTypes";


const instance = axios.create({
    baseURL: 'https://account.stylescan.com/',
    withCredentials: true,
});

export const accAPI = {
    login(data: LoginParamsType) {
        return instance.post<LoginResponseType>('login', data);
    },
    logout() {
        return instance.get('logout');
    },
    fetchDashboardData() {
        return instance.get<IAccount>('account/dashboard.json');
    },
    setPassword(data: SetPasswordDataType) {
        return instance.post('account/set-password', data);
    },
};

export const studioAPI = {
    subscribe() {
        return instance.post<SubscribeResponseType>('studio/subscribe');
    },
    unsubscribe() {
        return instance.post<UnsubscribeResponseType>('studio/unsubscribe');
    },
    billing() {
        return instance.get('billing');
    },
};

export type SetPasswordDataType = {
    pass0: string, // old password
    pass1: string, // new password
};

export type LoginParamsType = {
    email: string,
    password: string,
};

export type LoginResponseType = {
    email: string, // account identifier
    error?: string,
};

export type SetPasswordCodeType = 'BAD_PASS0' | 'BAD_PASS' | 'SAME_PASS';
// wrong old password [BAD_PASS0]
// invalid new password [BAD_PASS]
// same password [SAME_PASS]

export type SetPasswordResponseType = {
    code?: SetPasswordCodeType,
    error?: string
}

export type SubscribeErrorCodeType = 'BAD_ROLE' | 'TEMP_STUDIO' | 'HAS_STUDIO' | 'STRIPE';
// role doesn't allow purchases [BAD_ROLE]
// has temporary studio license [TEMP_STUDIO]
// already has studio [HAS_STUDIO]
// stripe error [STRIPE]

export type SubscribeResponseType = {
    code?: SubscribeErrorCodeType
    url?: string
    error?: string
}

export type UnsubscribeErrorCodeType = 'NO_STUDIO' | 'ALREADY_CANCEL' | 'STRIPE';
//no studio license [NO_STUDIO]
// license already cancelled [ALREADY_CANCEL]
// stripe error [STRIPE]

export type UnsubscribeResponseType = {
    code?: UnsubscribeErrorCodeType
    error?: string
}