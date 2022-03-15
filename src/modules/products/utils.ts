import Cookies from "js-cookie"
import { API_PATHS } from "../../configs/api"
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