import '@tarojs/async-await'
import Taro, { Component, Config } from '@tarojs/taro'
import { Provider } from '@tarojs/redux'

import Index from './pages/index'

import configStore from './store'

import './app.scss'

// 如果需要在 h5 环境中开启 React Devtools
// 取消以下注释：
// if (process.env.NODE_ENV !== 'production' && process.env.TARO_ENV === 'h5')  {
//   require('nerv-devtools')
// }

const store = configStore()

class App extends Component {

  /**
   * 指定config的类型声明为: Taro.Config
   *
   * 由于 typescript 对于 object 类型推导只能推出 Key 的基本类型
   * 对于像 navigationBarTextStyle: 'black' 这样的推导出的类型是 string
   * 提示和声明 navigationBarTextStyle: 'black' | 'white' 类型冲突, 需要显示声明类型
   */
  config: Config = {
    pages: [     
      'pages/shopdetails/shopdetails',
      'pages/my/my',
      'pages/edituser/edituser',
      'pages/suborder/suborder', 
      'pages/addresslist/addresslist',
      'pages/addaddress/addaddress',
      'pages/selectaddress/selectaddress',
      'pages/editaddress/editaddress',
      'pages/order/order',
      'pages/getcode/getcode',
      'pages/login/login',
      'pages/orderdetails/orderdetails',
    ],
    window: {
      backgroundTextStyle: 'light',
      navigationBarBackgroundColor: '#fff',
      navigationBarTitleText: 'WeChat',
      navigationBarTextStyle: 'black'
    },
    tabBar: {
      list: [{
        pagePath: "pages/shopdetails/shopdetails",
        text: "首页",
        iconPath: "./img/home.png",
        selectedIconPath: "./img/home_select.png"
      }, {
        pagePath: "pages/order/order",
        text: "订单",
        iconPath: "./img/order.png",
        selectedIconPath: "./img/order_select.png"
      },{
        pagePath: "pages/my/my",
        text: "我的",
        iconPath: "./img/my.png",
        selectedIconPath: "./img/my_select.png"
      }],
      color: '#333',
      selectedColor: '#fbc504',
      backgroundColor: '#fff',
      borderStyle: 'black'
    },
    "permission": {

      "scope.userLocation": {

      "desc": "为不影响您的收货，请允许小程序获取你的地址定位"

      }

      }
  }

  componentDidMount () {
  }

  componentDidShow () {}

  componentDidHide () {}

  componentDidCatchError () {}

  // 在 App 类中的 render() 函数没有实际作用
  // 请勿修改此函数
  render () {
    return (
      <Provider store={store}>
        <Index />
      </Provider>
    )
  }
}

Taro.render(<App />, document.getElementById('app'))
