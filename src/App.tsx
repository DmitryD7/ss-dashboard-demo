import React from 'react';
import {Routes, Route} from 'react-router-dom';
import s from './App.module.css';
import Header from "./components/Header/Header";
import AccountPage from "./pages/AccountPage/AccountPage";
import ChangePasswordPage from './pages/ChangePasswordPage/ChangePasswordPage';
import {Sidebar} from "./components/Sidebar/Sidebar";
import StartPage from "./pages/StartPage/StartPage";
import SeatsPage from "./pages/SeatsPage/SeatsPage";

function App() {
    return (
        <>
            {/*<div className={s.Container}>*/}
            <div className={s.App}>
                {/*<Header/>*/}
                <Sidebar/>
                <div className={s.Content}>
                    <Routes>
                        <Route path={'/'} element={<StartPage/>}/>
                        <Route path={'/settings'} element={<AccountPage/>}/>
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
