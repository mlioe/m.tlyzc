import { ComponentClass } from 'react'
import Taro, { Component, Config } from '@tarojs/taro'
import { View, Button, Input, Image } from '@tarojs/components';
import { connect } from '@tarojs/redux'
// import { AtIcon } from 'taro-ui'//底部栏,图标
import './getcode.scss'
import { userInformation } from '../../actions/counter';
import { showModerNoCancel, showToast } from '../../interaction/interac';

import getCodes from '../../api/getcode'


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
    currenIndex: number,
    code: string,
    focus: boolean
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
        navigationBarTitleText: ''
    }



    constructor(props) {
        super(props)
        this.state = {
            types: true,//切换登录方式的状态
            codeNum: 60,
            getCodeType: true,
            timer: null,
            phone: '',//手机
            currenIndex: 0,//下标
            code: '',//验证码
            focus: false
        }
        this.getcode = this.getcode.bind(this)
    }

    componentWillMount() { }

    componentDidMount() {
        this.setState({ phone: this.$router.params.phone })//将上个页面的手机号传输过来
        this.getcode(this.$router.params.phone)
    }

    onBlur(e) {
        this.setState({ focus: false }, () => {
            console.log(this.state.code[1])
        })
    }

    onInp(e) {//监听输入
        // console.log(e.detail.value)
        let { phone } = this.state
        this.setState({ code: e.detail.value }, () => {
            if (this.state.code.length == 6) {//说明输入到最后一位了
                const newcode = this.state.code
                this.login(this.state.phone, newcode)
                this.setState({//然后将输入框清空
                    code: '',
                    focus: false
                })
            }
        })
    }

    async login(phone, codes) { //登录功能
        Taro.showLoading({ title: '登录中', mask: true })
        const data = await getCodes.logins(phone, codes)
        console.log(data)
        if (data.code === 0) {
            // data.data: {id: 1464, token: "949d30db2216491c"}获取到的id和token
            Taro.setStorageSync('tokens', JSON.stringify(data.data))//缓存
            console.log('--registerInYzc--')
            const logindata = await getCodes.registerInYzc(data.data)
            console.log('--registerInYzc--')
            Taro.hideLoading() //隐藏加载框
            if (logindata.code === 0) {
                // console.log({nickName:logindata.data.nickname,avatarUrl:logindata.data.avatar_image_url })
                this.props.userInformation({nickName:logindata.data.nickname,avatarUrl:logindata.data.avatar_image_url })
                Taro.setStorageSync('unionId', JSON.stringify(logindata.data)) //缓存unid
                Taro.navigateBack({
                    delta:2
                })//登录成功后跳回来的页面
            } else {
                if (typeof logindata.data != 'undefined' || logindata.data != '') {//如果data不为空，但code不为0，说明可能已经注册过了
                    this.props.userInformation({nickName:logindata.data.nickname,avatarUrl:logindata.data.avatar_image_url })
                    Taro.setStorageSync('unionId', JSON.stringify(logindata.data)) //缓存unid
                    let unionID = Taro.getStorageSync('unionId')//获取缓存的unionID
                    console.log(unionID)
                    Taro.navigateBack({
                        delta:2
                    })//登录成功后跳回来的页面
                } else {
                    showModerNoCancel('', logindata.message + ',' + logindata.detail)
                }
            }
        } else {
            Taro.hideLoading() //隐藏加载框
            showModerNoCancel('', data.message + ',' + data.detail)
        }
    }

    async getcode(phone) { //获取二维码
        const data = await getCodes.getCodes(phone)
        if (data.code === 0) {
            showToast('获取验证码成功')
            this.getcodeVerification()
        } else {
            const modoType = await showModerNoCancel('', data.message + ',' + data.detail) //报错点击确认后返回上一层页面
            // if (modoType.confirm) Taro.navigateBack()
        }
    }

    getcodeVerification() { //验证码倒计时
        let { codeNum, getCodeType } = this.state
        if (getCodeType) { //true才可以点击
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

    render() {
        let { phone, code, codeNum, getCodeType, focus } = this.state

        return (
            <View className="getcodeBox">
                <View className="header">输入验证码</View>
                <View className="tips">验证码已发送至 +86 {phone}</View>
                <View className="inpbox">
                    <Input className="Inp" type="number" value={code} onInput={this.onInp.bind(this)} maxLength={6} onBlur={this.onBlur.bind(this)} focus={focus}></Input>
                    <View className="codeInputBox" onClick={() => { this.setState({ focus: true }) }}>
                        <View className={code.length == 0 ? 'codes codesActiver' : 'codes'}>{code[0]}</View>
                        <View className={code.length == 1 ? 'codes codesActiver' : 'codes'}>{code[1]}</View>
                        <View className={code.length == 2 ? 'codes codesActiver' : 'codes'}>{code[2]}</View>
                        <View className={code.length == 3 ? 'codes codesActiver' : 'codes'}>{code[3]}</View>
                        <View className={code.length == 4 ? 'codes codesActiver' : 'codes'}>{code[4]}</View>
                        <View className={code.length == 5 ? 'codes codesActiver' : 'codes'}>{code[5]}</View>
                    </View>
                </View>

                <View className="codenum" onClick={() => {
                    if (getCodeType) {//判断是否可以点击获取验证码
                        this.getcode(this.$router.params.phone)
                    }
                }}>
                    {getCodeType ? '重新获取验证码' : codeNum + '后重新获取验证码'}
                </View>
            </View>

        )
    }
}



export default Index as ComponentClass<PageOwnProps, PageState>
