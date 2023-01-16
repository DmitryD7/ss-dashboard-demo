import {useSelector} from "react-redux";
import {accountSelectors} from "../../app/accountReducer";
import s from './SeatsPage.module.css';

const SeatsPage = () => {
    const {selectAccEmail} = accountSelectors;
    const accEmail = useSelector(selectAccEmail);

    return <div className={s.AccountPage}>
        <h1 className={s.AccountPage_Header}>Hello, {accEmail}</h1>

        <h2>Seats</h2>
        <hr/>
    </div>
};

export default SeatsPage;