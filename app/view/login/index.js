import React, { PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Link, hashHistory } from 'react-router'
import { Layout, Input, Checkbox, Button, Modal } from 'antd'

import * as RouterConst from '../../static/const/routerConst'
import ErrorMessage from '../../static/const/errorMessage'

import { userLogin } from './reducer/action'
import { checkEmail } from '../../utils'

import './index.scss'

class Login extends React.Component{

    constructor(props, context){
        super(props, context)

        this.state = {
            username: "",
            password: "",
        }
    }

    componentDidMount(){
        if(this.props.isLogin){
            hashHistory.push(RouterConst.ROUTER_LIST+"/user")
            return
        }

        this.setState({
            username: "",
            password: ""
        })
    }

    /**输入框改变事件 */
    onInputChange(e, type){
        let value = e.currentTarget.value.replace(/\s/g,''), state = {}
        state[type] = value
        this.setState(state)
    }

    /**登录按钮事件 */
    onLoginHandler(){
        let { username, password } = this.state, msg=""
        if(username == ""){
            msg = ErrorMessage.Error_Email_Empty
        // }else if(!checkEmail(username)){
        //     msg = ErrorMessage.Error_Email_Invalid
        }else if(password == ""){
            msg = ErrorMessage.Error_Password_Empty
        }else if(password.length<5||password.length>12){
            msg = ErrorMessage.Error_PassWord_Invalid
        }
        if(msg){
            Modal.error({
                title: '提示',
                content: msg
            })
            return
        }

        this.props.userLogin(username, password)
    }
    onKeyup(e){
        if(e.keyCode===13){
            this.onLoginHandler()
        }
        
    }
    render(){
        const { Content } = Layout
        let { username, password } = this.state

        return(
            <Content className="login-container" onKeyUp={(e)=>this.onKeyup(e)}>
                <div className="login-div">
                    <p className="login-title">藤榕后台管理系统</p>
                    <div className="email-div">
                        <Input className="email-input" value={username} onChange={(e)=>this.onInputChange(e, "username")} placeholder="用户名" />
                    </div>
                    <div className="password-div">
                        <Input className="password-input" type="password" placeholder="6-12位登录密码" maxLength="12" value={password} onChange={(e)=>this.onInputChange(e, "password")} />
                        <span className="forgetPw-txt">忘记密码?</span>
                    </div>
                    <Button className="bnLogin" onClick={()=>this.onLoginHandler()} >登录</Button>
                    {/*<div className="login-tip">还没有账户?  <Link to={ RouterConst.ROUTER_REGISTER }>立即前往</Link></div>*/}
                </div>
            </Content>
        )
    }

}

Login.PropTypes = {
    isLogin: PropTypes.bool.isRequired
}

let mapStateToProps = state => ({
    isLogin: state.loginReducer.isLogin
})

let mapDispatchToProps = (dispatch) => {
    return bindActionCreators({ userLogin }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Login)