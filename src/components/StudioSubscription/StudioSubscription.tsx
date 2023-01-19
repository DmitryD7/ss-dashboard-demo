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
        "cancelled": true, // true if the subscription does not renew
        "end": 1675982627, // UTC date of renew/cancel (eg. new Date(end*1000).toLocaleDateString())
        "trial": false, //
    }
}

export const StudioSubscription = () => {
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
        if (data.studio?.end) {
            let date = new Date(data.studio.end * 1000);
            return date.toLocaleDateString();
        }
        return null;
    };

    const studioPlan = () => {
        if (!data.studio) {
            return (
                <div>
                    <p>You do not have StyleScan Studio</p>
                    <button onClick={subscribeHandler}>
                        Subscribe to StyleScan Studio.
                        <br/>
                        <b>$99/month</b>
                        <br/>
                        {data.has_studio_trial && <span style={{color: 'green'}}>30 day free trial</span>}
                    </button>
                </div>
            );
        } else {
            return (
                <div>
                    {!data.studio.sub
                        ? <p>You have {data.studio.n} indefinite Studio license</p>
                        : <p>You have {data.studio.n} Studio license which
                            {data.studio.cancelled ? ' ends' : ' renews'} on {endDate()}.</p>}

                    <Button>Launch StyleScan Studio</Button>
                    {!data.studio.cancelled
                        ? <>
                            <Button onClick={billingHandler}>Update Billing</Button>
                            <Button onClick={unsubscribeHandler}>Cancel Subscription</Button>
                        </>
                        : data.studio.sub
                        && <Button
                            onClick={subscribeHandler}>{data.studio.trial ? 'Resume trial' : 'Resume Subscription'}</Button>
                    }

                </div>
            );
        }
    }

    return (
        <div className={s.StudioSubscription}>
            {studioPlan()}
        </div>
    );
}