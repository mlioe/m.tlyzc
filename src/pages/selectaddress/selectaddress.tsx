import { ComponentClass } from 'react'
import Taro, { Component, Config } from '@tarojs/taro'
import { View, Map, Input } from '@tarojs/components';
import { connect } from '@tarojs/redux'
import { AtIcon } from 'taro-ui'//底部栏,图标
import './selectaddress.scss'
import { userInformation } from '../../actions/counter';
import QQMapWX from '../../libs/qqmap-wx-jssdk'//腾讯地图jsdk
import { showModer } from '../../interaction/interac';



type PageStateProps = {
    counter: {
        num: number,
        key: string
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
    city: string,
    latitude: any,
    longitude: any,
    markers: Array<any>,
    value: string,
    timer: any,
    addressList: Array<any>,
    searchAddressList: Array<any>,
    maskType: Boolean,
    title: string,
    locationCity: string
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
        navigationBarTitleText: '选择收获地址'
    }



    constructor(props) {
        super(props)
        this.state = {
            city: '',
            latitude: 0,
            longitude: 0,
            markers: [{
                id: 1,
                latitude: 0,
                longitude: 0,
                name: ''
            }],
            value: '',
            timer: null,
            addressList: [],
            searchAddressList: [],//搜索的地址列表
            maskType: false,
            title: ' ',
            locationCity: ''//定位传过来的值定位
        }
        this.getAddress = this.getAddress.bind(this)
        this.loctionsSuggestion = this.loctionsSuggestion.bind(this)
    }

    componentWillMount() {

    }

    componentDidMount() {
        // console.log(this.$router.params)
        let markers: any = []
        let latitude = ''
        let longitude = ''
        let title = ''
        // Taro.showLoading({title:'加载中'})
        Taro.getLocation({//获取经纬度
            type: 'wgs84',
            success: (res) => {
                if (JSON.stringify(this.$router.params) === '{}') {
                    markers = [{ id: 1, latitude: res.latitude, longitude: res.longitude, name: '' }]
                    latitude = res.latitude
                    longitude = res.longitude
                    title = ''
                } else {
                    const mark = JSON.parse(this.$router.params.geography_info)
                    markers = [{
                        id: 1,
                        latitude: mark.lat,
                        longitude: mark.lng
                    }]
                    latitude = mark.lat.toString()
                    longitude = mark.lng.toString()
                    title = this.$router.params.title
                }
                this.setState({
                    latitude: latitude, //经纬度
                    longitude: longitude,
                    markers: markers, //给地图加上标记点
                    title: title,//上个页面传过来的title
                    locationCity: this.$router.params.city//城市
                }, () => {
                    this.getAddress(res.latitude, res.longitude)
                })

            }
        })
    }

    getAddress(latitude, longitude) {//获取地址
        let { title } = this.state
        let qqmapsdk = new QQMapWX({ key: this.props.counter.key });
        qqmapsdk.reverseGeocoder({
            location: {
                latitude: latitude,
                longitude: longitude
            },
            success: (res) => {
                // console.log(res)
                let city = res.result.address_component.city
                // let selectAddressList = [{ title: res.result.formatted_addresses.recommend, address: res.result.address }]//获取地址名称，和地址的位置
                this.setState({ city }, () => {
                    // console.log(title)
                    if (title == '') {//判断是从新增界面过来，还是更新地址界面过来
                        // console.log('添加页面')
                        this.getSuggestion(res.result.address_component.street, 'location')
                    } else {//否则默认搜索附近的默认地址
                        // console.log('更新接口')
                        this.loctionsSuggestion()
                    }
                })

            }
        })
    }

    /**
     * 
     * @param value //传入的搜索关键字
     * @param who //谁传入的，location是定位，search是搜索框的
     */

    getSuggestion(value, who) {//根据传入的值搜索附近地址
        Taro.showLoading({ title: '获取地址中' })
        // console.log(value,who)
        let { city } = this.state
        let qqmapsdk = new QQMapWX({ key: this.props.counter.key });
        let selectAddressList: any = []
        qqmapsdk.getSuggestion({
            keyword: value,
            region: city,
            success: (res) => {
                // console.log(res.data)
                res.data.map((item) => {
                    selectAddressList.push(item)
                })
                if (who === 'location') {
                    this.setState({ addressList: selectAddressList })
                } else {
                    this.setState({ searchAddressList: selectAddressList })
                }
                Taro.hideLoading()
            }
        })
    }

    /**
     * 
     * @param value //传入的搜索关键字
     * @param who //谁传入的，location是定位，search是搜索框的
     */

    loctionsSuggestion() {//根据修改功能传入的值搜索附近地址
        Taro.showLoading({ title: '获取地址中' })
        let { locationCity,title } = this.state
        let qqmapsdk = new QQMapWX({ key: this.props.counter.key });
        let selectAddressList: any = []
        qqmapsdk.getSuggestion({
            keyword: title,
            region: locationCity,
            success: (res) => {
                // console.log(res.data)
                res.data.map((item) => {
                    selectAddressList.push(item)
                })
                this.setState({ addressList: selectAddressList })
                Taro.hideLoading()
            }
        })
    }

    onTabItemTap(e) {//搜索框的值
        // console.log(e.detail.value)
        let value = e.detail.value
        this.setState({ value })
        clearTimeout(this.state.timer)//如果不断输入，就会清除上一个计时器
        const timer = setTimeout(() => {//0.5秒后请求api
            if (e.detail.value === '') return
            this.getSuggestion(e.detail.value, 'search')
        }, 500)
        this.setState({ timer })//存入全局变量中，下次触发拿到这个计数器
    }

    tapList(e) {//点击地址列表缓存并返回上一级页面
        // console.log(e)
        Taro.setStorageSync('selectAddress', JSON.stringify(e))//缓存传值
        Taro.navigateBack()
    }

    render() {
        let { city, longitude, latitude, markers, addressList, searchAddressList, maskType } = this.state
        return (
            <View className="box">
                {/* 打开时的搜索框 */}
                <View className="header" style={!maskType ? " " : "display:none"}>
                    <View className="headerAddress">
                        <AtIcon value='map-pin' size='20' color='#cccccd' className="Icon"></AtIcon>
                        {city}
                    </View>
                    <View className="inputBox">
                        <View className="Inp" onClick={() => { this.setState({ maskType: !maskType }) }}>请输入你的收货地址</View>
                    </View>
                </View>
                {/* 点击 */}

                <View className="searcHeader" style={maskType ? " " : "display:none"}>
                    <View className="headerAddress">
                        <AtIcon value='map-pin' size='20' color='#cccccd' className="Icon"></AtIcon>
                        {city}
                    </View>
                    <View className="inputBox">
                        <Input className="Inp" type="text" placeholder="请输入你的收货地址" onInput={this.onTabItemTap.bind(this)}></Input>
                    </View>
                    <View className="down" onClick={() => { this.setState({ maskType: !maskType }) }}>取消</View>
                </View>

                <View className="mapBox" style={!maskType ? "display:block" : "display:none"}>
                    <Map className="map" longitude={longitude} latitude={latitude} markers={markers}></Map>
                </View>

                <View className="addressListBox" style={!maskType ? "display:block" : "display:none"}>
                    {
                        addressList.map((item, index) => {
                            return <View className="list" key={item.title} onClick={this.tapList.bind(this, item)}>
                                <View className={index === 0 ? "listLeft activeBg " : "listLeft"}>

                                </View>
                                <View className="listright">
                                    <View className={index === 0 ? "listTitle activeColor" : "listTitle"}>{item.title}</View>
                                    <View className="listAddress">{item.address}</View>
                                </View>
                            </View>
                        })
                    }
                </View>

                <View className="mask" style={maskType ? "display:block" : "display:none"}></View>
                <View className="selectList" style={maskType ? "display:block" : "display:none"}>
                    {
                        searchAddressList.map((item) => {
                            return <View className="list" key={item.title} onClick={this.tapList.bind(this, item)}>
                                <View className="listTitle">{item.title}</View>
                                <View className="listAddress">{item.address}</View>
                            </View>
                        })
                    }
                </View>
            </View>
        )
    }
}



export default Index as ComponentClass<PageOwnProps, PageState>
