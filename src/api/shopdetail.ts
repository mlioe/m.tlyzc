import { requests } from '../request/request';

let webUrl = ''

export function a(){
    return requests("GET",'http://api.nnzhp.cn/api/user/stu_info', { name: 123, pass: 123 })
    .then(res => {
        return res
    })
}