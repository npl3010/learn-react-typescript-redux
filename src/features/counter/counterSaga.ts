import { delay, put, takeLeading } from "redux-saga/effects";
import { PayloadAction } from "@reduxjs/toolkit";
import { sagaIncrementAsyncFulfilled, sagaIncrementAsyncPending } from "./counterSlice";
// import { increment } from "./counterSlice";

// function* log(action: PayloadAction) {
//     yield console.log('Log: ', action);
// }

// export default function* counterSagaSample() {
//     /**
//      * For example 1:
//      * Listen for all dispatched actions and run log function each time:
//      */
//     yield takeEvery('*', log);

//     /**
//      * For example 2:
//      * Listen for dispatched 'counter/increment' actions and run log function each time:
//      */
//     yield takeEvery('counter/increment', log);
//     yield takeEvery(increment().type, log);
//     yield takeEvery(increment.toString(), log);
// }

function* sagaIncrementAsync(action: PayloadAction<number>) {
    /**
     * Step 1: Waiting:
     */
    console.log('--> Waiting for 2s to increase the value...');
    yield delay(2000);

    /**
     * Step 2: Return value:
     */
    console.log('--> Value is increased successfully!');
    // yield put(sagaIncrementAsyncFulfilled(action.payload));
    yield put({
        type: sagaIncrementAsyncFulfilled.toString(),
        payload: action.payload
    })
}

export default function* counterSaga() {
    yield takeLeading(sagaIncrementAsyncPending.toString(), sagaIncrementAsync);
}
