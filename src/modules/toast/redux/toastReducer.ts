import React from 'react';
import { ActionType, createCustomAction, getType } from 'typesafe-actions';

export interface ICustomToastProps {
    onRemove(): void;
    message: string;
    startDelay(): void;
    stopDelay(): void;
}

export interface IToastInfo {
    template?: React.FC<ICustomToastProps>;
    message: string;
    duration: number | 'none';
    id?: number;
}


export interface ToastState {
    list: IToastInfo[]
}

export const pushToast = createCustomAction('vendor/pushToast', (newToast: IToastInfo) => ({
    newToast,
}));
export const removeToast = createCustomAction('vendor/removeToast', (removingToast: IToastInfo) => ({
    removingToast,
}));


const actions = { pushToast, removeToast };

type Action = ActionType<typeof actions>;

const toastDefaultState = { list: [] }

export default function toastReducer(state: ToastState = toastDefaultState, action: Action) {
    switch (action.type) {
        case getType(pushToast):
            action.newToast.id = Date.now()
            return { ...state, list: [...state.list, action.newToast] };
        case getType(removeToast):
            return { ...state, list: state.list.filter((toast) => toast != action.removingToast) };
        default:
            return state;
    }
}
