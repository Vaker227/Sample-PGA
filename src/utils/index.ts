import { result } from "lodash";

export const validEmailRegex =
  /^(([^<>()\\[\]\\.,;:\s@"]+(\.[^<>()\\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export const getErrorMessageResponse = (response: any): string | string[] => {
  if (typeof response?.errors === 'string') {
    return response?.errors;
  }
  if (typeof response.errors === 'object') {
    return Object.keys(response.errors).map((key) => response.errors[key])
  }

  if (response?.message?.details[0]) {
    return response?.message?.details[0]?.message;
  }

  return '';
};

export const getErrorObjectResponse = (response: any): {} => {
  if (response?.errors) {
    return response?.errors;
  }
  return {}
};

export const getRawObjectString = (object: object) => {
  return JSON.stringify(object)
}

export const assignObject = (target: any, from: any) => {
  const result = { ...target }
  Object.keys(target).forEach((key: any) => target[key] = from[key])
  return result;
}