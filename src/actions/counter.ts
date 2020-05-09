import {
  ADD,
  MINUS,
  ADDADRESS,
  INFORMATION
} from '../constants/counter'

export const add = () => {
  return {
    type: ADD
  }
}
export const minus = () => {
  return {
    type: MINUS
  }
}

export const addAress = (newarrList) =>{//地址列表
  return {
    type:ADDADRESS,
    newarrList
  }
}

export const userInformation = (res) =>{
  // console.log(res)
  return {
    type:INFORMATION,
    res
  }
}

// 异步的action
export function asyncAdd () {
  return dispatch => {
    setTimeout(() => {
      dispatch(add())
    }, 2000)
  }
}
