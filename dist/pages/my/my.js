"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _class, _temp2; //交互反馈封装


var _tslib = require("../../npm/tslib/tslib.js");

var tslib_1 = _interopRequireWildcard(_tslib);

var _index = require("../../npm/@tarojs/taro-weapp/index.js");

var _index2 = _interopRequireDefault(_index);

var _index3 = require("../../npm/@tarojs/redux/index.js");

var _interac = require("../../interaction/interac.js");

var _counter = require("../../actions/counter.js");

var _admin = require("../../api/admin.js");

var _admin2 = _interopRequireDefault(_admin);

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

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Index.__proto__ || Object.getPrototypeOf(Index)).call.apply(_ref, [this].concat(args))), _this), _this.$usedState = ["anonymousState__temp", "anonymousState__temp2", "anonymousState__temp3", "anonymousState__temp4", "anonymousState__temp5", "anonymousState__temp6", "imgUrl", "name", "counter", "userInformation", "addAress"], _this.config = {
      navigationBarTitleText: '我的'
    }, _this.customComponents = [], _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(Index, [{
    key: "_constructor",
    value: function _constructor(props) {
      _get(Index.prototype.__proto__ || Object.getPrototypeOf(Index.prototype), "_constructor", this).call(this, props);

      this.state = {
        name: '',
        imgUrl: ''
      };
      this.userDetails = this.userDetails.bind(this);
      this.$$refs = [];
    }
  }, {
    key: "componentWillMount",
    value: function componentWillMount() {
      _index2.default.setNavigationBarColor({
        frontColor: '#ffffff',
        backgroundColor: '#333a45',
        animation: {
          duration: 0,
          timingFunc: 'easeIn'
        }
      });
    }
  }, {
    key: "componentDidMount",
    value: function componentDidMount() {}
  }, {
    key: "componentDidShow",
    value: function componentDidShow() {
      // console.log(this.props.counter.information.nickName)
      if (this.props.counter.information.nickName != '') {
        this.userDetails();
        // this.userRoleList()
      }
    }
  }, {
    key: "editUser",
    value: function editUser() {
      if (this.props.counter.information.nickName == '') {
        (0, _interac.showModerNoCancel)('', '请先登录');
        return;
      }
      _index2.default.navigateTo({
        url: '/pages/edituser/edituser'
      });
    }
  }, {
    key: "userRoleList",
    value: function () {
      var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
        var data;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return _admin2.default.storeUser();

              case 2:
                data = _context.sent;

                console.log('---');
                console.log(data);

              case 5:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function userRoleList() {
        return _ref2.apply(this, arguments);
      }

      return userRoleList;
    }()
  }, {
    key: "userDetails",
    value: function () {
      var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
        var data;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.next = 2;
                return _admin2.default.useDetails();

              case 2:
                data = _context2.sent;

                console.log(data);
                if (data.code === 0) {
                  //获取用户资料
                  this.setState({
                    name: data.data.nickname,
                    imgUrl: data.data.avatar_image_url
                  });
                }

              case 5:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function userDetails() {
        return _ref3.apply(this, arguments);
      }

      return userDetails;
    }()
  }, {
    key: "quit",
    value: function () {
      var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3() {
        var res, newarrList;
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _context3.next = 2;
                return (0, _interac.showModer)('', '确认退出？');

              case 2:
                res = _context3.sent;
                //标题，提示内容
                if (res.confirm) {
                  console.log('退出');
                  this.props.userInformation({ nickName: '' });
                  _index2.default.removeStorageSync('informatiin'); //清空缓存
                  _index2.default.removeStorageSync('tokens');
                  _index2.default.removeStorageSync('unionId');
                  newarrList = [];

                  this.props.addAress(newarrList);
                  this.setState({ imgUrl: '', name: '' });
                }

              case 4:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      function quit() {
        return _ref4.apply(this, arguments);
      }

      return quit;
    }()
  }, {
    key: "login",
    value: function login() {
      _index2.default.navigateTo({
        url: '/pages/login/login'
      });
    }
  }, {
    key: "addressList",
    value: function () {
      var _ref5 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4() {
        var data;
        return regeneratorRuntime.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                console.log(this.props.counter.information.nickName);

                if (!(this.props.counter.information.nickName == '')) {
                  _context4.next = 4;
                  break;
                }

                data = (0, _interac.showModerNoCancel)('', '请先登录');
                return _context4.abrupt("return");

              case 4:
                _index2.default.navigateTo({
                  url: '/pages/addresslist/addresslist'
                });

              case 5:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, this);
      }));

      function addressList() {
        return _ref5.apply(this, arguments);
      }

      return addressList;
    }()
  }, {
    key: "shopPhone",
    value: function shopPhone() {
      _index2.default.makePhoneCall({ phoneNumber: '13250746933' });
    }
  }, {
    key: "_createData",
    value: function _createData() {
      this.__state = arguments[0] || this.state || {};
      this.__props = arguments[1] || this.props || {};
      var __isRunloopRef = arguments[2];
      var __prefix = this.$prefix;
      ;

      // let information = this.props.counter.information
      var _state = this.__state,
          imgUrl = _state.imgUrl,
          name = _state.name;

      var anonymousState__temp = (0, _index.internal_inline_style)(name === '' ? '' : 'display:none');
      var anonymousState__temp2 = (0, _index.internal_inline_style)(name === '' ? '' : 'dispaly:none');
      var anonymousState__temp3 = "/img/dizhi.png";
      var anonymousState__temp4 = "/img/kefu.png";
      var anonymousState__temp5 = "/img/mydetail.png";
      var anonymousState__temp6 = (0, _index.internal_inline_style)(name != '' ? '' : 'display:none');
      Object.assign(this.__state, {
        anonymousState__temp: anonymousState__temp,
        anonymousState__temp2: anonymousState__temp2,
        anonymousState__temp3: anonymousState__temp3,
        anonymousState__temp4: anonymousState__temp4,
        anonymousState__temp5: anonymousState__temp5,
        anonymousState__temp6: anonymousState__temp6
      });
      return this.__state;
    }
  }]);

  return Index;
}(_index.Component), _class.$$events = ["login", "addressList", "shopPhone", "editUser", "quit"], _class.$$componentPath = "pages/my/my", _temp2);
Index = tslib_1.__decorate([(0, _index3.connect)(function (_ref6) {
  var counter = _ref6.counter;
  return {
    counter: counter
  };
}, function (dispatch) {
  return {
    userInformation: function userInformation(res) {
      dispatch((0, _counter.userInformation)(res));
    },
    addAress: function addAress(newarrList) {
      dispatch((0, _counter.addAress)(newarrList));
    }
  };
})], Index);
exports.default = Index;

Component(require('../../npm/@tarojs/taro-weapp/index.js').default.createComponent(Index, true));