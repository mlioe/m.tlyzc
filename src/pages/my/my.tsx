import { ComponentClass } from 'react'
import Taro, { Component, Config } from '@tarojs/taro'
import { View, Image, Button } from '@tarojs/components'
import { connect } from '@tarojs/redux'
// import { AtIcon } from 'taro-ui'//底部栏,图标
import { AtTabs, AtTabsPane, AtIcon } from 'taro-ui'
import './my.scss'
import { showModer, showModerNoCancel } from '../../interaction/interac';//交互反馈封装
import { userInformation, addAress } from '../../actions/counter';
import admin from '../../api/admin'

// console.log(showModer)


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
    addAress: (newarrList) => void
}

type PageOwnProps = {}

type PageState = {
    name: string,
    imgUrl: string
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
    },
    addAress(newarrList) {
        dispatch(addAress(newarrList))
    }
}))
class Index extends Component<{}, PageState> {
    config: Config = {
        navigationBarTitleText: '我的'
    }



    constructor(props) {
        super(props)
        this.state = {
            name: '',
            imgUrl: ''
        }
        this.userDetails = this.userDetails.bind(this)
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

    componentDidShow() {
        // console.log(this.props.counter.information.nickName)
        if (this.props.counter.information.nickName != '') {
            this.userDetails()
            // this.userRoleList()
        }
    }

    editUser(){//跳转修改用户昵称
        if(this.props.counter.information.nickName == ''){
            showModerNoCancel('','请先登录')
            return
        }
        Taro.navigateTo({
            url: '/pages/edituser/edituser'
        })
    }
 
    async userRoleList(){
        // const data = await admin.storeUser()
        // console.log('---')
        // console.log(data)
    }

    async userDetails() {
        const data = await admin.useDetails()
        console.log(data)
        if (data.code === 0) {//获取用户资料
            this.setState({
                name: data.data.nickname,
                imgUrl: data.data.avatar_image_url
            })
        }
    }

    async quit() {//退出登录
        const res = await showModer('', '确认退出？')//标题，提示内容
        if (res.confirm) {
            console.log('退出')
            this.props.userInformation({ nickName:'' })
            Taro.removeStorageSync('informatiin')//清空缓存
            Taro.removeStorageSync('tokens')
            Taro.removeStorageSync('unionId')
            let newarrList = []
            this.props.addAress(newarrList)
            this.setState({imgUrl:'',name:''})
        }
    }

    login() {//跳转登录页
        Taro.navigateTo({
            url: '/pages/login/login'
        })
    }

    async addressList() {//跳转地址列表
        console.log(this.props.counter.information.nickName)
        if(this.props.counter.information.nickName == ''){
           const data =  showModerNoCancel('','请先登录')
           return
        }
        Taro.navigateTo({
            url: '/pages/addresslist/addresslist'
        })
    }

    shopPhone() {//用户拨打电话
        Taro.makePhoneCall({ phoneNumber: '13250746933' })
    }

    render() {
        // let information = this.props.counter.information
        let { imgUrl, name } = this.state
        return (
            <View className="myBox">

                {/* <Button openType="getPhoneNumber" onClick={this.getUserInfos}>获取手机</Button> */}

                <View className="header">
                    <View className="headerImg">
                        <Image
                            src={imgUrl}
                            className="img"
                        />
                    </View>
                    <View className="headerLogin" onClick={this.login} style={name === '' ? '' : 'display:none'}>登录/注册</View>
                    <View className="headerName" style={name === '' ? '' : 'dispaly:none'}>{name === null ?'暂未填写昵称':name}</View>
                </View>


                <View className="list">
                    <View className="listBox" onClick={this.addressList}>
                        <Image src={require('../../img/dizhi.png')} className="img" />
                        <View className="text">收货地址</View>
                    </View>
                    {/* <Button
                        type='primary'
                        loading={false}
                        className="listBox buttons"
                        open-type="contact"
                    >
                        <Image src={require('../../img/wechat.png')} className="buttonImg"/>
                        <View className="text">客服</View>
                    </Button> */}
                    <View className="listBox" onClick={this.shopPhone.bind(this)}>
                        <Image src={require('../../img/kefu.png')} className="img" />
                        <View className="text">商铺电话</View>
                    </View>
                    <View className="listBox" onClick={this.editUser.bind(this)}>
                        <Image src={require('../../img/mydetail.png')} className="img" />
                        <View className="text">我的资料</View>
                    </View>
                    
                </View>

               

                <View className="quit" onClick={this.quit} style={name != '' ? '' : 'display:none'}>退出登录</View>
            </View>

        )
    }
}



export default Index
