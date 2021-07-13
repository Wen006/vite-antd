import React, { PureComponent, useState, useEffect } from 'react';
import { Avatar, Dropdown, Menu } from 'antd';
import { SmileOutlined, UserOutlined } from '@ant-design/icons';
import type { MenuDataItem, ProSettings } from '@ant-design/pro-layout';
import ProLayout, { SettingDrawer } from '@ant-design/pro-layout';
import defaultProps from './defaultProps';
import { RouteConfig } from '../config/routes/types';
import PageRender from './PageRender';
import { callRpc } from '../services/service.handler';
import { useHistory, useLocation } from 'react-router-dom';
import { clearSession, getSessionUser } from '../utils/web.util';

type Menu = {
    icon: string,
    id: number | string,
    name: string,
    url?: string,
    children?: Array<Menu>
}

type RouteMenu = {
    key?: string | number,
    path?: string,
    name: string,
    icon: React.ReactElement,
    component?: string,
    routes?: Array<RouteMenu>
}


const menusToRoutes = (menus: Array<Menu>): Array<MenuDataItem> => {
    const menuToRoute = (menu: Menu): MenuDataItem => {
        const routeMenu: MenuDataItem = {
            path: menu.url,
            name: menu.name,
            icon: <SmileOutlined />,
            //component: './Welcome',
        }
        if (menu.children) {
            routeMenu.routes = menu.children.map(menuToRoute);
        }
        return routeMenu;
    }
    return menus.map(menuToRoute);
}



export interface BasicLayoutProps {
    routes: Array<RouteConfig>,
    app: any,
    path: string,
}

export interface BasicLayoutState {
    isFull: boolean, // 是否单个页面
}


class AppLayout extends PureComponent<BasicLayoutProps, BasicLayoutState>{

    constructor(props: BasicLayoutProps) {
        super(props);
        this.state = {
            isFull: false,
        } as BasicLayoutState;
    }

    render() {
        return <>
            {
                this.state.isFull ? <PageRender model={"breade"} routes={this.props.routes}></PageRender> : <StandLayout>
                    <PageRender model={"breade"} routes={this.props.routes}></PageRender>
                </StandLayout>
            }
        </>
    }

}

export default AppLayout;

const StandLayout: React.FC<{}> = ({ children, ...other }): React.ReactElement => {
    const [settings, setSetting] = useState<Partial<ProSettings> | undefined>({ fixSiderbar: true });
    const [pathname, setPathname] = useState('/welcome');
    const [menus, setMenus] = useState<Array<MenuDataItem>>([])
    const [user, setUser] = useState<{}>({})

    const history = useHistory();
    useEffect(() => {
        const user = getSessionUser();
        if (!user) {
            clearSession();
            history.push("login")
            return;
        }

        setUser(user);

        callRpc({ key: 'sys.menu.get-menus' }).then(data => {
            if (data.success) {
                const ms = menusToRoutes(data.data);
                setMenus(ms)
            }
        })


        return () => {
            setMenus([])
        }
    }, [])

    const handleMenuClick = (item: { key: string | number }) => {
        if (item.key == "logout") {
            callRpc({ key: "sys.user.logout" }).then(da => {
                if (da.success) {
                    clearSession();
                    history.push("/login")
                }
            })
        }

    }

    const menu = (
        <Menu onClick={handleMenuClick}>
            <Menu.Item key="logout" icon={<UserOutlined />}>
                退出登录
            </Menu.Item>
            <Menu.Item key="switch-role" icon={<UserOutlined />}>
                切换角色
            </Menu.Item>
            <Menu.Item key="switch-full" icon={<UserOutlined />}>
                切换全屏
            </Menu.Item>
        </Menu>
    );


    return (
        <div
            id="test-pro-layout"
            style={{
                height: '100vh',
            }}
        >
            <ProLayout
                // {...defaultProps}
                menuHeaderRender={(logo, title) => {
                    return <a>{logo}<h1>Vita Antd</h1></a>
                }}
                title={"hello"}
                route={{
                    path: "/",
                    routes: menus,
                }}
                location={{
                    pathname,
                }}
                waterMarkProps={{
                    content: 'Pro Layout',
                }}
                menuFooterRender={(props) => {
                    return (
                        <a
                            style={{
                                lineHeight: '48rpx',
                                display: 'flex',
                                height: 48,
                                color: 'rgba(255, 255, 255, 0.65)',
                                alignItems: 'center',
                            }}
                            href="https://preview.pro.ant.design/dashboard/analysis"
                            target="_blank"
                            rel="noreferrer"
                        >
                            <img
                                alt="pro-logo"
                                src="https://procomponents.ant.design/favicon.ico"
                                style={{
                                    width: 16,
                                    height: 16,
                                    margin: '0 16px',
                                    marginRight: 10,
                                }}
                            />
                            {!props?.collapsed && 'Vite Antd'}
                        </a>
                    );
                }}
                onMenuHeaderClick={(e) => console.log(e)}
                menuItemRender={(item, dom) => (
                    <a
                        onClick={() => {
                            setPathname(item.path || '/welcome');
                            history.push(item.path || '');
                        }}
                    >
                        {dom}
                    </a>
                )}
                rightContentRender={() => (
                    <div>
                        <Dropdown.Button overlay={menu} placement="bottomCenter" icon={<Avatar shape="square" size="small" icon={<UserOutlined />} />}>
                            admin
                        </Dropdown.Button>
                    </div>
                )}
                {...settings}
            >
                {children}
            </ProLayout>
            <SettingDrawer
                pathname={pathname}
                getContainer={() => document.getElementById('test-pro-layout')}
                settings={settings}
                onSettingChange={(changeSetting) => {
                    setSetting(changeSetting);
                }}
                disableUrlParams
            />
        </div>
    );
};