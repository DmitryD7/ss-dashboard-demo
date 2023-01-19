import {useSelector} from "react-redux";
import {accountSelectors} from "../../app/accountReducer";
import s from './MyStudioPage.module.css';
import {StudioSubscription} from "../../components/StudioSubscription/StudioSubscription";

const MyStudioPage = () => {
    const {selectIsLoggedIn} = accountSelectors;

    const isLoggedIn = useSelector(selectIsLoggedIn);


    return (isLoggedIn
            ? <div className={s.MyStudioPage}>
                <h2>Studio Plan</h2>
                <StudioSubscription/>
                <hr/>
                <h2>Seats</h2>
                <hr/>
            </div>
            : <h2>You must be logged in</h2>
    );
};

export default MyStudioPage;