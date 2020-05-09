"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _class, _temp2;
// import { AtIcon } from 'taro-ui'//底部栏,图标

var _tslib = require("../../npm/tslib/tslib.js");

var tslib_1 = _interopRequireWildcard(_tslib);

var _index = require("../../npm/@tarojs/taro-weapp/index.js");

var _index2 = _interopRequireDefault(_index);

var _index3 = require("../../npm/@tarojs/redux/index.js");

var _admin = require("../../api/admin.js");

var _admin2 = _interopRequireDefault(_admin);

var _interac = require("../../interaction/interac.js");

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

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Index.__proto__ || Object.getPrototypeOf(Index)).call.apply(_ref, [this].concat(args))), _this), _this.$usedState = ["$compid__6", "$compid__7", "$compid__8", "$compid__9", "imgUrl", "nickname", "sex", "dateSel", "birthday", "str", "selector", "files"], _this.config = {
      navigationBarTitleText: '修改资料'
    }, _this.onChange = function (e) {
      // console.log(e.detail.value)
      _this.setState({
        sex: typeof e.detail.value === 'string' ? Number(e.detail.value) : e.detail.value
      });
    }, _this.onDateChange = function (e) {
      _this.setState({
        dateSel: e.detail.value,
        birthday: e.detail.value
      });
    }, _this.customComponents = ["AtIcon"], _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(Index, [{
    key: "_constructor",
    value: function _constructor(props) {
      _get(Index.prototype.__proto__ || Object.getPrototypeOf(Index.prototype), "_constructor", this).call(this, props);

      this.state = {
        imgUrl: '',
        birthday: '',
        nickname: '',
        sex: 0,
        dateSel: '',
        selector: ['男', '女'],
        files: [],
        str: ''
      };
      this.$$refs = [];
    }
  }, {
    key: "componentWillMount",
    value: function componentWillMount() {}
  }, {
    key: "componentDidMount",
    value: function componentDidMount() {
      this.userDetails();
    }
  }, {
    key: "componentDidShow",
    value: function componentDidShow() {}
  }, {
    key: "userDetails",
    value: function () {
      var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
        var data;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return _admin2.default.useDetails();

              case 2:
                data = _context.sent;

                console.log(data);
                if (data.code === 0) {
                  //获取用户资料
                  this.setState({
                    imgUrl: data.data.avatar_image_url,
                    birthday: data.data.birthday,
                    nickname: data.data.nickname,
                    sex: data.data.sex === null ? 0 : data.data.sex
                  });
                }

              case 5:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function userDetails() {
        return _ref2.apply(this, arguments);
      }

      return userDetails;
    }()
  }, {
    key: "onInput",
    value: function onInput(e) {
      this.setState({ nickname: e.detail.value });
    }
  }, {
    key: "save",
    value: function () {
      var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
        var _state, birthday, sex, nickname, imgUrl, response, data;

        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _state = this.state, birthday = _state.birthday, sex = _state.sex, nickname = _state.nickname, imgUrl = _state.imgUrl;
                response = {
                  nickname: nickname,
                  sex: typeof sex === 'string' ? Number(sex) : sex,
                  birthday: birthday,
                  imgUrl: imgUrl
                };
                _context2.next = 4;
                return _admin2.default.putUser(response);

              case 4:
                data = _context2.sent;

                if (data) {
                  _context2.next = 7;
                  break;
                }

                return _context2.abrupt("return");

              case 7:
                if (data.code === 0) {
                  (0, _interac.showToast)('更新成功');
                  setTimeout(function () {
                    _index2.default.navigateBack();
                  }, 1500);
                } else {
                  (0, _interac.showModerNoCancel)('', data.message + ',' + data.detail);
                }

              case 8:
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
    key: "onClickImg",
    value: function onClickImg() {
      var _this2 = this;

      _index2.default.chooseImage({
        sourceType: ['album', 'camera'],
        count: 1,
        success: function success(res) {
          console.log(res);
          // return
          _this2.setState({
            imgUrl: res.tempFilePaths[0],
            str: res.tempFilePaths[0]
          }, function () {
            _admin2.default.adminHand(res.tempFilePaths[0]);
          });
        }
      });
    }
  }, {
    key: "sc",
    value: function () {
      var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3() {
        var _state2, birthday, sex, nickname, response, imgUrl, data;

        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _state2 = this.state, birthday = _state2.birthday, sex = _state2.sex, nickname = _state2.nickname;
                response = {
                  nickname: nickname,
                  sex: typeof sex === 'string' ? Number(sex) : sex,
                  birthday: birthday
                };
                imgUrl = this.state.imgUrl;
                _context3.next = 5;
                return _admin2.default.adminHand(imgUrl, response);

              case 5:
                data = _context3.sent;

                console.log(data);

              case 7:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      function sc() {
        return _ref4.apply(this, arguments);
      }

      return sc;
    }()
  }, {
    key: "onImageClick",
    value: function onImageClick(index, file) {
      console.log(index, file);
    }
  }, {
    key: "onAt",
    value: function onAt(e) {
      console.log(e);
    }
  }, {
    key: "_createData",
    value: function _createData() {
      this.__state = arguments[0] || this.state || {};
      this.__props = arguments[1] || this.props || {};
      var __isRunloopRef = arguments[2];
      var __prefix = this.$prefix;
      ;

      var _genCompid = (0, _index.genCompid)(__prefix + "$compid__6"),
          _genCompid2 = _slicedToArray(_genCompid, 2),
          $prevCompid__6 = _genCompid2[0],
          $compid__6 = _genCompid2[1];

      var _genCompid3 = (0, _index.genCompid)(__prefix + "$compid__7"),
          _genCompid4 = _slicedToArray(_genCompid3, 2),
          $prevCompid__7 = _genCompid4[0],
          $compid__7 = _genCompid4[1];

      var _genCompid5 = (0, _index.genCompid)(__prefix + "$compid__8"),
          _genCompid6 = _slicedToArray(_genCompid5, 2),
          $prevCompid__8 = _genCompid6[0],
          $compid__8 = _genCompid6[1];

      var _genCompid7 = (0, _index.genCompid)(__prefix + "$compid__9"),
          _genCompid8 = _slicedToArray(_genCompid7, 2),
          $prevCompid__9 = _genCompid8[0],
          $compid__9 = _genCompid8[1];

      var _state3 = this.__state,
          imgUrl = _state3.imgUrl,
          birthday = _state3.birthday,
          nickname = _state3.nickname,
          sex = _state3.sex,
          dateSel = _state3.dateSel,
          str = _state3.str;
      // console.log(addressList)

      _index.propsManager.set({
        "value": "chevron-right",
        "size": "20",
        "color": "#757575",
        "className": "Icon"
      }, $compid__6, $prevCompid__6);
      _index.propsManager.set({
        "value": "chevron-right",
        "size": "20",
        "color": "#757575",
        "className": "Icon"
      }, $compid__7, $prevCompid__7);
      _index.propsManager.set({
        "value": "chevron-right",
        "size": "20",
        "color": "#757575",
        "className": "Icon"
      }, $compid__8, $prevCompid__8);
      _index.propsManager.set({
        "value": "chevron-right",
        "size": "20",
        "color": "#757575",
        "className": "Icon"
      }, $compid__9, $prevCompid__9);
      Object.assign(this.__state, {
        $compid__6: $compid__6,
        $compid__7: $compid__7,
        $compid__8: $compid__8,
        $compid__9: $compid__9
      });
      return this.__state;
    }
  }]);

  return Index;
}(_index.Component), _class.$$events = ["onClickImg", "onInput", "onChange", "onDateChange", "save"], _class.$$componentPath = "pages/edituser/edituser", _temp2);
Index = tslib_1.__decorate([(0, _index3.connect)(function (_ref5) {
  var counter = _ref5.counter;
  return {
    counter: counter
  };
}, function (dispatch) {
  return {};
})], Index);
exports.default = Index;

Component(require('../../npm/@tarojs/taro-weapp/index.js').default.createComponent(Index, true));