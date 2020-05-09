"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.datas = exports.header = exports.yzcUrl = exports.url = undefined;

/**
 * reqsponses 包含请求头，url，数据等
 * @param responses
 */
var checkStatus = function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(responses) {
    var response, errorText, error, encrypt, timestamp, key, result;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return apiRequest(responses);

          case 2:
            response = _context.sent;

            if (!(response.statusCode < 200 && response.statusCode > 300)) {
              _context.next = 8;
              break;
            }

            //200---300为正常返回，否则将对应的错误return出去
            errorText = _helper2.default.codeMessage[response.statusCode] || '其他类型的报错';

            (0, _interac.showModerNoCancel)('', errorText); //提示框
            error = new Error(errorText);
            throw error;

          case 8:
            encrypt = response.header[header.encrypt]; // 保存是否加密的标志

            timestamp = response.header[header.timestamp]; // 保存时间戳

            if (!(encrypt === 'true' && timestamp != "")) {
              _context.next = 17;
              break;
            }

            //获取到的数据encrypt 是 true的话说明是加密过的并且时间戳不为空
            key = header.timestamp + timestamp; //对应的key+时间戳

            result = aesDecrypt(response.data.data, key); //将得到的key和数据进行解密

            if (typeof result === "string") {
              //返回的是字符串则转换为json格式
              result = JSON.parse(result);
            }
            // console.log(result)
            return _context.abrupt("return", result);

          case 17:
            //没有加密则直接返回数据
            console.log(response.data);
            return _context.abrupt("return", response.data);

          case 19:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, this);
  }));

  return function checkStatus(_x) {
    return _ref.apply(this, arguments);
  };
}();
/**请求后端封装的request
 *  reqsponses 包含请求头，url，数据等
 * @param responses
 */


exports.requests = requests;
exports.aesEncrypt = aesEncrypt;
exports.aesDecrypt = aesDecrypt;

var _index = require("../npm/crypto-js/index.js");

var _index2 = _interopRequireDefault(_index);

var _index3 = require("../npm/@tarojs/taro-weapp/index.js");

var _index4 = _interopRequireDefault(_index3);

var _helper = require("./helper.js");

var _helper2 = _interopRequireDefault(_helper);

var _interac = require("../interaction/interac.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; } //封装的request请求


//提示封装
var webUrl = 'http://192.168.31.238:8000/'; //线上环境(登录用)
var localUrl = 'http://192.168.31.238:8000/'; //线下环境
var webtype = true; //true为线上
var url = exports.url = webUrl; //通过type修改线上还是线下环境
var yzcUrl = exports.yzcUrl = 'http://192.168.31.238:8100/'; //月子餐注册用户的接口（请求月子餐）
var header = exports.header = {
  token: 'telo-token-data',
  encrypt: 'telo-data-encrypt',
  timestamp: 'telo-time-param',
  systemInfo: 'telo-system-data',
  encryptionKey: 'telo-origin',
  encryptionKey2: 'telo-auth',
  ORIGIN_DATA: 'telo-origin-data',
  AUTH_DATA: 'telo-auth-data',
  HEADER_TOKEN: 'telo_header_token'
};
var datas = exports.datas = { 'name': 'yzc' }; //月子餐小程序的key
function requests(responses) {
  return checkStatus(responses);
}function apiRequest(responses) {
  // console.log(responses.headers)
  return _index4.default.request({
    url: responses.url,
    data: responses.data,
    method: responses.method,
    header: responses.headers,
    success: function success(res) {
      // console.log(res)
      return res;
    },
    fail: function fail(res) {
      _index4.default.hideLoading();
      (0, _interac.showModerNoCancel)('', '出错了');
    }
  });
}
/**
 * 请求前，对请求头datas的数据进行加密
 * @param data 加密前的数据
 * @param key 加密的key
 */
function aesEncrypt(data, key) {
  // console.log('加密的key:'+key)
  try {
    // console.log(data)
    var _datas = JSON.stringify(data);
    var result = void 0;
    result = _index2.default.AES.encrypt(_datas, key);
    result = result.toString();
    result = _index2.default.enc.Utf8.parse(result);
    result = _index2.default.enc.Base64.stringify(result);
    return result;
  } catch (error) {
    console.log(error);
    return false;
  }
}
/**请求后对得到的数据进行解密
 *
 * @param data 加密后的数据
 * @param key 解密的key
 */
function aesDecrypt(data, key) {
  try {
    // 用base64解码
    var _cryptoJS = require("../npm/crypto-js/index.js");
    var result = void 0;
    result = _cryptoJS.enc.Base64.parse(data);
    result = result.toString(_cryptoJS.enc.Utf8);
    // aes解密
    result = _cryptoJS.AES.decrypt(result, key);
    result = result.toString(_cryptoJS.enc.Utf8);
    return result;
  } catch (error) {
    console.log(error);
    return false;
  }
}