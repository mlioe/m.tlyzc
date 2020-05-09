"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _class, _temp2;
// import { AtIcon } from 'taro-ui'//底部栏,图标

//交互反馈封装
// import { add, multiply } from '../../calculation'//封装的精度计算

// import { unionWith } from 'eslint-visitor-keys'


var _tslib = require("../../npm/tslib/tslib.js");

var tslib_1 = _interopRequireWildcard(_tslib);

var _index = require("../../npm/@tarojs/taro-weapp/index.js");

var _index2 = _interopRequireDefault(_index);

var _index3 = require("../../npm/@tarojs/redux/index.js");

var _interac = require("../../interaction/interac.js");

var _counter = require("../../actions/counter.js");

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

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Index.__proto__ || Object.getPrototypeOf(Index)).call.apply(_ref, [this].concat(args))), _this), _this.$usedState = ["anonymousState__temp", "anonymousState__temp2", "anonymousState__temp3", "anonymousState__temp4", "loopArray4", "$compid__11", "$compid__12", "$compid__13", "$compid__14", "tabList", "addressList", "selectList", "maskType", "counter", "addAress"], _this.config = {
      navigationBarTitleText: '提交订单'
    }, _this.anonymousFunc4Map = {}, _this.customComponents = ["AtIcon"], _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(Index, [{
    key: "_constructor",
    value: function _constructor(props) {
      _get(Index.prototype.__proto__ || Object.getPrototypeOf(Index.prototype), "_constructor", this).call(this, props);

      this.state = {
        tabList: [{ name: '123' }, { name: '123' }, { name: '123' }, { name: '123' }, { name: '123' }, { name: '123' }, { name: '123' }],
        addressList: [],
        maskType: false,
        selectList: { name: '', address: '', phone: '' }
      };
      this.selectAddress = this.selectAddress.bind(this);
      this.newaddress = this.newaddress.bind(this);
      this.subOrder = this.subOrder.bind(this);
      this.$$refs = [];
    }
  }, {
    key: "componentWillMount",
    value: function componentWillMount() {}
  }, {
    key: "componentDidShow",
    value: function componentDidShow() {
      this.getAddressList();
    }
  }, {
    key: "componentDidMount",
    value: function componentDidMount() {
      // let addressList = this.props.counter.addressList//获取redux中的地址列表
      // this.setState({addressList})
    }
  }, {
    key: "getAddressList",
    value: function () {
      var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
        var _this2 = this;

        var newarrList, data, arr, obj;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                // console.log('触发')
                _index2.default.showLoading({ title: '获取地址中' });
                newarrList = this.props.counter.addressList;
                _context.next = 4;
                return _address2.default.addresslist();

              case 4:
                data = _context.sent;

                console.log(data);
                _index2.default.hideLoading();
                arr = {};

                newarrList = [];
                if (data.code === 0) {
                  data.data.map(function (item) {
                    arr = item;
                    newarrList.push(arr);
                  });
                  this.props.addAress(newarrList);
                }
                obj = {};

                newarrList.map(function (item) {
                  if (item.is_default === 1) {
                    obj = item;
                    _this2.setState({ selectList: obj });
                  }
                });
                this.setState({ addressList: newarrList });

              case 13:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function getAddressList() {
        return _ref2.apply(this, arguments);
      }

      return getAddressList;
    }()
  }, {
    key: "newaddress",
    value: function newaddress() {
      _index2.default.navigateTo({
        url: '/pages/addaddress/addaddress'
      });
    }
  }, {
    key: "selectAddress",
    value: function selectAddress(index) {
      var address = this.state.addressList[index];
      console.log(address);
      var maskType = this.state.maskType;
      this.setState({
        selectList: address,
        maskType: !maskType
      });
    }
  }, {
    key: "subOrder",
    value: function subOrder() {
      var selectList = this.state.selectList;

      if (selectList.address == '') {
        (0, _interac.showToast)('地址为空');
        return;
      }
      _index2.default.switchTab({
        url: '/pages/order/order',
        success: function success(res) {
          console.log(res);
          if (res.errMsg === "switchTab:ok") {
            setTimeout(function () {
              console.log('去订单');
              _index2.default.navigateTo({
                url: '/pages/orderdetails/orderdetails'
              });
            }, 200);
          }
        }
      });
      return;
      _index2.default.requestPayment({
        timeStamp: '',
        nonceStr: '',
        package: '',
        signType: 'MD5',
        paySign: '',
        success: function success(res) {
          console.log(res);
        },
        fail: function fail(res) {
          console.log(res.errMsg);
          (0, _interac.showModerNoCancel)('', res.errMsg);
        }
      });
    }
  }, {
    key: "addAddress",
    value: function addAddress(e) {
      e.stopPropagation();
    }
  }, {
    key: "_createData",
    value: function _createData() {
      var _this3 = this;

      this.__state = arguments[0] || this.state || {};
      this.__props = arguments[1] || this.props || {};
      var __isRunloopRef = arguments[2];
      var __prefix = this.$prefix;
      ;

      var _genCompid = (0, _index.genCompid)(__prefix + "$compid__11"),
          _genCompid2 = _slicedToArray(_genCompid, 2),
          $prevCompid__11 = _genCompid2[0],
          $compid__11 = _genCompid2[1];

      var _genCompid3 = (0, _index.genCompid)(__prefix + "$compid__12"),
          _genCompid4 = _slicedToArray(_genCompid3, 2),
          $prevCompid__12 = _genCompid4[0],
          $compid__12 = _genCompid4[1];

      var _genCompid5 = (0, _index.genCompid)(__prefix + "$compid__13"),
          _genCompid6 = _slicedToArray(_genCompid5, 2),
          $prevCompid__13 = _genCompid6[0],
          $compid__13 = _genCompid6[1];

      var _genCompid7 = (0, _index.genCompid)(__prefix + "$compid__14"),
          _genCompid8 = _slicedToArray(_genCompid7, 2),
          $prevCompid__14 = _genCompid8[0],
          $compid__14 = _genCompid8[1];

      var _state = this.__state,
          tabList = _state.tabList,
          addressList = _state.addressList,
          maskType = _state.maskType,
          selectList = _state.selectList;

      console.log(selectList);

      this.anonymousFunc0 = function () {
        _this3.setState({ maskType: !maskType });
      };

      var anonymousState__temp = (0, _index.internal_inline_style)(selectList.name != '' ? 'display:none' : '');
      var anonymousState__temp2 = (0, _index.internal_inline_style)(selectList.name == '' ? 'display:none' : '');

      this.anonymousFunc1 = function () {
        _this3.setState({ maskType: !maskType });
      };

      var anonymousState__temp3 = (0, _index.internal_inline_style)(!maskType ? 'display:none' : '');

      this.anonymousFunc2 = function () {
        _this3.setState({ maskType: !maskType });
      };

      var anonymousState__temp4 = (0, _index.internal_inline_style)(!maskType ? 'display:none' : '');

      this.anonymousFunc3 = function () {
        _this3.setState({ maskType: !maskType });
      };

      var loopArray4 = addressList.map(function (item, index) {
        item = {
          $original: (0, _index.internal_get_original)(item)
        };

        var _$indexKey = "gzzzz" + index;

        _this3.anonymousFunc4Map[_$indexKey] = function () {
          _this3.selectAddress(index);
        };

        var _genCompid9 = (0, _index.genCompid)(__prefix + "hzzzzzzzzz" + index, true),
            _genCompid10 = _slicedToArray(_genCompid9, 2),
            $prevCompid__10 = _genCompid10[0],
            $compid__10 = _genCompid10[1];

        _index.propsManager.set({
          "value": "external-link",
          "size": "18",
          "color": "#333",
          "className": "Icon"
        }, $compid__10, $prevCompid__10);
        return {
          _$indexKey: _$indexKey,
          $compid__10: $compid__10,
          $original: item.$original
        };
      });
      _index.propsManager.set({
        "value": "add",
        "size": "16",
        "color": "white",
        "className": "Icon"
      }, $compid__11, $prevCompid__11);
      _index.propsManager.set({
        "value": "map-pin",
        "size": "16",
        "color": "#333",
        "className": "Icon"
      }, $compid__12, $prevCompid__12);
      _index.propsManager.set({
        "value": "clock",
        "size": "16",
        "color": "#333",
        "className": "Icon"
      }, $compid__13, $prevCompid__13);
      _index.propsManager.set({
        "value": "close",
        "size": "18",
        "color": "#333",
        "className": "Icon",
        "onClick": this.anonymousFunc3
      }, $compid__14, $prevCompid__14);
      Object.assign(this.__state, {
        anonymousState__temp: anonymousState__temp,
        anonymousState__temp2: anonymousState__temp2,
        anonymousState__temp3: anonymousState__temp3,
        anonymousState__temp4: anonymousState__temp4,
        loopArray4: loopArray4,
        $compid__11: $compid__11,
        $compid__12: $compid__12,
        $compid__13: $compid__13,
        $compid__14: $compid__14
      });
      return this.__state;
    }
  }, {
    key: "anonymousFunc0",
    value: function anonymousFunc0(e) {
      ;
    }
  }, {
    key: "anonymousFunc1",
    value: function anonymousFunc1(e) {
      ;
    }
  }, {
    key: "anonymousFunc2",
    value: function anonymousFunc2(e) {
      ;
    }
  }, {
    key: "anonymousFunc3",
    value: function anonymousFunc3(e) {
      ;
    }
  }, {
    key: "anonymousFunc4",
    value: function anonymousFunc4(_$indexKey) {
      var _anonymousFunc4Map;

      ;

      for (var _len2 = arguments.length, e = Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
        e[_key2 - 1] = arguments[_key2];
      }

      return this.anonymousFunc4Map[_$indexKey] && (_anonymousFunc4Map = this.anonymousFunc4Map)[_$indexKey].apply(_anonymousFunc4Map, e);
    }
  }]);

  return Index;
}(_index.Component), _class.$$events = ["anonymousFunc0", "anonymousFunc1", "subOrder", "anonymousFunc2", "anonymousFunc4", "addAddress", "newaddress"], _class.$$componentPath = "pages/suborder/suborder", _temp2);
Index = tslib_1.__decorate([(0, _index3.connect)(function (_ref3) {
  var counter = _ref3.counter;
  return {
    counter: counter
  };
}, function (dispatch) {
  return {
    addAress: function addAress(newarrList) {
      dispatch((0, _counter.addAress)(newarrList));
    }
  };
})], Index);
exports.default = Index;

Component(require('../../npm/@tarojs/taro-weapp/index.js').default.createComponent(Index, true));