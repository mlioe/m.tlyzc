import { ComponentClass } from 'react'
import Taro, { Component, Config } from '@tarojs/taro'
import { View, Input } from '@tarojs/components'
import { connect } from '@tarojs/redux'
// import { AtIcon } from 'taro-ui'//底部栏,图标
import { AtIcon } from 'taro-ui'
import './register.scss'

import { getCode, register, registerInYzc } from '../../api/register';


// import { addAress } from '../../actions/counter';
import { showToast, showModerNoCancel } from '../../interaction/interac';


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
    pass: string,
    pass2: string
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
        navigationBarTitleText: '注册'
    }



    constructor(props) {
        super(props)
        this.state = {
            types: true,//进行手机注册和用户注册切换
            codeNum: 60,//倒计时
            getCodeType: true,//判断是否可以进行验证码
            timer: null,//
            phone: '',//注册手机号
            name: '',//注册名字
            code: '',//验证码
            pass: '',//第一次输入密码
            pass2: ''//第二次输入密码
        }

    }

    async componentWillMount() {
        //判断是点击手机注册进入还是用户点击注册进入
        let types = this.$router.params.registerType
        let inptype = types === "true" ? true : false //上个页面传入的数据默认为字符串需要进行转换
        this.setState({ types: inptype })
    }

    async getcode() {//获取验证码
        let { getCodeType, phone } = this.state
        if (!getCodeType) return //防止重复点击
        let dates = await getCode(phone)//请求接口
        if (!dates) {//先判断手机格式
        } else if (dates.code != 0) {
            if (dates.code === 402010) {//请求二维码过多
                showModerNoCancel('', '你的手机号注册次数过多，请稍后尝试')
                this.getcodeVerification()
            } else {//其他报错
                showModerNoCancel('', dates.message + ',' + dates.detail)
                this.getcodeVerification()
            }
        } else {//请求成功
            showToast(dates.message)
            this.getcodeVerification()
        }
    }

    async btn1() {//点击手机号登录
        let { code, phone } = this.state
        const dates = await register(phone, code)//获取数据
        if (!dates) {
            return
        }
        // datas.data = {id: 1458,token: "bc8ef3f1c5d790bd"}//dates.data的返回数据结构
        if (dates.code === 0) {
            // showToast(dates.message)
            Taro.setStorageSync('tokens', JSON.stringify(dates.data))//缓存第一次注册的结果
            const tokens = Taro.getStorageSync('tokens')
            this.registerInyzc(tokens)
        } else {
            showModerNoCancel('', dates.message + ',' + dates.detail)//报错提示提示
        }
    }
    /**将注册时得到的id 和 token 传入进行注册到黄月子小程序系统里面
     * tokens = {id:'',token:''}
     * @param tokens 
     */
    async registerInyzc(tokens) {
        const dates = await registerInYzc(JSON.parse(tokens))
        if (dates.code === 0) {
            Taro.setStorageSync('unionID', JSON.stringify(dates.data))//缓存第二次注册的结果
            showToast(dates.message)
            setTimeout(() => {
                // console.log('返回"我的"页面')
                Taro.switchTab({
                    url: '/pages/my/my'
                })
            }, 2000)
        } else {
            showModerNoCancel('', dates.message + ',' + dates.detail) //提示
        }
    }


    btn2() {//点击用户注册
        let { name, pass, pass2 } = this.state
        console.log(name, pass, pass2)
    }


    getcodeVerification() {//验证码倒计时
        let { codeNum, getCodeType } = this.state
        // console.log(this.state)
        if (getCodeType) {//true才可以点击
            let timer = setInterval(() => {
                this.setState({ codeNum: (codeNum--), getCodeType: !getCodeType }, () => {
                    if (codeNum === -1) {
                        clearInterval(timer)
                        this.setState({ codeNum: 60, getCodeType: true })
                    }
                })
            }, 1000)
        }
    }
    /**
     * e.detail.value是输入的文字
     * @param e 
     */
    phoneInp(e) {//监听手机变化
        this.setState({ phone: e.detail.value })
    }
    codeInp(e) {//监听验证码
        this.setState({ code: e.detail.value })
    }
    nameInp(e) {//监听用户名称
        this.setState({ name: e.detail.value })
    }
    passInp(e) {//监听密码输入
        this.setState({ pass: e.detail.value })
    }
    qrpassInp(e) {//监听第二次密码输入
        this.setState({ pass2: e.detail.value })
    }
    

    render() {
        let { types, codeNum, getCodeType } = this.state
        return (
            <View className="box">
                {/* <View className="header">
                    <View className="headerLeft" style={types ? '' : 'color:#757575'} onClick={() => { this.setState({ types: true }) }}
                    >手机注册</View>
                    <View className="headerRight" style={types ? 'color:#757575' : ''} onClick={() => { this.setState({ types: false }) }}>用户名注册</View>
                </View> */}

                <View className="phoneRegister" style={types ? '' : 'display:none'}>
                    <View className="phone">
                        <AtIcon value='iphone' size='20' color='#333' className="Icon"></AtIcon>
                        <Input type="number" placeholder="请输入手机号" className="Inp" maxLength={11} onInput={this.phoneInp.bind(this)}></Input>
                    </View>
                    <View className="code">
                        <AtIcon value='' size='20' color='#333' className="Icon"></AtIcon>
                        <Input type="number" placeholder="请输入手机验证码" className="Inp" maxLength={6} onInput={this.codeInp.bind(this)}></Input>
                        <View className="getcode" onClick={this.getcode.bind(this)}>{!getCodeType ? codeNum : '获取验证码'}</View>
                    </View>
                    {/* <View className="name">
                        <AtIcon value='user' size='20' color='#333' className="Icon"></AtIcon>
                        <Input type="text" placeholder="请输入名字（非必填）" className="Inp" maxLength={11} onInput={this.names.bind(this)}></Input>
                    </View> */}


                </View>
                <View className="save" style={!types ? 'display:none' : ''} onClick={this.btn1.bind(this)}>注册</View>

                <View className="phoneRegister" style={types ? 'display:none' : ''}>
                    <View className="phone">
                        <AtIcon value='user' size='20' color='#333' className="Icon"></AtIcon>
                        <Input type="number" placeholder="请输入手机号" className="Inp" maxLength={11} onInput={this.nameInp.bind(this)}></Input>
                    </View>
                    <View className="phone">
                        <AtIcon value='lock' size='20' color='#333' className="Icon"></AtIcon>
                        <Input type="number" password placeholder="请输入密码" className="Inp" maxLength={11} onInput={this.passInp.bind(this)}></Input>
                    </View>
                    <View className="phone">
                        <AtIcon value='lock' size='20' color='#333' className="Icon"></AtIcon>
                        <Input type="number" password placeholder="请再次输入密码" className="Inp" maxLength={11} onInput={this.qrpassInp.bind(this)}></Input>
                    </View>
                </View>
                <View className="save2" style={!types ? '' : 'display:none'} onClick={this.btn2.bind(this)}>注册</View>
            </View>

        )
    }
}



export default Index as ComponentClass<PageOwnProps, PageState>
