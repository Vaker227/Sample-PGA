import { all, put, takeLeading } from "redux-saga/effects"
import { createAsyncAction, getType } from "typesafe-actions"
import { loadingProcess } from "../../../configs/loadingProcess"
import { turnOffLoadingOverlay, turnOnLoadingOverlay } from "../../common/redux/commonReducer"
import { fetchCountriesSaga, fetchRolesSaga } from "../../common/redux/commonSagas"
import { getErrorToastAction } from "../../toast/utils"

export const getUserListValues = createAsyncAction(
    "users/getUserListValues_request",
    "users/getUserListValues_success",
    "users/getUserListValues_failure"
)<undefined, string, string>()

export function* getUserListValuesSaga() {
    yield put(turnOnLoadingOverlay(loadingProcess.FetchCommonValues))
    try {
        yield all([
            fetchRolesSaga(),
            fetchCountriesSaga(),
        ])
    } catch (error) {
        if (typeof error == 'string') {
            yield put(getErrorToastAction(error))
        }
    }
    yield put(turnOffLoadingOverlay(loadingProcess.FetchCommonValues))
}

export const getUserDetailValues = createAsyncAction(
    "users/getUserDetailValues_request",
    "users/getUserDetailValues_success",
    "users/getUserDetailValues_failure"
)<undefined, string, string>()

export function* getUserDetailValuesSaga() {
    yield put(turnOnLoadingOverlay(loadingProcess.FetchCommonValues))
    try {
        yield all([
            fetchRolesSaga(),
            fetchCountriesSaga(),
        ])
    } catch (error) {
        if (typeof error == 'string') {
            yield put(getErrorToastAction(error))
        }
    }
    yield put(turnOffLoadingOverlay(loadingProcess.FetchCommonValues))
}




export default function* watchUsersValues() {
    yield takeLeading(getType(getUserListValues.request), getUserListValuesSaga)
    yield takeLeading(getType(getUserDetailValues.request), getUserDetailValuesSaga)
}