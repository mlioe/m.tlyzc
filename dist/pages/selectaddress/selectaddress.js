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

var _qqmapWxJssdk = require("../../libs/qqmap-wx-jssdk.js");

var _qqmapWxJssdk2 = _interopRequireDefault(_qqmapWxJssdk);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

//腾讯地图jsdk
var Index = (_temp2 = _class = function (_BaseComponent) {
  _inherits(Index, _BaseComponent);

  function Index() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, Index);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Index.__proto__ || Object.getPrototypeOf(Index)).call.apply(_ref, [this].concat(args))), _this), _this.$usedState = ["anonymousState__temp", "anonymousState__temp2", "anonymousState__temp3", "anonymousState__temp4", "anonymousState__temp5", "anonymousState__temp6", "$compid__16", "$compid__17", "longitude", "latitude", "markers", "addressList", "searchAddressList", "city", "value", "timer", "maskType", "title", "locationCity", "counter"], _this.config = {
      navigationBarTitleText: '选择收获地址'
    }, _this.customComponents = ["AtIcon"], _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(Index, [{
    key: "_constructor",
    value: function _constructor(props) {
      _get(Index.prototype.__proto__ || Object.getPrototypeOf(Index.prototype), "_constructor", this).call(this, props);

      this.state = {
        city: '',
        latitude: 0,
        longitude: 0,
        markers: [{
          id: 1,
          latitude: 0,
          longitude: 0,
          name: ''
        }],
        value: '',
        timer: null,
        addressList: [],
        searchAddressList: [],
        maskType: false,
        title: ' ',
        locationCity: '' //定位传过来的值定位
      };
      this.getAddress = this.getAddress.bind(this);
      this.loctionsSuggestion = this.loctionsSuggestion.bind(this);
      this.$$refs = [];
    }
  }, {
    key: "componentWillMount",
    value: function componentWillMount() {}
  }, {
    key: "componentDidMount",
    value: function componentDidMount() {
      var _this2 = this;

      // console.log(this.$router.params)
      var markers = [];
      var latitude = '';
      var longitude = '';
      var title = '';
      // Taro.showLoading({title:'加载中'})
      _index2.default.getLocation({
        type: 'wgs84',
        success: function success(res) {
          if (JSON.stringify(_this2.$router.params) === '{}') {
            markers = [{ id: 1, latitude: res.latitude, longitude: res.longitude, name: '' }];
            latitude = res.latitude;
            longitude = res.longitude;
            title = '';
          } else {
            var mark = JSON.parse(_this2.$router.params.geography_info);
            markers = [{
              id: 1,
              latitude: mark.lat,
              longitude: mark.lng
            }];
            latitude = mark.lat.toString();
            longitude = mark.lng.toString();
            title = _this2.$router.params.title;
          }
          _this2.setState({
            latitude: latitude,
            longitude: longitude,
            markers: markers,
            title: title,
            locationCity: _this2.$router.params.city //城市
          }, function () {
            _this2.getAddress(res.latitude, res.longitude);
          });
        }
      });
    }
  }, {
    key: "getAddress",
    value: function getAddress(latitude, longitude) {
      var _this3 = this;

      var title = this.state.title;

      var qqmapsdk = new _qqmapWxJssdk2.default({ key: this.props.counter.key });
      qqmapsdk.reverseGeocoder({
        location: {
          latitude: latitude,
          longitude: longitude
        },
        success: function success(res) {
          // console.log(res)
          var city = res.result.address_component.city;
          // let selectAddressList = [{ title: res.result.formatted_addresses.recommend, address: res.result.address }]//获取地址名称，和地址的位置
          _this3.setState({ city: city }, function () {
            // console.log(title)
            if (title == '') {
              //判断是从新增界面过来，还是更新地址界面过来
              // console.log('添加页面')
              _this3.getSuggestion(res.result.address_component.street, 'location');
            } else {
              //否则默认搜索附近的默认地址
              // console.log('更新接口')
              _this3.loctionsSuggestion();
            }
          });
        }
      });
    }
    /**
     *
     * @param value //传入的搜索关键字
     * @param who //谁传入的，location是定位，search是搜索框的
     */

  }, {
    key: "getSuggestion",
    value: function getSuggestion(value, who) {
      var _this4 = this;

      _index2.default.showLoading({ title: '获取地址中' });
      // console.log(value,who)
      var city = this.state.city;

      var qqmapsdk = new _qqmapWxJssdk2.default({ key: this.props.counter.key });
      var selectAddressList = [];
      qqmapsdk.getSuggestion({
        keyword: value,
        region: city,
        success: function success(res) {
          // console.log(res.data)
          res.data.map(function (item) {
            selectAddressList.push(item);
          });
          if (who === 'location') {
            _this4.setState({ addressList: selectAddressList });
          } else {
            _this4.setState({ searchAddressList: selectAddressList });
          }
          _index2.default.hideLoading();
        }
      });
    }
    /**
     *
     * @param value //传入的搜索关键字
     * @param who //谁传入的，location是定位，search是搜索框的
     */

  }, {
    key: "loctionsSuggestion",
    value: function loctionsSuggestion() {
      var _this5 = this;

      _index2.default.showLoading({ title: '获取地址中' });
      var _state = this.state,
          locationCity = _state.locationCity,
          title = _state.title;

      var qqmapsdk = new _qqmapWxJssdk2.default({ key: this.props.counter.key });
      var selectAddressList = [];
      qqmapsdk.getSuggestion({
        keyword: title,
        region: locationCity,
        success: function success(res) {
          // console.log(res.data)
          res.data.map(function (item) {
            selectAddressList.push(item);
          });
          _this5.setState({ addressList: selectAddressList });
          _index2.default.hideLoading();
        }
      });
    }
  }, {
    key: "onTabItemTap",
    value: function onTabItemTap(e) {
      var _this6 = this;

      // console.log(e.detail.value)
      var value = e.detail.value;
      this.setState({ value: value });
      clearTimeout(this.state.timer); //如果不断输入，就会清除上一个计时器
      var timer = setTimeout(function () {
        if (e.detail.value === '') {
          return;
        }_this6.getSuggestion(e.detail.value, 'search');
      }, 500);
      this.setState({ timer: timer }); //存入全局变量中，下次触发拿到这个计数器
    }
  }, {
    key: "tapList",
    value: function tapList(e) {
      // console.log(e)
      _index2.default.setStorageSync('selectAddress', JSON.stringify(e)); //缓存传值
      _index2.default.navigateBack();
    }
  }, {
    key: "_createData",
    value: function _createData() {
      var _this7 = this;

      this.__state = arguments[0] || this.state || {};
      this.__props = arguments[1] || this.props || {};
      var __isRunloopRef = arguments[2];
      var __prefix = this.$prefix;
      ;

      var _genCompid = (0, _index.genCompid)(__prefix + "$compid__16"),
          _genCompid2 = _slicedToArray(_genCompid, 2),
          $prevCompid__16 = _genCompid2[0],
          $compid__16 = _genCompid2[1];

      var _genCompid3 = (0, _index.genCompid)(__prefix + "$compid__17"),
          _genCompid4 = _slicedToArray(_genCompid3, 2),
          $prevCompid__17 = _genCompid4[0],
          $compid__17 = _genCompid4[1];

      var _state2 = this.__state,
          city = _state2.city,
          longitude = _state2.longitude,
          latitude = _state2.latitude,
          markers = _state2.markers,
          addressList = _state2.addressList,
          searchAddressList = _state2.searchAddressList,
          maskType = _state2.maskType;

      var anonymousState__temp = (0, _index.internal_inline_style)(!maskType ? " " : "display:none");

      this.anonymousFunc0 = function () {
        _this7.setState({ maskType: !maskType });
      };

      var anonymousState__temp2 = (0, _index.internal_inline_style)(maskType ? " " : "display:none");

      this.anonymousFunc1 = function () {
        _this7.setState({ maskType: !maskType });
      };

      var anonymousState__temp3 = (0, _index.internal_inline_style)(!maskType ? "display:block" : "display:none");
      var anonymousState__temp4 = (0, _index.internal_inline_style)(!maskType ? "display:block" : "display:none");
      var anonymousState__temp5 = (0, _index.internal_inline_style)(maskType ? "display:block" : "display:none");
      var anonymousState__temp6 = (0, _index.internal_inline_style)(maskType ? "display:block" : "display:none");
      _index.propsManager.set({
        "value": "map-pin",
        "size": "20",
        "color": "#cccccd",
        "className": "Icon"
      }, $compid__16, $prevCompid__16);
      _index.propsManager.set({
        "value": "map-pin",
        "size": "20",
        "color": "#cccccd",
        "className": "Icon"
      }, $compid__17, $prevCompid__17);
      Object.assign(this.__state, {
        anonymousState__temp: anonymousState__temp,
        anonymousState__temp2: anonymousState__temp2,
        anonymousState__temp3: anonymousState__temp3,
        anonymousState__temp4: anonymousState__temp4,
        anonymousState__temp5: anonymousState__temp5,
        anonymousState__temp6: anonymousState__temp6,
        $compid__16: $compid__16,
        $compid__17: $compid__17
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
  }]);

  return Index;
}(_index.Component), _class.$$events = ["anonymousFunc0", "onTabItemTap", "anonymousFunc1", "tapList"], _class.$$componentPath = "pages/selectaddress/selectaddress", _temp2);
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