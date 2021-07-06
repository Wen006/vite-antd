/*
 * @Author: Jackstraw
 * @Date: 2021-05-29 18:31:32
 * @Description: 用于全局后台请求配置
 * @FilePath: /vite-react/src/services/service.handler.ts
 * 好好学习、天天向上 >> 1432316105@qq.com
 */
import RpcService from '../core/rpc/service';
import config from './config';
import appConfig from '../utils/app.config' 
import { CallOpts, MethodOptionAll } from '../core/rpc/types';
  
/**
 * @description: 远程调用
 * @param {*} async
 * @return {*}
 */

const rpcInstance = new RpcService({
    baseUrl: appConfig.baseUrl,
    config:config,
});

export const callRpc = async (options:CallOpts):Promise<any> =>{
    return rpcInstance.callRpc(options);
}

export const callMethod = async (options:CallOpts):Promise<any> =>{
    return rpcInstance.callRpc(options);
}

export const getConfig = (key:string):MethodOptionAll =>{
    return rpcInstance.getConfig(key);
}
