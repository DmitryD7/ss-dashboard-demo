import {useDispatch} from "react-redux";
import {AppDispatchType} from "../app/types";
import {useNavigate} from "react-router-dom";

export const emailValidate = (email: string) => {
    let emailErrors = '';

    if (!email) {
        emailErrors = 'Required';
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email)) {
        emailErrors = 'Invalid email address';
    }

    return emailErrors;
}

export const passwordValidate = (password: string) => {
    let passwordError = '';

    if (!password) {
        passwordError = 'Required field'
    } else if (password.length < 3) {
        passwordError = 'Too short password'
    }

    return passwordError;
}

export const passwordConfirmValidate = (password: string, passwConfirm: string) => {
    let passwordError = '';

    if (!password) {
        passwordError = 'Required field'
    } else if (password.length < 3) {
        passwordError = 'Too short password'
    } else if (password !== passwConfirm) {
        passwordError = 'Passwords must be equal'
    }

    return passwordError;
}

export const numberOfUsersValidate = (numberOfUsers: number) => {
    let numberOfUsersError = '';

    if (!numberOfUsers) {
        numberOfUsersError = 'Required field'
    } else if (numberOfUsers < 5) {
        numberOfUsersError = 'Min 5 users'
    }

    return numberOfUsersError;
}

export const useAppDispatch = () => useDispatch<AppDispatchType>();

export const goToURL = (url: any) => window.location.replace(url);