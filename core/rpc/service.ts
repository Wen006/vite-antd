/*
 * @Author: Jackstraw
 * @Date: 2021-05-29 18:31:32
 * @Description: 用于全局后台请求配置
 * 好好学习、天天向上 >> 1432316105@qq.com
 */
import Logger from "chivy";
import { MethodOption, RequestMethod, CallOpts, ServiceConfig, MethodOptionAll,RequestOpts } from "./types";
import { assign } from "lodash";
import request from "./request";
import qs from "qs";

const log = new Logger("core:rpc.service");

export interface RpcServiceProps {
  config: ServiceConfig;
}

/**
 *  后台rpc调用封装
 */
export default class RpcService {
  config: ServiceConfig;

  constructor(props: RpcServiceProps) {
    this.config = props.config;
    if (!this.config) {
      log.warn("config not assign");
      this.config = {};
    }
  }

  /**
   * 通过key 获取请求信息
   * @param key  
   * @returns 
   */
  getConfig = (key: string): MethodOptionAll => {
    const config = this.config[key];
    if(!config){
      log.error("后台请求配置不存在 ",key)
    }
    return config;
  };

  /**
   *
   * @param options 后台请求
   * @returns
   */
  callRpc = async (options: CallOpts): Promise<any> => {
    const { key, params, data, pathVari } = options;
    const config: MethodOption = this.getConfig(key);
    log.info("服务配置: {}", config);
    const reqOpt:RequestOpts = {
      method: config.method,
      headers: config.headers || {},
      data: data,
      params: params
    }

    let url:string = config.url;
    // 对form请求处理
    if (RequestMethod.FORM_POST == reqOpt.method) {
      reqOpt.method = RequestMethod.POST;
      reqOpt.headers = assign(config.headers, { "content-type": "application/x-www-form-urlencoded" });
      
      if(params){
        url = url + (url.includes("?")?qs.stringify(params):`?${qs.stringify(params)}`);
      }
      reqOpt.data = qs.stringify(reqOpt.data||{});
    }

    // 对于url占位符的参数处理
    if(pathVari){
      for (const key in pathVari) {
        if (Object.prototype.hasOwnProperty.call(pathVari, key)) {
          url = url.replace(`{${key}}`,pathVari[key])
        }
      }
    }

    console.log(`url,data,params`, url,data,params)
    return request(url, {
      method: reqOpt.method,
      headers: reqOpt.headers || {},
      data: reqOpt.data,
      params: reqOpt.params
    });
  };

  // callMethod = async (options: CallOpts): Promise<any> => {
  //   // 1 == 开启loading
  //   const result = this.callRpc(options);
  //   // 2 == 关闭loading

  //   return result;
  // };
}
