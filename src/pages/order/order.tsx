import { ComponentClass } from 'react'
import Taro, { Component, Config } from '@tarojs/taro'
import { View, Swiper, SwiperItem, Text } from '@tarojs/components'
import { connect } from '@tarojs/redux'
// import { AtIcon } from 'taro-ui'//底部栏,图标
import { } from 'taro-ui'
import './order.scss'


type PageStateProps = {
  counter: {
    num: number
  }
}

type PageDispatchProps = {
  add: () => void
  dec: () => void
  asyncAdd: () => any
}

type PageOwnProps = {}

type PageState = {
  scrollIntoView: string,
  currentIndex: number
}

type IProps = PageStateProps & PageDispatchProps & PageOwnProps

interface Index {
  props: IProps;
}

@connect(({ counter }) => ({
  counter
}), () => ({

}))
class Index extends Component<{}, PageState> {
  config: Config = {
    navigationBarTitleText: '月子套餐'
  }



  constructor(props) {
    super(props)
    this.state = {
      scrollIntoView: 'T1',
      currentIndex: 0
    }

  }

  componentWillMount() {
    Taro.setNavigationBarColor({//设置导航栏为蓝色
        frontColor: '#ffffff',
        backgroundColor: '#333a45',
        animation: {
            duration: 0,
            timingFunc: 'easeIn'
        }
    })
  }

  componentDidMount() {

  }

  onChanges(e) {//swiper改变
    // console.log(e.currentTarget.current)
    let currentIndex = e.currentTarget.current
    this.setState({ currentIndex })
  }

  goOrderDetails(){
    console.log(1)
    Taro.navigateTo({
      url:'/pages/orderdetails/orderdetails'
    })
  }

  render() {
    let { currentIndex } = this.state

    return (
      <View className="box">
        <View className="headerBox">
          <View className="sw">
            <Text className={currentIndex == 0 ? 'swText active' : 'swText'} onClick={() => { this.setState({ currentIndex: 0 }) }}>全部订单</Text>
          </View>
          <View className="sw">
            <Text className={currentIndex == 1 ? 'swText active' : 'swText'} onClick={() => { this.setState({ currentIndex: 1 }) }}>待支付</Text>
          </View>
          <View className="sw">
            <Text className={currentIndex == 2 ? 'swText active' : 'swText'} onClick={() => { this.setState({ currentIndex: 2 }) }}>待评价</Text>
          </View>
        </View>
        <View className="swiperBox">
          <Swiper
            className='swiperbox'
            indicatorColor='#999'
            indicatorActiveColor='#333'
            vertical={false}
            circular={false}
            indicatorDots={false}
            autoplay={false}
            current={currentIndex}
            onChange={this.onChanges}
          >
            <SwiperItem className="swiperItems">
              <View className="swiperList" onClick={this.goOrderDetails.bind(this)}>
                <View className="listTop">
                  <View className="listTopImg"></View>
                  <View className="listTopText">
                    绿华炸鸡汉堡
                        </View>
                </View>
                <View className="listCenter">
                  <View className="listContent">
                    <View className="listContentText">汉堡+鸡腿</View>
                    <View className="listContentNum">x1</View>
                  </View>
                  <View className="listOther">
                    <View className="listOtherTime">2019-11-03 20:39</View>
                    <View className="listOtherMoney">实付￥24.5</View>
                  </View>
                </View>
                <View className="listBottom">
                  <View className="buttons">再来一单</View>
                </View>
              </View>

            </SwiperItem>
            <SwiperItem className="swiperItems">2</SwiperItem>
            <SwiperItem className="swiperItems">3</SwiperItem>
          </Swiper>
        </View>
      </View>

    )
  }
}



export default Index
