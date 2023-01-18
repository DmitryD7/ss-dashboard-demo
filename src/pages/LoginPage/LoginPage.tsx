import React, {useState} from 'react';
import s from './LoginPage.module.css';
import {FormikHelpers, useFormik} from "formik";
import {useSelector} from "react-redux";
import {Link} from 'react-router-dom';
import {emailValidate, passwordValidate, useAppDispatch} from "../../utils/utils";
import {LoginParamsType} from "../../api/api";
import {FormErrorType} from "../../app/types";
import {Loader} from "../../components/Loader/Loader";
import {appSelectors} from "../../app/appReducer";
import {accountActions} from "../../app/accountReducer";

function LoginPage() {
    const dispatch = useAppDispatch();
    const {selectStatus} = appSelectors;
    const {login} = accountActions;

    const status = useSelector(selectStatus);

    const [isVisiblePassword, setIsVisiblePassword] = useState(false);
    const toggleIsVisible = () => setIsVisiblePassword(!isVisiblePassword);

    const validate = (values: LoginParamsType) => {
        const errors: FormErrorType = {};
        errors.email = emailValidate(values.email);
        errors.password = passwordValidate(values.password);
        return errors.email || errors.password ? errors : {};
    };

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
        },
        validate,
        onSubmit: async (values, formikHelpers: FormikHelpers<FormValuesType>) => {
            const res = await dispatch(login(values));
            if (res.payload?.error) {
                const error = res.payload.error;
                formikHelpers.setFieldError('password', error);
            }
        },
    });

    if (status === "loading") {
        return <Loader/>
    }

    return (
        <div className={s.LoginPage}>
            <h1 className={s.LoginPage_Header}>Login</h1>
            <Link to={'/signup'} className={s.LoginPage_NewAcc}>New to StyleScan?</Link>
            <div className={s.LoginPage_Form}>
                <form onSubmit={formik.handleSubmit}>
                    <div className={s.LoginPage_Form_Element}>
                        <input
                            type="email"
                            placeholder={'Email'}
                            {...formik.getFieldProps('email')}
                        />
                        {formik.errors.email ?
                            <div className={s.LoginPage_Form_Element_Error}>{formik.errors.email}</div> : null}
                    </div>

                    <div className={s.LoginPage_Form_Element}>
                        <input
                            className={s.LoginPage_Form_Element__PasswInput}
                            type={isVisiblePassword ? 'text' : 'password'}
                            placeholder={'Password'}
                            {...formik.getFieldProps('password')}
                        />
                        <button className={`${s.toggle} ${isVisiblePassword && s.showing}`} onClick={toggleIsVisible}
                                type={'button'}></button>
                        <div className={s.LoginPage_ForgotPasswBtn}><Link to={'/reset_request'}>Forgot password?</Link>
                        </div>
                        {formik.errors.password ?
                            <div className={s.LoginPage_Form_Element_Error}>{formik.errors.password}</div> : null}
                    </div>

                    <button className={s.LoginPage_Form_Btn} type={"submit"}>Login</button>
                </form>
            </div>
        </div>
    );
}

export default LoginPage;

type FormValuesType = {
    email: string
    password: string
}