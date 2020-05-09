import { ComponentClass } from 'react'
import Taro, { Component, Config } from '@tarojs/taro'
import { View, Input, Image, Picker, Form } from '@tarojs/components';
import { connect } from '@tarojs/redux'
// import { AtIcon } from 'taro-ui'//底部栏,图标
import { AtIcon, AtImagePicker } from 'taro-ui'
import './edituser.scss'


import admin from '../../api/admin'
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
    imgUrl: string,
    birthday: string,
    nickname: string,
    sex: number,
    dateSel: string,
    selector: Array<any>,
    files: any
}

type IProps = PageStateProps & PageDispatchProps & PageOwnProps

interface Index {
    props: IProps;
}

@connect(({ counter }) => ({
    counter
}), (dispatch) => ({

}))
class Index extends Component<{}, PageState> {
    config: Config = {
        navigationBarTitleText: '修改资料'
    }



    constructor(props) {
        super(props)
        this.state = {
            imgUrl: '',
            birthday: '',
            nickname: '',
            sex: 0,
            dateSel: '',
            selector: ['男', '女'],
            files: [],
            str:''
        }

    }

    componentWillMount() {


    }

    componentDidMount() {
        this.userDetails()
    }

    componentDidShow() {

    }

    async userDetails() {
        const data = await admin.useDetails()
        console.log(data)
        if (data.code === 0) {//获取用户资料
            this.setState({
                imgUrl: data.data.avatar_image_url,
                birthday: data.data.birthday,
                nickname: data.data.nickname,
                sex: data.data.sex === null ? 0 : data.data.sex
            })
        }
    }

    onInput(e) {//姓名
        this.setState({ nickname: e.detail.value })
    }

    onChange = e => {//性别
        // console.log(e.detail.value)
        this.setState({
            sex: typeof e.detail.value === 'string' ? Number(e.detail.value) : e.detail.value
        })
    }

    onDateChange = e => {//出生日期

        this.setState({
            dateSel: e.detail.value,
            birthday: e.detail.value,
        })
    }

    async save() {
        let { birthday, sex, nickname, imgUrl } = this.state
        let response = {
            nickname: nickname,
            sex: typeof sex === 'string' ? Number(sex) : sex,
            birthday: birthday,
            imgUrl: imgUrl
        }
        const data = await admin.putUser(response)
        if (!data) return
        if (data.code === 0) {
            showToast('更新成功')
            setTimeout(() => {
                Taro.navigateBack()
            }, 1500)
        } else {
            showModerNoCancel('', data.message + ',' + data.detail)
        }

    }
    onClickImg() {
        Taro.chooseImage({
            sourceType: ['album', 'camera'],
            count: 1,
            success: res => {
                console.log(res)
                // return
                this.setState({
                    imgUrl:res.tempFilePaths[0],
                    str:res.tempFilePaths[0]
                },()=>{
                    admin.adminHand(res.tempFilePaths[0])
                })
            }
        })
    }


    async sc() {
        let { birthday, sex, nickname } = this.state
        let response = {
            nickname: nickname,
            sex: typeof sex === 'string' ? Number(sex) : sex,
            birthday: birthday
        }
        let { imgUrl } = this.state
        const data = await admin.adminHand(imgUrl, response)
        console.log(data)
    }



      onImageClick (index, file) {
        console.log(index, file)
      }

      onAt(e){
        console.log(e)
      }

    render() {
        let { imgUrl, birthday, nickname, sex, dateSel ,str} = this.state
        // console.log(addressList)
        return (
            <View className="box">
                {/* <AtImagePicker
                    mode='top'
                    files={this.state.files}
                    onChange={this.onAt.bind(this)}
                    onImageClick={this.onImageClick.bind(this)}
                /> */}
                <View className="list" onClick={this.onClickImg.bind(this)}>
                    <View className="listLeft">头像</View>
                    <View className="listRightImg">
                        <Image src={imgUrl} className="img"></Image>
                        <AtIcon value='chevron-right' size='20' color='#757575' className="Icon"></AtIcon>
                    </View>
                </View>
                {/* <View onClick={this.sc.bind(this)}>上传</View> */}
                <View className="list">
                    <View className="listLeft">用户名</View>
                    <View className="listRight">
                        <AtIcon value='chevron-right' size='20' color='#757575' className="Icon"></AtIcon>
                        <Input type="text" className="inp" maxLength={9} value={nickname} placeholder="请填写用户名" onInput={this.onInput.bind(this)}></Input>
                    </View>
                </View>

                <Picker mode='selector' range={this.state.selector} onChange={this.onChange} value={sex}>
                    <View className="list">
                        <View className="listLeft">性别</View>
                        <View className="listRight">
                            <AtIcon value='chevron-right' size='20' color='#757575' className="Icon"></AtIcon>
                            <View className="text" > {sex === null ? ' 请选择性别' : sex === 0 ? '男' : '女'} </View>
                        </View>
                    </View>
                </Picker>

                <Picker mode="date" onChange={this.onDateChange} value={dateSel}>
                    <View className="list">
                        <View className="listLeft">生日</View>
                        <View className="listRight">
                            <AtIcon value='chevron-right' size='20' color='#757575' className="Icon"></AtIcon>
                            <View className="text" > {birthday === null ? ' 请选择出生日期 ' : birthday} </View>
                        </View>
                    </View>
                </Picker>
                <View className="save" onClick={this.save.bind(this)}>保存</View>

            <View className="f">{str}</View>
            </View>

        )
    }
}



export default Index as ComponentClass<PageOwnProps, PageState>
