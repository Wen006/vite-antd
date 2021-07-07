/*
 * @Author: Jackstraw
 * @Date: 2021-05-29 18:36:00
 * @Description: 用于配置全局请求
 * 好好学习、天天向上 >> 1432316105@qq.com
 */

import { RequestMethod, ServiceConfig } from "../../core/rpc/types";
 
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
        "mock-handler":"list",
        "mock-table":"SM_USER",
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

export default configs;
 