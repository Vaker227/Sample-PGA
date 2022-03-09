import { all } from 'redux-saga/effects'
import watchCommon from '../modules/common/redux/commonSagas'


export default function* rootSaga() {
    yield all([
        watchCommon()
    ])
}