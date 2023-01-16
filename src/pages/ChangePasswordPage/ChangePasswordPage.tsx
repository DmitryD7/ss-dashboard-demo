import React from 'react';
import s from './ChangePasswordPage.module.css';
import {FormikHelpers, useFormik} from "formik";
import {passwordConfirmValidate, passwordValidate} from "../../utils/utils";

function ChangePasswordPage() {

    const validate = (values: FormValuesType) => {
        const errors: FormErrorType = {};
        errors.password = passwordValidate(values.password);
        errors.passwordConfirmation = passwordConfirmValidate(values.passwordConfirmation, values.password);

        return errors.password || errors.passwordConfirmation ? errors : {};
    };


    const formik = useFormik({
        initialValues: {
            oldPassword: '',
            password: '',
            passwordConfirmation: '',
        },
        validate,
        onSubmit: (values, formikHelpers: FormikHelpers<FormValuesType>) => {
            console.log(values)
        },
    });

    return (
        <div className={s.ChangePasswPage}>
            <h1 className={s.ChangePasswPage_Header}>Create New Password</h1>
            <div className={s.ChangePasswPage_Form}>
                <form onSubmit={formik.handleSubmit} autoComplete="off">
                    <div className={s.ChangePasswPage_Form_Element}>
                        <input
                            autoComplete="old-password"
                            type="text"
                            placeholder={'Old password'}
                            {...formik.getFieldProps('confirmCode')}
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