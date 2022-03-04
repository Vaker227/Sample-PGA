export const validEmailRegex =
  /^(([^<>()\\[\]\\.,;:\s@"]+(\.[^<>()\\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export const getErrorMessageResponse = (response: any): string => {
  if (typeof response?.errors === 'string') {
    return response?.errors;
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
