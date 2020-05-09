import { requests, url, aesEncrypt, header, datas ,yzcUrl ,aesDecrypt} from '../request/request';
import { showModerNoCancel } from '../interaction/interac';
import helper from '../request/helper'
console.log(yzcUrl)

export function getCode(phone){ //获取二维码
    if(phone===''){ //判断手机是否为空
        showModerNoCancel('','手机号不能为空')
        return false
    }
    if(!helper.passVer(phone)){ //正则判断手机格式
        showModerNoCancel('','手机号格式有误')
        return false
    }
    let headers = {'telo-origin-data':aesEncrypt(datas,header.encryptionKey)} //头部封装
    let data = {mobile: phone} //要传入的data
    let responses = {
        headers:headers,
        data:data,
        method:"GET",
        url:url+"auth/register/captcha/sms"
    }
    return requests(responses)
}


export function register(phone,code){ //注册
    if(phone==''||code==''){
        showModerNoCancel('','手机号或者验证码不能为空')
        return false
    }
    let headers = {'telo-origin-data':aesEncrypt(datas,header.encryptionKey)} //头部封装
    let data = {mobile: phone,captcha:code}
    let responses = {
        headers:headers,
        data:data,
        method:"POST",
        url:url+"auth/register/without_password"
    }
    return requests(responses)
}


export function registerInYzc(tokens){ //注册成功后，将得到的token注册到月子餐系统
    let obj = {
        id: tokens.id,// 通行证编号
        token: tokens.token, // 通行证令牌
        // user_id:'', // 系统用户编号
        // store_id:'' , // 系统店铺编号
    }
    let headers = {
        'telo-origin-data': aesEncrypt(datas, header.encryptionKey),
        'telo-auth-data': aesEncrypt(obj, header.encryptionKey2)
    }
    let data = {}
    let responses = {
        headers:headers,
        data:data,
        method:"POST",
        url:yzcUrl+"customer/user"
    }
    // console.log(responses)
    return requests(responses)
}