import { call, put, select } from "redux-saga/effects";
import { API_PATHS } from "../../../configs/api";
import { AppState } from "../../../redux/reducer";
import { getErrorMessageResponse } from "../../../utils";
import { CustomFetch } from "../../common/utils";
import { getErrorToastAction } from "../../toast/utils";
import { setCategoryList } from "./categoryReducer";

export function* fetchCategoryListSaga(): any {
    const categories = yield select((state: AppState) => state.category.list)
    if (categories.length) {
        return
    }
    try {
        const response = yield call(CustomFetch, API_PATHS.getCategoryList)
        if (response.errors) {
            throw getErrorMessageResponse(response)
        }
        yield put(setCategoryList(response.data))

    } catch (error: any) {
        yield put(getErrorToastAction())
    }
}

