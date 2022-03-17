import Cookies from "js-cookie"
import { API_PATHS } from "../../configs/api"
import { IParamsProduct } from "../../models/product"
import { ACCESS_TOKEN_KEY } from "../../utils/constants"


export const UploadImageProduct = async (productId: string, order: string, imageUrl: string) => {
    const imageBlob = await fetch(imageUrl).then((r) => r.blob())
    const imageFile = new File([imageBlob], 'upload-file.png', { type: 'image/jpeg' })
    const formData = new FormData()
    formData.append('productId', productId)
    formData.append('order', order)
    formData.append('images[]', imageFile)
    const result = await fetch(
        API_PATHS.uploadImageProduct,
        {
            credentials: 'include',
            method: 'POST',
            body: formData,
            headers: {
                Authorization: Cookies.get(ACCESS_TOKEN_KEY) || ''
            }
        }
    )
    const json = await result.json()
    if (json.errors) {
        throw json.errors
    }
    return json
}


export const preConfigDetailProductObject = (productInfo: IParamsProduct) => {
    const tempProductInfo: IParamsProduct = { ...productInfo };
    // prevent null or undifined value
    Object.keys(tempProductInfo).forEach((key) => tempProductInfo[key as string] = tempProductInfo[key as string] ?? '')
    // image info
    if (tempProductInfo.images && tempProductInfo.images.length > 0) {
        tempProductInfo.imagesInfo = tempProductInfo.images.map((image) => ({ ...image, url: image.thumbs ? image.thumbs[image.thumbs.length - 1 || 0] : '' }));

    }
    // categories to type [id,id,...]
    tempProductInfo.categories = tempProductInfo.categories.map((category: any) => category.category_id);
    // shipping set default us 
    if (tempProductInfo.shipping && tempProductInfo.shipping.length < 1) {
        tempProductInfo.shipping?.push({ id: '1', price: '0' });
    }
    // convert to view-form's type
    tempProductInfo.shipping_to_zones = tempProductInfo.shipping;
    // convert to JS Date
    tempProductInfo.arrival_date = new Date(parseInt(tempProductInfo.arrival_date as string) * 1000);
    return tempProductInfo;
}

export const detectImageChange = (modifiedInfo: IParamsProduct, originalInfo?: IParamsProduct) => {
    const imagesInfo = modifiedInfo.imagesInfo || [];

    const imagesOrder = imagesInfo.map((imageInfo) => imageInfo.file);
    let deleted_images: any = []
    if (originalInfo) {
        deleted_images =
            originalInfo?.images?.filter((image) => !imagesOrder.includes(image.file)).map((image) => image.id) ??
            [];

    }

    const newImages: { order: number, url: string }[] = []
    imagesInfo.forEach((info, index) => {
        if (info.id == 'new') {
            newImages.push({ order: index, url: info.url! });
        }
    });
    return { imagesOrder, deleted_images, newImages }
}