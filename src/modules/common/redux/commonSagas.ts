import { call, put, select } from "redux-saga/effects";
import { API_PATHS } from "../../../configs/api";
import { getErrorMessageResponse } from "../../../utils";
import { getErrorToastAction, getSuccessToastAction } from "../../toast/utils";
import { AppState } from '../../../redux/reducer'
import { CustomFetch } from "../utils";
import { setCountries, setRoles } from "./commonReducer";



export function* fetchCountriesSaga(): any {
    const countries = yield select((state: AppState) => state.common.countries)
    if (countries.length) {
        return;
    }
    try {
        const response = yield call(CustomFetch, API_PATHS.getCountries)
        if (response.errors) {
            console.log(response.errors)
            yield put(getErrorToastAction(getErrorMessageResponse(response) as string))
            return;
        }
        yield put(setCountries(response.data))
        yield put(getSuccessToastAction("Countries fetch success"))

    } catch (error: any) {
        yield put(getErrorToastAction())
    }
}

export function* fetchRolesSaga(): any {
    const roles = yield select((state: AppState) => state.common.roles)
    if (roles.length) {
        return
    }
    try {
        const response = yield call(CustomFetch, API_PATHS.getRoles)
        if (response.errors) {
            yield put(getErrorToastAction(getErrorMessageResponse(response) as string))
            return;
        }
        yield put(setRoles(response.data))
        yield put(getSuccessToastAction("Roles fetch success"))

    } catch (error: any) {
        yield put(getErrorToastAction())
    }
}

