import s from "./StudioSubscription.module.css";
import Button from "../Button/Button";
import {IAccount} from "../../api/dataTypes";
import {useCallback} from "react";
import {goToURL, useAppDispatch} from "../../utils/utils";
import {subscriptionActions} from "../../app/subscriptionReducer";

const data: IAccount = {
    // internal account id
    "id": "f306399632ba24df41915150095c94207e040eb763248c8d346a1d6456cb7090",
    // external account id
    "email": "test@test.com",
    // date account created
    "created": "2023-01-10T22:40:14.547Z",
    // full name (optional)
    "name": "Test",
    // enum: user, dev, admin, warper
    "role": "user",
    // test uses fake stripe
    "test": true,
    // stripe customer (optional)
    "customer": "cus_N98mpJFOTq1ztc",
    // does this user have a trial available? (optional)
    "has_studio_trial": true,
    // studio license information (optional)
    "studio": {
        "sub": "sub_1MOqXoKXL9xcMNDBzd15EI7k", // stripe subscription (if missing, indefinite license)
        "n": 1,
        "cancelled": false, // true if the subscription does not renew
        "end": 1675982627, // UTC date of renew/cancel (eg. new Date(end*1000).toLocaleDateString())
        "trial": false, //
    }
}

export const StudioSubscription = (props: StudioSubscriptionPropsType) => {
    const dispatch = useAppDispatch();
    const {subscribe, unsubscribe, billing} = subscriptionActions;

    const subscribeHandler = useCallback(async () => {
        const res = await dispatch(subscribe());
        console.log(res)
        if (res.payload?.error) {
            let errorMessage = '';
            if (res.payload.code === 'BAD_ROLE') {
                errorMessage = 'role does not allow purchases';
                console.log('role does not allow purchases');
            } else if (res.payload.code === 'TEMP_STUDIO') {
                errorMessage = 'has temporary studio license';
                console.log('has temporary studio license');
            } else if (res.payload.code === 'HAS_STUDIO') {
                errorMessage = 'already has studio';
                console.log('already has studio');
            } else if (res.payload.code === 'STRIPE') {
                errorMessage = 'stripe error';
                console.log('stripe error');
            }
            return errorMessage;
        }
        // @ts-ignore
        else if (res.payload?.url) {
            // @ts-ignore
            goToURL(res.payload?.url);
        }
    }, [dispatch, subscribe]);

    const unsubscribeHandler = useCallback(async () => {
        const res = await dispatch(unsubscribe());
        if (res.payload?.error) {
            let errorMessage = '';
            if (res.payload.code === 'NO_STUDIO') {
                errorMessage = 'no studio license';
                console.log('no studio license');
            } else if (res.payload.code === 'ALREADY_CANCEL') {
                errorMessage = 'license already cancelled';
                console.log('license already cancelled');
            } else if (res.payload.code === 'STRIPE') {
                errorMessage = 'stripe error';
                console.log('stripe error');
            }
            return errorMessage;
        }
    }, [dispatch, unsubscribe]);

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
                                <button onClick={unsubscribeHandler} className={s.StudioSubscription_Section_CancelBtn}>Cancel Subscription</button>
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
            {studioPlan()}
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