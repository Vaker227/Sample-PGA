import { ActionType, createCustomAction, getType } from 'typesafe-actions';
import { IBrand } from '../../../models/brand';

export interface BrandState {
    list: IBrand[]
}

export const fetchBrandList = createCustomAction('brand/fetchBrandList', () => ({}))

export const setBrandList = createCustomAction('brand/setBrandList', (data: IBrand[]) => ({
    data,
}));


const actions = { setBrandList, fetchBrandList };

type Action = ActionType<typeof actions>;

const brandDefaultState = { list: [] }

export default function brandReducer(state: BrandState = brandDefaultState, action: Action) {
    switch (action.type) {
        case getType(setBrandList):
            return { ...state, list: action.data };
        default:
            return state;
    }
}
