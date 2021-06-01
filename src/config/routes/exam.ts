
import { RouteConfig } from "./types"

const routes: Array<RouteConfig> = [
    {
        url: "/exam/form/form-1",
        name: "测试One",
        component: () => import("@/pages/exam/form/form-1"),
    },
    {
        url: "/exam/list/list-1",
        component: () => import("@/pages/exam/list/list-1"),
    }
];

export default routes;

