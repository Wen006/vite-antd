/*
 * @Author: Jackstraw
 * @Date: 2021-05-29 18:36:00
 * @Description: 用于配置全局请求
 * "KEY请大写唯一(服务模块_具体表_功能)":{
 *      "url":"/system/user/listByDto", //后台对应restapi url
 *      "method":"POST",                //请求方式 formpost，delete,post,get
 *      "header":['Accept': 'application/json'], // 可以设置请求的头
 *      "mocktable":"SM_USER",        //用户模拟数据的找mocktable的 这里的表明一定和mock dbDao.js配置的要一致
 *      "mockhandler":"list",           //配置该项mock会统一处理 可选【list(翻页),list2(无翻页)),saveorupdate,delete,getone】
 *      "auth":"wennn",                 //作者
 *      “desc":"用户列表查询"             //方法描述
 *  },
 * @FilePath: /vite-react/src/services/services/config/index.ts
 * 好好学习、天天向上 >> 1432316105@qq.com
 */

export enum RequestMethod {
    GET='GET',
    POST='POST',
    DEL='DELETE',
    FORM_POST = "FORM_POST",
    PUT='PUT'
}

export interface MethodOptionAll extends MethodOption{
    "mock-table"?:undefined|string,
    "mock-handler"?:undefined|string,
    "auth":string,
    "desc":string,
}

export interface MethodOption{
    "url": string,
    "method": RequestMethod,
    "headers"?: any,
}

export interface ServiceConfig{
    [k:string]: MethodOptionAll 
}

const configs:ServiceConfig = {
    "sys.user.login": {
        "method":RequestMethod.FORM_POST,
        "url":"/sys/user/login",
        "auth":"wennn",
        "desc":"用户登录"
    },
    "sys.user.login.captcha": {
        "method":RequestMethod.GET,
        "url":"/login/captcha?mobile={mobile}",
        "auth":"wennn",
        "desc":"校验手机号"
    },
    "sys.users": {
        "method":RequestMethod.GET,
        "url":"/users",
        "auth":"wennn",
        "desc":"获取用户"
    },
    "sys.user.currentUser": {
        "method":RequestMethod.GET,
        "url":"/currentUser",
        "auth":"wennn",
        "desc":"当前登录用户"
    },
    "sys.menu.get-menus": {
        "method":RequestMethod.GET,
        "url":"/sys/menu/getMenus",
        "auth":"wennn",
        "desc":"菜单"
    },
}

export const getMethodConfig = (key:string):MethodOption=>{
    const config:MethodOptionAll = configs[key];
    if(config){
        return {
            "url":config.url,
            "method":config.method,
            "headers":config.headers,
        };
    }
    throw new Error("找不到服务配置项 >> "+key)
}

export default configs;
 