import React, { PropTypes } from 'react'
import { Router, Route, IndexRoute } from 'react-router'

import * as RouterConst from '../static/const/routerConst'
const App = cb => require.ensure([], require => { cb(null, require('../view/main').default)}, "App")
const Login = cb => require.ensure([], require => { cb(null, require('../view/login').default)}, "Login")

const UserList = cb => require.ensure([], require => { cb(null, require('../view/user').default)}, "userList")


const Routers = {
	path: RouterConst.ROUTER_HOME,
	getComponent(nextState, cb){ App(cb) },
	indexRoute: {
		getComponent(nextState, cb){ Login(cb) }
	},
	childRoutes: [
		{
			path: RouterConst.s,
			getComponent(nextState, cb){ Login(cb) },
		},
		
		{
			path: RouterConst.User_List,
			getComponent(nextState, cb){ UserList(cb) },
		}
	]
}

export default Routers