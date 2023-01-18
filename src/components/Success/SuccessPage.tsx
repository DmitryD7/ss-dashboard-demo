import React from 'react';
import successIco from '../../assets/successIco.svg'
import s from './SuccessPage.module.css';
import Button from "../../components/Button/Button";

function SuccessPage(props: SuccessPagePropsType) {
    return (
        <div className={s.SuccessPage}>
            <img src={successIco} alt="success" className={s.SuccessIco}/>
            <h2 className={s.SuccessHeader}>Success!</h2>
            <p className={s.SuccessInfo}>{props.message}</p>
        </div>
    );
}

export default SuccessPage;

type SuccessPagePropsType = {
    message: string,
}