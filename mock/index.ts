/*
 * @Author: Jackstraw
 * @Date: 2021-05-30 20:14:21
 * @Description:
 * @FilePath: /vite-react/mock/index.ts
 * 好好学习、天天向上 >> 1432316105@qq.com
 */
// test.ts

import { MockMethod } from "vite-plugin-mock";
import menuData from "./menu.data";
import { userList } from "./mock.data";
import { IncomingMessage, ServerResponse } from "http";
 
const sessionContext = {};

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

export default [
  {
    url: `${context}/sys/menu/getMenus`,
    method: "get",
    response: ({ query }) => {
      return ok(menuData);
    },
  },
  {
    url: `${context}/sys/user/logout`,
    method: "post",
    response: ({ query }) => {
      return ok({});
    },
  },
  {
    url: `${context}/sys/user/login`,
    method: "post",
    response: ({ query, body, headers, ...other }) => {
      const params = { ...query, ...body };
      const { host } = headers;
      let user = undefined;
      userList.some((u) => {
        if (u.username == params.username && u.password == params.password) {
          user = u;
          return true;
        }
        return false;
      });
      return user ? ok(user) : fail("账号或者密码不对");
    }
  }
] as MockMethod[];
