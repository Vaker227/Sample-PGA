import { APIHost } from '../utils/constants';

enum APIService {
  admin,
  vendor,
  public,
}

function getBaseUrl(service: APIService) {
  if (service === APIService.admin) {
    return `${APIHost}/apiAdmin`;
  } else if (service === APIService.vendor) {
    return `${APIHost}/apiVendor`;
  } else if (service === APIService.public) {
    return `${APIHost}/api`;
  }

  return '';
}

export const API_PATHS = {
  signIn: `${getBaseUrl(APIService.public)}/authentication/login`,
  getCategoryList: getBaseUrl(APIService.public) + "/categories/list",
  getBrandList: getBaseUrl(APIService.admin) + "/brands/list",
  getVendorList: getBaseUrl(APIService.admin) + "/vendors/list",
  getRoles: getBaseUrl(APIService.admin) + "/commons/role",
  getCountries: getBaseUrl(APIService.admin) + "/commons/country",
  getUserList: getBaseUrl(APIService.admin) + "/users/list",
  getProfileDetail: getBaseUrl(APIService.vendor) + "/profile/detail",
  editUser: getBaseUrl(APIService.admin) + "/users/edit",
  createUser: getBaseUrl(APIService.admin) + "/users/create",
  getProductList: getBaseUrl(APIService.public) + "/products/list",
  getProductDetail: getBaseUrl(APIService.admin) + "/products/detail",
  editProduct: getBaseUrl(APIService.admin) + "/products/edit",
  createProduct: getBaseUrl(APIService.admin) + "/products/create",
  uploadImageProduct: getBaseUrl(APIService.public) + "/products/upload-image",
  getConditions: getBaseUrl(APIService.admin) + "/conditions/list",
  getShippingList: getBaseUrl(APIService.admin) + "/shipping/list",
};
