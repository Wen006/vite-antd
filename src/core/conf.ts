/*
 * @Author: Jackstraw
 * @Date: 2021-07-08 20:56:35
 * @Description: 
 * 好好学习、天天向上 >> 1432316105@qq.com
 */

export type CoreConfig = {
    appName?:string;
    env?:'prod'|'dev';
}
 
export const conf:CoreConfig = {
    appName:'app',
    env:"dev"
}
 

export const setConf = (coreConf:CoreConfig) =>{

}

export const getConf = (): CoreConfig => {
    return conf;
}



