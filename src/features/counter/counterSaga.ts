import { call, delay, put, takeLeading } from "redux-saga/effects";
import { PayloadAction } from "@reduxjs/toolkit";
import { sagaIncrementAsyncFulfilled, sagaIncrementAsyncPending, sagaIncrementAsyncV2Fulfilled, sagaIncrementAsyncV2Pending } from "./counterSlice";
import { fetchCount } from "./counterAPI";
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

function* sagaIncrementAsyncV2(action: PayloadAction<number>): any {
    /**
     * Solution 1: yield without call.
     */
    // const { data } = yield fetchCount(action.payload);
    // yield put(sagaIncrementAsyncV2Fulfilled(data));

    /**
     * Solution 2: yield with call.
     */
    const { data } = yield call(fetchCount, action.payload);
    yield put({
        type: sagaIncrementAsyncV2Fulfilled.toString(),
        payload: data
    });
}

export default function* counterSaga() {
    yield takeLeading(sagaIncrementAsyncPending.toString(), sagaIncrementAsync);
    yield takeLeading(sagaIncrementAsyncV2Pending.toString(), sagaIncrementAsyncV2);
}
