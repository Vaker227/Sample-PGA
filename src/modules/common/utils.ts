import Cookies from "js-cookie";
import { IResponse } from "../../models/common";
import { IButtonType } from "../../models/utils/button";
import { ACCESS_TOKEN_KEY } from "../../utils/constants";


export async function CustomFetch(url: string,
    method: 'get' | 'post' | 'delete' | 'put' = 'get',
    body?: object | FormData,
    auth = true,
    contentType?: string): Promise<IResponse | any> {
    const res = await fetch(url, {
        credentials: 'include',
        method,
        body: typeof body === 'object' ? JSON.stringify(body) : body,
        headers:
        {
            // 'Content-Type': contentType !== 'multipart/form-data' ? contentType || 'application/json' : '',
            Authorization: auth ? Cookies.get(ACCESS_TOKEN_KEY) || '' : '',
        },
        cache: 'no-store',
    });
    const json = await res.json();
    return json
}



export const getStyleClasses = (type: string) => {
    const typeObj: IButtonType = {
        bg: 'bg-white',
        text: 'text-black hover:text-gray-400',
        spacing: 'py-1.5 px-2'
    };
    switch (type) {
        case 'purple':
            typeObj.bg = 'bg-[#b18aff]';
            typeObj.text = "text-white hover:text-black";
            typeObj.border = 'border-2 border-[#b18aff] ';

            break;
        case 'yellow':
            typeObj.bg = 'bg-[#f0ad4e]';
            typeObj.text = "text-white hover:text-black";
            typeObj.border = 'border-2 border-[#eea236] ';
            break;
        case 'flat-red':
            typeObj.bg = 'bg-white bg-gradient-to-r from-[#ff708d] to-[#ff3d71] hover:from-[#ff708d]/70';
            typeObj.text = "text-white ";
            typeObj.border = 'border-transparent';
            typeObj.ring = "ring-white/50 focus:ring-4 active:ring-4"
            typeObj.spacing = "py-2 px-4"
            break;
        case 'flat-purple':
            typeObj.bg = 'bg-white bg-gradient-to-r from-[#b18aff] to-[#a16eff] hover:from-[#b18aff]/70';
            typeObj.text = "text-white ";
            typeObj.border = 'border-transparent';
            typeObj.ring = "ring-white/50 focus:ring-4 active:ring-4"
            typeObj.spacing = "py-2 px-4"
            break;
    }
    return Object.keys(typeObj).reduce(
        (pre, cur) => (pre += ' ' + typeObj[cur as keyof IButtonType]),
        '',
    );
}



export function getPagingRange(total: number, current: number, length: number = 5, min: number = 1) {
    if (length > total) length = total;

    let start = current - Math.floor(length / 2);
    // handle if lower than min
    start = Math.max(start, min);
    // handle full length near uppest
    start = Math.min(start, min + total - length);

    return Array.from({ length: length }, (el, i) => start + i);
}