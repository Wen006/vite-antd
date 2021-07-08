/*
 * @Author: Jackstraw
 * @Date: 2021-07-08 21:59:49
 * @Description: 
 * 好好学习、天天向上 >> 1432316105@qq.com
 */
 
import moment from 'moment';
import { Languages } from '../app.types';

const localeMap = {
    'zh_CN': ()=>{
        import('moment/locale/zh-cn');
        moment.locale('zh-cn');
    },
    "ja_JP": ()=>{
        import('moment/locale/ja-jp');
        moment.locale('ja-jp');
    },
    "en_US": ()=>{
        import('moment/locale/en-us');
        moment.locale('en-us');
    }
}

export const setMomentLocale = (key:Languages) =>{
    if(localeMap[key]){
        localeMap[key]();
    }
}