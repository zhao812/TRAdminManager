import React, { PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import { Router, Route, IndexRoute, Link ,hashHistory} from 'react-router';
import { Layout, Menu, Icon, Input, Button } from 'antd'
import * as RouterConst from '../../static/const/routerConst'

import './index.scss'

class Headers extends React.Component {
    constructor(props, context) {
        super(props, context)

        this.state = {
            selectedTab: "home"
        }
    }

    handleClick(e) {
        this.setState({selectedTab: e.key})
    }

    onChangeUserName(){
    }

    render() {
        let { username } = this.props
        let { Header } = Layout, SubMenu = Menu.SubMenu, MenuItemGroup = Menu.ItemGroup
        return(
            <Header className="header-div">
                <div className="logo">藤榕后台管理系统</div>
                <div className="menu-right">
                    <div className="menu-item">{username}</div>
                    <div className="menu-item"><Button className="logoOut">退出</Button></div>
                </div>
            </Header>
        )
    }
}

Headers.PropTypes = {
    username: PropTypes.string.isRequired
}


let mapStateToProps = state => ({
    username: state.loginReducer.username
})

let mapDispatchToProps = (dispatch) => {
    return bindActionCreators({}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Headers)