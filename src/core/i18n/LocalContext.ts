/*
 * @Author: Jackstraw
 * @Date: 2021-07-08 21:59:49
 * @Description:
 * 好好学习、天天向上 >> 1432316105@qq.com
 */

import moment from "moment";
import { Languages } from "../app.types";
import zhCN from "antd/lib/locale/zh_CN";
import jaJP from "antd/lib/locale/ja_JP";
import enUS from "antd/lib/locale/en_US";
import { Locale } from "antd/lib/locale-provider";

const localMomentMap: { [key: string]: {} } = {
  zh_CN: () => import("moment/dist/locale/zh-cn"),
  ja_JP: () => import("moment/dist/locale/ja"),
  en_US: () => import("moment/dist/locale/en-au"),
};

export const setMomentLocale = (key: Languages) => {
  if (localMomentMap[key]) {
    localMomentMap[key]();
  }
};

const localAntMap: { [key: string]: ()=>any } = {
  zh_CN: () => import("antd/lib/locale/zh_CN"),
  ja_JP: () => import("antd/lib/locale/ja_JP"),
  en_US: () => import("antd/lib/locale/en_US"),
};

export const getAntLocale = (lang: string): Locale => localAntMap[lang]();

