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

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Index.__proto__ || Object.getPrototypeOf(Index)).call.apply(_ref, [this].concat(args))), _this), _this.$usedState = ["$compid__18", "defaults", "name", "list", "phone", "numberPlate", "address", "addressList", "maskType", "city", "selectAddressList", "value", "timer", "addressId", "counter"], _this.config = {
      navigationBarTitleText: '修改地址'
    }, _this.customComponents = ["AtIcon"], _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(Index, [{
    key: "_constructor",
    value: function _constructor(props) {
      _get(Index.prototype.__proto__ || Object.getPrototypeOf(Index.prototype), "_constructor", this).call(this, props);

      this.state = {
        list: [{ value: '先生', text: '先生', checked: true }, { value: '女士', text: '女士', checked: false }],
        defaults: [{ value: '是', text: '是', checked: false }, { value: '否', text: '否', checked: true }],
        name: '',
        phone: '',
        numberPlate: '',
        addressList: [],
        address: {},
        maskType: false,
        city: '',
        selectAddressList: [],
        value: '',
        timer: null,
        addressId: ''
      };
      this.getAddress = this.getAddress.bind(this);
      this.getSuggestion = this.getSuggestion.bind(this);
      this.$$refs = [];
    }
  }, {
    key: "componentWillMount",
    value: function componentWillMount() {
      // console.log(this.$router.params.id)
      this.addressDetail(this.$router.params.id);
    }
  }, {
    key: "componentDidShow",
    value: function componentDidShow() {
      var selectAddress = _index2.default.getStorageSync('selectAddress'); //没有用到redux进行页面之间的传值,利用缓存进行页面之间的传值（缓存的是选择收货地址时缓存的值）
      var obj = {};
      if (selectAddress === '') {
        return;
      }selectAddress = JSON.parse(selectAddress);
      obj = selectAddress;
      this.setState({ address: obj });
      // console.log(selectAddress)
    }
  }, {
    key: "componentDidMount",
    value: function componentDidMount() {
      var _this2 = this;

      _index2.default.getLocation({
        type: 'wgs84',
        success: function success(res) {
          _this2.getAddress(res.latitude, res.longitude);
        },
        fail: function fail(res) {
          // console.log(res)
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
      _index2.default.removeStorageSync('selectAddress'); //清空该缓存
    }
  }, {
    key: "addressDetail",
    value: function () {
      var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(id) {
        var data, _state, defaults, list, obj, defaultsIndex, sexIndex;

        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _index2.default.showLoading({ title: '加载详情中', mask: true });
                _context.next = 3;
                return _address2.default.addressDetails(id);

              case 3:
                data = _context.sent;
                _state = this.state, defaults = _state.defaults, list = _state.list;
                obj = {
                  province: data.data.province,
                  city: data.data.city,
                  district: data.data.district,
                  address: data.data.address,
                  title: data.data.label,
                  adcode: data.data.district_code,
                  geography_info: data.data.geography_info
                };
                defaultsIndex = data.data.is_default === 1 ? 0 : 1; //后端传回1代表为默认地址，我这边的列表0是默认，所以将1转为0

                sexIndex = data.data.sex === 1 ? 0 : 1; //后端传回1代表为性别，我这边的列表0是男，所以将1转为0

                defaults.map(function (item) {
                  item.checked = false;
                });
                list.map(function (item) {
                  item.checked = false;
                });
                defaults[defaultsIndex].checked = true;
                list[sexIndex].checked = true;
                // console.log(obj)
                this.setState({
                  defaults: defaults,
                  list: list,
                  name: data.data.name,
                  phone: data.data.mobile,
                  address: obj,
                  numberPlate: data.data.house_number,
                  addressId: data.data.id
                });
                // console.log()
                _index2.default.hideLoading();

              case 14:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function addressDetail(_x) {
        return _ref2.apply(this, arguments);
      }

      return addressDetail;
    }()
  }, {
    key: "openSettings",
    value: function openSettings() {
      _index2.default.openSetting({
        success: function success(res) {
          console.log(res.authSetting["scope.userLocation"]); //返回true说明打开了定位功能
          if (!res.authSetting["scope.userLocation"]) {
            _index2.default.navigateBack();
          }
        }
      });
    }
  }, {
    key: "getAddress",
    value: function getAddress(latitude, longitude) {
      var _this3 = this;

      var qqmapsdk = new _qqmapWxJssdk2.default({ key: this.props.counter.key });
      qqmapsdk.reverseGeocoder({
        location: {
          latitude: latitude,
          longitude: longitude
        },
        success: function success(res) {
          var city = res.result.address_component.city;
          var selectAddressList = [{ title: res.result.formatted_addresses.recommend, address: res.result.address }]; //获取地址名称，和地址的位置
          _this3.setState({ selectAddressList: selectAddressList, city: city });
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
      var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
        var _state2, name, phone, numberPlate, address, list, defaults, addressId, sexIndex, defaultsIndex, arr, data;

        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _state2 = this.state, name = _state2.name, phone = _state2.phone, numberPlate = _state2.numberPlate, address = _state2.address, list = _state2.list, defaults = _state2.defaults, addressId = _state2.addressId;

                if (!(address === '')) {
                  _context2.next = 4;
                  break;
                }

                (0, _interac.showModer)('', '请选择地址');
                return _context2.abrupt("return");

              case 4:
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
                  district_code: typeof address.adcode === 'string' ? address.adcode : address.adcode.toString(),
                  geography_info: address.geography_info,
                  defaults: defaultsIndex === 0 ? 1 : 0,
                  id: addressId
                };

                _index2.default.showLoading({ title: '保存中' });
                _context2.next = 12;
                return _address2.default.addAddress(arr, "PUT");

              case 12:
                data = _context2.sent;

                _index2.default.hideLoading();

                if (data) {
                  _context2.next = 16;
                  break;
                }

                return _context2.abrupt("return");

              case 16:
                if (!(data.code != 0)) {
                  _context2.next = 21;
                  break;
                }

                (0, _interac.showModerNoCancel)('', data.message + ',' + data.detail);
                return _context2.abrupt("return");

              case 21:
                _index2.default.navigateBack();

              case 22:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function save() {
        return _ref3.apply(this, arguments);
      }

      return save;
    }()
  }, {
    key: "deletes",
    value: function () {
      var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3() {
        var types, data;
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _context3.next = 2;
                return (0, _interac.showModer)('', '确认删除？');

              case 2:
                types = _context3.sent;

                if (!types.confirm) {
                  _context3.next = 15;
                  break;
                }

                _index2.default.showLoading({ title: '删除中' });
                _context3.next = 7;
                return _address2.default.deletesAddress(this.state.addressId);

              case 7:
                data = _context3.sent;

                _index2.default.hideLoading();

                if (!(data.code != 0)) {
                  _context3.next = 14;
                  break;
                }

                (0, _interac.showModerNoCancel)('', data.message + ',' + data.detail);
                return _context3.abrupt("return");

              case 14:
                _index2.default.navigateBack();

              case 15:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      function deletes() {
        return _ref4.apply(this, arguments);
      }

      return deletes;
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
      var _this4 = this;

      var value = e.detail.value;
      this.setState({ value: value });
      clearTimeout(this.state.timer); //如果不断输入，就会清除上一个计时器
      var timer = setTimeout(function () {
        // console.log(e.detail.value)
        if (e.detail.value == '') {
          return;
        }_this4.getSuggestion(e.detail.value);
      }, 500);
      this.setState({ timer: timer });
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
    key: "getSuggestion",
    value: function getSuggestion(value) {
      var _this5 = this;

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
          _this5.setState({ selectAddressList: selectAddressList });
        }
      });
    }
  }, {
    key: "selectAddressMask",
    value: function selectAddressMask() {
      // console.log(this.state.address)
      _index2.default.navigateTo({
        url: '/pages/selectaddress/selectaddress?title=' + this.state.address.title + '&geography_info=' + this.state.address.geography_info + '&city=' + this.state.address.city
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

      var _genCompid = (0, _index.genCompid)(__prefix + "$compid__18"),
          _genCompid2 = _slicedToArray(_genCompid, 2),
          $prevCompid__18 = _genCompid2[0],
          $compid__18 = _genCompid2[1];

      var _state3 = this.__state,
          address = _state3.address,
          list = _state3.list,
          name = _state3.name,
          phone = _state3.phone,
          numberPlate = _state3.numberPlate,
          defaults = _state3.defaults;
      // console.log(selectList)

      _index.propsManager.set({
        "value": "chevron-right",
        "size": "20",
        "color": "#757575",
        "className": "Icon"
      }, $compid__18, $prevCompid__18);
      Object.assign(this.__state, {
        $compid__18: $compid__18
      });
      return this.__state;
    }
  }]);

  return Index;
}(_index.Component), _class.$$events = ["defaultRadio", "names", "radio", "phone", "selectAddressMask", "plate", "save", "deletes"], _class.$$componentPath = "pages/editaddress/editaddress", _temp2);
Index = tslib_1.__decorate([(0, _index3.connect)(function (_ref5) {
  var counter = _ref5.counter;
  return {
    counter: counter
  };
}, function (dispatch) {
  return {
    addAress: function addAress(newarrList) {
      console.log(newarrList);
      dispatch((0, _counter.addAress)(newarrList));
    }
  };
})], Index);
exports.default = Index;

Component(require('../../npm/@tarojs/taro-weapp/index.js').default.createComponent(Index, true));