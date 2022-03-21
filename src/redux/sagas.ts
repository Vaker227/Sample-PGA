import { all } from 'redux-saga/effects'
import watchProductsValues from '../modules/products/redux/productSagas'
import watchUsersValues from '../modules/users/redux/usersSagas'


export default function* rootSaga() {
    yield all([
        watchUsersValues(),
        watchProductsValues()

    ])
}