// import { ComponentClass } from 'react'
import Taro, { Component, Config } from '@tarojs/taro'
import { View, Image, ScrollView } from '@tarojs/components'
import { connect } from '@tarojs/redux'
// import { AtIcon } from 'taro-ui'//底部栏,图标
import { AtIcon } from 'taro-ui'
import './shopdetails.scss'
import { showModer } from '../../interaction/interac';//交互反馈封装
import { userInformation } from '../../actions/counter';

// console.log(showModer)
import { add, multiply } from '../../calculation'//封装的精度计算
import admin from '../../api/admin'
import { requests, yzcUrl, aesEncrypt, header, datas, aesDecrypt } from '../../request/request';


type PageStateProps = {
    counter: {
        num: number,
        information: any
    }
}

type PageDispatchProps = {
    add: () => void
    dec: () => void
    asyncAdd: () => any
    userInformation: (res) => any
    addAress: (res) => any
}

type PageOwnProps = {}

type PageState = {
    title: any,
    current: number,
    tabList: Array<any>,
    showList: Array<any>,
    maskType: boolean,
    total: number,
    currId: string,
    labelId: string,
    fatherTop: number,
    sonTop: Array<any>,
    tapScroll: boolean,
    timer: any,
    detailsMask: boolean
}

type IProps = PageStateProps & PageDispatchProps & PageOwnProps

interface Index {
    props: IProps;
}

@connect(({ counter }) => ({
    counter
}), (dispatch) => ({
    userInformation(res) {
        dispatch(userInformation(res))
    }
}))
class Index extends Component<{}, PageState> {
    config: Config = {
        navigationBarTitleText: '月子套餐'
    }



    constructor(props) {
        super(props)
        this.state = {
            title: '',//获取到上一个页面传过来的标题，改变导航栏名字成商品
            current: 0,//下标
            currId: '',//下标id
            labelId: '',//标签下标id
            maskType: false,//蒙版状态
            detailsMask: false,
            tabList: [//商品列表
                {
                    title: '套餐', showlist: [
                        { name: '益禾堂益禾堂益禾堂益禾堂益禾堂', money: 1, sold: 7000, good: 10, num: 0, showid: 'msg01', numType: false },
                        { name: '益禾堂1', money: 12.24, sold: 7000, good: 10, num: 0, showid: 'msg02', numType: true },
                        { name: '益禾堂2', money: 1, sold: 7000, good: 10, num: 0, showid: 'msg05', numType: true },
                    ]
                },
                {
                    title: '套餐', showlist: [
                        { name: '益禾堂', money: 12, sold: 7000, good: 10, num: 0, showid: 'msg77', numType: true },
                        { name: '益禾堂1', money: 3, sold: 7000, good: 10, num: 0, showid: 'msg90', numType: true },
                        { name: '益禾堂2', money: 1.2, sold: 7000, good: 10, num: 0, showid: 'msg06', numType: true },
                    ]
                }, {
                    title: '套餐', showlist: [
                        { name: '益禾堂', money: 420, sold: 7000, good: 10, num: 0, showid: 'msg177', numType: true },
                        { name: '益禾堂1', money: 420, sold: 7000, good: 10, num: 0, showid: 'msg10086', numType: true },
                        { name: '益禾堂2', money: 420, sold: 7000, good: 10, num: 0, showid: 'msg34', numType: true },
                        { name: '益禾堂2', money: 420, sold: 7000, good: 10, num: 0, showid: 'msg34', numType: true },
                    ]
                }, {
                    title: '套餐', showlist: [
                        { name: '益禾堂', money: 420, sold: 7000, good: 10, num: 0, showid: 'msg177', numType: true },
                        { name: '益禾堂1', money: 420, sold: 7000, good: 10, num: 0, showid: 'msg10086', numType: true },
                        { name: '益禾堂2', money: 420, sold: 7000, good: 10, num: 0, showid: 'msg34', numType: true },
                        { name: '益禾堂2', money: 420, sold: 7000, good: 10, num: 0, showid: 'msg34', numType: true },
                    ]
                }, {
                    title: '套餐', showlist: [
                        { name: '益禾堂', money: 420, sold: 7000, good: 10, num: 0, showid: 'msg177', numType: true },
                    ]
                }, {
                    title: '套餐', showlist: [
                        { name: '益禾堂', money: 420, sold: 7000, good: 10, num: 0, showid: 'msg177', numType: true },
                    ]
                }, {
                    title: '套餐', showlist: [
                        { name: '益禾堂', money: 420, sold: 7000, good: 10, num: 0, showid: 'msg177', numType: true },
                    ]
                }, {
                    title: '套餐', showlist: [
                        { name: '益禾堂', money: 420, sold: 7000, good: 10, num: 0, showid: 'msg177', numType: true },
                    ]
                }, {
                    title: '套餐', showlist: [
                        { name: '益禾堂', money: 420, sold: 7000, good: 10, num: 0, showid: 'msg177', numType: true },
                    ]
                }, {
                    title: '套餐', showlist: [
                        { name: '益禾堂', money: 420, sold: 7000, good: 10, num: 0, showid: 'msg177', numType: true },
                    ]
                }
            ],
            showList: [],
            total: 0,//总价格
            fatherTop: 0,//计算商品列表父元素距离顶部的距离
            sonTop: [],//计算子元素区间距离，用于判断滚动到哪一个标签
            tapScroll: true, //点击左边标签栏时,加个定时器，否则触发滚动事件后会因为某个元素区间过短，而返回的scrolltop不是对应的区间的值，如点击的是第5个标签，但因为区间的值在第4个，而跳回第5个
            timer: null
        }
        this.editMaskType = this.editMaskType.bind(this)
        this.empty = this.empty.bind(this)
        this.calculation = this.calculation.bind(this)
        this.showSub = this.showSub.bind(this)
        this.showAdd = this.showAdd.bind(this)
        this.goSubOrder = this.goSubOrder.bind(this)
    }

    componentWillMount() {
        let tokens = Taro.getStorageSync('tokens')//获取用户缓存的token
        let unionID = Taro.getStorageSync('unionId')
        console.log(tokens)
        if (unionID) {//不为空时将个人信息传入redux
            tokens = JSON.parse(tokens)
            unionID = JSON.parse(unionID)
            let arr = { nickName: unionID.nickname, avatarUrl: unionID.avatar_image_url }
            this.props.userInformation(arr)
            this.userType()
        }
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
        Taro.createSelectorQuery().select('.scrollViews').boundingClientRect(rect => {//计算父元素的高度
            this.setState({ fatherTop: rect.top }, () => {
                Taro.createSelectorQuery().selectAll('.listBox').boundingClientRect(res => {//计算个子元素他们之间的距离
                    this.arrHeight(res)
                }).exec()
            })
        }).exec()

        Taro.request({
            url:'http://192.168.31.238:8100'+'/customer/user/test',
            method:'GET',
            // mode: 'no-cors',
            success:res=>{
                console.log(res)
            },
            fail:error=>{
                console.log(error)
            }
        })
    }

    async userType() { //获取完缓存后请求后端，判断用户是否过期
        const data = await admin.useDetails()
        // console.log(data)
        if (data.code != 0) {//获取用户资料,不为0过期
          this.props.userInformation({ avatarUrl: '', nickName: '' })
          Taro.removeStorageSync('informatiin')//清空缓存
          Taro.removeStorageSync('tokens')
          Taro.removeStorageSync('unionId')
          let newarrList = []
          this.props.addAress(newarrList)
        }
    }

    arrHeight(res) {//计算每个标签对应的商品之间的区间，滚动时根据这个判断给哪个标签高亮
        let { fatherTop } = this.state
        let arr: Array<any> = []
        // console.log(fatherTop)
        res.map(item => {
            arr.push({
                startTop: item.top - fatherTop, //开始的区间
                endTop: item.top - fatherTop + item.height //结束的区间
            })
        })
        this.setState({ sonTop: arr })
    }



    addshow(item, index, index2, e) {//商品列表点击添加
        e.stopPropagation()
        let { tabList } = this.state
        console.log(tabList[index].showlist[index2].numType)
        if(!tabList[index].showlist[index2].numType) return
        tabList[index].showlist[index2].num++
        this.setState({ tabList })
        let array: any = []
        tabList.map((val) => {
            val.showlist.map((val2) => {
                if (val2.num > 0) {
                    array.push(val2)
                }
            })
        })
        this.setState({ showList: array }, () => {
            this.calculation()
        })//将值不是0的赋值给购物车列表
    }

    delshow(item, index, index2, e) {//商品列表点击减少
        // console.log(item)
        e.stopPropagation()
        let { tabList } = this.state
        if (tabList[index].showlist[index2].num <= 0) {//优化商品数量判断，点击过快会变成负数，小于0时强制改回0
            tabList[index].showlist[index2].num = 0
        } else {
            tabList[index].showlist[index2].num--
        }
        this.setState({ tabList })
        let array: any = []
        tabList.map((val) => {//循环判断，将tablist中num值大于0的加入购物车列表
            val.showlist.map((val2) => {
                if (val2.num > 0) {
                    array.push(val2)
                }
            })
        })
        this.setState({ showList: array }, () => {//每次更新购物车数组成功后，要调用calculation()计算价格
            this.calculation()
        })//将值不是0的赋值给购物车列表

    }

    async empty() {//清空购物车
        const res = await showModer('', '确认清空购物车？')//标题，提示内容
        let { tabList } = this.state
        if (res.confirm) {//confirm为true说明点了确定
            tabList.map((item) => {
                item.showlist.map((item2) => {
                    item2.num = 0
                })
            })
            this.setState({
                maskType: false,
                showList: [],
                total: 0
            })
        }
    }

    calculation() {//计算总价格，增加或者减少时调用该函数计算
        let { showList } = this.state
        let nums = 0
        if (showList.length == 0) {//如果数组为0，直接阻止下面的计算，并将值改为0
            this.setState({ total: 0 })
            return
        }
        showList.map((item) => {
            const multiplys = multiply(item.money, item.num)
            nums = add(multiplys, nums)
            // console.log(nums)
        })
        this.setState({
            total: nums
        })
    }


    showSub(index) {//购物列表商品--
        let { showList, maskType } = this.state
        showList[index].num--
        if (showList[index].num === 0) {//如果数量变成0，将该物品从购物车中移除
            // showList[index]
            showList.splice(index, 1)
            if (showList.length == 0) {//购物车为空时关闭蒙版和购物车列表
                this.setState({ maskType: !maskType })
            }
        }
        this.setState({ showList }, () => {//计算总价
            this.calculation()
        })
    }

    showAdd(index) {//购物列表商品++
        let { showList } = this.state
        showList[index].num++
        this.setState({ showList }, () => {
            this.calculation()
        })
    }

    editMaskType() {//点击购物车小图标市判断蒙版和购物车列表是否出现
        let { maskType, showList } = this.state
        if (showList.length == 0) return
        this.setState({ maskType: !maskType })
    }

    onScroll(e) {//滚动时判断给哪个标签加高亮
        let scrollTops = e.detail.scrollTop
        // console.log(scrollTops)
        let { sonTop, current, tapScroll } = this.state
        if (!tapScroll) return
        sonTop.map((item, index) => {
            // console.log(item.startTop, item.endTop)
            if (scrollTops > item.startTop && scrollTops < item.endTop) {
                this.setState({ current: index, labelId: 'T' + index })
            }
        })
    }

    current(e) { //点击跳转切换
        // console.log(e)
        let ids = 'T' + e
        clearTimeout(this.state.timer)
        const timer = setTimeout(() => {
            this.setState({ tapScroll: true })
        }, 500)
        this.setState({
            current: e,
            currId: ids,
            tapScroll: false,
            timer: timer
        })
    }

    async goSubOrder() {//订单结算界面
        if (this.props.counter.information.nickName == '') {
            const res = await showModer('', '还未登录，是否进入登录？')//标题，提示内容
            if (res.confirm) {
                Taro.navigateTo({
                    url: '/pages/login/login'
                })
            }
            return
        }
        if (this.state.total === 0) {
            return
        }
        Taro.navigateTo({
            url: '/pages/suborder/suborder'
        })
    }

    details() {//商品详情
        let { detailsMask } = this.state
        this.setState({detailsMask:!detailsMask})
    }

    render() {
        let { tabList, maskType, showList, total, current, currId, labelId, detailsMask } = this.state
        let arrayListTitle: any = []
        tabList.map((item, index) => {//处理数组，将数组的商品标题单独处理
            // console.log(item)
            arrayListTitle.push({ title: item.title + index })
        })
        return (
            <View className="box">

                {/* 头部 */}
                <View className="header">
                    <View className="headerImg">
                    </View>
                    <View className="headerText">
                        <View>
                            <View className="time">购买成功后我们的工作人员会联系你配货上门</View>
                            <View className="notice">公告</View>
                        </View>
                        <View className="follow">关注</View>
                    </View>
                </View>

                {/* 内容区 */}
                <View className="content">
                    <ScrollView
                        className="contentLeft"
                        scrollY
                        scrollWithAnimation
                        scrollIntoView={labelId}
                    >
                        {
                            arrayListTitle.map((item, index) => {
                                return <View id={'T' + index} className={current === index ? 'list activer' : 'list'} onClick={this.current.bind(this, index)} key={item.title}>
                                    {item.title}
                                </View>
                            })
                        }
                    </ScrollView>
                    <View className="contentRight">
                        <ScrollView
                            className="scrollViews"
                            scrollY
                            scrollWithAnimation
                            scrollIntoView={currId}
                            onScroll={this.onScroll.bind(this)}
                        >
                            {
                                tabList.map((item, index) => {
                                    return <View className="listBox" id={'T' + index} key={item.title} onClick={this.details.bind(this)}>
                                        <View className="listTitle">{item.title}{index}</View>
                                        {
                                            item.showlist.map((item2, index2) => {
                                                return <View key={item2.name}>
                                                    <View className="list">
                                                        <View className="listContentImgBox">
                                                            <Image className="img" src={require('../../img/1.png')} mode="aspectFill"></Image>
                                                            <View className="mask" style={item2.numType ? 'display:none' : ''}>
                                                                <View>暂停</View>
                                                                <View>出售</View>
                                                            </View>
                                                        </View>
                                                        <View className="lsitContent">
                                                            <View className="listContentTop">
                                                                <View className="name">{item2.name}</View>
                                                                {/* <AtIcon value='chevron-right' size='12' color='black' className="Icon"></AtIcon> */}
                                                            </View>
                                                            <View className="listContentMiddle">月售{item2.sold}</View>
                                                            <View className="listContentBottom">
                                                                <View className="money">￥{item2.money}</View>
                                                                <View className="addBox">
                                                                    <View className="del" style={item2.num <= 0 ? 'opacity: 0;' : 'opacity: 1;'} onClick={this.delshow.bind(this, item2, index, index2)}>
                                                                        <AtIcon value='subtract' size='12' color='#333' className="addIcon"></AtIcon>
                                                                    </View>
                                                                    <View className="addNum" style={item2.num <= 0 ? 'opacity: 0;' : 'opacity: 1;'}>{item2.num}</View>
                                                                    <View className="add" onClick={this.addshow.bind(this, item2, index, index2)}>
                                                                        <AtIcon value='add' size='12' color='#fff' className="addIcon"></AtIcon>
                                                                    </View>
                                                                </View>
                                                            </View>
                                                        </View>
                                                    </View>
                                                </View>
                                            })
                                        }
                                    </View>
                                })
                            }
                        </ScrollView>
                    </View>
                </View>

                {/* 底部结算导航栏 */}
                <View className="footer">
                    <View className="footerBox">
                        <View className="footerBoxLeft">
                            <View className="showIconBox" onClick={this.editMaskType}>
                                <View className="showIcon">
                                    <AtIcon value='shopping-cart' size='30' color='#fff' className="Icon"></AtIcon>
                                    <View className="showNum" style={showList.length == 0 ? 'display:none' : ''}>{showList.length}</View>
                                    {/* style动态绑定,根据showList长度判断是否出现，长度为0不出现购物车上的小角 */}
                                </View>
                            </View>
                            <View className="totalMoney">￥{total}</View>
                        </View>
                        <View className="footerBoxRight" onClick={this.goSubOrder}>去结算</View>
                    </View>
                </View>

                <View className="detailsMask" style={detailsMask ? '' : 'display:none'} onClick={()=>{this.setState({detailsMask:!detailsMask})}}>
                    <View className="contentBox">
                        <View className="tiltle">标题</View>
                        <Image className="img" src={require('../../img/1.png')} mode="aspectFill"></Image>
                        <View className="introduction">卡仕达看见爱上的尽快哈数据库的哈就开始打卡华盛顿科技has就肯定会科技阿阿斯顿很快就阿哈萨克觉得哈卡几哈山东矿机卡仕达看见爱上的尽快哈数据库的哈就开始打卡华盛顿科技has就肯定会科技阿阿斯顿很快就阿哈萨克觉得哈卡几哈山东矿机</View>
                        <View className="money">￥50</View>
                    </View>
                </View>

                <View className="mask" style={maskType ? '' : 'display:none'} onClick={() => { this.setState({ maskType: !maskType }) }}>
                    {/* 购物车蒙版  style动态绑定,根据masktype 布尔值判断是否出现*/}
                    
                </View>

                {/* 购物车 */}
                <View className="shopCartBox" style={maskType ? '' : 'display:none'}>
                    {/* style动态绑定,根据masktype 布尔值判断是否出现 */}
                    <View className="shopCotent">
                        <View className="shopTop">
                            <View>已选产品</View>
                            <View className="deleCartList" onClick={this.empty}>
                                <View className="IconBox"><AtIcon className="Icon" value='trash' size='12' color='#000' ></AtIcon> </View>
                                清空购物车
                            </View>
                        </View>
                        <View className="showListbox">
                            {/* 购物车列表 */}
                            {
                                showList.map((item, index) => {
                                    return <View className="showList" key={item.id}>
                                        <View className="showListImg"></View>
                                        <View className="showText">
                                            <View className="showName">{item.name}</View>
                                            <View className="showOther">
                                                <View className="showMoney">￥{item.money}</View>
                                                <View className="showEdit">
                                                    <AtIcon value='subtract' size='12' color='#fff' className="showSub" onClick={() => this.showSub(index)}></AtIcon>
                                                    <View className="showNum">{item.num}</View>
                                                    <AtIcon value='add' size='12' color='#fff' className="showAdd" onClick={() => this.showAdd(index)}></AtIcon>
                                                </View>
                                            </View>
                                        </View>
                                    </View>
                                })
                            }
                            {/* 购物车列表 */}

                        </View>
                    </View>
                </View>
            </View>

        )
    }
}



export default Index
