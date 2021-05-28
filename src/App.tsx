import { Button } from 'antd'
import React, { useState } from 'react'
// import Loadable from 'react-loadable'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
  Link
} from "react-router-dom"

const AsyncComponent= (ele:React.ReactElement) => {

}

const Login = React.lazy(()=>import('./pages/sys/login/Login'));

const routes = [
  {
    url: '/one',
    component: () => import("./pages/exam/ExOne"),
  },
  {
    url: '/two',
    component: () => import("./pages/exam/ExTwo"),
  }, 
  {
    url: '/three',
    component: () => import("./pages/exam/ExThree"),
  }
].map(it => { 
  const Ele = React.lazy(it.component)
  return {
    ...it,
    component: () => <React.Suspense fallback={<div>{it.url}</div>}><Ele></Ele></React.Suspense>,
  }
})


function App() {
  return <div>
    <div className="header">header</div>
    <div className="body">
      <Button>hello</Button>
      <Router>
      {
        routes.map(i=>{
          return <Link to={i.url} key={i.url}>{i.url}</Link>
        })
      }
        <Switch>
          <Route path="/login" render={p=>{
            console.log("hello====")
            return <React.Suspense fallback={<div>loading</div>}><Login {...p}></Login></React.Suspense>
          }}></Route>
          {
            routes.map(i => {
              return <Route key={i.url} path={i.url} component={i.component}>
                {/* <i.component></i.component> */}
              </Route>
            })
          }
        </Switch>
      </Router>
    </div>
  </div>
}

export default App
