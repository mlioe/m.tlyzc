//交互类的提示封装
import Taro from '@tarojs/taro'


export function showToast(title,icon='none'){
    Taro.showToast({
        title: title,
        icon: icon,
        duration: 2000,
        success:res =>{
            return res
        }
      })
}

export function showModerNoCancel(title,content){//没有取消按钮的拟态弹窗
    return Taro.showModal({
        title: title,
        content: content,
        showCancel:false,
        success:res => {
            return res
        }
    })
}

export function showModer(title,content){//有取消按钮的拟态弹窗
    return Taro.showModal({
        title: title,
        content: content,
        success:res => {
            return res
        }
    })
}