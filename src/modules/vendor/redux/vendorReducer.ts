import { ActionType, createCustomAction, getType } from 'typesafe-actions';
import { IVendor } from '../../../models/vendor';

export interface VendorState {
    list: IVendor[]
}


export const fetchVendorList = createCustomAction('vendor/fetchVendorList', () => ({}))

export const setVendorList = createCustomAction('vendor/setVendorList', (data: IVendor[]) => ({
    data,
}));


const actions = { setVendorList, fetchVendorList };

type Action = ActionType<typeof actions>;

const vendorDefault = { list: [] }

export default function vendorReducer(state: VendorState = vendorDefault, action: Action) {
    switch (action.type) {
        case getType(setVendorList):
            return { ...state, list: action.data };
        default:
            return state;
    }
}
