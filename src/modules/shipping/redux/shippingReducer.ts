import { ActionType, createCustomAction, getType } from 'typesafe-actions';
import { IShipping } from '../../../models/shipping';

export interface ShippingState {
    list: IShipping[]
}

export const fetchShippingList = createCustomAction('shipping/fetchShippingList', () => ({}))

export const setShippingList = createCustomAction('shipping/setShippingList', (data: IShipping[]) => ({
    data,
}));


const actions = { setShippingList, fetchShippingList };

type Action = ActionType<typeof actions>;

const shippingDefaultState = { list: [] }

export default function shippingReducer(state: ShippingState = shippingDefaultState, action: Action) {
    switch (action.type) {
        case getType(setShippingList):
            return { ...state, list: action.data };
        default:
            return state;
    }
}
