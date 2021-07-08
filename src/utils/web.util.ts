/*
 * @Author: Jackstraw
 * @Date: 2021-05-30 17:03:55
 * @Description: 
 * @FilePath: /vite-react/src/utils/web.util.ts
 * 好好学习、天天向上 >> 1432316105@qq.com
 */

import { LANGUAGE_KEY,USER_KEY } from "./app.constant";
import { Languages } from "../core/app.types";
import zhCN from 'antd/lib/locale/zh_CN';
import jaJP from 'antd/lib/locale/ja_JP';
import enUS from 'antd/lib/locale/en_US';
import { Locale } from "antd/lib/locale-provider";
import { getSession, getStoreItem, rmSession, setSession, setStoreItem } from "../core/cache/db";

const localMap:{[key:string]:Locale} = {
    zh_CN:zhCN,
    ja_JP:jaJP,
    en_US:enUS
}

export const getLang = ():Languages =>{ 
    const lang = getStoreItem(LANGUAGE_KEY) || navigator.language||navigator.userLanguage; //常规浏览器语言和IE浏览器
    return (lang in Languages)?lang:Languages.zh_CN;
}

export const setLang = (lang:Languages):Languages =>setStoreItem(LANGUAGE_KEY,lang);

export const getSessionUser = ():string|null => getSession(USER_KEY);
  
export const setSessionUser = (val:string):string => setSession(USER_KEY,val);

export const clearSession = () =>rmSession(USER_KEY);
  
export const getLocale = (lang?:string):Locale =>localMap[lang || getLang()]||lang;
  