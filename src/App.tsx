import React, {useEffect} from 'react';
import {Route, Routes} from 'react-router-dom';
import s from './App.module.css';
import AccountPage from "./pages/AccountPage/AccountPage";
import ChangePasswordPage from './pages/ChangePasswordPage/ChangePasswordPage';
import {Sidebar} from "./components/Sidebar/Sidebar";
import StartPage from "./pages/StartPage/StartPage";
import SeatsPage from "./pages/SeatsPage/SeatsPage";
import LoginPage from "./pages/LoginPage/LoginPage";
import MyStudioPage from "./pages/MyStudioPage/MyStudioPage";
import {useAppDispatch} from "./utils/utils";
import {accountActions} from "./app/accountReducer";

function App() {
    const dispatch = useAppDispatch();
    const {fetchDashboardData} = accountActions;

    useEffect(() => {
        dispatch(fetchDashboardData())
    }, []);

    return (
        <>
            {/*<div className={s.Container}>*/}
            <div className={s.App}>
                {/*<Header/>*/}
                <Sidebar/>
                <div className={s.Content}>
                    <Routes>
                        <Route path={'/'} element={<StartPage/>}/>
                        <Route path={'/login'} element={<LoginPage/>}/>
                        <Route path={'/account'} element={<AccountPage/>}/>
                        <Route path={'/mystudio'} element={<MyStudioPage/>}/>
                        <Route path={'/seats'} element={<SeatsPage/>}/>
                        <Route path={'change_password'} element={<ChangePasswordPage/>}/>
                    </Routes>
                </div>
            </div>
            {/*</div>*/}
        </>
    );
}

export default App;
