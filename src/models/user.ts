export type AuthToken = string

export interface IUser {
  profile_id: string,
  login: string,
  firstName: string,
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

export interface IRole {
  enabled: string,
  id: string,
  name: string
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
type IFilterUserStatus = 'E' | 'D' | 'U'

export interface IFilterUser {
  address: string
  count: number
  country: string
  date_range: []
  date_type: "R" | "L"
  memberships: string[]
  order_by: "DESC" | "ASC"
  page: number
  phone: string
  search: string
  sort: "last_login" | "firstName" | "access_level" | 'created' | 'vendor'
  state: string
  status: IFilterUserStatus[]
  types: string[]
  tz: 7
}