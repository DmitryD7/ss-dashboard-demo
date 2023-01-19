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

    const logoutHandler = useCallback(() => {
        dispatch(logout());
    }, [dispatch, logout]);

    const [isOpenedChangePassword, setIsOpenedChangePassword] = useState(false);
    const toggleChangePasswordHandler = () => {
        setIsOpenedChangePassword(!isOpenedChangePassword);
    };

    const Icon = ({icon}: { icon: string }) => (
        <span className="material-symbols-outlined">{icon}</span>
    );

    return (isLoggedIn
            ? <div className={s.AccountPage}>
                <h1 className={s.AccountPage_Header}>Hello, {user.name ? user.name : user.email}</h1>
                <hr/>
                <div className={s.AccountPage_Content}>
                    <section className={s.AccountPage_Section}>
                        <h2 className={s.AccountPage_Section__Header}>User Information</h2>
                        <hr/>
                        {user.name &&
                            <div>
                                <h3>Name: </h3>
                                <p>{user.name}</p>
                            </div>
                        }
                        <div>
                            <h3>Email: </h3>
                            <p>{user.email}</p>
                        </div>
                        <div>
                            <h3>Role: </h3>
                            <p style={{border: '1px solid black', width: '57px'}}>
                                {user.role === 'user' && <Icon icon="person"/>}
                                {user.role === 'admin' && <Icon icon="supervisor_account"/>}
                                {user.role === 'dev' && <Icon icon="settings_account_box"/>}
                                {user.role}
                            </p>
                        </div>
                    </section>

                    <section className={s.AccountPage_Section}>
                        <h2 className={s.AccountPage_Section__Header}>Account settings</h2>
                        <hr/>
                        <h3>Change Password</h3>
                        <Button onClick={toggleChangePasswordHandler}>Change Password</Button>
                        <div className={`${s.ModalBackground} ${isOpenedChangePassword && s.OpenModalBackground}`}
                             onClick={toggleChangePasswordHandler}></div>
                        {isOpenedChangePassword &&
                            <div className={`${s.Modal} ${isOpenedChangePassword ? s.OpenModal : s.ClosedModal}`}>
                                <ChangePasswordPage/>
                            </div>
                        }
                        <h3>Logout</h3>
                        <Button onClick={logoutHandler}>Logout</Button>
                    </section>
                </div>
            </div>
            : <LoginPage/>
    );
};

export default AccountPage;