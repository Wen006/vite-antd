/**
 * @desc 模拟数据库，通过字段配置自动生成数据
 * dbConfig: 数据库表名和表字段配置
 * getTableData： 通过表名称获取数据
 * saveOrUpdate： 通过表名称和数据id保存数据
 * deleteItem： 通过表名和数据id删除数据 //逻辑删除
 * getOne： 通过表名称和数据id获取记录
 * @auth wennn
 */

import {
    initMockData,
    createOne,
} from './utils'
 
interface DbCnf{
    [key:string]:{
        [key:string]:'@cname'|'@id'|'@city(true)'|"@email"|number|boolean|Array<any>|any,
    }
}

const dbConfig:DbCnf = {
    "SM_USER": {
        "userName": "@cname",
        "userAccount": "@id",
        "userCode|+1": 1000,
        "email": "@email",
        "phone": /^((1[3,5,8][0-9])|(14[5,7])|(17[0,6,7,8])|(19[7]))\d{8}$/,
        "sex|1": ["男", "女"],
        "age|1-100": 0,
        "address": "@city(true)",
    },
    "SM_MENU": {
        "icon|1": ["setting", "user", "file", "up"],
        "menuCode": "@id",
        "menuName": "@cname",
        "url|1": ["/system/menulist", "/fsc/budgetlist"],
    },
    "SM_ROLE": {
        "menuIds|1": ["90", "10001", "10002", "10003", "10004", "10006", "10007", "40001", "40002", "40003", "40004", "40005", "40006", "40007", "40008", "40009", "40010", "40011", "50001", "50002", "50003", "50004", "50005", "50006", "50007", "50008", "50009", "50010", "50011", "60204", "60301", "60302", "60303", "60304", "60305", "300701", "300702", "300703", "300704", "800701", "800702", "800703", "800704", "800705", "800706", "800707", "1000501", "1000502", "1000503", "1000504", "1000505", "2000101", "2000102", "2000103", "2000201", "2000202", "2000301", "2000304", "2000305", "2000307", "2000308", "2000401", "2000402", "2000403", "2000404", "2000501", "2000504", "2000505", "2000507", "2000601", "2000701", "2000702", "2000901", "2000904", "3000101", "3000102", "3000301", "3000304", "3000306", "3000404", "3000704", "3000706", "3000707", "3000709", "3001001", "3001002", "6000303", "6000304", "6000305", "6000306", "6000307", "6000309", "6000310", "6000311", "6000314", "6000315", "6000316", "6000401", "6000402", "6000501", "6000601", "6000602", "6000603", "6000604", "7000101", "7000102", "7000103", "7000104", "7000105", "7000106", "7000201", "7000202", "7000301", "7000303", "7000304", "8000401", "8000402", "8000403", "8000404", "8000501", "8000502", "8000503", "8000511", "8000513", "8000515", "8000516", "8000517", "8000518", "8000520", "8000521", "8000522", "9000101", "9000102", "9000103", "9000201", "9000301", "9000302", "9000303", "9000304", "300100901", "300100904", "300100905", "300100907", "300100908", "800010101", "800010102", "800010105", "800010106", "800010107", "800010108", "800010109", "800010110", "800010112", "800010301", "800010302", "800010305", "800010306", "800010307", "800010308", "800010309", "800010310", "800030101", "800030102", "800030103", "800030104", "800030105", "800060417", "800060418", "800060419", "800060420", "800060421", "800060425", "800060429", "800060430", "800060431", "800060432", "800060433", "800060437", "800060438", "800060439", "800060440", "800060442", "800060446", "800060447", "800060448"],
        "createBy": null,
        "deletedFlag": "0",
        "gmtCreate": null,
        "gmtModified": null,
        "id": "@id",
        "ids": null,
        "lastModifiedBy": null,
        "modificationNum": 0,
        "originApp": null,
        "originFlag": null,
        "remark": "@cname",
        "roleCode": "@id",
        "roleDesp": null,
        "roleName": "@cname",
        "roleType": null,
        "menuCode": "@id",
        "menuName": "@cname",
        "url|1": ["/system/menulist", "/fsc/budgetlist"],
        "entityName": "品控部",
        "nickName": "Kevin",
        "unitName": "金轮针布",
        "userCode": "Kevin",
        "userName": "Kevin255",

    },

}
interface Dbs {
    [key:string]:Array<any>
}
const dbs:Dbs = {} // 模拟数据库

Object.keys(dbConfig).forEach(it => {
    dbs[`${it}`] = initMockData(dbConfig[`${it}`], 30)
})

// console.log(dbs)

// 无法模拟的数据在这里替换 在./dbData.js 里定义好数据


/**
 * 通过表明获取数据源
 */
 export const getTableData = function (tName:(typeof dbConfig)) {
    const db = dbs[`${tName}`]
    if (!db) {
        console.error(`数据库表【${tName}】规则未配置！`)
        return undefined
    }
    return db;
}

/**
 * 
 * @param {数据库表明} tName 
 * @param {保存item} item 
 * @return 返回修改的记录
 */

 export const saveOrUpdate = function (tName:(typeof dbConfig), item:any) {
    const db = getTableData(tName);
    let updateItem
    if (db) {
        if (item.id) {
            db.some(it => {
                if (it.id != item.id)
                    return false;
                updateItem = Object.assign(it, item)
                return true;
            })
        } else {
            const newItem = createOne(dbConfig[`${tName}`])
            updateItem = { ...newItem, ...item }
            db.unshift(updateItem)
        }
    }
    return updateItem
}

export const deleteItem = function (tName:(typeof dbConfig), ids:Array<any>) {
    const db = getTableData(tName);
    let effectNum = 0
    console.log(tName, ids)
    if (db) {
        db.forEach(it => {
            if (it.deletedFlag != '1' && ids.includes(`${it.id}`)) {
                it.deletedFlag = '1'
                effectNum++
            }
        })
    }
    return effectNum;
}

export const getOne = function (tName:(typeof dbConfig),id:number|string) {
    const db = getTableData(tName);
    let item = {}
    if (db) {
        db.some(it => {
            if (it.id == id) {
                item = it
                return true
            }
            return false
        })
    }
    return item;
}
