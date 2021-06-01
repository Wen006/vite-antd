/*
 * @Author: Jackstraw
 * @Date: 2021-05-29 18:22:33
 * @Description: 
 * @FilePath: /vitepro/vite-react/src/App.tsx
 * 好好学习、天天向上 >> 1432316105@qq.com
 */
import { Button, ConfigProvider } from 'antd'
import { Locale } from 'antd/lib/locale-provider';
import React,{ useState } from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom"
import { getRoutes } from './config/routes';
import BasicLayout from './layouts/BasicLayout';
import { Languages } from './utils/app.types'

import { getLang, getLocale } from './utils/web.util';

const Login: any = React.lazy(() => import('./pages/sys/login/Login'));
const NoFound: any = React.lazy(() => import('./pages/common/error/404'));

const routes = getRoutes();

interface AppState {
  language: Languages,
  loading: boolean,
  locale: Locale,
  theme: 'default' | 'dark'
}

function App() {
  const appInitState: AppState = {
    language: getLang(),
    locale: getLocale(),
    loading: false,
    theme: 'default'
  }
  const [appState, setAppState] = useState<AppState>(appInitState)

  const app = {
    appState,
    setAppState,
  }

  return <ConfigProvider locale={appState.locale}>
    <Router>
      <Switch>
        <Redirect exact from="/" path="/" to="/login"></Redirect>
        <Route path="/login" exact render={p => {
          return <React.Suspense fallback={<div>加载登录页面</div>}><Login {...p} app={app}></Login></React.Suspense>
        }}></Route>
        <BasicLayout
          app={app}
          path="/"
          routes={routes}
        >
        </BasicLayout>
        <Redirect path="*" to="/404"></Redirect>
      </Switch>
    </Router>
  </ConfigProvider>
}

export default App
