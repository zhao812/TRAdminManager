/**
 * created by zhao at 2017/5/25
 */
'use strict'
import React, { PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { hashHistory } from 'react-router'
import { Layout, Table, Button, Modal } from 'antd'

import { getUserData } from './reducer/action'
import { initFormData } from '../formView/reducer/action'

import * as RouterConst from '../../static/const/routerConst'

import './index.scss'

class User extends React.Component {
    constructor(props, context) {
        super(props, context)


        this.state = {
            loading: false,
            pagination: { pageSize: 10, current: 0 },
            columns: [
                {
                    title: '序号',
                    dataIndex: 'key',
                },
                {
                    title: '账号',
                    dataIndex: 'username',
                },
                {
                    title: '姓名',
                    dataIndex: 'realName',
                },
                {
                    title: '分公司',
                    dataIndex: 'branchName'
                },
                {
                    title: '部门',
                    dataIndex: 'departmentName'
                },
                {
                    title: '职位',
                    dataIndex: 'roleName'
                },
                {
                    title: '办公地点',
                    dataIndex: 'officeName'
                },
                {
                    title: '操作',
                    render: (text, record) => (
                        <span className="table-btns"><Button>修改</Button><Button>删除</Button></span>
                    )
                }
            ]
        }
    }

    componentDidMount() {
        this.setState({
            pagination: { pageSize: 10, current: 0 }
        }, ()=>{
            this.sendData(this.state.pagination)
        })
    }

    onClickHandler() {

    }

    sendData(pagination = {}){
        let opt = {
            page: pagination ? pagination.current : 0,
            size: pagination ? pagination.pageSize : 10
        }
        this.props.getUserData(opt).then(data=>{
            this.setState({
                loading: false,
                pagination: {
                    ...pagination,
                    current:　pagination.current || 0,
                    total: data.total
                }
            })
        }, ()=>{
            this.setState({
                loading: false
            })
        })
    }

    onPageChange(pagination) {
        this.sendData(pagination)
    }

    addNewUser(){
        let data = {
            title: "新建用户",
            value: [
                {
                    id: "username",
                    name: "账号",
                    type: "text",
                    placeholder: "",
                    isRequired: true,
                    value: ""
                },
                {
                    id: "password",
                    name: "密码",
                    type: "password",
                    placeholder: "",
                    isRequired: true,
                    value: ""
                },
                {
                    id: "realName",
                    name: "姓名",
                    type: "text",
                    placeholder: "",
                    isRequired: true,
                    value: ""
                },
                {
                    id: "branchName",
                    name: "分公司",
                    type: "text",
                    placeholder: "",
                    isRequired: true,
                    value: ""
                },
                {
                    id: "departmentName",
                    name: "部门",
                    type: "text",
                    placeholder: "",
                    isRequired: true,
                    value: ""
                },
                {
                    id: "roleName",
                    name: "职位",
                    type: "text",
                    placeholder: "",
                    isRequired: true,
                    value: ""
                },
                {
                    id: "officeName",
                    name: "办公地点",
                    type: "text",
                    placeholder: "",
                    isRequired: true,
                    value: ""
                }
            ],
            urlApi: "/api/sys/v1/user/registered",
            fetchType: "POST",
            router: RouterConst.ROUTER_HOME
        }
        this.props.initFormData(data)
        hashHistory.push(RouterConst.ROUTER_FORM)
    }

    render() {
        let { Content } = Layout
        let { loading, pagination, columns } = this.state
        return (
            <Content className="user-container">
                <div className="user-title-div"><span className="user-title">用户列表</span><Button className="bn-add-user" onClick={()=>this.addNewUser()}>新建用户</Button></div>
                <Table className="user-tables"
                    columns={columns}
                    dataSource={this.props.userList}
                    pagination={pagination}
                    loading={loading}
                    onRowClick={(e) => this.onClickHandler(e)}
                    onChange={(pagination) => this.onPageChange(pagination)}
                />
            </Content>
        )
    }

}

User.PropTypes = {
    userList: PropTypes.array.isRequired
}

let mapStateToProps = state => ({
    userList: state.userReducer.userData
})

let mapDispatchToProps = (dispatch) => {
    return bindActionCreators({ getUserData, initFormData }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(User)