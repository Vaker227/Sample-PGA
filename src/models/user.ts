export type AuthToken = string

export interface IUser {
  profile_id: string,
  login?: string,
  fistName: string,
  lastName: string,
}

export interface IProfile {
  customerName: string | null,
  email: string
  profile_id: string
}

export interface IUserInfo extends IUser {
  access_level: string
  created: string,
  last_login: string,
  product: number
  storeName: string | null
  order: { order_as_buyer: number, order_as_buyer_total: string | number }
  vendor: string,
  vendor_id: string
  wishlist: string
}


// address: "asd"
// count: 25
// country: ""
// date_range: ["2022-03-17", "2022-03-03"]
// date_type: "L"
// memberships: ["M_4", "P_4"]
// order_by: "ASC"
// page: 1
// phone: "asd"
// search: "asd"
// sort: "vendor"
// state: "asd"
// status: ["U"]
// types: ["5", "6"]
// tz: 7
export type IUserStatus = 'E' | 'D' | 'U' | ''
export type IFilterUserMembership = "M_4" | "P_4"

export interface IFilterUserProperties {
  address: string
  country: string
  date_range: string[]
  date_type: "R" | "L"
  memberships: IFilterUserMembership[]
  phone: string
  search: string
  state: string
  status: IUserStatus[]
  types: string[]
}

export interface IFilterUserSort {
  sort: "last_login" | "firstName" | "access_level" | 'created' | 'vendor'
  order_by: "DESC" | "ASC"
  count: number
  page: number
}
export interface IFilterUser extends IFilterUserProperties, IFilterUserSort {
  [key: string]: any
  tz: number
}


export interface IParamsUserInfo {
  [key: string]: any
  email: string
  firstName: string
  lastName: string
  password?: string
  confirm_password?: string
  membership_id: string
  forceChangePassword: 0 | 1
  taxExempt: 0 | 1
  id?: string
  paymentRailsType?: "individual" | "business"
  access_level: "10" | '100'
  roles?: string[]
  status?: IUserStatus,
  statusComment?: string
  pending_membership_id?: string
}