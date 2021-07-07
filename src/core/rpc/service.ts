/*
 * @Author: Jackstraw
 * @Date: 2021-05-29 18:31:32
 * @Description: 用于全局后台请求配置
 * 好好学习、天天向上 >> 1432316105@qq.com
 */ 
import { MethodOption, RequestMethod, CallOpts, ServiceConfig, MethodOptionAll,RequestOpts } from "./types";
import request from "./request";
import {stringify} from "qs";
import logger from "../utils/logger";
import { assign } from "lodash";

const log = logger.getLogger("core.rpc:service")

export interface RpcServiceProps {
  config: ServiceConfig,
  baseUrl?: string,
  automock: boolean;
}

/**
 *  后台rpc调用封装
 */
export default class RpcService {
  props: RpcServiceProps;

  constructor(props: RpcServiceProps) {
    this.props = props; 
    if (!this.props.config) {
      log.warn("config not assign");
      this.props.config = {};
    }
    this.props.baseUrl = props.baseUrl||''
    this.props.automock = props.automock == true; 
  }

  /**
   * 通过key 获取请求信息
   * @param key  
   * @returns 
   */
  getConfig = (key: string): MethodOptionAll => {
    const config = this.props.config[key];
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
    const config: MethodOptionAll = this.getConfig(key);
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
      reqOpt.headers = Object.assign(reqOpt.headers, { "content-type": "application/x-www-form-urlencoded" });
      
      if(params){
        url = url + (url.includes("?")?stringify(params):`?${stringify(params)}`);
      }
      reqOpt.data = stringify(reqOpt.data||{});
    }

    // 对于url占位符的参数处理
    if(pathVari){
      for (const key in pathVari) {
        if (Object.prototype.hasOwnProperty.call(pathVari, key)) {
          url = url.replace(`{${key}}`,pathVari[key])
        }
      }
    }

    if(config["mock-table"]){
      assign(reqOpt.headers,{
        'mocktable':config["mock-table"]
      })
    }

    return request(this.props.baseUrl + url, {
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
