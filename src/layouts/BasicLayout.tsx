/*
 * @Author: Jackstraw
 * @Date: 2021-05-30 16:53:53
 * @Description: 
 * @FilePath: /vitepro/vite-react/src/layouts/BasicLayout.tsx
 * 好好学习、天天向上 >> 1432316105@qq.com
 */
import React, { useState, useEffect } from "react"
import { Route, RouteProps } from "react-router";
import { getSessionUser } from "../utils/web.util";
import { Layout, Menu, Breadcrumb } from 'antd';
import { UserOutlined, LaptopOutlined, NotificationOutlined } from '@ant-design/icons';
import { callRpc } from "@/services/service.handler";
import { Link } from "react-router-dom";

const { SubMenu } = Menu;
const { Header, Content, Sider } = Layout;

export interface BasicLayoutProps extends RouteProps {
    routes: Array<any>,
    app: any,
}

interface BasicLayoutState {
    curUser: object,
    loading: boolean,
    isFull: boolean,
    menus: Array<any>
}

const Loading: React.FC<any> = props => {
    const { pathname } = props;
    return pathname ? <div>正在装载页面：{pathname}</div> : <>loading</>
}

const RouteRender: any = (routes: Array<any>, props: any, isFull?: boolean) => {
    if (!isFull) {
        return <>
            <Layout>
                <Header className="header">
                    <div className="logo" />
                    {/* <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['2']}>
                        <Menu.Item key="1">nav 1</Menu.Item>
                        <Menu.Item key="2">nav 2</Menu.Item>
                        <Menu.Item key="3">nav 3</Menu.Item>
                    </Menu> */}
                </Header>
                <Layout>
                    <Sider width={200} className="site-layout-background">

                        <Menu
                            mode="inline"
                            defaultSelectedKeys={['1']}
                            defaultOpenKeys={['sub1']}
                            style={{ height: '100%', borderRight: 0 }}
                        >
                            {
                                props.menus.map((menu: { id: string, name: string, url: string, icon?: string, children?: Array<any> }) => {
                                    return <SubMenu key={menu.id} icon={<UserOutlined />} title={menu.name}>
                                        {menu.children?.map(k => {
                                            return <Menu.Item key={k.id}>
                                                <Link to={k.url}>{k.name}</Link>
                                            </Menu.Item>
                                        })}
                                    </SubMenu>
                                })
                            }
                        </Menu>
                    </Sider>
                    <Layout style={{ padding: '0 24px 24px' }}>
                        {/* <Breadcrumb style={{ margin: '16px 0' }}>
                            <Breadcrumb.Item>Home</Breadcrumb.Item>
                            <Breadcrumb.Item>List</Breadcrumb.Item>
                            <Breadcrumb.Item>App</Breadcrumb.Item>
                        </Breadcrumb> */}
                        <Content
                            className="site-layout-background"
                            style={{
                                padding: 24,
                                margin: 0,
                                minHeight: 280,
                            }}
                        >
                            <React.Suspense fallback={<Loading location={props.location} />}>
                                {
                                    routes.map((i: any) => {
                                        return <Route key={i.url} path={i.url}
                                            render={(p: any) => {
                                                return React.createElement(i.component, { ...p, ...props })
                                            }}
                                        >
                                        </Route>
                                    })
                                }
                            </React.Suspense>
                        </Content>
                    </Layout>
                </Layout>
            </Layout>
        </>
    }


    return <React.Suspense fallback={<Loading location={props.location} />}>
        {
            routes.map((i: any) => {
                return <Route key={i.url} path={i.url}
                    render={(p: any) => {
                        return React.createElement(i.component, { ...p, ...props })
                    }}
                >
                </Route>
            })
        }
    </React.Suspense>
}

const BasicLayout: React.FC<BasicLayoutProps> = (props) => {
    const basicInitState: BasicLayoutState = {
        curUser: {},
        menus: [],
        isFull: false,
        loading: false,
    }
    const [state, setState] = React.useState(basicInitState)

    useEffect(() => {
        console.log(`11111`, 11111)
        callRpc({
            key: "sys.menu.get-menus"
        }).then((data: any) => {
            setState((preState) => {
                return {
                    ...preState,
                    menus: data.data,
                }
            })
        })
        return () => {
            console.log(`2222`, 2222)
        }
    }, ['curUser'])

    const user = getSessionUser();

    const kidProps: any = {
        ...props,
        ...state,
        layout: {
        }
    }

    if (user) {
        return RouteRender(props.routes, kidProps)
    }
    const notBasicLayouts = props.routes.filter(it => it.needAuth == false);
    return RouteRender(notBasicLayouts, kidProps)


}

export default BasicLayout;
