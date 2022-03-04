import Cookies from "js-cookie";
import { IButtonType } from "../../models/utils/button";

import { ACCESS_TOKEN_KEY } from "../../utils/constants";

export async function CustomFetch(url: string,
    method: 'get' | 'post' | 'delete' | 'put' = 'get',
    body?: object | FormData,
    auth = true,
    contentType?: string) {
    const res = await fetch(url, {
        credentials: 'include',
        method,
        body: typeof body === 'object' ? JSON.stringify(body) : body,
        headers:
            contentType !== 'multipart/form-data'
                ? {
                    'Content-Type': contentType || 'application/json',
                    Authorization: Cookies.get(ACCESS_TOKEN_KEY) || '',
                }
                : {},
        cache: 'no-store',
    });
    const json = await res.json();
    return json
}



export const getStyleClasses = (type: string) => {
    const typeObj: IButtonType = {
        bgColor: 'bg-white',
        textColor: 'text-black',
        textHoverColor: 'hover:text-gray-400',
    };
    switch (type) {
        case 'purple':
            typeObj.bgColor = 'bg-[#b18aff]';
            typeObj.textColor = "text-white";
            typeObj.borderColor = 'border-[#b18aff]';
            typeObj.textHoverColor = 'hover:text-black';

            break;
        case 'yellow':
            typeObj.bgColor = 'bg-[#f0ad4e]';
            typeObj.textColor = "text-white";
            typeObj.borderColor = 'border-[#eea236]';
            typeObj.textHoverColor = 'hover:text-black';

            break;
    }
    return Object.keys(typeObj).reduce(
        (pre, cur) => (pre += ' ' + typeObj[cur as keyof IButtonType]),
        '',
    );
}


export const pagination = (length: number, current: number, adjacents: number = 3) => {
    let pages = [];
    for (let i = 0; i < length; i++) {
        pages[i] = i + 1;
    }
    const newAdj = Math.floor(adjacents / 2) * 2 + 1
    if (newAdj >= 1) {
        const startSlice = Math.max(0, Math.min(length - newAdj, current - Math.ceil(newAdj / 2)))
        pages = pages.slice(startSlice, startSlice + newAdj)
    }
    return pages;
}