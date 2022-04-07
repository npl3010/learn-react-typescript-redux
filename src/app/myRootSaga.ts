import { all } from 'redux-saga/effects';
import counterSaga from 'features/counter/counterSaga';

function* helloSaga() {
    yield console.log('Hello Sagas!');
}

// Single entry point to start all Sagas at once:
function* myRootSaga() {
    yield all([
        helloSaga(),
        counterSaga()
    ]);
}

export default myRootSaga;