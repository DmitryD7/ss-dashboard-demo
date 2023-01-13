import React, {useState} from 'react';
import styleScanLogo from '../../assets/Black.png'
import s from './Header.module.css';
import {Link} from "react-router-dom";

function Header() {
    const [isLoggedIn, setIsLoggedIn] = useState(true);

    const onLogoutHandler = () => {
        console.log('Logout');
    };

    return (
        <div className={s.Header}>
            <div>
                <Link to={'/'}>
                    <img src={styleScanLogo} alt="StyleScan Logo" className={s.Header_StyleScanIco}/>
                </Link>
            </div>
            <div className={s.Header_Account}>
                {isLoggedIn
                    && <button className={s.Header_Account_Btn} onClick={onLogoutHandler}>Logout</button>
                }
            </div>
        </div>
    );
}

export default Header;