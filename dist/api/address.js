"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _request = require("../request/request.js");

var _interac = require("../interaction/interac.js");

var _index = require("../npm/@tarojs/taro-weapp/index.js");

var _index2 = _interopRequireDefault(_index);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function addresslist() {
  var tokens = _index2.default.getStorageSync('tokens'); //获取用户缓存的token
  var unionID = _index2.default.getStorageSync('unionId');
  tokens = JSON.parse(tokens);
  unionID = JSON.parse(unionID);
  var obj = {
    id: tokens.id,
    token: tokens.token,
    user_id: unionID.id
  };
  var headers = {
    'telo-origin-data': (0, _request.aesEncrypt)(_request.datas, _request.header.encryptionKey),
    'telo-auth-data': (0, _request.aesEncrypt)(obj, _request.header.encryptionKey2)
  };
  var responses = {
    headers: headers,
    data: '',
    method: "GET",
    url: _request.yzcUrl + "customer/address/list"
  };
  return (0, _request.requests)(responses);
}
/**
 *
 * @param response
 * @param methods //添加 post 更新 put
 */
//与地址相关的api
function addAddress(response, methods) {
  var tokens = _index2.default.getStorageSync('tokens'); //获取用户缓存的token
  var unionID = _index2.default.getStorageSync('unionId');
  tokens = JSON.parse(tokens);
  unionID = JSON.parse(unionID);
  if (response.name == '') {
    (0, _interac.showModerNoCancel)('', '名字不能为空');
    return false;
  }
  if (response.mobile == '') {
    (0, _interac.showModerNoCancel)('', '电话不能为空');
    return false;
  }
  if (response.address == "" || typeof response.address === 'undefined') {
    (0, _interac.showModerNoCancel)('', '地址不能为空');
    return false;
  }
  if (!/^1[3456789]\d{9}$/.test(response.mobile)) {
    (0, _interac.showModerNoCancel)('', '手机格式有误');
    return false;
  }
  var obj = {
    id: tokens.id,
    token: tokens.token,
    user_id: unionID.id
  };
  var headers = {
    'telo-origin-data': (0, _request.aesEncrypt)(_request.datas, _request.header.encryptionKey),
    'telo-auth-data': (0, _request.aesEncrypt)(obj, _request.header.encryptionKey2)
  };
  var Id = response.id ? response.id : '';
  var data = {
    is_default: response.defaults,
    name: response.name,
    sex: response.sex,
    mobile: response.mobile,
    province: response.province,
    city: response.city,
    district: response.district,
    address: response.address,
    house_number: response.house_number,
    label: response.label,
    district_code: response.district_code,
    geography_info: response.geography_info,
    id: Id
  }; //要传入的data
  var responses = {
    headers: headers,
    data: data,
    method: methods,
    url: _request.yzcUrl + "customer/address"
  };
  return (0, _request.requests)(responses);
}
function deletesAddress(response) {
  var tokens = _index2.default.getStorageSync('tokens'); //获取用户缓存的token
  var unionID = _index2.default.getStorageSync('unionId');
  tokens = JSON.parse(tokens);
  unionID = JSON.parse(unionID);
  var obj = {
    id: tokens.id,
    token: tokens.token,
    user_id: unionID.id
  };
  var headers = {
    'telo-origin-data': (0, _request.aesEncrypt)(_request.datas, _request.header.encryptionKey),
    'telo-auth-data': (0, _request.aesEncrypt)(obj, _request.header.encryptionKey2)
  };
  var data = { id: response };
  var responses = {
    headers: headers,
    data: data,
    method: "delete",
    url: _request.yzcUrl + "customer/address?id=" + response
  };
  return (0, _request.requests)(responses);
}
//通过id获取某个地址的详情
function addressDetails(response) {
  var tokens = _index2.default.getStorageSync('tokens'); //获取用户缓存的token
  var unionID = _index2.default.getStorageSync('unionId');
  tokens = JSON.parse(tokens);
  unionID = JSON.parse(unionID);
  var obj = {
    id: tokens.id,
    token: tokens.token,
    user_id: unionID.id
  };
  var headers = {
    'telo-origin-data': (0, _request.aesEncrypt)(_request.datas, _request.header.encryptionKey),
    'telo-auth-data': (0, _request.aesEncrypt)(obj, _request.header.encryptionKey2)
  };
  var data = {
    id: response
  };
  var responses = {
    headers: headers,
    data: data,
    method: "GET",
    url: _request.yzcUrl + "customer/address"
  };
  return (0, _request.requests)(responses);
}
exports.default = {
  addAddress: addAddress, addresslist: addresslist, addressDetails: addressDetails, deletesAddress: deletesAddress
};