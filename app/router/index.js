import React, { PropTypes } from 'react'
import { Router, Route, IndexRoute } from 'react-router'

import * as RouterConst from '../static/const/routerConst'
const App = cb => require.ensure([], require => { cb(null, require('../view/main').default)}, "App")
const Login = cb => require.ensure([], require => { cb(null, require('../view/login').default)}, "Login")
const User = cb => require.ensure([], require => { cb(null, require('../view/user').default)}, "User")

const MenuManage = cb => require.ensure([], require => { cb(null, require('../view/menuManager').default)}, "MenuManage")
const Authority = cb => require.ensure([], require => { cb(null, require('../view/Authority').default)}, "Authority")

const FormView = cb => require.ensure([], require => { cb(null, require('../view/formView').default)}, "User")
const ListView = cb => require.ensure([], require => { cb(null, require('../view/listView').default)}, "ListView")

const Routers = {
	path: RouterConst.ROUTER_HOME,
	getComponent(nextState, cb){ App(cb) },
	indexRoute: {
		getComponent(nextState, cb){ User(cb) }
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