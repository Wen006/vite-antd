/*
 * @Author: Jackstraw
 * @Date: 2021-07-08 21:59:49
 * @Description:
 * 好好学习、天天向上 >> 1432316105@qq.com
 */
import { Languages } from "../app.types";
import { Locale } from "antd/lib/locale-provider";
import { esImp } from "../utils/es.util";

/* 针对阿里日期组件国际化 */
const localMomentMap: { [key: string]: {} } = {
  zh_CN: () => import("moment/dist/locale/zh-cn"),
  ja_JP: () => import("moment/dist/locale/ja"),
  en_US: () => import("moment/dist/locale/en-au"),
};


/* 阿里组件国际化 */
const localAntMap: { [key: string]: ()=>any } = {
  zh_CN: () => import("antd/lib/locale/zh_CN"),
  ja_JP: () => import("antd/lib/locale/ja_JP"),
  en_US: () => import("antd/lib/locale/en_US"),
};

/**
 * 设置Moment国际化
 * @param lang Languages 语言 
 * @returns 
 */
export const setMomentLocale = async (lang: Languages) => (localMomentMap[lang]&&localMomentMap[lang]())

/**
 * 获取阿里国际化
 * @param lang Languages 语言 
 * @returns 
 */
export const getAntLocale = async (lang: string): Promise<Locale> => {
  const lo = await esImp(localAntMap[lang]());
  return lo.default||lo;
};

const localeMap = {
  'en_US':[()=>import("./locale/en_US")],
  'zh_CN':[()=>import("./locale/zh_CN")],
  'ja_JP':[()=>import("./locale/ja_JP")],
} as {
  [key:string]:Array<()=>Promise<any>>
}

let cacheMessages:{[lang:string]:any} = {

}

export const addLocale = (config:{
  [lang:string]:(()=>Promise<any>)|Array<()=>Promise<any>>
})=>{
  for (const key in config) {
    if (Object.prototype.hasOwnProperty.call(config, key)) {
      const temLocale = Array.isArray(config[key])?config[key]:[config[key]]
        if(localeMap[key]){
          localeMap[key]=localeMap[key].concat(temLocale);
        }else{
          localeMap[key] = temLocale;
        }
    }
  }
  console.log(`localeMap`, localeMap)
}

export const getAppLocale = async (lang: string): Promise<any> => {
  if(cacheMessages[lang]){
    return cacheMessages[lang];
  }
  if(localeMap[lang]){
    const allPromise = localeMap[lang].map(it=>it())
    const i18nArr = (await Promise.all(allPromise)).map(d=>d.default||d);
    cacheMessages[lang] = {};
    i18nArr.forEach(it=>{
      cacheMessages[lang] = {...cacheMessages[lang],...it}
    })
    return cacheMessages[lang];
  }
  return {};
}
