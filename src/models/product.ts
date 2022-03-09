



export interface IProduct {
    amount: string | number
    arrivalDate: string
    category: string
    condition: "New" | "Used" | null
    created: string
    description: string
    enabled: string
    id: string
    name: string
    participateSale: string
    price: string | number
    sku: string
    vendor: string
    vendorID: string
    weight: string | number
}



// availability: "all"
// category: "0"
// count: 25
// order_by: "ASC"
// page: 1
// search: ""
// search_type: "name,sku,description"
// sort: "name"
// stock_status: "all"
// vendor: {}

export type IStockStatus = 'all' | 'in' | 'low' | 'out'

export interface IFilterProduct {
    availability: 'all' | '1' | '0'
    category: string
    search: string
    search_type: string
    sort: 'name' | 'sku' | 'price' | 'amout' | 'vendor' | 'arrivalDate'
    stock_status: IStockStatus
    vendor: string
    count: number;
    order_by: 'ASC' | 'DESC'
    page: number
}