import React from "react";
import s from "./MobileNav.module.css"
import {Link} from "react-router-dom";
import styleScanLogo from "../../../assets/Black.png";

export const MobileNav = (props: MobileNavPropsType) => {
    return (
        <div className={s.MobileNav}>
            <div className={s.MobileNav_Logo}>
                <Link to={'/'}>
                    <img src={styleScanLogo} alt="StyleScan Logo" className={s.Header_StyleScanIco}/>
                </Link>
            </div>
            <div className={s.MobileNav_Links}>
                <Link to={'/mystudio'}>My Studio</Link>
                <Link to={'/account'}>My Account</Link>
            </div>
        </div>
    );
};

type MobileNavPropsType = {}