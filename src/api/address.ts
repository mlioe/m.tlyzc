//与地址相关的api
import { requests, yzcUrl, aesEncrypt, header, datas } from '../request/request';
import { showModerNoCancel } from '../interaction/interac'
import Taro from '@tarojs/taro';



function addresslist(){//获取地址列表
    let tokens = Taro.getStorageSync('tokens')//获取用户缓存的token
    let unionID = Taro.getStorageSync('unionId')
    tokens = JSON.parse(tokens)
    unionID = JSON.parse(unionID)
    let obj = {
        id: tokens.id,// 通行证编号
        token: tokens.token, // 通行证令牌
        user_id:unionID.id
    }
    let headers = {
        'telo-origin-data': aesEncrypt(datas, header.encryptionKey),
        'telo-auth-data': aesEncrypt(obj, header.encryptionKey2)
    }
    let responses = {
        headers: headers,
        data: '',
        method: "GET",
        url: yzcUrl + "customer/address/list"
    }
    return  requests(responses)
}

/**
 * 
 * @param response 
 * @param methods //添加 post 更新 put
 */

function addAddress(response,methods) {//添加地址,更新地址
    let tokens = Taro.getStorageSync('tokens')//获取用户缓存的token
    let unionID = Taro.getStorageSync('unionId')
    tokens = JSON.parse(tokens)
    unionID = JSON.parse(unionID)
    if (response.name == '') {
        showModerNoCancel('', '名字不能为空')
        return false
    }
    if (response.mobile == '') {
        showModerNoCancel('', '电话不能为空')
        return false
    }
    if (response.address == "" || typeof response.address === 'undefined') {
        showModerNoCancel('', '地址不能为空')
        return false
    }
    if (!(/^1[3456789]\d{9}$/.test(response.mobile))) {
        showModerNoCancel('', '手机格式有误')
        return false
    }
    let obj = {
        id: tokens.id,// 通行证编号
        token: tokens.token, // 通行证令牌
        user_id:unionID.id
    }
    let headers = {
        'telo-origin-data': aesEncrypt(datas, header.encryptionKey),
        'telo-auth-data': aesEncrypt(obj, header.encryptionKey2)
    }
    const Id = response.id ? response.id : ''
    let data = {
        is_default: response.defaults, //是否为默认地址
        name: response.name,//名字
        sex: response.sex,//性别
        mobile: response.mobile,//手机
        province: response.province,//省
        city: response.city,
        district: response.district,//地址行政区
        address: response.address,//详细地理信息
        house_number: response.house_number,//地址门牌号
        label: response.label,//地址标签
        district_code: response.district_code,//地址行政区代号
        geography_info: response.geography_info,//地址地理信息
        id:Id
    } //要传入的data
    let responses = {
        headers: headers,
        data: data,
        method: methods,
        url: yzcUrl + "customer/address"
    }
    return  requests(responses)
}

function deletesAddress(response){//删除地址
    let tokens = Taro.getStorageSync('tokens')//获取用户缓存的token
    let unionID = Taro.getStorageSync('unionId')
    tokens = JSON.parse(tokens)
    unionID = JSON.parse(unionID)
    let obj = {
        id: tokens.id,// 通行证编号
        token: tokens.token, // 通行证令牌
        user_id:unionID.id
    }
    let headers = {
        'telo-origin-data': aesEncrypt(datas, header.encryptionKey),
        'telo-auth-data': aesEncrypt(obj, header.encryptionKey2)
    }
    let data = { id:response }
    let responses = {
        headers: headers,
        data: data,
        method: "delete",
        url: yzcUrl + "customer/address?id=" + response
    }
    return  requests(responses)
}


//通过id获取某个地址的详情
function addressDetails(response){
    let tokens = Taro.getStorageSync('tokens')//获取用户缓存的token
    let unionID = Taro.getStorageSync('unionId')
    tokens = JSON.parse(tokens)
    unionID = JSON.parse(unionID)
    let obj = {
        id: tokens.id,// 通行证编号
        token: tokens.token, // 通行证令牌
        user_id:unionID.id
    }
    let headers = {
        'telo-origin-data': aesEncrypt(datas, header.encryptionKey),
        'telo-auth-data': aesEncrypt(obj, header.encryptionKey2)
    }
    let data = {
        id:response
    }
    let responses = {
        headers: headers,
        data: data,
        method: "GET",
        url: yzcUrl + "customer/address"
    }
    return  requests(responses)

}


export default {
    addAddress,addresslist,addressDetails,deletesAddress
}

