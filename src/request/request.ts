//封装的request请求
import cryptoJS from 'crypto-js'
import Taro from '@tarojs/taro'
import helper from './helper'
import { showModerNoCancel } from '../interaction/interac';//提示封装

const webUrl = 'http://192.168.31.238:8000/' //线上环境(登录用)
const localUrl = 'http://192.168.31.238:8000/' //线下环境
const webtype = true//true为线上
export let url = webtype ? webUrl : localUrl //通过type修改线上还是线下环境
export let yzcUrl = 'http://192.168.31.238:8100/' //月子餐注册用户的接口（请求月子餐）


export let header = {
    //加密串的key，防止泄露公司信息泄露我自己删了
}
export let datas = { 'name': 'yzc' } //月子餐小程序的key

export function requests(responses) { //api文件夹里的文件请求接口时先将请求方式等传入
    return checkStatus(responses)
}

/**
 * reqsponses 包含请求头，url，数据等
 * @param responses 
 */
async function checkStatus(responses){
    const response = await apiRequest(responses) //将传入的数据传给封装的接口，拿到值
    // console.log(response)
    if (response.statusCode < 200 && response.statusCode > 300) { //200---300为正常返回，否则将对应的错误return出去
        const errorText = helper.codeMessage[response.statusCode] || '其他类型的报错'
        showModerNoCancel('', errorText) //提示框
        const error = new Error(errorText)
        throw error
    }
    let encrypt = response.header[header.encrypt] // 保存是否加密的标志
    let timestamp = response.header[header.timestamp] // 保存时间戳
    if (encrypt === 'true' && timestamp != "") { //获取到的数据encrypt 是 true的话说明是加密过的并且时间戳不为空
        let key = header.timestamp + timestamp //对应的key+时间戳
        let result = aesDecrypt(response.data.data, key) //将得到的key和数据进行解密
        if (typeof result === "string") { //返回的是字符串则转换为json格式
            result = JSON.parse(result)
        }
        // console.log(result)
        return result
    } else { //没有加密则直接返回数据
        console.log(response.data)
        return response.data
    }
}

/**请求后端封装的request
 *  reqsponses 包含请求头，url，数据等
 * @param responses 
 */
function apiRequest(responses): any {
    // console.log(responses.headers)
    return Taro.request({
        url: responses.url,
        data: responses.data,
        method: responses.method,
        header: responses.headers,
        success(res) {
            // console.log(res)
            return res
        },
        fail(res){
            Taro.hideLoading()
            showModerNoCancel('','出错了')
        }
    })
}

/**
 * 请求前，对请求头datas的数据进行加密
 * @param data 加密前的数据
 * @param key 加密的key
 */
export function aesEncrypt(data, key): string | boolean {
    // console.log('加密的key:'+key)
    try {
        // console.log(data)
        let datas = JSON.stringify(data)
        let result: any
        result = cryptoJS.AES.encrypt(datas, key)
        result = result.toString()
        result = cryptoJS.enc.Utf8.parse(result)
        result = cryptoJS.enc.Base64.stringify(result)
        return result
    } catch (error) {
        console.log(error)
        return false
    }
}



/**请求后对得到的数据进行解密
 * 
 * @param data 加密后的数据
 * @param key 解密的key
 */

export function aesDecrypt(data, key): string | boolean {
    try {
        // 用base64解码
        const cryptoJS = require('crypto-js')
        let result: any
        result = cryptoJS.enc.Base64.parse(data)
        result = result.toString(cryptoJS.enc.Utf8)
        // aes解密
        result = cryptoJS.AES.decrypt(result, key)
        result = result.toString(cryptoJS.enc.Utf8)
        return result
    } catch (error) {
        console.log(error)
        return false
    }
}
