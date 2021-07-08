/**
 * @desc 所有 模拟数据用这个
 * @author wennn
 * @time 2018 07 25
 */
import Mock from "mockjs";
import api from "../../src/services/config";
import { R } from "../../src/core/app.types";
import { RequestMethod } from "../../src/core/rpc/types";
import { assign } from "lodash";
import { ServerResponse } from "http";

// 统一结果返回规范
export const result: R = {
  code: "200",
  success: true,
  msg: "",
  data: {},
};

// var Random = Mock.Random;
// console.log(Random.email());  // 结果: r.quyppn@yit.cv÷
// 提供的种类有:
// Type	Method
// Basic	boolean, natural, integer, float, character, string, range, date, time, datetime, now
// Image	image, dataImage
// Color	color
// Text	paragraph, sentence, word, title, cparagraph, csentence, cword, ctitle
// Name	first, last, name, cfirst, clast, cname
// Web	url, domain, email, ip, tld
// Address	area, region
// Helper	capitalize, upper, lower, pick, shuffle
// Miscellaneous	guid, id

// 自己扩展 https://segmentfault.com/a/1190000008839142
/*
Random.extend({
    weekday: function(date) {
        var weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        return this.pick(weekdays);
    },
    sex: function(date) {
        var sexes = ['男', '女', '中性', '未知'];
        return this.pick(sexes);
    }
});
console.log(Random.weekday());  // 结果: Saturday
console.log(Mock.mock('@weekday'));  // 结果: 112Tuesday
console.log(Random.sex());  // 结果: 男
console.log(Mock.mock('@sex'));  // 结果: 未知
*/

export const MockBean = {
  "id|+1": "@id", // 属性 id 是一个自增数，起始值为 1，每次增 1
  deletedFlag: "0",
  createDate: '@date("yyyy-MM-dd")', // 日期
  lastUpdate: '@date("yyyy-MM-dd")', // 日期
  // 'name': '@cname',  // 中文名称
  // 'age|18-28': 0,   // 18至28以内随机整数, 0只是用来确定类型
  // 'city': '@city(true)',   // 中国城市
  // 'color': '@color',  // 16进制颜色
  // 'email': '@email',  // 邮箱
  // 'isMale|1': true,  // 布尔值
  // 'isFat|1-2': true,  // true的概率是1/3
  // 'fromObj|2': obj,  // 从obj对象中随机获取2个属性
  // 'fromObj2|1-3': obj,  // 从obj对象中随机获取1至3个属性
  // 'brother|1': ['jack', 'jim'], // 随机选取 1 个元素
  // 'sister|+1': ['jack', 'jim', 'lily'], // array中顺序选取元素作为结果
  // 'friends|2': ['jack', 'jim'] // 重复2次属性值生成一个新数组
};

const data = Mock.mock({
  // 属性 list 的值是一个数组，其中含有 1 到 10 个元素
  "list|1-2": [MockBean],
});
// console.log(data)

/**
 * @key // 服务请求key
 * @return 获取要拦截的url
 *
 */
export const getMockPre = function (key: string) {
  if (!api[key]) {
    console.error(`ServiceHandler =====> 没有该${key}配置,请检查api配置！`);
    return;
  }
  let method = api[key].method.toUpperCase();
  if (method == RequestMethod.FORM_POST) {
    method = "POST";
  }
  const pre = `${method} ${api[key].url}`;
  // console.log(`Mock 拦截器：${pre}`);
  return pre;
};

/**
 * 模拟生产数据
 * @param {模拟的bean需要的字段}} mockBean
 * @param {生成的个数} num
 */
export const initMockData = function (mockBean = {}, num = 20) {
  assign(mockBean, MockBean);
  if (num < 1) num = 20;
  return Mock.mock({
    [`data|1-${num}`]: [mockBean],
  }).data;
};
// console.log(initMockData({name:'@cname'},2))

/**
 * 创建模拟数据
 * @param {模拟的bean需要的字段} mockBean
 */
export const createOne = function (mockBean?: any) {
  assign(mockBean, MockBean);
  return Mock.mock({
    [`data|1`]: [mockBean],
  }).data;
};
// console.log(createOne({name:'@cname'}))

const viteMockRes = async (response: ServerResponse, result) => {
  // response.setHeader("Content-Type", "text/plain");
  console.log(`vite 写出mock`)
  response.statusCode = 200;
  response.end('result');
};

const webpackMockRes = async (response, result) => {
  console.log(`webpack 写出mock`)
  response.status(200).json(result);
};

const mockType = "vite";

const write = (response, result) => {
  if (mockType == "vite") {
    // return viteMockRes(response, result);
    return result;
  } else {
    return webpackMockRes(response, result);
  }
};

/**
 * 统一成功JSON返回
 * @param {response}
 * @param {data}  返回结果集
 */
export const writeOk = function (response: any, data = {}) {
  return write(
    response,
    assign(
      {
        code: "200",
        success: true,
        data: data,
        msg: "操作成功",
      }
    )
  );
};

/**
 * 统一错误SON返回
 * @param {response}
 * @param {data}  返回结果集
 */
export const writeFail = function (response: any, data = {}) {
  return write(
    response,
    assign(
      {
        code: "500",
        success: false,
        data: data,
        msg: "操作失败",
      }
    )
  );
};

/**
 * 统一SON返回
 * @param {response}
 * @param {data}  返回结果集
 */
export const writeJson = function (response: any, data: any) {
  return write(response, data);
};
