/**
 * @desc 这里封装通用的mock方法
 * commList: 翻页查询
 * comSaveOrUpdate: 保存
 * comDel：通用删除
 * comGetOne：通用通过id获取记录
 * @auth： wennn
 * 
 */

 import {
    writeFail,
    writeOk,
    writeJson,
    result,
} from './utils'

import {
    getTableData,
    saveOrUpdate,
    deleteItem,
    getOne,
} from './dbDao'

export function queryByParams(req:any,resp:any){
    const { body, query, headers,url } = req
    const { mocktable } = headers
    const { ...other } = { ...body, ...query } // sorter :"menuCode_descend" ,"menuCode_ascend"
    other.deletedFlag = "0"
    // let menuDate;
    let newData = getTableData(mocktable)
    if(!newData){
        console.error("请确定配置services/config/*的tableName属性和dbDao.js 的数据源")
        return writeFail(resp,"数据库表获取失败！") 
    }
    for (const key in other) {
        if ({}.hasOwnProperty.call(other, key)) {
            newData = newData.filter((item) => {
                if ({}.hasOwnProperty.call(item, key)) {
                    return String(item[key]).trim().indexOf(decodeURI(other[key]).trim()) > -1
                }
                return true
            })
        }
    }
    return writeOk(resp, newData)
}

export function comList(req, resp, mocktable) {
    const { body, query, headers,url } = req 
    const { pageNo = 1, pageSize = 10, sorter, ...other } = { ...body, ...query } // sorter :"menuCode_descend" ,"menuCode_ascend"
    other.deletedFlag = "0"
    let newData = getTableData(mocktable)
    if(!newData){
        console.error("请确定配置services/config/*的tableName属性和dbDao.js 的数据源")
        return writeFail(resp,"数据库表获取失败！")
    }
    for (const key in other) {
        if ({}.hasOwnProperty.call(other, key)) {
            newData = newData.filter((item) => {
                if ({}.hasOwnProperty.call(item, key)) {
                    return String(item[key]).trim().indexOf(decodeURI(other[key]).trim()) > -1
                }
                return true
            })
        }
    }
    const retDatas = {
        data: newData.slice((pageNo - 1) * pageSize, pageNo * pageSize),
        total: newData.length,
    }
 
    return writeOk(resp, retDatas)
}

export function comSaveOrUpdate(req, resp, mocktable) {
    const { body, query, headers,url } = req
    const { ...params } = {...body,...query} 
    const ret = saveOrUpdate(mocktable,params)
    if(ret){
       return writeOk(resp,ret)
    }else{
       return writeFail(resp,"不成功")
    }
}

// 删除通过id 改deletedFlag=‘1’
export function comDel(req, resp,mocktable) {
    const { body, query, url,headers } = req
    const  ids  = body
    const ret = deleteItem(mocktable,ids)
    if(ret > 0){
        return writeOk(resp,ret)
    }else{
       return writeFail(resp,"删除不成功")
    }
}

// 通过id查询
export function comGetOne(req, resp,mocktable) {
    const { body, query, url,headers } = req
    const { id ,...other} = { ...body, ...query }
    const item = getOne(mocktable,id)
    if(item){
        return writeOk(resp,item)
    }else{
        return writeFail(resp,"未找到")
    }
}

