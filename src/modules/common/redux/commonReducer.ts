import { ActionType, createCustomAction, getType } from 'typesafe-actions';
import { loadingProcess } from '../../../configs/loadingProcess';
import { ICondition, ICountry, IRole, IRoleWrapper, IScrollInfo, IScrollPositions } from '../../../models/common';

export interface CommonState {
    roles: IRoleWrapper,
    countries: ICountry[]
    conditions: ICondition[],
    loading: loadingProcess[]
    scrollPositions: IScrollPositions
}

export const fetchRoles = createCustomAction('common/fetchRoles', () => ({}))
export const setRoles = createCustomAction('common/setRoles', (data: { [index: string]: IRole[] }) => ({
    data,
}));

export const fetchCountries = createCustomAction('common/fetchCountries', () => ({}))
export const setCountries = createCustomAction('common/setCountries', (data: ICountry[]) => ({
    data,
}));

export const fetchConditions = createCustomAction('common/fetchConditions', () => ({}))
export const setConditions = createCustomAction('common/setConditions', (data: ICondition[]) => ({
    data,
}));


export const turnOnLoadingOverlay = createCustomAction('common/turnOnLoadingOverlay', (processId) => ({ processId }))
export const turnOffLoadingOverlay = createCustomAction('common/turnOffLoadingOverlay', (processId) => ({ processId }))


export const storeScrollPosition = createCustomAction('common/storeScrollPosition', (scrollInfo: IScrollInfo) => ({ scrollInfo }))
export const clearScrollPosition = createCustomAction('common/clearScrollPosition', () => ({}))

const actions = {
    fetchCountries,
    setCountries,
    fetchRoles,
    setRoles,
    fetchConditions,
    setConditions,
    turnOnLoadingOverlay,
    turnOffLoadingOverlay,
    storeScrollPosition,
    clearScrollPosition
};

type Action = ActionType<typeof actions>;

const commonDefaultState: CommonState = { roles: {}, countries: [], conditions: [], loading: [], scrollPositions: {} }

export default function commonReducer(state: CommonState = commonDefaultState, action: Action) {
    switch (action.type) {
        case getType(setRoles):
            return { ...state, roles: action.data };
        case getType(setCountries):
            return { ...state, countries: action.data };
        case getType(setConditions):
            return { ...state, conditions: action.data };
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
        case getType(storeScrollPosition): {
            return {
                ...state,
                scrollPositions: {
                    ...state.scrollPositions,
                    [action.scrollInfo.page]: action.scrollInfo.scroll
                }
            }
        }
        case getType(clearScrollPosition): {
            return { ...state, scrollPositions: {} }
        }
        default:
            return state;
    }
}
