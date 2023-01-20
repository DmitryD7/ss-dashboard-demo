import {appCommonActions} from "../applicationCommonActions"
import {RequestStatusType} from "../types"
import {appReducer} from "./index";

export type InitialStateType = {
    status: RequestStatusType
    error: string | null
}

let startState: InitialStateType;
const {setAppStatus, setAppError} = appCommonActions;

beforeEach(() => {
    startState = {
        error: null,
        status: "idle",
    }
});

test('correct error message should be set', () => {
    const endState = appReducer(startState, setAppError({error: 'some error'}));

    expect(endState.error).toBe('some error');
    expect(endState.error).toHaveLength(10);
});

test('error must be null', () => {
    const currState = appReducer(startState, setAppError({error: 'error'}));
    const endState = appReducer(currState, setAppError({error: null}));

    expect(currState.error).toBe('error');
    expect(endState.error).toBeNull();
});

test('correct status should be set', () => {
    const endState = appReducer(startState, setAppStatus({status: 'loading'}));

    expect(endState.status).toBe('loading');
});