"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.registerInYzc = registerInYzc;

var _request = require("../request/request.js");

var _interac = require("../interaction/interac.js");

var _helper = require("../request/helper.js");

var _helper2 = _interopRequireDefault(_helper);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//获取二维码
function getCodes(phone) {
  if (phone === '') {
    //判断手机是否为空
    (0, _interac.showModerNoCancel)('', '手机号不能为空');
    return false;
  }
  if (!_helper2.default.passVer(phone)) {
    //正则判断手机格式
    (0, _interac.showModerNoCancel)('', '手机号格式有误');
    return false;
  }
  var headers = { 'telo-origin-data': (0, _request.aesEncrypt)(_request.datas, _request.header.encryptionKey) }; //头部封装
  var data = { mobile: phone }; //要传入的data
  var responses = {
    headers: headers,
    data: data,
    method: "GET",
    url: _request.url + "auth/login/captcha/sms"
  };
  return (0, _request.requests)(responses);
}
/**登录接口
 *
 * @param mobile 手机号
 * @param captcha //验证码
 */
function logins(mobile, captcha) {
  var headers = {
    'telo-origin-data': (0, _request.aesEncrypt)(_request.datas, _request.header.encryptionKey),
    'content-type': 'application/json'
  }; //头部封装
  var data = { mobile: mobile, captcha: captcha }; //要传入的data
  var responses = {
    headers: headers,
    data: data,
    method: "POST",
    url: _request.url + "auth/login_or_register/type/sms"
  };
  console.log(responses);
  return (0, _request.requests)(responses);
}
//登录成功后，将得到的token注册到月子餐系统
function registerInYzc(tokens) {
  console.log(tokens);
  var obj = {
    union_id: tokens.id,
    token: tokens.token
  };
  var headers = {
    'telo-origin-data': (0, _request.aesEncrypt)(_request.datas, _request.header.encryptionKey),
    'telo-auth-data': (0, _request.aesEncrypt)(obj, _request.header.encryptionKey2),
    'content-type': 'application/json'
  };
  var data = {};
  var responses = {
    headers: headers,
    data: data,
    method: "POST",
    url: _request.yzcUrl + "customer/user"
  };
  return (0, _request.requests)(responses);
}
exports.default = {
  getCodes: getCodes, logins: logins, registerInYzc: registerInYzc
};