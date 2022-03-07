import { all, takeEvery } from "redux-saga/effects";
import { createAsyncAction, getType } from "typesafe-actions";
import { fetchBrandListSaga } from "../../brand/redux/brandSagas";
import { fetchCountriesSaga, fetchRolesSaga } from "../../common/redux/commonSagas";
import { fetchShippingListSaga } from "../../shipping/redux/shippingSagas";
import { fetchVendorListSaga } from "../../vendor/redux/vendorSagas";


export const getFilterUsers = createAsyncAction(
    "users/getFilterUsers_request",
    "users/getFilterUsers_success",
    "users/getFilterUsers_failure"
)<undefined, string, string>()

export function* getFilterUsersSaga() {
    yield all([
        fetchVendorListSaga(),
        fetchBrandListSaga(),
        fetchRolesSaga(),
        fetchCountriesSaga(),
        fetchShippingListSaga()
    ])
}


export default function* watchUsers() {
    yield takeEvery(getType(getFilterUsers.request), getFilterUsersSaga)
}

