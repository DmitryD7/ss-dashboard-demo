import axios from 'axios';


const instance = axios.create({
    baseURL: 'https://account.stylescan.com/',
    withCredentials: true,
});

export const accAPI = {
    logout() {
        return instance.get('logout');
    },
    billing() {
        return instance.get('billing');
    },
    fetchDashboardData() {
        return instance.get('account/dashboard.json');
    },
    setPassword(data: SetPasswordDataType) {
        return instance.post('/account/set-password', data);
    },
};

export const studioAPI = {
    subscribe() {
        return instance.post('/studio/subscribe');
    },
    unsubscribe() {
        return instance.post('/studio/unsubscribe');
    },
};

type SetPasswordDataType = {
    pass0: string, // old password
    pass1: string, // new password
};