import React, { PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import { hashHistory } from 'react-router'
import { Layout } from 'antd';
const { Header, Footer, Sider, Content } = Layout;

import Headers from '../../components/header'
import SiderMenu from '../../components/siderMenu'
import * as RouterConst from '../../static/const/routerConst'
import { checkLogin } from '../login/reducer/action'

import './index.scss'

class App extends React.Component {
    constructor(props) {
        super(props)
    }

    componentDidMount() {
        this.props.checkLogin()
    }

    getSiderMenuByRouter() {
        switch (this.props.location.pathname) {
            case RouterConst.ROUTER_LOGIN:
            case RouterConst.ROUTER_HOME:
                return ""
            default:
                return <Sider className="sider"><SiderMenu /></Sider>
        }
    }

    getHeaderByRouter() {
        switch (this.props.location.pathname) {
            case RouterConst.ROUTER_LOGIN:
            case RouterConst.ROUTER_HOME:
           // case RouterConst.WE_CLOME:
                return ""
            default:
                return <Headers />
        }
    }

    render() {
        return (
            <div className="xt">
                <Layout>
                    {this.getHeaderByRouter()}
                    <Layout>
                        {this.getSiderMenuByRouter()}
                        {React.cloneElement(this.props.children, { key: this.props.location.pathname })}
                    </Layout>
                </Layout>
            </div>
        );
    }
}


App.PropTypes = {
}


let mapStateToProps = state => ({
})

let mapDispatchToProps = (dispatch) => {
    return bindActionCreators({ checkLogin }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(App)