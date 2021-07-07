/*
 * @Author: Jackstraw
 * @Date: 2021-06-03 15:06:06
 * @Description:
 * 好好学习、天天向上 >> 1432316105@qq.com
 */

export enum RequestMethod {
  GET = "GET",
  POST = "POST",
  DEL = "DELETE",
  FORM_POST = "FORM_POST",
  PUT = "PUT", 
  PATH="PATH"
}

export interface RequestOpts {
  url?: string;
  method?: RequestMethod;
  headers?: any;
  params?: any;
  data?: any;
  timeout?: number;
}

export interface MethodOptionAll extends MethodOption {
  "mock-table"?: undefined | string; // 用户模拟数据的找mocktable的 这里的表明一定和mock dbDao.js配置的要一致
  "mock-handler"?: 'list'|'del'|'qp'|'update'|'get'; // 配置该项mock会统一处理 可选【list(翻页),list2(无翻页)),saveorupdate,delete,getone】
  auth: string; // 作者
  desc: string; // 方法描述
}

export interface MethodOption {
  url: string; // 后台对应restapi url
  method: RequestMethod; // 请求方式 formpost，delete,post,get
  headers?: any; // 请求头
}

export interface ServiceConfig {
  [k: string]: MethodOptionAll;
}

export interface CallOpts {
  key: string;
  // `params` 是即将与请求一起发送的 URL 参数
  // 必须是一个无格式对象(plain object)或 URLSearchParams 对象
  params?: any;
  // `data` 是作为请求主体被发送的数据
  // 只适用于这些请求方法 'PUT', 'POST', 和 'PATCH'
  // 在没有设置 `transformRequest` 时，必须是以下类型之一：
  // - string, plain object, ArrayBuffer, ArrayBufferView, URLSearchParams
  // - 浏览器专属：FormData, File, Blob
  // - Node 专属： Stream
  data?: any;
  pathVari?: {
    [key:string]:any
  }, // 对于url占位符的 比如 url=/xx/{f1}/action   pathVari:{f1:1} ==> url =/xx/1/action
  suffix?: string;
}
