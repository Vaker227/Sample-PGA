import { IBrand } from "./brand"
import { ICategory } from "./category"
import { ICountry } from "./common"
import { IShipping, IShippingParams } from "./shipping"




export interface IProduct {
    amount: string | number
    arrivalDate: string
    category: string
    condition: "New" | "Used" | null
    created: string
    description: string
    enabled: string
    id?: string
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

export interface IImageInfo {
    id: string | 'new'
    file: string
    thumbs?: string[]
    url?: string
}

export interface IParamsUploadImage {
    productId: number,
    order: number,
    images: any
}

export interface IParamsProduct {
    [key: string]: any
    vendor_id: string
    name: string
    brand_id: IBrand['id']
    condition_id: string
    categories: ICategory['id'][] | { category_id: string | number, name: string }[],
    description: string
    sort_description?: string
    enabled: '1' | '0'
    memberships: []
    shipping_to_zones?: IShippingParams[]
    shipping?: IShippingParams[]
    taxExempt?: 0 | 1 | '0' | '1'
    tax_exempt: 0 | 1 | '0' | '1'
    price: number | string
    participate_sale: number | string
    sale_price_type: string
    sale_price: number | string
    arrival_date: Date | string
    inventory_tracking: number | string
    quentity?: number
    quantity: number | string
    sku: string
    og_tags_types?: string
    og_tags_type: '0' | '1' // 0:auto, 1: cutsom 
    og_tags: string
    enableOffers?: string
    mininum_offer_price?: number
    meta_desc_type: 'C' | 'A'
    meta_description: string
    meta_keywords: string
    product_page_title: string
    facebook_marketing_enabled: 1 | 0 | '1' | '0'
    google_feed_enabled: 1 | 0 | '1' | '0'
    imagesInfo?: IImageInfo[]
    imagesOrder?: string[]
    images?: IImageInfo[]
    id?: string
    deleted_images?: string[]
    code?: string
    weight?: number | string
    cleanURL?: string
}
