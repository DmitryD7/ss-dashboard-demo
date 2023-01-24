import React from "react";
import s from "./StartPage.module.css";

function StartPage() {

    return (
        <section className={s.StartPage}>
            <h1 className={s.StartPage_Header}>Welcome to StyleScan!</h1>
            <video playsInline autoPlay muted loop className={`${s.StartPage_Fullwidth} ${s.VideoDesktop}`}
                   poster="https://pubstylescan.blob.core.windows.net/000001/www-20220627/landing-desktop.jpg">
                <source src="https://pubstylescan.blob.core.windows.net/000001/www-20220627/landing-desktop.mp4"
                        type="video/mp4"/>
            </video>
            <video playsInline autoPlay muted loop className={`${s.StartPage_Fullwidth} ${s.VideoMobile}`}
                   poster="https://pubstylescan.blob.core.windows.net/000001/www-20220627/landing-mobile.jpg">
                <source src="https://pubstylescan.blob.core.windows.net/000001/www-20220627/landing-mobile.mp4"
                        type="video/mp4"/>
            </video>
        </section>
    );
}

export default StartPage;