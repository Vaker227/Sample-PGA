import { all, call, put, select, takeLeading } from "redux-saga/effects";
import { createAsyncAction, getType } from "typesafe-actions";
import { API_PATHS } from "../../../configs/api";
import { loadingProcess } from "../../../configs/loadingProcess";
import { AppState } from '../../../redux/reducer';
import { getErrorMessageResponse } from "../../../utils";
import { fetchBrandListSaga } from "../../brand/redux/brandSagas";
import { fetchCategoryListSaga } from "../../category/redux/categorySagas";
import { fetchShippingListSaga } from "../../shipping/redux/shippingSagas";
import { getErrorToastAction, getSuccessToastAction } from "../../toast/utils";
import { fetchVendorListSaga } from "../../vendor/redux/vendorSagas";
import { CustomFetch } from "../utils";
import { setConditions, setCountries, setRoles, turnOffLoadingOverlay, turnOnLoadingOverlay } from "./commonReducer";



export function* fetchCountriesSaga(): any {
    const countries = yield select((state: AppState) => state.common.countries)
    if (countries.length) {
        return;
    }
    try {
        const response = yield call(CustomFetch, API_PATHS.getCountries)
        if (response.errors) {
            throw getErrorMessageResponse(response)
            return;
        }
        yield put(setCountries(response.data))

    } catch (error: any) {
        yield put(getErrorToastAction())
    }
}

export function* fetchRolesSaga(): any {
    const roles = yield select((state: AppState) => state.common.roles)
    if (Object.keys(roles).length) {
        return
    }
    try {
        const response = yield call(CustomFetch, API_PATHS.getRoles)
        if (response.errors) {
            throw getErrorMessageResponse(response)
            return;
        }
        yield put(setRoles(response.data || []))

    } catch (error: any) {
        yield put(getErrorToastAction())
    }
}

export function* fetchConditionsSaga(): any {
    const roles = yield select((state: AppState) => state.common.roles)
    if (Object.keys(roles).length) {
        return
    }
    try {
        const response = yield call(CustomFetch, API_PATHS.getConditions)
        if (response.errors) {
            throw getErrorMessageResponse(response)
            return;
        }
        yield put(setConditions(response.data || []))

    } catch (error: any) {
        yield put(getErrorToastAction())
    }
}




export const getCommonValues = createAsyncAction(
    "common/getCommonValues_request",
    "common/getCommonValues_success",
    "common/getCommonValues_failure"
)<undefined, string, string>()

export function* getCommonValuesSaga() {
    yield put(turnOnLoadingOverlay(loadingProcess.FetchCommonValues))
    try {
        yield all([
            fetchCategoryListSaga(),
            fetchVendorListSaga(),
            fetchBrandListSaga(),
            fetchRolesSaga(),
            fetchCountriesSaga(),
            fetchShippingListSaga(),
            fetchConditionsSaga()
        ])
        yield put(getSuccessToastAction("Loaded common data"))
    } catch (error) {
        if (typeof error == 'string') {
            yield put(getErrorToastAction(error))
        }
    }
    yield put(turnOffLoadingOverlay(loadingProcess.FetchCommonValues))
}


export default function* watchCommon() {
    yield takeLeading(getType(getCommonValues.request), getCommonValuesSaga)
}

