/*
 * @Author: Jackstraw
 * @Date: 2021-07-01 20:46:42
 * @Description: 
 * 好好学习、天天向上 >> 1432316105@qq.com
 */
import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { RouteConfig } from '../config/routes/types';

export type PageProps = {
    routes: Array<RouteConfig>,
    model: 'tab' | 'breade' | 'all'
}

const PageRender: React.FC<PageProps> = (props: PageProps): React.ReactElement => {

    if (props.model == 'tab') {

    } else {
        return <React.Suspense fallback={"loading"}>
            {props.routes.map((route: RouteConfig) => {
                return <Route path={route.url} component={route.component}></Route>
            })}
            <Redirect path="*" to="/404"></Redirect>
        </React.Suspense>
    }


    return <div>node</div>
}

export default PageRender;

