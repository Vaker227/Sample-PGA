export interface IShipping {
    id: string | null,
    name: string,
}

export interface IShippingParams {
    id: IShipping['id']
    price: string
    zone_name?: IShipping['name']
}