//用户资料功能
import { requests, yzcUrl, aesEncrypt, header, datas, aesDecrypt } from '../request/request';
import { showModerNoCancel } from '../interaction/interac';
// import helper from '../request/helper'
import Taro from '@tarojs/taro';
import { Form } from '@tarojs/components';

function useDetails() {//获取用户地址列表
    let tokens = Taro.getStorageSync('tokens')//获取用户缓存的token
    let unionID = Taro.getStorageSync('unionId')//获取缓存的unionID
    // console.log(tokens)
    tokens = JSON.parse(tokens)
    unionID = JSON.parse(unionID)
    let obj = {
        union_id:  tokens.id,// 通行证编号
        token: tokens.token, // 通行证令牌
        customer_user_id: unionID.id
    }
    let headers = {
        'telo-origin-data': aesEncrypt(datas, header.encryptionKey),
        'telo-auth-data': aesEncrypt(obj, header.encryptionKey2),
        'content-type': 'application/json'

    }
    let responses = {
        headers: headers,
        data: '',
        method: "GET",
        url: yzcUrl + "customer/user"
    }
    return requests(responses)
}

function putUser(response) {//更新用户信息
    // console.log(response)
    if(response.nickname === null || response.nickname === ''){
        showModerNoCancel('','请填写姓名')
        return false
    }
    if(response.birthday === null){
        showModerNoCancel('','请填写姓名')
        return false
    }
    let tokens = Taro.getStorageSync('tokens')//获取用户缓存的token
    let unionID = Taro.getStorageSync('unionId')//获取缓存的unionID
    tokens = JSON.parse(tokens)
    unionID = JSON.parse(unionID)
    let obj = {
        union_id:  tokens.id,// 通行证编号
        token: tokens.token, // 通行证令牌
        customer_user_id: unionID.id
    }
    let headers = {
        'telo-origin-data': aesEncrypt(datas, header.encryptionKey),
        'telo-auth-data': aesEncrypt(obj, header.encryptionKey2),
        'content-type': 'application/json'

    }
    let data = {
        nickname: response.nickname,
        sex: response.sex ,
        birthday: response.birthday,
    }
    let responses = {
        headers: headers,
        data: data,
        method: "PUT",
        url: yzcUrl + "customer/user"
    }
    return requests(responses)
}

function adminHand(response){
    let tokens = Taro.getStorageSync('tokens')//获取用户缓存的token
    let unionID = Taro.getStorageSync('unionId')//获取缓存的unionID
    tokens = JSON.parse(tokens)
    unionID = JSON.parse(unionID)
    let obj = {
        union_id:  tokens.id,// 通行证编号
        token: tokens.token, // 通行证令牌
        customer_user_id: unionID.id
    }
    let headers = {
        'telo-origin-data': aesEncrypt(datas, header.encryptionKey),
        'telo-auth-data': aesEncrypt(obj, header.encryptionKey2),
        'content-type': 'application/json'

        // 'content-type': 'multipart/form-data'
    }
    console.log(JSON.stringify(response))
    Taro.uploadFile({
        url: yzcUrl + "customer/user/avatar/upload", 
        filePath: response,
        name: 'avatar',
        header:headers,
        formData: {
        },
        success (res){
          console.log(res)
          const data = res
          checkStatus(data)
          //do something
        }
    })
}

function checkStatus(response){ //更新头像
    let encrypt = response.header[header.encrypt] // 保存是否加密的标志
    let timestamp = response.header[header.timestamp] // 保存时间戳
    if (encrypt === 'true' && timestamp != "") { //获取到的数据encrypt 是 true的话说明是加密过的并且时间戳不为空
        let key = header.timestamp + timestamp //对应的key+时间戳
        let data:any = response.data
        data = JSON.parse(data)
        console.log(data)
        let result = aesDecrypt(data.data, key) //将得到的key和数据进行解密
        if (typeof result === "string") { //返回的是字符串则转换为json格式
            result = JSON.parse(result)
        }
        console.log(result)
        return result
    } else { //没有加密则直接返回数据
        console.log('----无加密---')
        console.log(response.data)
        return response.data
    }
}

function storeUser(){
    let tokens = Taro.getStorageSync('tokens')//获取用户缓存的token
    let unionID = Taro.getStorageSync('unionId')//获取缓存的unionID
    // console.log(tokens)
    tokens = JSON.parse(tokens)
    unionID = JSON.parse(unionID)
    let obj = {
        union_id:  tokens.id,// 通行证编号
        token: tokens.token, // 通行证令牌
        customer_user_id: unionID.id
    }
    let headers = {
        'telo-origin-data': aesEncrypt(datas, header.encryptionKey),
        'telo-auth-data': aesEncrypt(obj, header.encryptionKey2),
        'content-type': 'application/json'

    }
    let responses = {
        headers: headers,
        data: '',
        method: "GET",
        url: yzcUrl + "store/user"
    }
    return requests(responses)
}

function roleList() {//获取用户
    let tokens = Taro.getStorageSync('tokens')//获取用户缓存的token
    let unionID = Taro.getStorageSync('unionId')//获取缓存的unionID
    // console.log(tokens)
    tokens = JSON.parse(tokens)
    unionID = JSON.parse(unionID)
    let obj = {
        union_id:  tokens.id,// 通行证编号
        token: tokens.token, // 通行证令牌
        customer_user_id: unionID.id
    }
    let headers = {
        'telo-origin-data': aesEncrypt(datas, header.encryptionKey),
        'telo-auth-data': aesEncrypt(obj, header.encryptionKey2),
        'content-type': 'application/json'

    }
    let responses = {
        headers: headers,
        data: '',
        method: "GET",
        url: yzcUrl + "store/user/role/list"
    }
    return requests(responses)
}

export default {
    useDetails, putUser,adminHand,roleList,storeUser
}