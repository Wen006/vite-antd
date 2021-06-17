/*
 * @Author: Jackstraw
 * @Date: 2021-05-29 18:31:32
 * @Description: 用于全局后台请求配置
 * @FilePath: /vite-react/src/services/service.handler.ts
 * 好好学习、天天向上 >> 1432316105@qq.com
 */

import logger from '@/utils/logger';
import request from '@/utils/request';
import { getMethodConfig, MethodOption, RequestMethod } from './config';
import { baseUrl } from '@/utils/app.config'
import { assign } from 'lodash';

const log = logger.getLogger('services:services.handler.ts');

export interface CallOpts{
    key:string,
    // `params` 是即将与请求一起发送的 URL 参数 
    // 必须是一个无格式对象(plain object)或 URLSearchParams 对象
    params?:any, 
    // `data` 是作为请求主体被发送的数据
    // 只适用于这些请求方法 'PUT', 'POST', 和 'PATCH'
    // 在没有设置 `transformRequest` 时，必须是以下类型之一：
    // - string, plain object, ArrayBuffer, ArrayBufferView, URLSearchParams
    // - 浏览器专属：FormData, File, Blob
    // - Node 专属： Stream
    data?: any, 
    suffix?:string,
}

/**
 * @description: 远程调用
 * @param {*} async
 * @return {*}
 */
export const callRpc = async (options:CallOpts):Promise<any> =>{
    const { key, params,data } = options;
    const config:MethodOption = getMethodConfig(key);
    log.info("服务配置: {}",config);

    // 对form请求处理
    if(RequestMethod.FORM_POST == config.method){
        config.method = RequestMethod.POST
        config.headers = assign(config.headers,{"content-type":"application/x-www-form-urlencoded"})
    }
    
    return request(baseUrl+config.url,{
        method: config.method.toString(),
        headers: config.headers||{},
        data: data,
        params: params,
    })
}

export const callMethod = async()=>{

}