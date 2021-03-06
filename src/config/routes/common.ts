/*
 * @Author: Jackstraw
 * @Date: 2021-04-15 20:42:54
 * @Description:
 * @FilePath: /vitepro/vite-react/src/config/routes/index.ts
 * 好好学习、天天向上 >> 1432316105@qq.com
 */
import { RouteConfig } from "./types"; 

const routes: Array<RouteConfig> = [
  {
    url: "/403",
    needAuth: false,
    component: () => import("@/pages/common/error/403"),
  },
  {
    url: "/404",
    needAuth: false,
    component: () => import("@/pages/common/error/404"),
  },
  {
    url: "/500",
    needAuth: false,
    component: () => import("@/pages/common/error/500"),
  },
]

export default routes;