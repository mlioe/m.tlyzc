import { ComponentClass } from 'react'
import Taro, { Component, Config } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import { connect } from '@tarojs/redux'
// import { AtIcon } from 'taro-ui'//底部栏,图标
import { AtTabs, AtTabsPane, AtIcon } from 'taro-ui'
import './suborder.scss'
import { showModer, showToast, showModerNoCancel } from '../../interaction/interac';//交互反馈封装

// import { add, multiply } from '../../calculation'//封装的精度计算

import { addAress } from '../../actions/counter';
// import { unionWith } from 'eslint-visitor-keys'
import getAddress from '../../api/address'

type PageStateProps = {
    counter: {
        num: number,
        addressList: Array<any>
    }
}

type PageDispatchProps = {
    add: () => void
    dec: () => void
    asyncAdd: () => any
    addAress: (newarrList) => void
}

type PageOwnProps = {}

type PageState = {
    tabList: Array<any>,
    addressList: Array<any>,
    maskType: Boolean,
    selectList: any
}

type IProps = PageStateProps & PageDispatchProps & PageOwnProps

interface Index {
    props: IProps;
}

@connect(({ counter }) => ({
    counter
}), (dispatch) => ({
    addAress(newarrList) {
        dispatch(addAress(newarrList))
    }
}))
class Index extends Component<{}, PageState> {
    config: Config = {
        navigationBarTitleText: '提交订单'
    }



    constructor(props) {
        super(props)
        this.state = {
            tabList: [{ name: '123' }, { name: '123' }, { name: '123' }, { name: '123' }, { name: '123' }, { name: '123' }, { name: '123' }],
            addressList: [],
            maskType: false,
            selectList: { name: '', address: '', phone: '' }
        }
        this.selectAddress = this.selectAddress.bind(this)
        this.newaddress = this.newaddress.bind(this)
        this.subOrder = this.subOrder.bind(this)
    }

    componentWillMount() {

    }

    componentDidShow() {
        this.getAddressList()
    }

    componentDidMount() {
        // let addressList = this.props.counter.addressList//获取redux中的地址列表
        // this.setState({addressList})
    }

    async getAddressList() {
        // console.log('触发')
        Taro.showLoading({ title: '获取地址中' })
        let newarrList: Array<any> = this.props.counter.addressList
        const data = await getAddress.addresslist()
        console.log(data)
        Taro.hideLoading()
        let arr = {}
        newarrList = []
        if (data.code === 0) {
            data.data.map(item => {
                arr = item
                newarrList.push(arr)
            })
            this.props.addAress(newarrList)
        }
        let obj = {}
        newarrList.map(item=>{
            if(item.is_default === 1){
                obj = item
                this.setState({selectList:obj})
            }
        })
        this.setState({ addressList: newarrList  })
    }

    newaddress() {//跳转添加地址页
        Taro.navigateTo({
            url: '/pages/addaddress/addaddress'
        })

    }

    selectAddress(index) {//点击地址列表
        const address = this.state.addressList[index]
        console.log(address)
        const maskType = this.state.maskType
        this.setState({
            selectList: address,
            maskType: !maskType
        })
    }

    subOrder() {//提交订单
        let { selectList } = this.state
        if (selectList.address == '') {
            showToast('地址为空')
            return
        }
        Taro.switchTab({
            url: '/pages/order/order',
            success: res => {
                console.log(res)
                if (res.errMsg === "switchTab:ok") {
                    setTimeout(() => {
                        console.log('去订单')
                        Taro.navigateTo({
                            url: '/pages/orderdetails/orderdetails'
                        })
                    }, 200)
                }
            }
        })
        return
        Taro.requestPayment({
            timeStamp: '',
            nonceStr: '',
            package: '',
            signType: 'MD5',
            paySign: '',
            success(res) { console.log(res) },
            fail(res) {
                console.log(res.errMsg)
                showModerNoCancel('', res.errMsg)
            }
        })
    }
    addAddress(e) {//点击地址的修改按钮
        e.stopPropagation()
    }
    render() {
        let { tabList, addressList, maskType, selectList } = this.state
        console.log(selectList)
        return (
            <View className="box">
                <View className="addressBox">
                    <View className="selectAdress" onClick={() => { this.setState({ maskType: !maskType }) }} style={selectList.name != '' ? 'display:none' : ''}>
                        <AtIcon value='add' size='16' color='white' className="Icon"></AtIcon>
                        <View className="selectText">选择收获地址</View>
                    </View>
                    <View className="adress" style={selectList.name == '' ? 'display:none' : ''} onClick={() => { this.setState({ maskType: !maskType }) }}>
                        <AtIcon value='map-pin' size='16' color='#333' className="Icon"></AtIcon>
                        <View className="adressText">
                            <View className="adressTextTitle">{selectList.address}</View>
                            <View className="addressTextOtehr">{selectList.name} {selectList.sex === 1 ? '先生' : '女士'} {selectList.phone}</View>
                        </View>
                    </View>
                    <View className="tipTime">
                        <AtIcon value='clock' size='16' color='#333' className="Icon"></AtIcon>
                        <View className="selectText">立即送出（大约14：35送达）</View>
                    </View>
                </View>

                <View className="content">
                    <View className="contentName">益禾堂</View>
                    {
                        tabList.map((item) => {
                            return <View className="tabList" key={item.name}>
                                <View className="tabListImgbox"></View>
                                <View className="tabListRight">
                                    <View className="listTitle">益禾堂</View>
                                    <View className="listText">
                                        主料12：纯正的龙头燕盏；（美肤美肌、优孕滋补、补充胶原蛋白、润肺、增强抵抗力）
                                        </View>
                                    <View className="listOther">
                                        <View className="red">￥10</View>
                                    </View>
                                </View>
                            </View>
                        })
                    }
                </View>

                <View className="footer">
                    <View className="totalBox">合计 <Text className="totalNum">￥300</Text></View>
                    <View className="footerSub" onClick={this.subOrder}>提交订单</View>
                </View>

                <View className="mask" style={!maskType ? 'display:none' : ''} onClick={() => { this.setState({ maskType: !maskType }) }}>
                    {/* 蒙版 */}
                </View>

                <View className="addressListBox" style={!maskType ? 'display:none' : ''}>
                    <View className="addressListTitle">
                        <AtIcon value='close' size='18' color='#333' className="Icon" onClick={() => { this.setState({ maskType: !maskType }) }}></AtIcon>
                        <View>收货地址</View>
                        <View></View>
                    </View>
                    <View className="addressList">
                        {/* <AtIcon value='loading-2' size='18' color='#333' className="Icon"></AtIcon> */}

                        {
                            addressList.map((item, index) => {
                                return <View className="list" key={item.index} onClick={() => { this.selectAddress(index) }}>
                                    <View className="listLeft">
                                        <View className="listTitle">{item.address}</View>
                                        <View className="listOther">{item.name} {item.sex === 1 ? '先生' : '女士'} {item.phone}</View>
                                    </View>
                                    <View className="iconBox" onClick={this.addAddress}> <AtIcon value='external-link' size='18' color='#333' className="Icon"></AtIcon></View>
                                </View>
                            })
                        }
                    </View>
                    <View className="newAddress" onClick={this.newaddress.bind(this)}>新增收货地址</View>
                </View>
            </View>

        )
    }
}



export default Index as ComponentClass<PageOwnProps, PageState>
