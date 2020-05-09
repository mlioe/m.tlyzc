import { ComponentClass } from 'react'
import Taro, { Component, Config } from '@tarojs/taro'
import { View, Button, Input, Image } from '@tarojs/components';
import { connect } from '@tarojs/redux'
import { AtIcon } from 'taro-ui'//底部栏,图标
import './login.scss'
import { userInformation } from '../../actions/counter';
import { getCode,register } from '../../api/login';
import { showModerNoCancel, showToast } from '../../interaction/interac';


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
        this.getcode = this.getcode.bind(this)
    }

    componentWillMount() {}

    componentDidMount() {    }

    async getcode() {//验证码
        let {getCodeType,phone} = this.state
        if(!getCodeType) return //反正重复点击
        let dates = await getCode(phone)
        // console.log(dates)
        if(!dates){//先判断手机格式
            //
        }else if(dates.code!=0){
            if(dates.code===402010){
                showModerNoCancel('','你的手机号注册次数过多，请稍后尝试')
                this.getcodeVerification()
            }else{
                this.getcodeVerification()
                showModerNoCancel('','系统故障')
            }
        }else{
            this.getcodeVerification()
            showToast(dates.message)
        }
    }
    getcodeVerification(){//验证码倒计时
        let {codeNum,getCodeType} = this.state
        // console.log(this.state)
        if(getCodeType){//true才可以点击
            let timer = setInterval(()=>{
                this.setState({codeNum:(codeNum--),getCodeType:!getCodeType},()=>{
                    if(codeNum === -1){
                        clearInterval(timer)
                        this.setState({codeNum:60,getCodeType:true})
                    }
                })
            },1000)
        }
    }
    phoneInp(e) {
        this.setState({ phone: e.detail.value })
    }
    codeInp(e) {
        this.setState({ code: e.detail.value })
    }
    nameInp(e) {
        this.setState({ name: e.detail.value })
    }
    passInp(e){
        this.setState({ pass: e.detail.value })
    }
    async btn1(){
        let {code,phone} = this.state
        const dates = await register(phone,code)
        // datas.data = {id: 1458,token: "bc8ef3f1c5d790bd"}
        if(dates.code===0){
            showToast('',dates.message)
        }
        console.log(dates)
    }
    getUserInfo(e) {//微信登录
        if (e.detail.userInfo) {//不为空说明用户已经点击了同意
            this.props.userInformation(e.detail.userInfo)
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
    

    phoneRegister(){
        Taro.navigateTo({
            url:'/pages/register/register?registerType='+this.state.types
        })
    }


    render() {
        let { types, getCodeType, codeNum } = this.state
        return (
            <View className="box">
               
                {/* <View className="header">
                    <View className="headerLeft" style={types ? '' : 'color:#757575'} onClick={()=>{this.setState({types:!types})}}>手机注册</View>
                    <View className="headerRight" style={!types ? '' : 'color:#757575'} onClick={()=>{this.setState({types:!types})}}>用户名注册</View>
                </View> */}

                 {/* 手机登录 */}

                <View className="phoneRegister" style={types ? '' : 'display:none'}>
                    <View className="phone">
                        <AtIcon value='iphone' size='20' color='#333' className="Icon"></AtIcon>
                        <Input type="number" placeholder="请输入手机号" className="Inp" maxLength={11} onInput={this.phoneInp.bind(this)}></Input>
                    </View>
                    <View className="code">
                        <AtIcon value='' size='20' color='#333' className="Icon"></AtIcon>
                        <Input type="number" placeholder="请输入手机验证码" className="Inp" maxLength={11} onInput={this.codeInp.bind(this)}></Input>
                        <View className="getcode" onClick={this.getcode.bind(this)}>{!getCodeType ? codeNum : '获取验证码'}</View>
                    </View>
                    <View className="phoneRegisters" onClick={this.phoneRegister.bind(this)}>手机注册</View>
                </View>

                <View className="btn1" style={types ? '' : 'display:none'} onClick={this.btn1.bind(this)}>登录</View>

                {/* 手机登录 */}

                <View className="phoneRegister" style={!types ? '' : 'display:none'}>
                    <View className="phone">
                        <AtIcon value='user' size='20' color='#333' className="Icon"></AtIcon>
                        <Input type="number" placeholder="请输入手机号" className="Inp" maxLength={11} onInput={this.nameInp.bind(this)}></Input>
                    </View>
                    <View className="phone">
                        <AtIcon value='lock' size='20' color='#333' className="Icon"></AtIcon>
                        <Input type="number" placeholder="请输入密码" className="Inp" maxLength={11} onInput={this.passInp.bind(this)}></Input>
                    </View>
                    <View className="phoneRegisters" onClick={this.phoneRegister.bind(this)}>用户名注册</View>
                </View>

                <View className="btn2" style={!types ? '' : 'display:none'}>登录</View>
                <Button
                    type='primary'
                    loading={false}
                    className="weChatButton"
                    open-type="getUserInfo"
                    onGetUserInfo={this.getUserInfo}
                >
                    
                    <Image  src={require('../../img/wechat.png')} className="wechatIcon"></Image>
                </Button>
                    {/* <Image src={require('../../img/wechat.png')}></Image> */}

                {/* <Button
                    type='primary'
                    loading={false}
                    className="buttons"
                    open-type="getUserInfo"
                    onGetUserInfo={this.getUserInfo}
                >
                    微信登录
                </Button> */}
            </View>

        )
    }
}



export default Index as ComponentClass<PageOwnProps, PageState>
