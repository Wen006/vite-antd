/*
 * @Author: Jackstraw
 * @Date: 2021-05-30 17:03:55
 * @Description: 
 * @FilePath: /vite-react/src/utils/web.util.ts
 * 好好学习、天天向上 >> 1432316105@qq.com
 */

import { APP_KEY, LANGUAGE_KEY,USER_KEY } from "./app.constant";
import { Languages } from "../core/app.types";
import zhCN from 'antd/lib/locale/zh_CN';
import jaJP from 'antd/lib/locale/ja_JP';
import enUS from 'antd/lib/locale/en_US';
import { Locale } from "antd/lib/locale-provider";

const localMap:{[key:string]:Locale} = {
    zh_CN:zhCN,
    ja_JP:jaJP,
    en_US:enUS
}

export const getLang = ():Languages =>{ 
    var lang = getStoreItem(LANGUAGE_KEY) || navigator.language||navigator.userLanguage; //常规浏览器语言和IE浏览器
    if(lang in Languages){
        return lang;
    }
    return Languages.zh_CN;
}

export const setLang = (lang:Languages):Languages =>{
    setStoreItem(LANGUAGE_KEY,lang);
    return lang;
}

export const getSessionUser = ():string|null => {
    return sessionStorage.getItem(perSetKey(USER_KEY));
}

export const setSessionUser = (val:string):string => {
    sessionStorage.setItem(perSetKey(USER_KEY),val);
    return val;
}

export const getLocale = (lang?:string):Locale =>{
    lang = lang || getLang();
    return localMap[lang];
}



export const perSetKey = (key:string):string =>{
    return APP_KEY + "_" + key;
}

export const setStoreItem = (key:string,val:any):any =>{
    localStorage.setItem(perSetKey(key),JSON.stringify(val))
    return val;
}

export const getStoreItem = (key:string):any =>{
    const val = localStorage.getItem(perSetKey(key));
    if(val){
        return JSON.parse(val) 
    }
    return null;
}
