import { ComponentClass } from 'react'
import Taro, { Component, Config } from '@tarojs/taro'
import { View, Input, RadioGroup, Radio, Label, Button } from '@tarojs/components'
import { connect } from '@tarojs/redux'
// import { AtIcon } from 'taro-ui'//底部栏,图标
import { AtIcon } from 'taro-ui'
import './editaddress.scss'
import QQMapWX from '../../libs/qqmap-wx-jssdk'//腾讯地图jsdk

// console.log(showModer)

import { addAress } from '../../actions/counter';//修改地址方法
import { showModerNoCancel, showModer } from '../../interaction/interac';//交互反馈组件
import getAddress from '../../api/address'


type PageStateProps = {
    counter: {
        num: number,
        addressList: Array<any>,
        key: any
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
    list: Array<any>,
    name: string,
    phone: string,
    numberPlate: string,
    addressList: Array<any>,
    address: any,
    maskType: Boolean,
    city: string,
    selectAddressList: Array<any>,
    value: string,
    timer: any,
    defaults: Array<any>,
    addressId: string
}

type IProps = PageStateProps & PageDispatchProps & PageOwnProps

interface Index {
    props: IProps;
}

@connect(({ counter }) => ({
    counter
}), (dispatch) => ({
    addAress(newarrList) {
        console.log(newarrList)
        dispatch(addAress(newarrList))
    }
}))
class Index extends Component<{}, PageState> {
    config: Config = {
        navigationBarTitleText: '修改地址'
    }

    constructor(props) {
        super(props)
        this.state = {
            list: [
                { value: '先生', text: '先生', checked: true }, { value: '女士', text: '女士', checked: false }
            ],
            defaults: [
                { value: '是', text: '是', checked: false }, { value: '否', text: '否', checked: true }
            ],
            name: '',//收货人名字
            phone: '',//电话
            numberPlate: '',//门牌号
            addressList: [],//获取redux的地址列表
            address: {},//点击搜索列表的地址传入这里在页面上显示，保存时拿这里的值
            maskType: false,//蒙版的状态
            city: '',//定位时拿到的城市
            selectAddressList: [],//搜索出来的地址列表
            value: '',//搜索框的值
            timer: null,//存储定时器
            addressId: ''
        }
        this.getAddress = this.getAddress.bind(this)
        this.getSuggestion = this.getSuggestion.bind(this)
    }

    componentWillMount() {
        // console.log(this.$router.params.id)
        this.addressDetail(this.$router.params.id)
    }

    componentDidShow() {//页面切换到前台
        let selectAddress: any = Taro.getStorageSync('selectAddress')//没有用到redux进行页面之间的传值,利用缓存进行页面之间的传值（缓存的是选择收货地址时缓存的值）
        let obj = {}
        if (selectAddress === '') return
        selectAddress = JSON.parse(selectAddress)
        obj = selectAddress
        this.setState({ address: obj })
        // console.log(selectAddress)
    }


    componentDidMount() {
        Taro.getLocation({//页面加载完成获取地址
            type: 'wgs84',
            success: (res) => {
                this.getAddress(res.latitude, res.longitude)
            },
            fail: (res) => {
                // console.log(res)
                if (res.errMsg === 'getLocation:fail auth deny') {
                    const data = showModer('', '您的定位功能已关闭，是否打开定位功能')
                    data.then(res => {
                        // console.log(res)
                        if (res.confirm) {
                            this.openSettings()
                        }
                        if (res.cancel) {//点击取消功能
                            Taro.navigateBack()
                        }
                    })
                }
            }
        })
    }

    componentWillUnmount() {//关闭该页面时将选择的地址缓存情况
        Taro.removeStorageSync('selectAddress')//清空该缓存
    }

    async addressDetail(id) {
        Taro.showLoading({ title: '加载详情中', mask: true })
        const data = await getAddress.addressDetails(id)
        let { defaults, list } = this.state
        let obj = {
            province: data.data.province,
            city: data.data.city,
            district: data.data.district,
            address: data.data.address,
            title: data.data.label,
            adcode: data.data.district_code,
            geography_info: data.data.geography_info
        }
        let defaultsIndex = data.data.is_default === 1 ? 0 : 1 //后端传回1代表为默认地址，我这边的列表0是默认，所以将1转为0
        let sexIndex = data.data.sex === 1 ? 0 : 1 //后端传回1代表为性别，我这边的列表0是男，所以将1转为0
        defaults.map(item => {
            item.checked = false
        })
        list.map(item => {
            item.checked = false
        })
        defaults[defaultsIndex].checked = true
        list[sexIndex].checked = true
        // console.log(obj)
        this.setState({
            defaults: defaults,
            list: list,
            name: data.data.name,
            phone: data.data.mobile,
            address: obj,
            numberPlate: data.data.house_number,
            addressId: data.data.id,
        })
        // console.log()
        Taro.hideLoading()
    }

    openSettings() {//调用微信的打开设置功能
        Taro.openSetting({
            success: res => {
                console.log(res.authSetting["scope.userLocation"])//返回true说明打开了定位功能
                if (res.authSetting["scope.userLocation"]) {

                } else {
                    Taro.navigateBack()
                }
            }
        })
    }

    getAddress(latitude, longitude) {//获取地理信息
        let qqmapsdk = new QQMapWX({ key: this.props.counter.key });
        qqmapsdk.reverseGeocoder({
            location: {
                latitude: latitude,
                longitude: longitude
            },
            success: (res) => {
                let city = res.result.address_component.city
                let selectAddressList = [{ title: res.result.formatted_addresses.recommend, address: res.result.address }]//获取地址名称，和地址的位置
                this.setState({ selectAddressList, city })
            }
        })
    }

    names(e) {//名字
        // console.log(e)
        this.setState({ name: e.detail.value })
    }

    radio(e) {//单选框
        let { list } = this.state
        list.map((item) => {
            item.checked = false
            if (item.value == e.detail.value) {
                item.checked = true
            }
        })
        this.setState({ list })
    }

    phone(e) {//手机
        this.setState({ phone: e.detail.value })
    }

    plate(e) {//门牌号
        this.setState({ numberPlate: e.detail.value })
    }

    async save() { //保存
        let { name, phone, numberPlate, address, list, defaults, addressId } = this.state
        if (address === '') {
            showModer('', '请选择地址')
            return
        }
        let sexIndex = 0
        let defaultsIndex = 0
        list.forEach((item, index) => { //判断选择男女
            if (item.checked) {
                sexIndex = index
            }
        })
        defaults.map((item, index) => { //判断选择的默认地址
            if (item.checked) {
                defaultsIndex = index
            }
        })
        let arr = {
            name: name,
            sex: sexIndex === 0 ? 1 : 0,//0是男，传给后端要转为1，转换一下
            mobile: phone,
            province: address.province,//省
            city: address.city,//市
            district: address.district,//行政市区
            address: address.address,//详细地址
            house_number: numberPlate,//门牌号
            label: address.title,//地址标签
            district_code: typeof address.adcode === 'string' ? address.adcode : address.adcode.toString(),
            geography_info: address.geography_info,
            defaults: defaultsIndex === 0 ? 1 : 0, //同理性别选择1是默认，所以转一下
            id: addressId
        }
        Taro.showLoading({ title: '保存中' })
        const data = await getAddress.addAddress(arr, "PUT")
        Taro.hideLoading()
        if (!data) return
        if (data.code != 0) {
            showModerNoCancel('', data.message + ',' + data.detail)
            return
        } else {
            Taro.navigateBack()
        }
    }

    async deletes() {
        const types = await showModer('', '确认删除？')
        if (types.confirm) {
            Taro.showLoading({ title: '删除中' })
            const data = await getAddress.deletesAddress(this.state.addressId)
            Taro.hideLoading()
            if (data.code != 0) {
                showModerNoCancel('', data.message + ',' + data.detail)
                return
            } else {
                Taro.navigateBack()
            }
        }
    }

    selectAddress(e) {//点击搜索列表里的地址
        let { maskType } = this.state
        this.setState({ maskType: !maskType })
        let address = { title: e.title, address: e.address }
        this.setState({ address })
    }

    inpChange(e) {//输入框的值
        let value = e.detail.value
        this.setState({ value })
        clearTimeout(this.state.timer)//如果不断输入，就会清除上一个计时器
        const timer = setTimeout(() => {//0.5秒后请求api
            // console.log(e.detail.value)
            if (e.detail.value == '') return
            this.getSuggestion(e.detail.value)
        }, 500)
        this.setState({ timer })
    }

    defaultRadio(e) {
        let { defaults } = this.state
        defaults.map((item) => {
            item.checked = false
            if (item.value == e.detail.value) {
                item.checked = true
            }
        })
        this.setState({ defaults })
    }

    getSuggestion(value) {//根据传入的值搜索名字
        let { city } = this.state
        let qqmapsdk = new QQMapWX({ key: this.props.counter.key });
        let selectAddressList: any = []
        qqmapsdk.getSuggestion({
            keyword: value,
            region: city,
            success: (res) => {
                // console.log(res.data)
                res.data.map((item) => {
                    selectAddressList.push({ title: item.title, address: item.address })
                })
                // console.log(selectAddressList)
                this.setState({ selectAddressList })
            }
        })
    }

    selectAddressMask() {
        // console.log(this.state.address)
        Taro.navigateTo({
            url: '/pages/selectaddress/selectaddress?title=' + this.state.address.title + '&geography_info=' + this.state.address.geography_info + '&city=' +  this.state.address.city
        })
    }

    render() {
        let { address, list, name, phone, numberPlate, defaults } = this.state
        // console.log(selectList)
        return (
            <View className="box">
                <View className="listBox">
                    <View className="listTitle">默认地址:</View>
                    <RadioGroup onChange={this.defaultRadio.bind(this)}>
                        {
                            defaults.map((item, i) => {
                                return (
                                    <Label key={i}>
                                        <Radio
                                            style={'transform: scale(0.8) !important'}
                                            className='listTitleRadio' color={"#fbc504"}
                                            value={item.value} checked={item.checked}
                                        >
                                            {item.text}
                                        </Radio>
                                    </Label>
                                )
                            })
                        }
                    </RadioGroup>
                </View>
                <View className="listBox">
                    <View className="listTitle">联系人:</View>
                    <Input type="text" className="listInp" value={name} placeholder='请输入收货人姓名' onInput={this.names.bind(this)}></Input>
                </View>
                <View className="listBox">
                    <View className="listTitle">性别:</View>
                    <RadioGroup onChange={this.radio.bind(this)}>
                        {
                            list.map((item, i) => {
                                return (
                                    <Label key={i}>
                                        <Radio
                                            style={'transform: scale(0.8) !important'}
                                            className='listTitleRadio' color={"#fbc504"}
                                            value={item.value} checked={item.checked}
                                        >
                                            {item.text}
                                        </Radio>
                                    </Label>
                                )
                            })
                        }
                    </RadioGroup>
                </View>
                <View className="listBox">
                    <View className="listTitle">手机号:</View>
                    <Input type="number" className="listInp" placeholder='手机号' value={phone} onInput={this.phone.bind(this)}></Input>
                </View>
                <View className="listBox">
                    <View className="listTitle">收货地址:</View>
                    {/* <Input type="number" className="listInp" placeholder='手机号' onInput={this.phone.bind(this)}></Input> */}
                    <View className="listSelect" onClick={this.selectAddressMask.bind(this)}>
                        <View style="flex:1;overflow: hidden;">{address.title == '' ? '请选择' : address.title}</View>
                        <AtIcon value='chevron-right' size='20' color='#757575' className="Icon"></AtIcon>
                    </View>
                </View>
                <View className="listBox">
                    <View className="listTitle">门牌号:</View>
                    <Input type="text" className="listInp" value={numberPlate} placeholder='详细地址，例：16号楼1层1室' onInput={this.plate.bind(this)}></Input>
                </View>

                <View className="save" onClick={this.save.bind(this)}>保存收货地址</View>

                <View className="deletes" onClick={this.deletes.bind(this)}>删除地址</View>




            </View>

        )
    }
}



export default Index as ComponentClass<PageOwnProps, PageState>
