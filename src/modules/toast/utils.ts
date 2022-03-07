import ErrorToast from "./custom/ErrorToast"
import SuccessToast from "./custom/SuccessToast"
import { IToastInfo, pushToast } from "./redux/toastReducer"

export const getErrorToast = (message: string, duration: number = 5000): IToastInfo => {
    return {
        template: ErrorToast,
        message,
        duration
    }
}

export const getErrorToastAction = (message: string = "Unexpected error happend") => {
    return pushToast(getErrorToast(message))
}

export const getSuccessToast = (message: string, duration: number = 4000): IToastInfo => {
    return {
        template: SuccessToast,
        message,
        duration
    }
}

export const getSuccessToastAction = (message: string = "Success") => {
    return pushToast(getSuccessToast(message))
}