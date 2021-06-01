import { RouteConfig } from "./types";

const routes: Array<RouteConfig> = [
  {
    url: "/home",
    component: () => import("@/pages/sys/home"),
  },
  {
    url: "/sys/user",
    component: () => import("@/pages/sys/user"),
  },
  {
    url: "/sys/menu",
    component: () => import("@/pages/sys/menu"),
  },
  {
    url: "/sys/auth",
    component: () => import("@/pages/sys/auth"),
  },
];

export default routes;
