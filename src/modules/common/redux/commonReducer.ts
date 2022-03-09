import { ActionType, createCustomAction, getType } from 'typesafe-actions';
import { loadingProcess } from '../../../configs/loadingProcess';
import { ICountry, IRole, IRoleWrapper } from '../../../models/common';

export interface CommonState {
    roles: IRoleWrapper,
    countries: ICountry[]
    loading: loadingProcess[]
}

export const fetchRoles = createCustomAction('common/fetchRoles', () => ({}))
export const setRoles = createCustomAction('common/setRoles', (data: { [index: string]: IRole[] }) => ({
    data,
}));

export const fetchCountries = createCustomAction('common/fetchCountries', () => ({}))
export const setCountries = createCustomAction('common/setCountries', (data: ICountry[]) => ({
    data,
}));

export const turnOnLoadingOverlay = createCustomAction('common/turnOnLoadingOverlay', (processId) => ({ processId }))
export const turnOffLoadingOverlay = createCustomAction('common/turnOffLoadingOverlay', (processId) => ({ processId }))

const actions = { fetchCountries, setCountries, fetchRoles, setRoles, turnOnLoadingOverlay, turnOffLoadingOverlay };

type Action = ActionType<typeof actions>;

const commonDefaultState = { roles: {}, countries: [], loading: [] }

export default function commonReducer(state: CommonState = commonDefaultState, action: Action) {
    switch (action.type) {
        case getType(setRoles):
            return { ...state, roles: action.data };
        case getType(setCountries):
            return { ...state, countries: action.data };
        case getType(turnOnLoadingOverlay): {
            const newArr = state.loading.slice()
            const indexOfProcessId = newArr.indexOf(action.processId)
            if (indexOfProcessId < 0) newArr.push(action.processId)
            return { ...state, loading: newArr }
        }
        case getType(turnOffLoadingOverlay): {
            const newArr = state.loading.slice()
            const indexOfProcessId = newArr.indexOf(action.processId)
            if (indexOfProcessId > -1) newArr.splice(indexOfProcessId, 1)
            return { ...state, loading: newArr }
        }
        default:
            return state;
    }
}
