/*
 * @Author: Jackstraw
 * @Date: 2021-05-30 17:08:06
 * @Description: 
 * @FilePath: /vite-react/src/utils/app.types.ts
 * 好好学习、天天向上 >> 1432316105@qq.com
 */

export enum Languages {
    "zh_CN"="zh_CN",
    "ja_JP"="ja_JP",
    "en_US"="en_US",
}

export interface R {
    success: boolean;
    msg: Array<any> | string;
    data: any;
    code: string | number;
}