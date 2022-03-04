import { APIHost } from '../utils/constants';

enum APIService {
  auth,
  admin,
  vendor,
  public,
}

function getBaseUrl(service: APIService) {
  if (service === APIService.auth) {
    return `${APIHost}/authentication`;
  } else if (service === APIService.admin) {
    return `${APIHost}Admin`;
  } else if (service === APIService.vendor) {
    return `${APIHost}Vendor`;
  } else if (service === APIService.public) {
    return `${APIHost}`;
  }

  return '';
}

export const API_PATHS = {
  signIn: `${getBaseUrl(APIService.auth)}/login`,
};
