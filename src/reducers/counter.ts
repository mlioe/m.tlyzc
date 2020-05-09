import { ADD, MINUS, ADDADRESS, INFORMATION } from '../constants/counter';

interface Idata{
  num:number,
  addressList:any,
  information:any,
  key:any
}

const INITIAL_STATE:Idata = {
  num: 0,
  addressList:[
    // {
    //   name: '哈哈',
    //   sex: 1,//0是男，传给后端要转为1，转换一下
    //   mobile: 13790989809,
    //   province:'广东',//省
    //   city:'湛江市',//市
    //   district:'霞山区',//行政市区
    //   address: '详细地址',//详细地址
    //   house_number:'198好',//门牌号
    //   label: '提车厂',//地址标签
    //   district_code:'12121212',
    //   geography_info:'address.address',
    //   defaults: 1 
    // }
  ],
  information:{nickName:'',avatarUrl:''},
  key:'YZMBZ-QVLCI-V3NG2-5OGHE-N4E57-5SBDN'
}

export default function counter (state = INITIAL_STATE, action) {
  // console.log(action)
  switch (action.type) {
    case ADD:
      return {
        ...state,
        num: state.num + 1
      }
    case MINUS:
      return {
         ...state,
         num: state.num - 1
       }
    case ADDADRESS:
       return{
        ...state,
        addressList: action.newarrList
       }
    case INFORMATION:{
      let information = {nickName:action.res.nickName,avatarUrl:action.res.avatarUrl}
      return{
        ...state,
        information:information
      }
    }
     default:
       return state
  }
}
