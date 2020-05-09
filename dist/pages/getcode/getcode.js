"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _class, _temp2;
// import { AtIcon } from 'taro-ui'//底部栏,图标

var _tslib = require("../../npm/tslib/tslib.js");

var tslib_1 = _interopRequireWildcard(_tslib);

var _index = require("../../npm/@tarojs/taro-weapp/index.js");

var _index2 = _interopRequireDefault(_index);

var _index3 = require("../../npm/@tarojs/redux/index.js");

var _counter = require("../../actions/counter.js");

var _interac = require("../../interaction/interac.js");

var _getcode = require("../../api/getcode.js");

var _getcode2 = _interopRequireDefault(_getcode);

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

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Index.__proto__ || Object.getPrototypeOf(Index)).call.apply(_ref, [this].concat(args))), _this), _this.$usedState = ["code", "focus", "phone", "getCodeType", "codeNum", "types", "timer", "currenIndex", "userInformation"], _this.config = {
      navigationBarTitleText: ''
    }, _this.customComponents = [], _temp), _possibleConstructorReturn(_this, _ret);
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
        currenIndex: 0,
        code: '',
        focus: false
      };
      this.getcode = this.getcode.bind(this);
      this.$$refs = [];
    }
  }, {
    key: "componentWillMount",
    value: function componentWillMount() {}
  }, {
    key: "componentDidMount",
    value: function componentDidMount() {
      this.setState({ phone: this.$router.params.phone }); //将上个页面的手机号传输过来
      this.getcode(this.$router.params.phone);
    }
  }, {
    key: "onBlur",
    value: function onBlur(e) {
      var _this2 = this;

      this.setState({ focus: false }, function () {
        console.log(_this2.state.code[1]);
      });
    }
  }, {
    key: "onInp",
    value: function onInp(e) {
      var _this3 = this;

      // console.log(e.detail.value)
      var phone = this.state.phone;

      this.setState({ code: e.detail.value }, function () {
        if (_this3.state.code.length == 6) {
          //说明输入到最后一位了
          var newcode = _this3.state.code;
          _this3.login(_this3.state.phone, newcode);
          _this3.setState({
            code: '',
            focus: false
          });
        }
      });
    }
  }, {
    key: "login",
    value: function () {
      var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(phone, codes) {
        var data, logindata, unionID;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _index2.default.showLoading({ title: '登录中', mask: true });
                _context.next = 3;
                return _getcode2.default.logins(phone, codes);

              case 3:
                data = _context.sent;

                console.log(data);

                if (!(data.code === 0)) {
                  _context.next = 16;
                  break;
                }

                // data.data: {id: 1464, token: "949d30db2216491c"}获取到的id和token
                _index2.default.setStorageSync('tokens', JSON.stringify(data.data)); //缓存
                console.log('--registerInYzc--');
                _context.next = 10;
                return _getcode2.default.registerInYzc(data.data);

              case 10:
                logindata = _context.sent;

                console.log('--registerInYzc--');
                _index2.default.hideLoading(); //隐藏加载框
                if (logindata.code === 0) {
                  // console.log({nickName:logindata.data.nickname,avatarUrl:logindata.data.avatar_image_url })
                  this.props.userInformation({ nickName: logindata.data.nickname, avatarUrl: logindata.data.avatar_image_url });
                  _index2.default.setStorageSync('unionId', JSON.stringify(logindata.data)); //缓存unid
                  _index2.default.navigateBack({
                    delta: 2
                  }); //登录成功后跳回来的页面
                } else {
                  if (typeof logindata.data != 'undefined' || logindata.data != '') {
                    //如果data不为空，但code不为0，说明可能已经注册过了
                    this.props.userInformation({ nickName: logindata.data.nickname, avatarUrl: logindata.data.avatar_image_url });
                    _index2.default.setStorageSync('unionId', JSON.stringify(logindata.data)); //缓存unid
                    unionID = _index2.default.getStorageSync('unionId'); //获取缓存的unionID

                    console.log(unionID);
                    _index2.default.navigateBack({
                      delta: 2
                    }); //登录成功后跳回来的页面
                  } else {
                    (0, _interac.showModerNoCancel)('', logindata.message + ',' + logindata.detail);
                  }
                }
                _context.next = 18;
                break;

              case 16:
                _index2.default.hideLoading(); //隐藏加载框
                (0, _interac.showModerNoCancel)('', data.message + ',' + data.detail);

              case 18:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function login(_x, _x2) {
        return _ref2.apply(this, arguments);
      }

      return login;
    }()
  }, {
    key: "getcode",
    value: function () {
      var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(phone) {
        var data, modoType;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.next = 2;
                return _getcode2.default.getCodes(phone);

              case 2:
                data = _context2.sent;

                if (!(data.code === 0)) {
                  _context2.next = 8;
                  break;
                }

                (0, _interac.showToast)('获取验证码成功');
                this.getcodeVerification();
                _context2.next = 11;
                break;

              case 8:
                _context2.next = 10;
                return (0, _interac.showModerNoCancel)('', data.message + ',' + data.detail);

              case 10:
                modoType = _context2.sent;

              case 11:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function getcode(_x3) {
        return _ref3.apply(this, arguments);
      }

      return getcode;
    }()
  }, {
    key: "getcodeVerification",
    value: function getcodeVerification() {
      var _this4 = this;

      var _state = this.state,
          codeNum = _state.codeNum,
          getCodeType = _state.getCodeType;

      if (getCodeType) {
        //true才可以点击
        var timer = setInterval(function () {
          _this4.setState({ codeNum: codeNum--, getCodeType: !getCodeType }, function () {
            if (codeNum === -1) {
              clearInterval(timer);
              _this4.setState({ codeNum: 60, getCodeType: true });
            }
          });
        }, 1000);
      }
    }
  }, {
    key: "_createData",
    value: function _createData() {
      var _this5 = this;

      this.__state = arguments[0] || this.state || {};
      this.__props = arguments[1] || this.props || {};
      var __isRunloopRef = arguments[2];
      var __prefix = this.$prefix;
      ;

      var _state2 = this.__state,
          phone = _state2.phone,
          code = _state2.code,
          codeNum = _state2.codeNum,
          getCodeType = _state2.getCodeType,
          focus = _state2.focus;


      this.anonymousFunc0 = function () {
        _this5.setState({ focus: true });
      };

      this.anonymousFunc1 = function () {
        if (getCodeType) {
          //判断是否可以点击获取验证码
          _this5.getcode(_this5.$router.params.phone);
        }
      };

      Object.assign(this.__state, {});
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
  }]);

  return Index;
}(_index.Component), _class.$$events = ["onInp", "onBlur", "anonymousFunc0", "anonymousFunc1"], _class.$$componentPath = "pages/getcode/getcode", _temp2);
Index = tslib_1.__decorate([(0, _index3.connect)(function (_ref4) {
  var counter = _ref4.counter;
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