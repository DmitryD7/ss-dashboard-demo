import React, {useState} from 'react';
import s from './ChangePasswordPage.module.css';
import {FormikHelpers, useFormik} from "formik";
import {passwordConfirmValidate, passwordValidate, useAppDispatch} from "../../utils/utils";
import {accountActions} from "../../app/accountReducer";
import {appSelectors} from "../../app/appReducer";
import {useSelector} from "react-redux";
import {Loader} from "../../components/Loader/Loader";
import SuccessPage from "../../components/Success/SuccessPage";

function ChangePasswordPage() {
    const dispatch = useAppDispatch();
    const {changePassword} = accountActions;
    const {selectStatus} = appSelectors;
    const status = useSelector(selectStatus);

    const [isSucceeded, setIsSucceeded] = useState(false);


    const validate = (values: FormValuesType) => {
        const errors: FormErrorType = {};
        errors.password = passwordValidate(values.password);
        errors.passwordConfirmation = passwordConfirmValidate(values.passwordConfirmation, values.password);

        return errors.password || errors.passwordConfirmation || errors.oldPassword ? errors : {};
    };


    const formik = useFormik({
        initialValues: {
            oldPassword: '',
            password: '',
            passwordConfirmation: '',
        },
        validate,
        onSubmit: async (values, formikHelpers: FormikHelpers<FormValuesType>) => {
            const {oldPassword, password} = values;
            const res = await dispatch(changePassword({pass0: oldPassword, pass1: password}));
            if (res.payload?.error) {
                const error = res.payload.error;
                if (res.payload.code === 'BAD_PASS0') {
                    formikHelpers.setFieldError('oldPassword', 'wrong old password');
                } else if (res.payload.code === 'BAD_PASS') {
                    formikHelpers.setFieldError('password', 'invalid new password');
                }else if (res.payload.code === 'SAME_PASS') {
                    formikHelpers.setFieldError('password', 'same password');
                }
                setIsSucceeded(false);
                return error;
            } else {
                setIsSucceeded(true);
                return;
            }
        },
    });
    if (status === "loading") {
        return <Loader/>
    }

    return (
        isSucceeded
            ? <SuccessPage message={'Your password has been successfully changed!'}/>
            : <div className={s.ChangePasswPage}>
            <h1 className={s.ChangePasswPage_Header}>Create New Password</h1>
            <div className={s.ChangePasswPage_Form}>
                <form onSubmit={formik.handleSubmit} autoComplete="off">
                    <div className={s.ChangePasswPage_Form_Element}>
                        <input
                            autoComplete="old-password"
                            type="password"
                            placeholder={'Old password'}
                            {...formik.getFieldProps('oldPassword')}
                        />
                        {formik.errors.oldPassword ?
                            <div
                                className={s.ChangePasswPage_Form_Element_Error}>{formik.errors.oldPassword}</div> : null}
                    </div>

                    <div className={s.ChangePasswPage_Form_Element}>
                        <input
                            autoComplete="new-password"
                            type="password"
                            placeholder={'New password'}
                            {...formik.getFieldProps('password')}
                        />
                        {formik.errors.password ?
                            <div className={s.ChangePasswPage_Form_Element_Error}>{formik.errors.password}</div> : null}
                    </div>

                    <div className={s.ChangePasswPage_Form_Element}>
                        <input
                            autoComplete="new-password"
                            type="password"
                            placeholder={'Confirm new password'}
                            {...formik.getFieldProps('passwordConfirmation')}
                        />
                        {formik.errors.passwordConfirmation ? <div
                            className={s.ChangePasswPage_Form_Element_Error}>{formik.errors.passwordConfirmation}</div> : null}
                    </div>

                    <button className={s.ChangePasswPage_Form_Btn} type={"submit"}>Confirm</button>
                </form>
            </div>
        </div>
    );
}

export default ChangePasswordPage;

type FormValuesType = {
    password: string
    oldPassword: string
    passwordConfirmation: string
}

type FormErrorType = {
    oldPassword?: string | null
    password?: string | null
    passwordConfirmation?: string
}