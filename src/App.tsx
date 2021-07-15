/*
 * @Author: Jackstraw
 * @Date: 2021-05-29 18:22:33
 * @Description: 
 * @FilePath: /vitepro/vite-react/src/App.tsx
 * 好好学习、天天向上 >> 1432316105@qq.com
 */
import { Button, ConfigProvider } from 'antd'
import { Locale } from 'antd/lib/locale-provider';
import React, { useState } from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom"
import { getRoutes } from './config/routes';
import { Languages } from './core/app.types';
import AppLayout from './layouts/AppLayout';
import 'moment'
import 'moment/locale/zh-cn.js'
// import 'moment/locale/en-us.js'
import 'moment/locale/ja.js'

import { getLang, setLang } from './utils/web.util';
import { IntlProvider } from 'react-intl';
import { getAntLocale } from './core/i18n/LocalContext';

const Login: any = React.lazy(() => import('./pages/sys/login/Login'));
const NoFound: any = React.lazy(() => import('./pages/common/error/404'));

const routes = getRoutes();

interface AppState {
  language: Languages,
  loading: boolean,
  antLocale?: Locale,
  theme: 'default' | 'dark'
}
const lang = getLang();

function App() {
  const appInitState: AppState = {
    language: lang,
    loading: false,
    theme: 'default'
  }
  const [appState, setAppState] = useState<AppState>(appInitState);
  const [antLocale, setAntLocale] = useState<Locale>(); // 多语言 阿里组件

  const switchLang = async (lang: Languages) => {
    const locale: Locale = await getAntLocale(lang);
    setLang(lang)
    setAntLocale(locale);
    console.log(`locale`, locale)
  }

  React.useEffect(() => {
    switchLang(lang);
    return () => {

    }
  }, [])

  const app = {
    language: appState.language,
    setLang: (lang: Languages) => {
      return switchLang(lang).then(() => {
        setAppState((state) => {
          return {
            ...state,
            language: lang,
          }
        })
      })
    }
  }

  return <ConfigProvider locale={antLocale}>
    <Router>
      <Switch>
        <Redirect exact from="/" path="/" to="/login"></Redirect>
        <Route path="/login" exact render={p => {
          return <React.Suspense fallback={<div>加载登录页面</div>}><Login {...p} app={app}></Login></React.Suspense>
        }}></Route>
        <AppLayout
          app={app}
          path="/"
          routes={routes}
        >
        </AppLayout>
        <Redirect path="*" to="/404"></Redirect>
      </Switch>
    </Router>
  </ConfigProvider>
}

export default App
