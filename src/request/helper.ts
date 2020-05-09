
import cryptoJS from 'crypto-js';


function passVer(phone){//正则
    if(!(/^1[3456789]\d{9}$/.test(phone))){
        return false
    }else{
        return true
    }
}
const codeMessage = {
    200: '服务器成功返回请求的数据',
    201: '新建或修改数据成功',
    202: '一个请求已经进入后台排队（异步任务）',
    204: '删除数据成功',
    400: '发出的请求有错误，服务器没有进行新建或修改数据的操作',
    401: '用户没有权限（令牌、用户名、密码错误）',
    403: '用户得到授权，但是访问是被禁止的',
    404: '发出的请求针对的是不存在的记录，服务器没有进行操作',
    406: '请求的格式不可得',
    410: '请求的资源被永久删除，且不会再得到的',
    422: '当创建一个对象时，发生一个验证错误',
    500: '服务器发生错误，请检查服务器',
    502: '网关错误',
    503: '服务不可用，服务器暂时过载或维护',
    504: '网关超时',
};

// const errorArr = [400007,400008,400003,5000,400004,402000,402003,5001,402010,600000,402014]



export default {
    passVer,codeMessage
}

// TIMEOUT = -2, // 系统繁忙
// FAILURE = -1, // 请求失败
// SUCCESS = 0, // 请求成功

// // 服务器
// INTERNAL_SERVER_ERROR = 5000, // 系统错误
// MYSQL_SERVER_ERROR = 5001, // MySQL服务器出错
// REDIS_SERVER_ERROR = 5002, // Redis服务器出错

// // HTTP
// HTTP_HEADER_TOKEN_DATA_INVALID = 400000, // 令牌数据无效
// HTTP_HEADER_AUTH_DATA_INVALID = 400001, // 认证数据无效
// HTTP_HEADER_SYSTEM_DATA_INVALID = 400002, // 系统数据无效
// HTTP_HEADER_SYSTEM_UNKNOWN = 400003, // 系统名称不明
// HTTP_BODY_ENCRYPT_FAILURE = 400004, // 主体数据加密失败
// HTTP_HEADER_TOKEN_DATA_DECRYPT_FAILURE = 400005, // 令牌数据解密失败
// HTTP_BODY_DECRYPT_FAILURE = 400006, // 主体数据解密失败
// HTTP_HEADER_ORIGIN_DATA_INVALID = 400007, // 来源数据无效
// HTTP_HEADER_ORIGIN_DATA_DECRYPT_FAILURE = 400008, // 来源数据解密失败

// // 通行证
// PASSPORT_UNION_ID_INVALID = 401000, // 通行证编号无效
// PASSPORT_TOKEN_INVALID = 401001, // 通行证令牌无效

// // 认证
// AUTH_MOBILE_INVALID = 402000, // 手机号码无效
// AUTH_CAPTCHA_INVALID = 402001, // 验证码无效
// AUTH_PASSWORD_INVALID = 402002, // 密码无效
// AUTH_MOBILE_REGISTERED = 402003, // 手机号码已注册
// AUTH_CAPTCHA_NOT_MATCH = 402004, // 验证码不匹配
// AUTH_PASSWORD_DECRYPT_FAILURE = 402005, // 密码处理（解密）失败
// AUTH_PASSWORD_FORMAT_SATISFIED = 402006, // 密码格式不符合要求
// AUTH_PASSWORD_ENCRYPT_FAILURE = 402007, // 密码加密失败
// AUTH_TOKEN_CREATE_FAILURE = 402008, // 令牌创建失败
// AUTH_PASSPORT_CACHE_FAILURE = 402009, // 缓存通行证信息失败
// AUTH_REGISTER_SMS_TRIGGER_LIMIT = 402010, // 手机号码注册触发短信限流
// AUTH_RESET_PASSWORD_SMS_TRIGGER_LIMIT = 402011, // 重置密码触发短信限流
// AUTH_LOGIN_SMS_TRIGGER_LIMIT = 402012, // 手机号码登录触发短信限流
// AUTH_BIND_MOBILE_SMS_TRIGGER_LIMIT = 402013, // 绑定手机号码触发短信限流
// AUTH_CAPTCHA_CACHE_FAILURE = 402014, // 验证码缓存失败
// AUTH_OPEN_ID_INVALID = 402015, // 第三方平台的唯一编号无效
// AUTH_PLATFORM_TYPE_INVALID = 402016, // 第三方平台类型无效

// // 用户
// USER_ID_INVALID = 403000, // 用户编号无效
// USER_MOBILE_NOT_REGISTERED = 403001, // 用户手机号码没有注册
// USER_PASSWORD_NOT_MATCH = 403002, // 用户密码不正确

// // 数据库
// MYSQL_USER_TABLE_INSERT_ROW_ERROR = 500001, // 用户表插入数据出错
// MYSQL_USER_TABLE_QUERY_ROW_NULL = 500002, // 用户表查询数据为空
// MYSQL_USER_TABLE_UPDATE_ROW_ERROR = 500003, // 用户表更新数据出错
// MYSQL_USER_TABLE_NO_ROWS_UPDATED = 500004, // 用户表没有行记录被更新
// MYSQL_OAUTH_TABLE_NO_ROWS_UPDATED = 500005, // 第三方登录授权表没有行记录被更新
// MYSQL_OAUTH_TABLE_QUERY_ROW_NULL = 500006, // 第三方登录授权表查询数据为空
// MYSQL_OAUTH_TABLE_INSERT_ROW_ERROR = 500007, // 第三方登录授权表插入数据出错
// MYSQL_OAUTH_WECHAT_USERINFO_TABLE_INSERT_ROW_ERROR = 500008, // 微信授权用户信息表插入数据出错
// MYSQL_OAUTH_WECHAT_USERINFO_TABLE_QUERY_ROW_NULL = 500009, // 微信授权用户信息表查询数据为空
// MYSQL_OAUTH_WECHAT_USERINFO_TABLE_NO_ROWS_UPDATED = 500010, // 微信授权用户信息表没有行记录被更新

// // 阿里云
// ALIYUN_SMS_SEND_FAILURE = 600000, // 短信发送失败
