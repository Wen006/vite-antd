/*
 * @Author: Jackstraw
 * @Date: 2021-05-30 09:20:27
 * @Description: 统一后台请求
 * @FilePath: /vite-react/src/utils/request.ts
 * 好好学习、天天向上 >> 1432316105@qq.com
 */

import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import lodash from "lodash";
import { notification } from "antd";
import hash from "hash.js";
import logger from "./logger";
import { IResult } from "./app.types";

const codeMessage: any = {
  200: "服务器成功返回请求的数据。",
  201: "新建或修改数据成功。",
  202: "一个请求已经进入后台排队（异步任务）。",
  204: "删除数据成功。",
  400: "发出的请求有错误，服务器没有进行新建或修改数据的操作。",
  401: "用户没有权限（令牌、用户名、密码错误）。",
  403: "用户得到授权，但是访问是被禁止的。",
  404: "发出的请求针对的是不存在的记录，服务器没有进行操作。",
  406: "请求的格式不可得。",
  410: "请求的资源被永久删除，且不会再得到的。",
  422: "当创建一个对象时，发生一个验证错误。",
  500: "服务器发生错误，请检查服务器。",
  502: "网关错误。",
  503: "服务不可用，服务器暂时过载或维护。",
  504: "网关超时。",
};


const failedR: IResult = {
  success: false,
  data: {},
  msg: "失败了",
  code: "500",
};

const successR: IResult = {
  success: true,
  data: {},
  msg: "成功了",
  code: "200",
};

// axios配置
const defaultAxiosCfg: any = {
  withCredentials: true,
  timeout: 1800000,
};

const ERROR_MSG: any = {
  "Network Error": "请检查一下网络",
};

// 添加请求拦截器
axios.interceptors.request.use(
  (conf) => {
    lodash.assign(conf.headers, {
      "Accept-Language": "zh-CN",
      // 'Access-Token':'1111111',
    });
    // 在发送请求之前做些什么
    return conf;
  },
  (error) =>
    // 对请求错误做些什么
    Promise.reject(error)
);

// 添加响应拦截器
axios.interceptors.response.use(
  (response) =>
    // 对响应数据做点什么
    response,
  (error) =>
    // 对响应错误做点什么
    Promise.reject(error)
);

// 校验返回结果
const checkStatus = (response:any) => {
  if (response.status >= 200 && response.status < 300) {
    return response;
  }
  const errortext = codeMessage[response.status] || response.statusText;
  notification.error({
    message: `请求错误 ${response.status}: ${response.url}`,
    description: errortext,
  });
  const error:any = new Error(errortext);
  error.name = response.status;
  error.response = response;
  throw error;
};

// 保存缓存
const cachedSave = (response: any, hashcode: string) => {
  console.log(`response,hashcode`, response,hashcode)
  /**
   * Clone a response data and store it in sessionStorage
   * Does not support data other than json, Cache only json
   */
  const contentType = response.headers.get("Content-Type");
  if (contentType && contentType.match(/application\/json/i)) {
    // All data is saved as text
    response
      .clone()
      .text()
      .then((content: string) => {
        sessionStorage.setItem(hashcode, content);
        sessionStorage.setItem(`${hashcode}:timestamp`, Date.now());
      });
  }
  return response;
};

/**
 * @description 返回原生的axios
 * @param {请求url} url
 * @param {请求的参数} options
 *
 */
export function fetch(url: string, options: AxiosRequestConfig): Promise<any> {
  const { method = "GET", data, params, headers } = options;

  // axios 配置
  const comCfg = lodash.assign({}, defaultAxiosCfg);
  if (headers) {
    comCfg.headers = lodash.assign(comCfg.headers, headers);
  }
  
  switch (method) {
    case "GET":
      return axios.get(url, {
        params: params,
        ...comCfg,
      });
    case "DELETE":
      return axios.delete(url, {
        data: data,
        params: params,
        ...comCfg,
      });
    case "POST":
      return axios.post(url,data, {
        params: params,
        ...comCfg,
      });
    case "PUT":
      return axios.put(url,data, {
        params: params,
        ...comCfg,
      });
    case "PATCH":
      return axios.patch(url, data, {
        params: params,
        ...comCfg,
      });
    default:
      return axios(options);
  }
}

/**
 * Requests a URL, returning a promise.
 * @description 返回带有处理的结果，以及错误校验的
 * @param  {string} url       The URL we want to request
 * @param  {object} [option] The options we want to pass to "fetch"
 * @return {object}           An object containing either "data" or "err"
 */
export default function request(
  url: string,
  option: AxiosRequestConfig,
  expirys: false | number = false
): Promise<any> {
  const { data, params } = option;

  const paramsAll = lodash.assign({}, data, params);
  /**
   * Produce fingerprints based on url and parameters
   * Maybe url has the same parameters
   */
  const fingerprint = url + (paramsAll ? JSON.stringify(paramsAll) : "");

  const hashcode = hash.sha256().update(fingerprint).digest("hex");
  // 获取缓存
  if (expirys !== false) {
    const cached = sessionStorage.getItem(hashcode);
    const whenCached = sessionStorage.getItem(`${hashcode}:timestamp`);
    if (cached !== null && whenCached !== null) {
      const age = (Date.now() - parseInt(whenCached)) / 1000;
      if (age < expirys) {
        const response = new Response(new Blob([cached]));
        return response.json();
      }
      sessionStorage.removeItem(hashcode);
      sessionStorage.removeItem(`${hashcode}:timestamp`);
    }
  }

  return fetch(url, option)
    .then(checkStatus)
    // .then((response) => cachedSave(response, hashcode))
    .then((response) => {
      console.log(`response`, response)
      // 这个是业务后台异常处理过了 正常返回moduleReturn 结构
      // `data` 由服务器提供的响应
      // `status` 来自服务器响应的 HTTP 状态码
      // `statusText` 来自服务器响应的 HTTP 状态信息
      // `headers` 服务器响应的头
      // `config` 是为请求提供的配置信息
      const { status, statusText, data } = response;
      if (200 != status) {
        const failResult = lodash.assign({}, failedR, {
          code: status,
          data: data,
        });
        // environment should not be used
        if (status === 403) {
          return failResult;
        }
        if (status <= 504 && status >= 500) {
          return failResult;
        }
      }

      return data;
    })
    .catch((error) => {
      console.log(`error.message`, error.message)
      console.log(`error.data`, error.data)
      console.log("1",error.data);
      console.log(error.status);
      console.log(error.headers);
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.log("1",error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
      } else if (error.request) {
        // The request was made but no response was received
        // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
        // http.ClientRequest in node.js
        console.log("2",error.request);
        console.log(`error`, error)
      } else {
        // Something happened in setting up the request that triggered an Error
        console.log('Error', error.message);
      }
      console.log(error.config);
      return failedR; 
    });
}
