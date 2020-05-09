"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _class, _temp2;
// import { ComponentClass } from 'react'

// import { AtIcon } from 'taro-ui'//底部栏,图标

//交互反馈封装

// console.log(showModer)
//封装的精度计算


var _tslib = require("../../npm/tslib/tslib.js");

var tslib_1 = _interopRequireWildcard(_tslib);

var _index = require("../../npm/@tarojs/taro-weapp/index.js");

var _index2 = _interopRequireDefault(_index);

var _index3 = require("../../npm/@tarojs/redux/index.js");

var _interac = require("../../interaction/interac.js");

var _counter = require("../../actions/counter.js");

var _index4 = require("../../calculation/index.js");

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

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Index.__proto__ || Object.getPrototypeOf(Index)).call.apply(_ref, [this].concat(args))), _this), _this.$usedState = ["anonymousState__temp9", "anonymousState__temp10", "anonymousState__temp11", "anonymousState__temp12", "anonymousState__temp13", "loopArray1", "loopArray2", "$compid__4", "$compid__5", "labelId", "current", "arrayListTitle", "currId", "tabList", "showList", "total", "title", "maskType", "detailsMask", "fatherTop", "sonTop", "tapScroll", "timer", "userInformation", "addAress", "counter"], _this.config = {
      navigationBarTitleText: '月子套餐'
    }, _this.anonymousFunc2Map = {}, _this.anonymousFunc3Map = {}, _this.customComponents = ["AtIcon"], _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(Index, [{
    key: "_constructor",
    value: function _constructor(props) {
      _get(Index.prototype.__proto__ || Object.getPrototypeOf(Index.prototype), "_constructor", this).call(this, props);

      this.state = {
        title: '',
        current: 0,
        currId: '',
        labelId: '',
        maskType: false,
        detailsMask: false,
        tabList: [{
          title: '套餐', showlist: [{ name: '益禾堂益禾堂益禾堂益禾堂益禾堂', money: 1, sold: 7000, good: 10, num: 0, showid: 'msg01', numType: false }, { name: '益禾堂1', money: 12.24, sold: 7000, good: 10, num: 0, showid: 'msg02', numType: true }, { name: '益禾堂2', money: 1, sold: 7000, good: 10, num: 0, showid: 'msg05', numType: true }]
        }, {
          title: '套餐', showlist: [{ name: '益禾堂', money: 12, sold: 7000, good: 10, num: 0, showid: 'msg77', numType: true }, { name: '益禾堂1', money: 3, sold: 7000, good: 10, num: 0, showid: 'msg90', numType: true }, { name: '益禾堂2', money: 1.2, sold: 7000, good: 10, num: 0, showid: 'msg06', numType: true }]
        }, {
          title: '套餐', showlist: [{ name: '益禾堂', money: 420, sold: 7000, good: 10, num: 0, showid: 'msg177', numType: true }, { name: '益禾堂1', money: 420, sold: 7000, good: 10, num: 0, showid: 'msg10086', numType: true }, { name: '益禾堂2', money: 420, sold: 7000, good: 10, num: 0, showid: 'msg34', numType: true }, { name: '益禾堂2', money: 420, sold: 7000, good: 10, num: 0, showid: 'msg34', numType: true }]
        }, {
          title: '套餐', showlist: [{ name: '益禾堂', money: 420, sold: 7000, good: 10, num: 0, showid: 'msg177', numType: true }, { name: '益禾堂1', money: 420, sold: 7000, good: 10, num: 0, showid: 'msg10086', numType: true }, { name: '益禾堂2', money: 420, sold: 7000, good: 10, num: 0, showid: 'msg34', numType: true }, { name: '益禾堂2', money: 420, sold: 7000, good: 10, num: 0, showid: 'msg34', numType: true }]
        }, {
          title: '套餐', showlist: [{ name: '益禾堂', money: 420, sold: 7000, good: 10, num: 0, showid: 'msg177', numType: true }]
        }, {
          title: '套餐', showlist: [{ name: '益禾堂', money: 420, sold: 7000, good: 10, num: 0, showid: 'msg177', numType: true }]
        }, {
          title: '套餐', showlist: [{ name: '益禾堂', money: 420, sold: 7000, good: 10, num: 0, showid: 'msg177', numType: true }]
        }, {
          title: '套餐', showlist: [{ name: '益禾堂', money: 420, sold: 7000, good: 10, num: 0, showid: 'msg177', numType: true }]
        }, {
          title: '套餐', showlist: [{ name: '益禾堂', money: 420, sold: 7000, good: 10, num: 0, showid: 'msg177', numType: true }]
        }, {
          title: '套餐', showlist: [{ name: '益禾堂', money: 420, sold: 7000, good: 10, num: 0, showid: 'msg177', numType: true }]
        }],
        showList: [],
        total: 0,
        fatherTop: 0,
        sonTop: [],
        tapScroll: true,
        timer: null
      };
      this.editMaskType = this.editMaskType.bind(this);
      this.empty = this.empty.bind(this);
      this.calculation = this.calculation.bind(this);
      this.showSub = this.showSub.bind(this);
      this.showAdd = this.showAdd.bind(this);
      this.goSubOrder = this.goSubOrder.bind(this);
      this.$$refs = [];
    }
  }, {
    key: "componentWillMount",
    value: function componentWillMount() {
      var tokens = _index2.default.getStorageSync('tokens'); //获取用户缓存的token
      var unionID = _index2.default.getStorageSync('unionId');
      console.log(tokens);
      if (unionID) {
        //不为空时将个人信息传入redux
        tokens = JSON.parse(tokens);
        unionID = JSON.parse(unionID);
        var arr = { nickName: unionID.nickname, avatarUrl: unionID.avatar_image_url };
        this.props.userInformation(arr);
        this.userType();
      }
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
    value: function componentDidMount() {
      var _this2 = this;

      _index2.default.createSelectorQuery().select('.scrollViews').boundingClientRect(function (rect) {
        _this2.setState({ fatherTop: rect.top }, function () {
          _index2.default.createSelectorQuery().selectAll('.listBox').boundingClientRect(function (res) {
            _this2.arrHeight(res);
          }).exec();
        });
      }).exec();
      _index2.default.request({
        url: "http://192.168.31.238:8100/customer/user/test",
        method: 'GET',
        // mode: 'no-cors',
        success: function success(res) {
          console.log(res);
        },
        fail: function fail(error) {
          console.log(error);
        }
      });
    }
  }, {
    key: "userType",
    value: function () {
      var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
        var data, newarrList;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return _admin2.default.useDetails();

              case 2:
                data = _context.sent;

                // console.log(data)
                if (data.code != 0) {
                  //获取用户资料,不为0过期
                  this.props.userInformation({ avatarUrl: '', nickName: '' });
                  _index2.default.removeStorageSync('informatiin'); //清空缓存
                  _index2.default.removeStorageSync('tokens');
                  _index2.default.removeStorageSync('unionId');
                  newarrList = [];

                  this.props.addAress(newarrList);
                }

              case 4:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function userType() {
        return _ref2.apply(this, arguments);
      }

      return userType;
    }()
  }, {
    key: "arrHeight",
    value: function arrHeight(res) {
      var fatherTop = this.state.fatherTop;

      var arr = [];
      // console.log(fatherTop)
      res.map(function (item) {
        arr.push({
          startTop: item.top - fatherTop,
          endTop: item.top - fatherTop + item.height //结束的区间
        });
      });
      this.setState({ sonTop: arr });
    }
  }, {
    key: "addshow",
    value: function addshow(item, index, index2, e) {
      var _this3 = this;

      e.stopPropagation();
      var tabList = this.state.tabList;

      console.log(tabList[index].showlist[index2].numType);
      if (!tabList[index].showlist[index2].numType) {
        return;
      }tabList[index].showlist[index2].num++;
      this.setState({ tabList: tabList });
      var array = [];
      tabList.map(function (val) {
        val.showlist.map(function (val2) {
          if (val2.num > 0) {
            array.push(val2);
          }
        });
      });
      this.setState({ showList: array }, function () {
        _this3.calculation();
      }); //将值不是0的赋值给购物车列表
    }
  }, {
    key: "delshow",
    value: function delshow(item, index, index2, e) {
      var _this4 = this;

      // console.log(item)
      e.stopPropagation();
      var tabList = this.state.tabList;

      if (tabList[index].showlist[index2].num <= 0) {
        //优化商品数量判断，点击过快会变成负数，小于0时强制改回0
        tabList[index].showlist[index2].num = 0;
      } else {
        tabList[index].showlist[index2].num--;
      }
      this.setState({ tabList: tabList });
      var array = [];
      tabList.map(function (val) {
        val.showlist.map(function (val2) {
          if (val2.num > 0) {
            array.push(val2);
          }
        });
      });
      this.setState({ showList: array }, function () {
        _this4.calculation();
      }); //将值不是0的赋值给购物车列表
    }
  }, {
    key: "empty",
    value: function () {
      var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
        var res, tabList;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.next = 2;
                return (0, _interac.showModer)('', '确认清空购物车？');

              case 2:
                res = _context2.sent;
                //标题，提示内容
                tabList = this.state.tabList;

                if (res.confirm) {
                  //confirm为true说明点了确定
                  tabList.map(function (item) {
                    item.showlist.map(function (item2) {
                      item2.num = 0;
                    });
                  });
                  this.setState({
                    maskType: false,
                    showList: [],
                    total: 0
                  });
                }

              case 5:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function empty() {
        return _ref3.apply(this, arguments);
      }

      return empty;
    }()
  }, {
    key: "calculation",
    value: function calculation() {
      var showList = this.state.showList;

      var nums = 0;
      if (showList.length == 0) {
        //如果数组为0，直接阻止下面的计算，并将值改为0
        this.setState({ total: 0 });
        return;
      }
      showList.map(function (item) {
        var multiplys = (0, _index4.multiply)(item.money, item.num);
        nums = (0, _index4.add)(multiplys, nums);
        // console.log(nums)
      });
      this.setState({
        total: nums
      });
    }
  }, {
    key: "showSub",
    value: function showSub(index) {
      var _this5 = this;

      var _state = this.state,
          showList = _state.showList,
          maskType = _state.maskType;

      showList[index].num--;
      if (showList[index].num === 0) {
        //如果数量变成0，将该物品从购物车中移除
        // showList[index]
        showList.splice(index, 1);
        if (showList.length == 0) {
          //购物车为空时关闭蒙版和购物车列表
          this.setState({ maskType: !maskType });
        }
      }
      this.setState({ showList: showList }, function () {
        _this5.calculation();
      });
    }
  }, {
    key: "showAdd",
    value: function showAdd(index) {
      var _this6 = this;

      var showList = this.state.showList;

      showList[index].num++;
      this.setState({ showList: showList }, function () {
        _this6.calculation();
      });
    }
  }, {
    key: "editMaskType",
    value: function editMaskType() {
      var _state2 = this.state,
          maskType = _state2.maskType,
          showList = _state2.showList;

      if (showList.length == 0) {
        return;
      }this.setState({ maskType: !maskType });
    }
  }, {
    key: "onScroll",
    value: function onScroll(e) {
      var _this7 = this;

      var scrollTops = e.detail.scrollTop;
      // console.log(scrollTops)
      var _state3 = this.state,
          sonTop = _state3.sonTop,
          current = _state3.current,
          tapScroll = _state3.tapScroll;

      if (!tapScroll) {
        return;
      }sonTop.map(function (item, index) {
        // console.log(item.startTop, item.endTop)
        if (scrollTops > item.startTop && scrollTops < item.endTop) {
          _this7.setState({ current: index, labelId: 'T' + index });
        }
      });
    }
  }, {
    key: "current",
    value: function current(e) {
      var _this8 = this;

      // console.log(e)
      var ids = 'T' + e;
      clearTimeout(this.state.timer);
      var timer = setTimeout(function () {
        _this8.setState({ tapScroll: true });
      }, 500);
      this.setState({
        current: e,
        currId: ids,
        tapScroll: false,
        timer: timer
      });
    }
  }, {
    key: "goSubOrder",
    value: function () {
      var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3() {
        var res;
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                if (!(this.props.counter.information.nickName == '')) {
                  _context3.next = 6;
                  break;
                }

                _context3.next = 3;
                return (0, _interac.showModer)('', '还未登录，是否进入登录？');

              case 3:
                res = _context3.sent;
                //标题，提示内容
                if (res.confirm) {
                  _index2.default.navigateTo({
                    url: '/pages/login/login'
                  });
                }
                return _context3.abrupt("return");

              case 6:
                if (!(this.state.total === 0)) {
                  _context3.next = 8;
                  break;
                }

                return _context3.abrupt("return");

              case 8:
                _index2.default.navigateTo({
                  url: '/pages/suborder/suborder'
                });

              case 9:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      function goSubOrder() {
        return _ref4.apply(this, arguments);
      }

      return goSubOrder;
    }()
  }, {
    key: "details",
    value: function details() {
      var detailsMask = this.state.detailsMask;

      this.setState({ detailsMask: !detailsMask });
    }
  }, {
    key: "_createData",
    value: function _createData() {
      var _this9 = this;

      this.__state = arguments[0] || this.state || {};
      this.__props = arguments[1] || this.props || {};
      var __isRunloopRef = arguments[2];
      var __prefix = this.$prefix;
      ;

      var _genCompid = (0, _index.genCompid)(__prefix + "$compid__4"),
          _genCompid2 = _slicedToArray(_genCompid, 2),
          $prevCompid__4 = _genCompid2[0],
          $compid__4 = _genCompid2[1];

      var _genCompid3 = (0, _index.genCompid)(__prefix + "$compid__5"),
          _genCompid4 = _slicedToArray(_genCompid3, 2),
          $prevCompid__5 = _genCompid4[0],
          $compid__5 = _genCompid4[1];

      var _state4 = this.__state,
          tabList = _state4.tabList,
          maskType = _state4.maskType,
          showList = _state4.showList,
          total = _state4.total,
          current = _state4.current,
          currId = _state4.currId,
          labelId = _state4.labelId,
          detailsMask = _state4.detailsMask;

      var arrayListTitle = [];
      tabList.map(function (item, index) {
        // console.log(item)
        arrayListTitle.push({ title: item.title + index });
      });
      var anonymousState__temp9 = (0, _index.internal_inline_style)(showList.length == 0 ? 'display:none' : '');
      var anonymousState__temp10 = (0, _index.internal_inline_style)(detailsMask ? '' : 'display:none');

      this.anonymousFunc0 = function () {
        _this9.setState({ detailsMask: !detailsMask });
      };

      var anonymousState__temp11 = "/img/1.png";
      var anonymousState__temp12 = (0, _index.internal_inline_style)(maskType ? '' : 'display:none');

      this.anonymousFunc1 = function () {
        _this9.setState({ maskType: !maskType });
      };

      var anonymousState__temp13 = (0, _index.internal_inline_style)(maskType ? '' : 'display:none');
      var loopArray1 = tabList.map(function (item, index) {
        item = {
          $original: (0, _index.internal_get_original)(item)
        };
        var $anonymousCallee__0 = item.$original.showlist.map(function (item2, index2) {
          item2 = {
            $original: (0, _index.internal_get_original)(item2)
          };
          var $loopState__temp2 = "/img/1.png";
          var $loopState__temp4 = (0, _index.internal_inline_style)(item2.$original.numType ? 'display:none' : '');
          var $loopState__temp6 = (0, _index.internal_inline_style)(item2.$original.num <= 0 ? 'opacity: 0;' : 'opacity: 1;');
          var $loopState__temp8 = (0, _index.internal_inline_style)(item2.$original.num <= 0 ? 'opacity: 0;' : 'opacity: 1;');

          var _genCompid5 = (0, _index.genCompid)(__prefix + "czzzzzzzzz" + index + "-" + index2, true),
              _genCompid6 = _slicedToArray(_genCompid5, 2),
              $prevCompid__0 = _genCompid6[0],
              $compid__0 = _genCompid6[1];

          _index.propsManager.set({
            "value": "subtract",
            "size": "12",
            "color": "#333",
            "className": "addIcon"
          }, $compid__0, $prevCompid__0);

          var _genCompid7 = (0, _index.genCompid)(__prefix + "dzzzzzzzzz" + index + "-" + index2, true),
              _genCompid8 = _slicedToArray(_genCompid7, 2),
              $prevCompid__1 = _genCompid8[0],
              $compid__1 = _genCompid8[1];

          _index.propsManager.set({
            "value": "add",
            "size": "12",
            "color": "#fff",
            "className": "addIcon"
          }, $compid__1, $prevCompid__1);
          return {
            $loopState__temp2: $loopState__temp2,
            $loopState__temp4: $loopState__temp4,
            $loopState__temp6: $loopState__temp6,
            $loopState__temp8: $loopState__temp8,
            $compid__0: $compid__0,
            $compid__1: $compid__1,
            $original: item2.$original
          };
        });
        return {
          $anonymousCallee__0: $anonymousCallee__0,
          $original: item.$original
        };
      });
      var loopArray2 = showList.map(function (item, index) {
        item = {
          $original: (0, _index.internal_get_original)(item)
        };

        var _$indexKey = "azzzz" + index;

        _this9.anonymousFunc2Map[_$indexKey] = function () {
          return _this9.showSub(index);
        };

        var _$indexKey2 = "bzzzz" + index;

        _this9.anonymousFunc3Map[_$indexKey2] = function () {
          return _this9.showAdd(index);
        };

        var _genCompid9 = (0, _index.genCompid)(__prefix + "ezzzzzzzzz" + index, true),
            _genCompid10 = _slicedToArray(_genCompid9, 2),
            $prevCompid__2 = _genCompid10[0],
            $compid__2 = _genCompid10[1];

        _index.propsManager.set({
          "value": "subtract",
          "size": "12",
          "color": "#fff",
          "className": "showSub",
          "onClick": _this9.anonymousFunc2.bind(_this9, _$indexKey)
        }, $compid__2, $prevCompid__2);

        var _genCompid11 = (0, _index.genCompid)(__prefix + "fzzzzzzzzz" + index, true),
            _genCompid12 = _slicedToArray(_genCompid11, 2),
            $prevCompid__3 = _genCompid12[0],
            $compid__3 = _genCompid12[1];

        _index.propsManager.set({
          "value": "add",
          "size": "12",
          "color": "#fff",
          "className": "showAdd",
          "onClick": _this9.anonymousFunc3.bind(_this9, _$indexKey2)
        }, $compid__3, $prevCompid__3);
        return {
          _$indexKey: _$indexKey,
          _$indexKey2: _$indexKey2,
          $compid__2: $compid__2,
          $compid__3: $compid__3,
          $original: item.$original
        };
      });
      _index.propsManager.set({
        "value": "shopping-cart",
        "size": "30",
        "color": "#fff",
        "className": "Icon"
      }, $compid__4, $prevCompid__4);
      _index.propsManager.set({
        "className": "Icon",
        "value": "trash",
        "size": "12",
        "color": "#000"
      }, $compid__5, $prevCompid__5);
      Object.assign(this.__state, {
        anonymousState__temp9: anonymousState__temp9,
        anonymousState__temp10: anonymousState__temp10,
        anonymousState__temp11: anonymousState__temp11,
        anonymousState__temp12: anonymousState__temp12,
        anonymousState__temp13: anonymousState__temp13,
        loopArray1: loopArray1,
        loopArray2: loopArray2,
        $compid__4: $compid__4,
        $compid__5: $compid__5,
        arrayListTitle: arrayListTitle
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
    value: function anonymousFunc2(_$indexKey) {
      var _anonymousFunc2Map;

      ;

      for (var _len2 = arguments.length, e = Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
        e[_key2 - 1] = arguments[_key2];
      }

      return this.anonymousFunc2Map[_$indexKey] && (_anonymousFunc2Map = this.anonymousFunc2Map)[_$indexKey].apply(_anonymousFunc2Map, e);
    }
  }, {
    key: "anonymousFunc3",
    value: function anonymousFunc3(_$indexKey2) {
      var _anonymousFunc3Map;

      ;

      for (var _len3 = arguments.length, e = Array(_len3 > 1 ? _len3 - 1 : 0), _key3 = 1; _key3 < _len3; _key3++) {
        e[_key3 - 1] = arguments[_key3];
      }

      return this.anonymousFunc3Map[_$indexKey2] && (_anonymousFunc3Map = this.anonymousFunc3Map)[_$indexKey2].apply(_anonymousFunc3Map, e);
    }
  }]);

  return Index;
}(_index.Component), _class.$$events = ["current", "onScroll", "details", "delshow", "addshow", "editMaskType", "goSubOrder", "anonymousFunc0", "anonymousFunc1", "empty"], _class.$$componentPath = "pages/shopdetails/shopdetails", _temp2);
Index = tslib_1.__decorate([(0, _index3.connect)(function (_ref5) {
  var counter = _ref5.counter;
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