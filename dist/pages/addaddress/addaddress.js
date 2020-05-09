"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _class, _temp2;
// import { AtIcon } from 'taro-ui'//底部栏,图标

//腾讯地图jsdk
// console.log(showModer)
//修改地址方法
//交互反馈组件


var _tslib = require("../../npm/tslib/tslib.js");

var tslib_1 = _interopRequireWildcard(_tslib);

var _index = require("../../npm/@tarojs/taro-weapp/index.js");

var _index2 = _interopRequireDefault(_index);

var _index3 = require("../../npm/@tarojs/redux/index.js");

var _qqmapWxJssdk = require("../../libs/qqmap-wx-jssdk.js");

var _qqmapWxJssdk2 = _interopRequireDefault(_qqmapWxJssdk);

var _counter = require("../../actions/counter.js");

var _interac = require("../../interaction/interac.js");

var _address = require("../../api/address.js");

var _address2 = _interopRequireDefault(_address);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Index = (_temp2 = _class = function (_BaseComponent) {
  _inherits(Index, _BaseComponent);

  function Index() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, Index);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Index.__proto__ || Object.getPrototypeOf(Index)).call.apply(_ref, [this].concat(args))), _this), _this.$usedState = ["$compid__15", "defaults", "name", "list", "phone", "numberPlate", "address", "addressList", "maskType", "city", "selectAddressList", "value", "timer", "counter"], _this.config = {
      navigationBarTitleText: '添加新地址'
    }, _this.customComponents = ["AtIcon"], _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(Index, [{
    key: "_constructor",
    value: function _constructor(props) {
      _get(Index.prototype.__proto__ || Object.getPrototypeOf(Index.prototype), "_constructor", this).call(this, props);

      this.state = {
        list: [{ value: '先生', text: '先生', checked: true }, { value: '女士', text: '女士', checked: false }],
        defaults: [{ value: '是', text: '是', checked: false }, { value: '否', text: '否', checked: true }],
        name: '李俊辉',
        phone: '13790989809',
        numberPlate: '13号',
        addressList: [],
        address: { title: '', address: '' },
        maskType: false,
        city: '',
        selectAddressList: [],
        value: '',
        timer: null
      };
      this.getSuggestion = this.getSuggestion.bind(this);
      this.$$refs = [];
    }
  }, {
    key: "componentDidShow",
    value: function componentDidShow() {
      var selectAddress = _index2.default.getStorageSync('selectAddress'); //没有用到redux进行页面之间的传值,利用缓存进行页面之间的传值（缓存的是选择收货地址时缓存的值）
      var obj = { title: '', address: '' };
      if (selectAddress === '') {
        return;
      }selectAddress = JSON.parse(selectAddress);
      obj = selectAddress;
      this.setState({ address: obj });
      console.log(selectAddress);
    }
  }, {
    key: "componentDidMount",
    value: function componentDidMount() {
      var _this2 = this;

      _index2.default.showLoading({ title: "加载中", mask: true });
      _index2.default.getLocation({
        type: 'wgs84',
        success: function success(res) {
          _index2.default.hideLoading();
        },
        fail: function fail(res) {
          _index2.default.hideLoading();
          if (res.errMsg === 'getLocation:fail auth deny') {
            var data = (0, _interac.showModer)('', '您的定位功能已关闭，是否打开定位功能');
            data.then(function (res) {
              // console.log(res)
              if (res.confirm) {
                _this2.openSettings();
              }
              if (res.cancel) {
                //点击取消功能
                _index2.default.navigateBack();
              }
            });
          }
        }
      });
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      // console.log('卸载页面')
      _index2.default.removeStorageSync('selectAddress'); //清空该缓存
    }
  }, {
    key: "openSettings",
    value: function openSettings() {
      _index2.default.openSetting({
        success: function success(res) {
          console.log(res.authSetting["scope.userLocation"]); //返回true说明打开了定位功能
          if (!res.authSetting["scope.userLocation"]) {
            //如果不打开则返回上级页面
            _index2.default.navigateBack();
          }
        }
      });
    }
  }, {
    key: "names",
    value: function names(e) {
      // console.log(e)
      this.setState({ name: e.detail.value });
    }
  }, {
    key: "radio",
    value: function radio(e) {
      var list = this.state.list;

      list.map(function (item) {
        item.checked = false;
        if (item.value == e.detail.value) {
          item.checked = true;
        }
      });
      this.setState({ list: list });
    }
  }, {
    key: "defaultRadio",
    value: function defaultRadio(e) {
      var defaults = this.state.defaults;

      defaults.map(function (item) {
        item.checked = false;
        if (item.value == e.detail.value) {
          item.checked = true;
        }
      });
      this.setState({ defaults: defaults });
    }
  }, {
    key: "phone",
    value: function phone(e) {
      this.setState({ phone: e.detail.value });
    }
  }, {
    key: "plate",
    value: function plate(e) {
      this.setState({ numberPlate: e.detail.value });
    }
  }, {
    key: "save",
    value: function () {
      var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
        var _state, name, phone, numberPlate, address, list, defaults, sexIndex, defaultsIndex, arr, data;

        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _state = this.state, name = _state.name, phone = _state.phone, numberPlate = _state.numberPlate, address = _state.address, list = _state.list, defaults = _state.defaults;

                console.log(address);

                if (!(address.title === '')) {
                  _context.next = 5;
                  break;
                }

                (0, _interac.showModerNoCancel)('', '请选择地址');
                return _context.abrupt("return");

              case 5:
                sexIndex = 0;
                defaultsIndex = 0;

                list.forEach(function (item, index) {
                  if (item.checked) {
                    sexIndex = index;
                  }
                });
                defaults.map(function (item, index) {
                  if (item.checked) {
                    defaultsIndex = index;
                  }
                });
                arr = {
                  name: name,
                  sex: sexIndex === 0 ? 1 : 0,
                  mobile: phone,
                  province: address.province,
                  city: address.city,
                  district: address.district,
                  address: address.address,
                  house_number: numberPlate,
                  label: address.title,
                  district_code: address.adcode.toString(),
                  geography_info: JSON.stringify(address.location),
                  defaults: defaultsIndex === 0 ? 1 : 0
                };

                _index2.default.showLoading({ title: '保存中' });
                _context.next = 13;
                return _address2.default.addAddress(arr, "POST");

              case 13:
                data = _context.sent;

                _index2.default.hideLoading();

                if (data) {
                  _context.next = 17;
                  break;
                }

                return _context.abrupt("return");

              case 17:
                if (!(data.code != 0)) {
                  _context.next = 22;
                  break;
                }

                (0, _interac.showModerNoCancel)('', data.message + ',' + data.detail);
                return _context.abrupt("return");

              case 22:
                _index2.default.navigateBack();

              case 23:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function save() {
        return _ref2.apply(this, arguments);
      }

      return save;
    }()
  }, {
    key: "selectAddress",
    value: function selectAddress(e) {
      var maskType = this.state.maskType;

      this.setState({ maskType: !maskType });
      var address = { title: e.title, address: e.address };
      this.setState({ address: address });
    }
  }, {
    key: "inpChange",
    value: function inpChange(e) {
      var _this3 = this;

      var value = e.detail.value;
      this.setState({ value: value });
      clearTimeout(this.state.timer); //如果不断输入，就会清除上一个计时器
      var timer = setTimeout(function () {
        // console.log(e.detail.value)
        if (e.detail.value == '') {
          return;
        }_this3.getSuggestion(e.detail.value);
      }, 500);
      this.setState({ timer: timer });
    }
  }, {
    key: "getSuggestion",
    value: function getSuggestion(value) {
      var _this4 = this;

      var city = this.state.city;

      var qqmapsdk = new _qqmapWxJssdk2.default({ key: this.props.counter.key });
      var selectAddressList = [];
      qqmapsdk.getSuggestion({
        keyword: value,
        region: city,
        success: function success(res) {
          // console.log(res.data)
          res.data.map(function (item) {
            selectAddressList.push({ title: item.title, address: item.address });
          });
          // console.log(selectAddressList)
          _this4.setState({ selectAddressList: selectAddressList });
        }
      });
    }
  }, {
    key: "selectAddressMask",
    value: function selectAddressMask() {
      _index2.default.navigateTo({
        url: '/pages/selectaddress/selectaddress'
      });
    }
  }, {
    key: "_createData",
    value: function _createData() {
      this.__state = arguments[0] || this.state || {};
      this.__props = arguments[1] || this.props || {};
      var __isRunloopRef = arguments[2];
      var __prefix = this.$prefix;
      ;

      var _genCompid = (0, _index.genCompid)(__prefix + "$compid__15"),
          _genCompid2 = _slicedToArray(_genCompid, 2),
          $prevCompid__15 = _genCompid2[0],
          $compid__15 = _genCompid2[1];

      var _state2 = this.__state,
          address = _state2.address,
          list = _state2.list,
          name = _state2.name,
          phone = _state2.phone,
          numberPlate = _state2.numberPlate,
          defaults = _state2.defaults;
      // console.log(selectList)

      _index.propsManager.set({
        "value": "chevron-right",
        "size": "20",
        "color": "#757575",
        "className": "Icon"
      }, $compid__15, $prevCompid__15);
      Object.assign(this.__state, {
        $compid__15: $compid__15
      });
      return this.__state;
    }
  }]);

  return Index;
}(_index.Component), _class.$$events = ["defaultRadio", "names", "radio", "phone", "selectAddressMask", "plate", "save"], _class.$$componentPath = "pages/addaddress/addaddress", _temp2);
Index = tslib_1.__decorate([(0, _index3.connect)(function (_ref3) {
  var counter = _ref3.counter;
  return {
    counter: counter
  };
}, function (dispatch) {
  return {
    addAress: function addAress(newarrList) {
      // console.log(newarrList)
      dispatch((0, _counter.addAress)(newarrList));
    }
  };
})], Index);
exports.default = Index;

Component(require('../../npm/@tarojs/taro-weapp/index.js').default.createComponent(Index, true));