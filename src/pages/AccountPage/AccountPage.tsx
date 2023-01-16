import {useSelector} from "react-redux";
import {accountActions, accountSelectors} from "../../app/accountReducer";
import s from './AccountPage.module.css';
import Button from "../../components/Button/Button";
import {useNavigate} from "react-router-dom";
import {useAppDispatch} from "../../utils/utils";
import {useCallback, useEffect} from "react";
import {StudioSubscription} from "../../components/StudioSubscription/StudioSubscription";

const AccountPage = () => {
    const dispatch = useAppDispatch();
    const {fetchDashboardData, logout} = accountActions;
    const {selectAccEmail} = accountSelectors;
    const accEmail = useSelector(selectAccEmail);
    const navigate = useNavigate();

    useEffect(() => {
        dispatch(fetchDashboardData())
    }, []);

    const logoutHandler = useCallback(() => {
        dispatch(logout());
    }, [dispatch, logout]);

    return <div className={s.AccountPage}>
        <h1 className={s.AccountPage_Header}>Hello, {accEmail}</h1>
        <hr/>
        <h2>Studio Plan</h2>
        <StudioSubscription/>
        <hr/>
        <h2>Change Password</h2>
        <Button onClick={() => navigate('change_password')}>Change Password</Button>
        <hr/>
        <h2>Logout</h2>
        <Button onClick={logoutHandler}>Logout</Button>
        <hr/>
    </div>
};

export default AccountPage;