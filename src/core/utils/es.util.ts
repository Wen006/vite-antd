/*
 * @Author: Jackstraw
 * @Date: 2021-07-14 21:39:45
 * @Description: 
 * 好好学习、天天向上 >> 1432316105@qq.com
 */

export const esImp = async (proMis:Promise<any>) => {
    const result = await proMis;
    return result.default || result;
}