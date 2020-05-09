import { ComponentClass } from 'react'
import Taro, { Component, Config } from '@tarojs/taro'
import { View, Image, Text } from '@tarojs/components';
import { connect } from '@tarojs/redux'


import {  AtIcon } from 'taro-ui'
import './orderdetails.scss'

type PageStateProps = {
  counter: {
    num: number,
    key: any
  }
}

type PageDispatchProps = {
  add: () => void
  dec: () => void
  asyncAdd: () => any

}

type PageOwnProps = {}

type PageState = {
  tabList:Array<any>
}

type IProps = PageStateProps & PageDispatchProps & PageOwnProps

interface Index {
  props: IProps;
}

@connect(({ counter }) => ({
  counter
}), (dispatch) => ({

}))
class Index extends Component<{}, PageState> {
  config: Config = {
    navigationBarTitleText: '订单详情'
  }



  constructor(props) {
    super(props)
    this.state = {
      tabList:[{name:'123'},{name:'123'},{name:'123'},{name:'123'},{name:'123'},{name:'123'},{name:'123'}]
    }
  }

  makePhoneCall(){
    Taro.makePhoneCall({
      phoneNumber:'13790989809'
    })
  }

  render() {
    let {tabList} = this.state
    return (
      <View className='box'>
        
        <View className="header">
            <View className="headerTop">感谢您对美团外卖的信任，期待再次光临。</View>
            <View className="headerCenter">
                <View className="headerInp">再来一单</View>
            </View>
            <View className="headerBottom" onClick={this.makePhoneCall.bind(this)}>
                <View className="headerPhoneBox"><AtIcon value='phone' size='16' color='black' className="Icon"></AtIcon></View>
                <View className="headerText">联系商家</View>
            </View>
        </View>

        <View className="content">
          <View className="contentName">
            <View>益禾堂</View>
            <View >合计：<Text style="color:red">￥60</Text></View>
          </View>
          {
            tabList.map((item) => {
              return <View className="tabList" key={item.name}>
                <View className="tabListImgbox"></View>
                <View className="tabListRight">
                  <View className="listTitle">
                    <View>益禾堂</View>
                    <View className="listTitleMoney">￥60</View>
                  </View>
                  <View className="listText">
                    主料12：纯正的龙头燕盏；（美肤美肌、优孕滋补、补充胶原蛋白、润肺、增强抵抗力）
                  </View>
                </View>
              </View>
            })
          }
        </View>

        <View className="other">
            <View className="otherTitle">配送信息</View>
            <View className="otherList">
              <View className="otherListTitle">订单编号</View>
              <View className="otherListText">2952 5461 5831 6210 1</View>
            </View>
            <View className="otherList">
              <View className="otherListTitle">送餐时间</View>
              <View className="otherListText">立即配送</View>
            </View>
            <View className="otherList">
              <View className="otherListTitle">送餐时间</View>
              <View className="otherListText">李(先生)  13790989809 菉塘卜园村新区198号楼</View>
            </View>
            <View className="otherList">
              <View className="otherListTitle">下单时间</View>
              <View className="otherListText">2019-11-10 18：00</View>
            </View>
        </View>

      </View>

    )
  }
}



export default Index as ComponentClass<PageOwnProps, PageState>
