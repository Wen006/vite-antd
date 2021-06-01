/*
 * @Author: Jackstraw
 * @Date: 2021-05-30 16:53:53
 * @Description: 
 * @FilePath: /vite-react/src/layouts/AuthRoute.tsx
 * 好好学习、天天向上 >> 1432316105@qq.com
 */
import React ,{useState,useEffect} from "react"
import { Route, RouteProps } from "react-router";
import { getSessionUser } from "../utils/web.util";

export interface AuthRouteProps extends RouteProps {
    routes: Array<any>,
    app: any,
}

interface AuthRouteState{
    curUser: object,
    loading: boolean,
    render?: 
}

const Loading: React.FC<any> = props => {
    const { pathname } = props;
    return pathname ? <div>正在装载页面：{pathname}</div> : <>loading</>
}


const AuthRoute: React.FC<AuthRouteProps> = (props) => {
    const basicInitState:AuthRouteState = {
        curUser:{},
        loading: false,
    }
    const [state, setState] = React.useState(basicInitState)

    useEffect(() => {
        console.log(`11111`, 11111)
        return () => {
            console.log(`2222`, 2222)
        }
    }, ['curUser'])

    const user = getSessionUser();

    if (user) {
        return <React.Suspense fallback={<Loading location={location} />}>
            {
                props.routes.map(i => {
                    return <Route key={i.url} path={i.url} component={i.component}></Route>
                })
            }
        </React.Suspense>
    }

    const notAuthRoutes = props.routes.filter(it => it.needAuth == false);
    
    return <React.Suspense fallback={<Loading location={location} />}>
        {
            notAuthRoutes.map(i => {
                return <Route key={i.url} path={i.url} component={i.component}></Route>
            })
        }
    </React.Suspense>
}

export default AuthRoute;
