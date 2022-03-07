import { all } from 'redux-saga/effects'
import watchUsers from '../modules/users/redux/usersSagas'


export default function* rootSaga() {
    yield all([
        watchUsers()
    ])
}