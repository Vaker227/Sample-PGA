import { RegisterOptions } from "react-hook-form";
import { validEmailRegex } from "../../utils";

export const emailValidation: RegisterOptions = {
    required: 'Email is required',
    pattern: { value: validEmailRegex, message: 'Email is invalid' },
}

export const passowrdValidation: RegisterOptions = {
    required: 'Password is required',
    minLength: { value: 6, message: "Password must be at leart 6 characters" }
}
