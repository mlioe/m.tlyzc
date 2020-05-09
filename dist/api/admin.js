"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _request = require("../request/request.js");

var _interac = require("../interaction/interac.js");

var _index = require("../npm/@tarojs/taro-weapp/index.js");

var _index2 = _interopRequireDefault(_index);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function useDetails() {
  var tokens = _index2.default.getStorageSync('tokens'); //获取用户缓存的token
  var unionID = _index2.default.getStorageSync('unionId'); //获取缓存的unionID
  // console.log(tokens)
  tokens = JSON.parse(tokens);
  unionID = JSON.parse(unionID);
  var obj = {
    union_id: tokens.id,
    token: tokens.token,
    customer_user_id: unionID.id
  };
  var headers = {
    'telo-origin-data': (0, _request.aesEncrypt)(_request.datas, _request.header.encryptionKey),
    'telo-auth-data': (0, _request.aesEncrypt)(obj, _request.header.encryptionKey2),
    'content-type': 'application/json'
  };
  var responses = {
    headers: headers,
    data: '',
    method: "GET",
    url: _request.yzcUrl + "customer/user"
  };
  return (0, _request.requests)(responses);
}
// import helper from '../request/helper'
//用户资料功能

function putUser(response) {
  // console.log(response)
  if (response.nickname === null || response.nickname === '') {
    (0, _interac.showModerNoCancel)('', '请填写姓名');
    return false;
  }
  if (response.birthday === null) {
    (0, _interac.showModerNoCancel)('', '请填写姓名');
    return false;
  }
  var tokens = _index2.default.getStorageSync('tokens'); //获取用户缓存的token
  var unionID = _index2.default.getStorageSync('unionId'); //获取缓存的unionID
  tokens = JSON.parse(tokens);
  unionID = JSON.parse(unionID);
  var obj = {
    union_id: tokens.id,
    token: tokens.token,
    customer_user_id: unionID.id
  };
  var headers = {
    'telo-origin-data': (0, _request.aesEncrypt)(_request.datas, _request.header.encryptionKey),
    'telo-auth-data': (0, _request.aesEncrypt)(obj, _request.header.encryptionKey2),
    'content-type': 'application/json'
  };
  var data = {
    nickname: response.nickname,
    sex: response.sex,
    birthday: response.birthday
  };
  var responses = {
    headers: headers,
    data: data,
    method: "PUT",
    url: _request.yzcUrl + "customer/user"
  };
  return (0, _request.requests)(responses);
}
function adminHand(response) {
  var tokens = _index2.default.getStorageSync('tokens'); //获取用户缓存的token
  var unionID = _index2.default.getStorageSync('unionId'); //获取缓存的unionID
  tokens = JSON.parse(tokens);
  unionID = JSON.parse(unionID);
  var obj = {
    union_id: tokens.id,
    token: tokens.token,
    customer_user_id: unionID.id
  };
  var headers = {
    'telo-origin-data': (0, _request.aesEncrypt)(_request.datas, _request.header.encryptionKey),
    'telo-auth-data': (0, _request.aesEncrypt)(obj, _request.header.encryptionKey2),
    'content-type': 'application/json'
    // 'content-type': 'multipart/form-data'
  };
  console.log(JSON.stringify(response));
  _index2.default.uploadFile({
    url: _request.yzcUrl + "customer/user/avatar/upload",
    filePath: response,
    name: 'avatar',
    header: headers,
    formData: {},
    success: function success(res) {
      console.log(res);
      var data = res;
      checkStatus(data);
      //do something
    }
  });
}
function checkStatus(response) {
  var encrypt = response.header[_request.header.encrypt]; // 保存是否加密的标志
  var timestamp = response.header[_request.header.timestamp]; // 保存时间戳
  if (encrypt === 'true' && timestamp != "") {
    //获取到的数据encrypt 是 true的话说明是加密过的并且时间戳不为空
    var key = _request.header.timestamp + timestamp; //对应的key+时间戳
    var data = response.data;
    data = JSON.parse(data);
    console.log(data);
    var result = (0, _request.aesDecrypt)(data.data, key); //将得到的key和数据进行解密
    if (typeof result === "string") {
      //返回的是字符串则转换为json格式
      result = JSON.parse(result);
    }
    console.log(result);
    return result;
  } else {
    //没有加密则直接返回数据
    console.log('----无加密---');
    console.log(response.data);
    return response.data;
  }
}
function storeUser() {
  var tokens = _index2.default.getStorageSync('tokens'); //获取用户缓存的token
  var unionID = _index2.default.getStorageSync('unionId'); //获取缓存的unionID
  // console.log(tokens)
  tokens = JSON.parse(tokens);
  unionID = JSON.parse(unionID);
  var obj = {
    union_id: tokens.id,
    token: tokens.token,
    customer_user_id: unionID.id
  };
  var headers = {
    'telo-origin-data': (0, _request.aesEncrypt)(_request.datas, _request.header.encryptionKey),
    'telo-auth-data': (0, _request.aesEncrypt)(obj, _request.header.encryptionKey2),
    'content-type': 'application/json'
  };
  var responses = {
    headers: headers,
    data: '',
    method: "GET",
    url: _request.yzcUrl + "store/user"
  };
  return (0, _request.requests)(responses);
}
function roleList() {
  var tokens = _index2.default.getStorageSync('tokens'); //获取用户缓存的token
  var unionID = _index2.default.getStorageSync('unionId'); //获取缓存的unionID
  // console.log(tokens)
  tokens = JSON.parse(tokens);
  unionID = JSON.parse(unionID);
  var obj = {
    union_id: tokens.id,
    token: tokens.token,
    customer_user_id: unionID.id
  };
  var headers = {
    'telo-origin-data': (0, _request.aesEncrypt)(_request.datas, _request.header.encryptionKey),
    'telo-auth-data': (0, _request.aesEncrypt)(obj, _request.header.encryptionKey2),
    'content-type': 'application/json'
  };
  var responses = {
    headers: headers,
    data: '',
    method: "GET",
    url: _request.yzcUrl + "store/user/role/list"
  };
  return (0, _request.requests)(responses);
}
exports.default = {
  useDetails: useDetails, putUser: putUser, adminHand: adminHand, roleList: roleList, storeUser: storeUser
};