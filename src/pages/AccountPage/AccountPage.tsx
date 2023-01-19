import {useSelector} from "react-redux";
import {accountActions, accountSelectors} from "../../app/accountReducer";
import s from './AccountPage.module.css';
import Button from "../../components/Button/Button";
import {useAppDispatch} from "../../utils/utils";
import {useCallback, useState} from "react";
import LoginPage from "../LoginPage/LoginPage";
import ChangePasswordPage from "../ChangePasswordPage/ChangePasswordPage";

const AccountPage = () => {
    const dispatch = useAppDispatch();
    const {logout} = accountActions;
    const {selectUser, selectIsLoggedIn} = accountSelectors;

    const user = useSelector(selectUser);
    const isLoggedIn = useSelector(selectIsLoggedIn);

    const logoutHandler = useCallback(async () => {
        await dispatch(logout());
    }, [dispatch, logout]);

    const [isOpenedChangePassword, setIsOpenedChangePassword] = useState(false);
    const toggleChangePasswordHandler = () => {
        setIsOpenedChangePassword(!isOpenedChangePassword);
    };

    const Icon = ({icon}: { icon: string }) => (
        <span className="material-symbols-outlined" style={{fontSize: '81px'}}>{icon}</span>
    );

    return (isLoggedIn
            ? <div className={s.AccountPage}>
                <h1 className={s.AccountPage_Header}>Hello, {user.name ? user.name : user.email}</h1>
                {/*<div className={s.AccountPage_Content}>*/}
                    <section className={s.AccountPage_Section}>
                        <div className={s.AccountPage_Section__Icon}>
                            {user.role === 'user' && <Icon icon="person"/>}
                            {user.role === 'admin' && <Icon icon="supervisor_account"/>}
                            {user.role === 'dev' && <Icon icon="settings_account_box"/>}
                        </div>
                        <div>
                            <div className={s.AccountPage_Section__Info}>
                                <div>
                                    {user.name && <p>Name: {user.name}</p>}
                                    <p>Email: {user.email}</p>
                                    <p>Role: {user.role}</p>
                                </div>
                            </div>
                            <div className={s.AccountPage_Section__Settings}>
                                <p><b>Account settings</b></p>
                                <button className={s.AccountPage_Section__Button} onClick={toggleChangePasswordHandler}>Change Password</button>
                                <div
                                    className={`${s.ModalBackground} ${isOpenedChangePassword && s.OpenModalBackground}`}
                                    onClick={toggleChangePasswordHandler}></div>
                                {isOpenedChangePassword &&
                                    <div
                                        className={`${s.Modal} ${isOpenedChangePassword ? s.OpenModal : s.ClosedModal}`}>
                                        <ChangePasswordPage/>
                                    </div>
                                }
                            </div>
                        </div>
                        <Button className={s.AccountPage_Section__Logout} onClick={logoutHandler}>Logout</Button>
                    </section>
                {/*</div>*/}
            </div>
            : <LoginPage/>
    );
};

export default AccountPage;