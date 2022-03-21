import { call, put, select } from "redux-saga/effects";
import { API_PATHS } from "../../../configs/api";
import { AppState } from '../../../redux/reducer';
import { getErrorMessageResponse } from "../../../utils";
import { getErrorToastAction } from "../../toast/utils";
import { CustomFetch } from "../utils";
import { setConditions, setCountries, setRoles } from "./commonReducer";



export function* fetchCountriesSaga(): any {
    const countries = yield select((state: AppState) => state.common.countries)
    if (countries.length) {
        return;
    }
    try {
        const response = yield call(CustomFetch, API_PATHS.getCountries)
        if (response.errors) {
            throw getErrorMessageResponse(response)
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
        }
        yield put(setConditions(response.data || []))

    } catch (error: any) {
        yield put(getErrorToastAction())
    }
}

