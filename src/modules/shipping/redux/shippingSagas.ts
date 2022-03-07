import { call, put, select } from "redux-saga/effects";
import { API_PATHS } from "../../../configs/api";
import { CustomFetch } from "../../common/utils";
import { getErrorMessageResponse } from '../../../utils/index'
import { getErrorToastAction, getSuccessToastAction } from "../../toast/utils";
import { setShippingList } from "./shippingReducer";
import { AppState } from "../../../redux/reducer";



export function* fetchShippingListSaga(): any {
    const shippings = yield select((state: AppState) => state.shipping.list)
    if (shippings.length) {
        return
    }
    try {
        const response = yield call(CustomFetch, API_PATHS.getShippingList)
        if (response.errors) {
            yield put(getErrorToastAction(getErrorMessageResponse(response) as string))
            return;
        }
        yield put(setShippingList(response.data))
        yield put(getSuccessToastAction("Shipping fetch success"))

    } catch (error: any) {
        yield put(getErrorToastAction())
    }
}

