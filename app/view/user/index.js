/**
 * created by zhao at 2017/5/25
 */

'use strict'
import React, { PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Layout, Table, Button, Modal } from 'antd'

import { getUserData } from './reducer/action'

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
                    title: '姓名',
                    dataIndex: 'username',
                },
                {
                    title: '邮箱',
                    dataIndex: 'mail',
                },
                {
                    title: '用户组',
                    dataIndex: 'usergroup'
                },
                {
                    title: '用户权限',
                    dataIndex: 'userrights'
                },
                {
                    title: '操作',
                    render: (text, record) => (
                        <span><Button>修改</Button><Button>删除</Button></span>
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

    render() {
        let { Content } = Layout
        let { loading, pagination, columns } = this.state
        return (
            <Content className="user-container">
                <div className="user-title-div"><span className="user-title">用户列表</span><Button className="bn-add-user">新建用户</Button></div>
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
    return bindActionCreators({ getUserData }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(User)