import React, { PropTypes } from 'react'
import { Router, Route, IndexRoute } from 'react-router'

import * as RouterConst from '../static/const/routerConst'
const App = cb => require.ensure([], require => { cb(null, require('../view/main').default)}, "App")
const Login = cb => require.ensure([], require => { cb(null, require('../view/login').default)}, "Login")

const MenuManage = cb => require.ensure([], require => { cb(null, require('../view/menuManager').default)}, "MenuManage")

const FormView = cb => require.ensure([], require => { cb(null, require('../view/formView').default)}, "FormView")
const ListView = cb => require.ensure([], require => { cb(null, require('../view/listView').default)}, "ListView")

const Routers = {
	path: RouterConst.ROUTER_HOME,
	getComponent(nextState, cb){ App(cb) },
	indexRoute: {
			path:RouterConst.ROUTER_HOME,
			getComponent(nextState, cb){ Login(cb) },
	},
	childRoutes: [
		{
			path: RouterConst.ROUTER_LOGIN,
			getComponent(nextState, cb){ Login(cb) },
		},
		{
			path: RouterConst.Menu_Manage,
			getComponent(nextState, cb){ MenuManage(cb) },
		},
		{
			path: RouterConst.Authority,
			getComponent(nextState, cb){ Authority(cb) },
		},
		{
			path: RouterConst.ROUTER_FORM+"/:action/:table",
			getComponent(nextState, cb){ FormView(cb) },
		},
		{
			path: RouterConst.ROUTER_FORM+"/:action/:table/:id",
			getComponent(nextState, cb){ FormView(cb) },
		},
		{
			path: RouterConst.ROUTER_LIST+"/:table",
			getComponent(nextState, cb){ ListView(cb) },
		}
	]
}

export default Routers