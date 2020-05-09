"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.showToast = showToast;
exports.showModerNoCancel = showModerNoCancel;
exports.showModer = showModer;

var _index = require("../npm/@tarojs/taro-weapp/index.js");

var _index2 = _interopRequireDefault(_index);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function showToast(title) {
  var icon = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'none';

  _index2.default.showToast({
    title: title,
    icon: icon,
    duration: 2000,
    success: function success(res) {
      return res;
    }
  });
} //交互类的提示封装
function showModerNoCancel(title, content) {
  return _index2.default.showModal({
    title: title,
    content: content,
    showCancel: false,
    success: function success(res) {
      return res;
    }
  });
}
function showModer(title, content) {
  return _index2.default.showModal({
    title: title,
    content: content,
    success: function success(res) {
      return res;
    }
  });
}