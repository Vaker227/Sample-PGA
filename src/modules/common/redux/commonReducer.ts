import { ActionType, createCustomAction, getType } from 'typesafe-actions';
import { ICountry, IRole } from '../../../models/common';

export interface CommonState {
    roles: { [index: string]: IRole[] },
    countries: ICountry[]
}

export const fetchRoles = createCustomAction('common/fetchRoles', () => ({}))
export const setRoles = createCustomAction('common/setRoles', (data: { [index: string]: IRole[] }) => ({
    data,
}));

export const fetchCountries = createCustomAction('shipping/fetchCountries', () => ({}))
export const setCountries = createCustomAction('common/setCountries', (data: ICountry[]) => ({
    data,
}));


const actions = { fetchCountries, setCountries, fetchRoles, setRoles };

type Action = ActionType<typeof actions>;

const commonDefaultState = { roles: {}, countries: [] }

export default function commonReducer(state: CommonState = commonDefaultState, action: Action) {
    switch (action.type) {
        case getType(setRoles):
            return { ...state, roles: action.data };
        case getType(setCountries):
            return { ...state, countries: action.data };
        default:
            return state;
    }
}
