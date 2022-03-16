import { IParamsUserInfo } from "../../models/user";



export const preConfigDetailUserObject = (userInfo: IParamsUserInfo) => {
    const tempUserInfo: IParamsUserInfo = { ...userInfo };
    // prevent null or undifined value
    Object.keys(tempUserInfo).forEach((key) => tempUserInfo[key as string] = tempUserInfo[key as string] ?? '')

    // set default password
    tempUserInfo.password = '';
    tempUserInfo.confirm_password = '';

    return tempUserInfo;
}
