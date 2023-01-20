import {useSelector} from "react-redux";
import {accountSelectors} from "../../app/accountReducer";
import s from './MyStudioPage.module.css';
import {StudioSubscription} from "../../components/StudioSubscription/StudioSubscription";
import {HeaderText} from "../../components/HeaderText/HeaderText";

const MyStudioPage = () => {
    const {selectIsLoggedIn} = accountSelectors;

    const isLoggedIn = useSelector(selectIsLoggedIn);


    return (isLoggedIn
            ? <div className={s.MyStudioPage}>
                <HeaderText text={'Studio Plan'}/>
                <StudioSubscription/>
                <h2 style={{marginTop: '41px'}}>Seats</h2>
                <hr/>
            </div>
            : <h2>You must be logged in</h2>
    );
};

export default MyStudioPage;