export interface IResponse {
    data?: any
    errors?: any
    success?: any
}


export interface IRole {
    enabled: string,
    id: string,
    name: string
}
export interface IRoleWrapper {
    [index: string]: IRole[]
}


export interface ICountry {
    active_currency: any
    code: string,
    code3: string
    country: string
    currency_id: string,
    enabled: string,
    id: string
    is_fraudlent: string
}