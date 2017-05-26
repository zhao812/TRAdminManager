import React, { PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import { hashHistory } from 'react-router'
import { Layout } from 'antd';
const { Header, Footer, Sider, Content } = Layout;

import Headers from '../../components/header'
import SiderMenu from '../../components/siderMenu'
import * as RouterConst from '../../static/const/routerConst'
import { getMenu } from './reducer/action'
import { getCurrent,getOpenKeys } from '../../components/siderMenu/reducer/action'

import './index.scss'

class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
        }
    }

    componentDidMount() {
        this.props.getMenu().then((data)=>this.setState({menu:data}))
        this.props.getCurrent(this.props.location.query.text)
        this.props.getOpenKeys([this.props.location.query.openKeys])
    }

    getSiderMenuByRouter() {
        switch (this.props.location.pathname) {
            case RouterConst.ROUTER_LOGIN:
                return ""
            default:
                return <Sider className="sider"><SiderMenu data={this.state.menu||""} /></Sider>
        }
    }

    getHeaderByRouter() {
        switch (this.props.location.pathname) {
            case RouterConst.ROUTER_LOGIN:
                return ""
            default:
                return <Headers />
        }
    }

    render() {
        return (
            <Layout>
                {this.getHeaderByRouter()}
                <Layout>
                    {this.getSiderMenuByRouter()}
                    {React.cloneElement(this.props.children, { key: this.props.location.pathname })}
                </Layout>
            </Layout>
        );
    }
}


App.PropTypes = {
}

let mapStateToProps = state => ({
})

let mapDispatchToProps = (dispatch) => {
    return bindActionCreators({ getMenu ,getCurrent,getOpenKeys}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(App)