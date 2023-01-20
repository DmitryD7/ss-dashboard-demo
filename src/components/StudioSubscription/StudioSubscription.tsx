import s from "./StudioSubscription.module.css";
import Button from "../Button/Button";
import {useCallback, useState} from "react";
import {goToURL, useAppDispatch} from "../../utils/utils";
import {subscriptionActions} from "../../app/subscriptionReducer";

export const StudioSubscription = (props: StudioSubscriptionPropsType) => {
    const dispatch = useAppDispatch();
    const {subscribe, unsubscribe, billing} = subscriptionActions;
    const [errorMessage, setErrorMessage] = useState('');

    const subscribeHandler = useCallback(async () => {
        const res = await dispatch(subscribe());
        if (res.payload?.error) {
            let currentErrorMessage = '';
            if (res.payload.code === 'BAD_ROLE') {
                currentErrorMessage = 'role does not allow purchases';
                console.log('role does not allow purchases');
            } else if (res.payload.code === 'TEMP_STUDIO') {
                currentErrorMessage = 'has temporary studio license';
                console.log('has temporary studio license');
            } else if (res.payload.code === 'HAS_STUDIO') {
                currentErrorMessage = 'already has studio';
                console.log('already has studio');
            } else if (res.payload.code === 'STRIPE') {
                currentErrorMessage = 'stripe error';
                console.log('stripe error');
            }
            setErrorMessage(currentErrorMessage);
            return errorMessage;
        }
        // @ts-ignore
        else if (res.payload?.url) {
            // @ts-ignore
            goToURL(res.payload?.url);
        }
    }, [dispatch, subscribe, errorMessage]);

    const unsubscribeHandler = useCallback(async () => {
        const res = await dispatch(unsubscribe());
        if (res.payload?.error) {
            let currentErrorMessage = '';
            if (res.payload.code === 'NO_STUDIO') {
                currentErrorMessage = 'no studio license';
                console.log('no studio license');
            } else if (res.payload.code === 'ALREADY_CANCEL') {
                currentErrorMessage = 'license already cancelled';
                console.log('license already cancelled');
            } else if (res.payload.code === 'STRIPE') {
                currentErrorMessage = 'stripe error';
                console.log('stripe error');
            }
            setErrorMessage(currentErrorMessage);
            return errorMessage;
        }
    }, [dispatch, unsubscribe, errorMessage]);

    const billingHandler = useCallback(async () => {
        await dispatch(billing());
    }, [dispatch, billing]);

    const endDate = () => {
        if (props.studio?.end) {
            let date = new Date(props.studio.end * 1000);
            return date.toLocaleDateString();
        }
        return null;
    };

    const studioPlan = () => {
        if (!props.studio) {
            return (
                <section className={s.StudioSubscription_Section}>
                    <p>You do not have StyleScan Studio.</p>
                    <Button onClick={subscribeHandler} style={{position: 'relative', marginTop: '79px'}}>
                        Subscribe to StyleScan Studio.
                        <br/>
                        <b>$99/month</b>
                        {props.has_studio_trial && <span
                            style={{color: 'green', fontSize: '16px', position: 'absolute', top: '-19px', right: '0'}}>30 day free trial</span>}
                    </Button>
                </section>
            );
        } else {
            return (
                <section className={s.StudioSubscription_Section}>
                    {!props.studio?.sub
                        ? <p>You have {props.studio.n} indefinite Studio license.</p>
                        : <p>You have {props.studio.n} Studio license which
                            {props.studio.cancelled ? ' ends' : ' renews'} on {endDate()}.</p>}

                    <div className={s.StudioSubscription_Section__Buttons}>
                        <Button>Launch StyleScan Studio</Button>
                        {!props.studio.cancelled
                            ? <>
                                <Button onClick={billingHandler}>Update Billing</Button>
                                <button onClick={unsubscribeHandler}
                                        className={s.StudioSubscription_Section_CancelBtn}>Cancel Subscription
                                </button>
                            </>
                            : props.studio.sub
                            && <Button
                                onClick={subscribeHandler}>{props.studio.trial ? 'Resume trial' : 'Resume Subscription'}</Button>
                        }
                    </div>
                </section>
            );
        }
    }

    return (
        <div className={s.StudioSubscription}>
            <>
                {errorMessage && alert(errorMessage)}
                {studioPlan()}
            </>
        </div>
    );
}

type StudioSubscriptionPropsType = {
    "has_studio_trial"?: boolean,
    "studio"?: {
        "sub": boolean
        "n": number
        "cancelled": boolean
        "end": number
        "trial": boolean
    }
}