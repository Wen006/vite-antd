/*
 * @Author: Jackstraw
 * @Date: 2021-05-30 18:54:22
 * @Description: 
 * @FilePath: /vitepro/vite-react/mock/menu.data.ts
 * 好好学习、天天向上 >> 1432316105@qq.com
 */
export default [
    {
        "id":1,
        "name":"系统管理",
        "icon":"setting",
        "url":"",
        "children":[
            {
                "id":11,
                "name":"用户管理",
                "icon":"user",
                "url":"/sys/user"
            },
            {
                "id":12,
                "name":"菜单管理",
                "icon":"menu",
                "url":"/sys/menu"
            },
            {
                "id":13,
                "name":"权限管理",
                "icon":"security",
                "url":"/sys/auth"
            }
        ]
    },
    {
        "id":2,
        "name":"例子",
        "icon":"",
        "url":"",
        "children":[
            {
                "id":21,
                "name":"Form",
                "icon":"",
                "url":"/exam/form/form-1"
            },
            {
                "id":22,
                "name":"List",
                "icon":"",
                "url":"/exam/list/list-1"
            },
            {
                "id":232,
                "name":"ListA",
                "icon":"",
                "url":"/exam/list/list-122"
            }
        ]
    },
]