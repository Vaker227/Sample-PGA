import { call, put, select } from "redux-saga/effects";
import { API_PATHS } from "../../../configs/api";
import { AppState } from "../../../redux/reducer";
import { getErrorMessageResponse } from '../../../utils/index';
import { CustomFetch } from "../../common/utils";
import { getErrorToastAction } from "../../toast/utils";
import { setShippingList } from "./shippingReducer";



export function* fetchShippingListSaga(): any {
    const shippings = yield select((state: AppState) => state.shipping.list)
    if (shippings.length) {
        return
    }
    try {
        const response = yield call(CustomFetch, API_PATHS.getShippingList)
        if (response.errors) {
            throw getErrorMessageResponse(response)
            return;
        }
        yield put(setShippingList(response.data))

    } catch (error: any) {
        yield put(getErrorToastAction())
    }
}

