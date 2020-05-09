import { ComponentClass } from 'react'
import Taro, { Component, Config } from '@tarojs/taro'
import { View, Button, Input, Image } from '@tarojs/components';
import { connect } from '@tarojs/redux'
import { AtIcon } from 'taro-ui'//底部栏,图标
import './login.scss'
import { userInformation } from '../../actions/counter';
import { getCode,register } from '../../api/login';
import { showModerNoCancel, showToast } from '../../interaction/interac';
import helper from '../../request/helper'
import { url } from '../../request/request';


type PageStateProps = {
    counter: {
        num: number,

    }
}

type PageDispatchProps = {
    add: () => void
    dec: () => void
    asyncAdd: () => any
    userInformation: (res) => any
}

type PageOwnProps = {}

type PageState = {
    types: Boolean,
    codeNum: number,
    getCodeType: Boolean,
    timer: any,
    phone: string,
    name: string,
    code: string,
    pass:string,

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
        navigationBarTitleText: '登录'
    }



    constructor(props) {
        super(props)
        this.state = {
            types: true,//切换登录方式的状态
            codeNum: 60,
            getCodeType: true,
            timer: null,
            phone: '',//手机
            code: '',//二维码
            name: '',//名字
            pass:''//密码
        }
        this.getUserInfo = this.getUserInfo.bind(this)
    }

    componentWillMount() {}

    componentDidMount() {    }

    getUserInfo(e) {//微信登录
        if (e.detail.userInfo) {//不为空说明用户已经点击了同意
            console.log(e.detail.userInfo)
            // this.props.userInformation({nickName :e.detail.userInfo.nickName})
            let informatiin = e.detail.userInfo
            Taro.setStorageSync('informatiin', informatiin)
            Taro.login({
                success(res) {
                    console.log(res)
                }
            })
            Taro.navigateBack()
        }
    }

    phones(e){ //监听手机号码输入
        // console.log(e.detail.value)
        this.setState({phone:e.detail.value})
    }

    getCode(){//获取验证码
        const {phone} = this.state
        if(phone.length != 11) return
        if(!helper.passVer(phone)){
            showModerNoCancel('','手机格式有误')
            return
        }
        Taro.navigateTo({
            url:'/pages/getcode/getcode?phone='+phone
        })
    }



    render() {
        let { phone} = this.state
        return (
            <View className="loginBox">
                <View className="header">欢迎登陆黄月子家</View>
                <View className="phoneInpBox">
                    <View className="inputBox">
                        <View className="inputBoxL">
                            <View>+86</View>
                            <AtIcon value='chevron-right' size='20' color='#fbc504' className="Icon"></AtIcon>
                        </View>
                        <View className="inputBoxR">
                            <Input type="number" className="inputs" placeholder="请输入手机号" onInput={this.phones.bind(this)} maxLength={11}/>
                        </View>
                    </View>
                </View>
                <View className="tips">未注册的手机号验证后自动创建账号</View>
                <View className="getcode" style={phone.length===11?'background-color: #fbc504;':'background-color: #cccccd;'} onClick={this.getCode.bind(this)}>
                    获取短信验证码
                </View>


                <Button
                    type='primary'
                    loading={false}
                    className="weChatButton"
                    open-type="getUserInfo"
                    onGetUserInfo={this.getUserInfo}
                >
                    <Image  src={require('../../img/wechat.png')} className="wechatIcon"></Image>
                </Button>

            </View>

        )
    }
}



export default Index as ComponentClass<PageOwnProps, PageState>
