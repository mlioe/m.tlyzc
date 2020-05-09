'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.default = counter;

var _counter = require('../constants/counter.js');

var INITIAL_STATE = {
  num: 0,
  addressList: [
    // {
    //   name: '哈哈',
    //   sex: 1,//0是男，传给后端要转为1，转换一下
    //   mobile: 13790989809,
    //   province:'广东',//省
    //   city:'湛江市',//市
    //   district:'霞山区',//行政市区
    //   address: '详细地址',//详细地址
    //   house_number:'198好',//门牌号
    //   label: '提车厂',//地址标签
    //   district_code:'12121212',
    //   geography_info:'address.address',
    //   defaults: 1 
    // }
  ],
  information: { nickName: '', avatarUrl: '' },
  key: 'YZMBZ-QVLCI-V3NG2-5OGHE-N4E57-5SBDN'
};
function counter() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : INITIAL_STATE;
  var action = arguments[1];

  // console.log(action)
  switch (action.type) {
    case _counter.ADD:
      return _extends({}, state, {
        num: state.num + 1
      });
    case _counter.MINUS:
      return _extends({}, state, {
        num: state.num - 1
      });
    case _counter.ADDADRESS:
      return _extends({}, state, {
        addressList: action.newarrList
      });
    case _counter.INFORMATION:
      {
        var information = { nickName: action.res.nickName, avatarUrl: action.res.avatarUrl };
        return _extends({}, state, {
          information: information
        });
      }
    default:
      return state;
  }
}