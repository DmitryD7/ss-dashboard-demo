import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import {accountActions, accountSelectors} from "../../app/accountReducer";
import {AppDispatchType} from "../../app/types";
import s from './AccountPage.module.css';

const AccountPage = () => {
    const dispatch = useDispatch<AppDispatchType>();
    const {fetchDashboardData} = accountActions;
    const {selectAccEmail} = accountSelectors;
    const accEmail = useSelector(selectAccEmail);

    // useEffect(() => {
    //     console.log('acc page')
    //     dispatch(fetchDashboardData())
    // }, []);

    return <div className={s.AccountPage}>
        <h1 className={s.AccountPage_Header}>Hello, {accEmail}</h1>
    </div>
};

export default AccountPage;