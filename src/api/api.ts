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
        return instance.post('studio/subscribe');
    },
    unsubscribe() {
        return instance.post('studio/unsubscribe');
    },
    billing() {
        return instance.get('billing');
    },
};

type SetPasswordDataType = {
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