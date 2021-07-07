/*
 * @Author: Jackstraw
 * @Date: 2021-07-07 21:38:57
 * @Description: 
 * 好好学习、天天向上 >> 1432316105@qq.com
 */
/*
 * @Author: Jackstraw
 * @Date: 2021-05-30 20:14:21
 * @Description:
 * @FilePath: /vite-react/mock/index.ts
 * 好好学习、天天向上 >> 1432316105@qq.com
 */
// test.ts

import { MockMethod } from "vite-plugin-mock";
import { IncomingMessage, ServerResponse } from "http";
import api from '../src/services/config/index';

import {
    queryByParams,
    comList,
    comSaveOrUpdate,
    comDel,
    comGetOne
} from './utils/comRest'
import { keys, values } from "lodash";
 
const ok = (data: any): any => {
  return {
    msg: "调用成功",
    code: "200",
    success: true,
    data: data,
  };
};

const fail = (msg?: any): any => {
  return {
    msg: msg || "失败了",
    code: "500",
    success: false,
    data: {},
  };
};

const context: string = "/api";

const apiProxy = [] as MockMethod[];
 
const r = {
    'get':'get',
    'post':'post',
    'put':'put',
    'delete':'delete',
    'patch':'patch',
}
const m2t = key =>{
    return r[key.toLocaleLowerCase()];
}

const apiMange = {
    list:comList,
    get:comGetOne,
    qp:queryByParams,
    update: comSaveOrUpdate,
    del: comDel
}

console.log("代理的mock：>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> start")
keys(api).forEach(key=>{
  const it = api[key];
    if(it["mock-handler"] && it["mock-table"]){
      console.log(key+ " > "+it.url+" "+it.method)
        apiProxy.push({
            url: it.url,
            method: m2t(it.method),
            rawResponse: (r,rs) =>{
              apiMange[it["mock-handler"]](r,rs,it["mock-table"])
            }
        })
    }
})
console.log("代理的mock：<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< end ")


export default apiProxy;