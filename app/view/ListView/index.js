/**
 * created by zhao at 2017/5/25
 */
'use strict'
import React, { PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { hashHistory } from 'react-router'
import { Layout, Table, Button, Modal } from 'antd'

import { getListData, deleteListData } from './reducer/action'

import * as RouterConst from '../../static/const/routerConst'
import * as ListConst from '../../static/const/listConst'

import './index.scss'

class ListView extends React.Component {
    constructor(props, context) {
        super(props, context)

        this.state = {
            title: "",
            bnAddTitle: "",
            loading: false,
            pagination: { pageSize: 10, current: 0 },
            columns: [],
            urlApi: "",
            fetchType: ""
        }
    }

    componentDidMount() {
        let type = this.props.params.table, obj = ListConst.tableList[type], state = {
            title: obj.title,
            bnAddTitle: obj.subTitle.add,
            columns: [
                ...obj.columns,
                {
                    title: '操作',
                    render: (text, record) => (
                        <span className="table-btns"><Button onClick={()=>this.onEditHandler(record._id)}>修改</Button><Button onClick={()=>this.onDeleteHandler(record._id)}>删除</Button></span>
                    )
                }
            ],
            urlApi: obj.urlApi.list.api,
            fetchType: obj.urlApi.list.type
        }
        this.setState(state, ()=>this.sendData(this.state.pagination))
    }

    sendData(pagination = {}){
        let opt = {
            page: pagination ? pagination.current : 0,
            size: pagination ? pagination.pageSize : 10
        }, { urlApi, fetchType } = this.state
        this.props.getListData(urlApi, null, fetchType).then(data=>{
            this.setState({
                loading: false,
                pagination: {
                    ...pagination,
                    // current:　pagination.current || 0,
                    // total: data.total
                }
            })
        }, ()=>{
            this.setState({
                loading: false
            })
        })
    }

    onPageChange(pagination) {
        // this.sendData(pagination)
    }

    onAddHandler(){
        hashHistory.push(RouterConst.ROUTER_FORM + "/add/" +　this.props.params.table)
    }

    onEditHandler(id){
        hashHistory.push(RouterConst.ROUTER_FORM + "/edit/" +　this.props.params.table+"/"+id)
    }

    onDeleteHandler(id){
        let tableType = this.props.params.table, obj = ListConst.tableList[tableType]
        let url = obj.urlApi.delete.api+"/"+id, type = obj.urlApi.delete.type
        this.props.deleteListData(url, {}, type).then(()=>{
            Modal.success({
                title: '提示',
                content: "删除成功！"
            })
        })
    }

    render() {
        let { Content } = Layout
        let { title, bnAddTitle, loading, pagination, columns } = this.state
        return (
            <Content className="list-container">
                <div className="list-title-div"><span className="list-title">{title}</span><Button className="bn-add" onClick={()=>this.onAddHandler()}>{bnAddTitle}</Button></div>
                <Table className="list-tables"
                    columns={columns}
                    dataSource={this.props.listData}
                    pagination={pagination}
                    loading={loading}
                    onChange={(pagination) => this.onPageChange(pagination)}
                />
            </Content>
        )
    }

}

ListView.PropTypes = {
    listData: PropTypes.array.isRequired
}

let mapStateToProps = state => ({
    listData: state.listReducer.listData
})

let mapDispatchToProps = (dispatch) => {
    return bindActionCreators({ getListData, deleteListData }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(ListView)