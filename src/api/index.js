/**
 * Created by qiheng on 2017/4/23.
 * api 接口
 */

//import axios from 'axios';

export default {
    index               : '/index', // 首页
    login               : '/out/login', // 登录
    logout              : '/e/logout', // 退出
    getareabylonglat    : '/getareabylonglat', // 逆地址解析
    sendcode            : '/sendcode', // 注册/找回密码时发送验证码
    goodsview           : '/goodsview', // 获取该商品的详情
    getshopmanagepriv   : '/manage/getshopmanagepriv', // 权限列表
}


