import { ComponentClass } from 'react'
import Taro, { Component, Config } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import { connect } from '@tarojs/redux'
// import { AtIcon } from 'taro-ui'//底部栏,图标
import { AtIcon } from 'taro-ui'
import './addresslist.scss'
import { addAress } from '../../actions/counter';//修改地址方法

// console.log(showModer)

// import { addAress } from '../../actions/counter';
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
    addressList: Array<any>
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
        navigationBarTitleText: '收货地址'
    }



    constructor(props) {
        super(props)
        this.state = {
            addressList: []
        }

    }

    componentWillMount() {


    }

    componentDidMount() {

    }

    componentDidShow() {
        this.getAddressList()
    }

    async getAddressList() {
        Taro.showLoading({title:'获取地址中'})
        let newarrList: Array<any> = this.props.counter.addressList
        const data = await getAddress.addresslist()
        Taro.hideLoading()
        let arr = {}
        newarrList = []
        if (data.code === 0) {
            // console.log(data.data)
            data.data.map(item => {
                // console.log(item)
                arr = item
                newarrList.push(arr)
            })
            console.log(newarrList)
            this.props.addAress(newarrList)
        }
        this.setState({ addressList: newarrList })
    }

    addAress() {//新增收货地址
        Taro.navigateTo({
            url: '/pages/addaddress/addaddress'
        })
    }
    editAddress(item,e) {
        // console.log(item.id)
        e.stopPropagation()
        Taro.navigateTo({
            url: '/pages/editaddress/editaddress?id='+item.id
        })
    }

    render() {
        let { addressList } = this.state
        // console.log(addressList)
        return (
            <View className="box">
                {
                    addressList.map((item) => {
                        return <View className="list" key={item.label}>
                            <View className="listLeft">
                                <View className="listTitle">
                                    {item.label}
                                    <Text className="text">{item.is_default === 1 ? '默认' : ''}</Text>
                                </View>
                                <View className="listOther">{item.name} {item.sex === 1 ? '先生' : '女士'} {item.mobile}</View>
                            </View>
                            <View className="iconBox" onClick={this.editAddress.bind(this,item)}>
                                    编辑
                                {/* <AtIcon value='settings' size='18' color='#333' className="Icon"></AtIcon> */}
                            </View>

                        </View>
                    })
                }

                <View className="seat" style={'height:55px'}>
                    {/* 占位用，将底部撑起来防止最后一栏看不到 */}
                </View>

                <View className="newAddress" onClick={this.addAress}>新增收货地址</View>
            </View>

        )
    }
}



export default Index as ComponentClass<PageOwnProps, PageState>
