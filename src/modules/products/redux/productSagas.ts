import { all, put, takeLeading } from "redux-saga/effects"
import { createAsyncAction, getType } from "typesafe-actions"
import { loadingProcess } from "../../../configs/loadingProcess"
import { fetchBrandListSaga } from "../../brand/redux/brandSagas"
import { fetchCategoryListSaga } from "../../category/redux/categorySagas"
import { turnOffLoadingOverlay, turnOnLoadingOverlay } from "../../common/redux/commonReducer"
import { fetchConditionsSaga, fetchCountriesSaga, fetchRolesSaga } from "../../common/redux/commonSagas"
import { fetchShippingListSaga } from "../../shipping/redux/shippingSagas"
import { getErrorToastAction } from "../../toast/utils"
import { fetchVendorListSaga } from "../../vendor/redux/vendorSagas"

export const getProductListValues = createAsyncAction(
    "users/getProductListValues_request",
    "users/getProductListValues_success",
    "users/getProductListValues_failure"
)<undefined, string, string>()

export function* getProductListValuesSaga() {
    yield put(turnOnLoadingOverlay(loadingProcess.FetchCommonValues))
    try {
        yield all([
            fetchCategoryListSaga(),
            fetchRolesSaga(),
            fetchCountriesSaga()
        ])
    } catch (error) {
        if (typeof error == 'string') {
            yield put(getErrorToastAction(error))
        }
    }
    yield put(turnOffLoadingOverlay(loadingProcess.FetchCommonValues))
}

export const getProductDetailValues = createAsyncAction(
    "users/getProductDetailValues_request",
    "users/getProductDetailValues_success",
    "users/getProductDetailValues_failure"
)<undefined, string, string>()

export function* getProductDetailValuesSaga() {
    yield put(turnOnLoadingOverlay(loadingProcess.FetchCommonValues))
    try {
        yield all([
            fetchVendorListSaga(),
            fetchConditionsSaga(),
            fetchBrandListSaga(),
            fetchCategoryListSaga(),
            fetchShippingListSaga(),
        ])
    } catch (error) {
        if (typeof error == 'string') {
            yield put(getErrorToastAction(error))
        }
    }
    yield put(turnOffLoadingOverlay(loadingProcess.FetchCommonValues))
}




export default function* watchProductsValues() {
    yield takeLeading(getType(getProductListValues.request), getProductListValuesSaga)
    yield takeLeading(getType(getProductDetailValues.request), getProductDetailValuesSaga)
}