import ErrorToast from "./custom/ErrorToast"
import { IToastInfo } from "./ToastProvier"

export const getErrorToast = (message: string, duration: number = 3000): IToastInfo => {
    return {
        template: ErrorToast,
        message,
        duration
    }
}