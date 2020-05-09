import { requests, url, aesEncrypt, header, datas ,yzcUrl } from '../request/request';
import { showModerNoCancel } from '../interaction/interac';
import helper from '../request/helper'

//获取二维码
function getCodes(phone){ 
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
        url:url+"auth/login/captcha/sms"
    }
    return requests(responses)
}

/**登录接口
 * 
 * @param mobile 手机号
 * @param captcha //验证码
 */

function logins(mobile ,captcha){
    let headers = {
        'telo-origin-data':aesEncrypt(datas,header.encryptionKey),
        'content-type': 'application/json'
    } //头部封装
    let data = {mobile: mobile,captcha: captcha} //要传入的data
    let responses = {
        headers:headers,
        data:data,
        method:"POST",
        url:url+"auth/login_or_register/type/sms"
    }
    console.log(responses)
    return requests(responses)
}

//登录成功后，将得到的token注册到月子餐系统
export function registerInYzc(tokens){ 
    console.log(tokens)
    let obj = {
        union_id: tokens.id,// 通行证编号
        token: tokens.token, // 通行证令牌
        // user_id:'', // 系统用户编号
        // store_id:'' , // 系统店铺编号
    }
    let headers = {
        'telo-origin-data': aesEncrypt(datas, header.encryptionKey),
        'telo-auth-data': aesEncrypt(obj, header.encryptionKey2),
        'content-type': 'application/json'
    }
    let data = {}
    let responses = {
        headers:headers,
        data:data,
        method:"POST",
        url:yzcUrl+"customer/user"
    }
    return requests(responses)
}
export default {
    getCodes,logins,registerInYzc
}

