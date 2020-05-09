"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _class, _temp2; //底部栏,图标

var _tslib = require("../../npm/tslib/tslib.js");

var tslib_1 = _interopRequireWildcard(_tslib);

var _index = require("../../npm/@tarojs/taro-weapp/index.js");

var _index2 = _interopRequireDefault(_index);

var _index3 = require("../../npm/@tarojs/redux/index.js");

var _counter = require("../../actions/counter.js");

var _interac = require("../../interaction/interac.js");

var _helper = require("../../request/helper.js");

var _helper2 = _interopRequireDefault(_helper);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

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

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Index.__proto__ || Object.getPrototypeOf(Index)).call.apply(_ref, [this].concat(args))), _this), _this.$usedState = ["anonymousState__temp", "anonymousState__temp2", "$compid__19", "types", "codeNum", "getCodeType", "timer", "phone", "code", "name", "pass"], _this.config = {
      navigationBarTitleText: '登录'
    }, _this.customComponents = ["AtIcon"], _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(Index, [{
    key: "_constructor",
    value: function _constructor(props) {
      _get(Index.prototype.__proto__ || Object.getPrototypeOf(Index.prototype), "_constructor", this).call(this, props);

      this.state = {
        types: true,
        codeNum: 60,
        getCodeType: true,
        timer: null,
        phone: '',
        code: '',
        name: '',
        pass: '' //密码
      };
      this.getUserInfo = this.getUserInfo.bind(this);
      this.$$refs = [];
    }
  }, {
    key: "componentWillMount",
    value: function componentWillMount() {}
  }, {
    key: "componentDidMount",
    value: function componentDidMount() {}
  }, {
    key: "getUserInfo",
    value: function getUserInfo(e) {
      if (e.detail.userInfo) {
        //不为空说明用户已经点击了同意
        console.log(e.detail.userInfo);
        // this.props.userInformation({nickName :e.detail.userInfo.nickName})
        var informatiin = e.detail.userInfo;
        _index2.default.setStorageSync('informatiin', informatiin);
        _index2.default.login({
          success: function success(res) {
            console.log(res);
          }
        });
        _index2.default.navigateBack();
      }
    }
  }, {
    key: "phones",
    value: function phones(e) {
      // console.log(e.detail.value)
      this.setState({ phone: e.detail.value });
    }
  }, {
    key: "getCode",
    value: function getCode() {
      var phone = this.state.phone;

      if (phone.length != 11) {
        return;
      }if (!_helper2.default.passVer(phone)) {
        (0, _interac.showModerNoCancel)('', '手机格式有误');
        return;
      }
      _index2.default.navigateTo({
        url: '/pages/getcode/getcode?phone=' + phone
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

      var _genCompid = (0, _index.genCompid)(__prefix + "$compid__19"),
          _genCompid2 = _slicedToArray(_genCompid, 2),
          $prevCompid__19 = _genCompid2[0],
          $compid__19 = _genCompid2[1];

      var phone = this.__state.phone;

      var anonymousState__temp = (0, _index.internal_inline_style)(phone.length === 11 ? 'background-color: #fbc504;' : 'background-color: #cccccd;');
      var anonymousState__temp2 = "/img/wechat.png";
      _index.propsManager.set({
        "value": "chevron-right",
        "size": "20",
        "color": "#fbc504",
        "className": "Icon"
      }, $compid__19, $prevCompid__19);
      Object.assign(this.__state, {
        anonymousState__temp: anonymousState__temp,
        anonymousState__temp2: anonymousState__temp2,
        $compid__19: $compid__19
      });
      return this.__state;
    }
  }]);

  return Index;
}(_index.Component), _class.$$events = ["phones", "getCode", "getUserInfo"], _class.$$componentPath = "pages/login/login", _temp2);
Index = tslib_1.__decorate([(0, _index3.connect)(function (_ref2) {
  var counter = _ref2.counter;
  return {
    counter: counter
  };
}, function (dispatch) {
  return {
    userInformation: function userInformation(res) {
      dispatch((0, _counter.userInformation)(res));
    }
  };
})], Index);
exports.default = Index;

Component(require('../../npm/@tarojs/taro-weapp/index.js').default.createComponent(Index, true));