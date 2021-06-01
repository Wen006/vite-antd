
export interface RouteConfig {
    url:string,
    component: any,
    name?:string,
    locale?: string,
    auth?: string,
    desc?: string,
    needAuth?: boolean,
}
  