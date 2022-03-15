import { ActionType, createCustomAction, getType } from 'typesafe-actions';
import { ICategory } from '../../../models/category';

export interface CategoryState {
    list: ICategory[]
}

export const fetchCategoryList = createCustomAction('category/fetchCategoryList', () => ({}))

export const setCategoryList = createCustomAction('category/setCategoryList', (data: ICategory[]) => ({
    data,
}));


const actions = { setCategoryList, fetchCategoryList };

type Action = ActionType<typeof actions>;

const categoryDefaultState = { list: [] }

export default function categoryReducer(state: CategoryState = categoryDefaultState, action: Action) {
    switch (action.type) {
        case getType(setCategoryList):
            return { ...state, list: action.data };
        default:
            return state;
    }
}
