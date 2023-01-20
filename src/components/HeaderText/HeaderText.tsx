import React from "react";
import s from "./HeaderText.module.css"

export const HeaderText = (props: HeaderTextPropsType) => <h1 className={s.HeaderText}>{props.text}</h1>

type HeaderTextPropsType = {
    text: string
}