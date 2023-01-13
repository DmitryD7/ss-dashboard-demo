import React from 'react';
import {Routes, Route} from 'react-router-dom';
import s from './App.module.css';
import Header from "./components/Header/Header";
import AccountPage from "./pages/AccountPage/AccountPage";

function App() {
    return (
        <div className={s.App}>
            <Header/>
            <Routes>
                <Route path={'/'} element={<AccountPage/>}/>
            </Routes>
        </div>
    );
}

export default App;
