import { requests, url } from '../request/request';//封装的请求
import { showModerNoCancel } from '../interaction/interac';//交互反馈封装
import helper from '../request/helper'//正则等判断

export function getCode(phone){//获取二维码
    // console.log(phone)
    if(phone===''){
        showModerNoCancel('','手机号不能为空')
        return false
    }
    if(!helper.passVer(phone)){
        showModerNoCancel('','手机号格式有误')
        return false
    }
    return requests("GET",url+"auth/register/captcha/sms",{mobile: phone})
}


export function register(phone,code){
    if(phone==''||code==''){
        showModerNoCancel('','手机号或者验证码不能为空')
        return false
    }
    return requests("POST",url+"auth/register/without_password",{mobile: phone,captcha:code})
}