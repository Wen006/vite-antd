/*
 * @Author: Jackstraw
 * @Date: 2021-04-15 20:42:54
 * @Description:
 * @FilePath: /vitepro/vite-react/src/config/routes/index.ts
 * 好好学习、天天向上 >> 1432316105@qq.com
 */
import React from "react";
import { RouteConfig } from "./types";
import exam from "./exam";
import sys from "./sys";
import common from './common'

const LazyComponent = (component: any) => {
  return React.lazy(component);
};

const routes: Array<RouteConfig> = [
  ...sys,
  ...exam,
  ...common,
  // {
  //   url: "/*",
  //   needAuth: false,
  //   component: () => import("@/pages/common/error/404"),
  // },
];

export const getRoutes = () => {
  return routes.map((it) => {
    return {
      ...it,
      component: LazyComponent(it.component),
    };
  });
};
