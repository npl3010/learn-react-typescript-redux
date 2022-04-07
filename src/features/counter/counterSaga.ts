import { takeEvery } from "redux-saga/effects";
import { PayloadAction } from "@reduxjs/toolkit";
import { increment } from "./counterSlice";

export function* log(action: PayloadAction) {
    yield console.log('Log: ', action);
}

export default function* counterSaga() {
    // For example 1:
    // Listen for all dispatched actions and run log function each time:
    yield takeEvery('*', log);

    // For example 2:
    // Listen for dispatched 'counter/increment' actions and run log function each time:
    yield takeEvery('counter/increment', log);
    yield takeEvery(increment().type, log);
}