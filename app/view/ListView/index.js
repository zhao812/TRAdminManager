/**
 * created by zhao at 2017/5/25
 */
'use strict'
import React, { PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { hashHistory } from 'react-router'
import { Layout, Table, Button, Modal } from 'antd'

import { getListData, deleteListData, clearListData } from './reducer/action'

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
            pagination: { pageSize: 10, current: 1 },
            columns: [],
            urlApi: "",
            fetchType: ""
        }
    }

    componentDidMount() {
        let type = this.props.params.table
        let columns;
        
        if(!type){
            hashHistory.push(RouterConst.ROUTER_LIST + "/user")
            return
        }
        else{
            let obj = ListConst.tableList[type];
            if(type=="gateway"){
                columns=[
                    ...obj.columns,
                    {
                        title: '操作',
                        width: 200,
                        render: (text, record) => (
                            <span className="table-btns">
                                <Button onClick={()=>this.onDeleteHandler(record._id)}>详情</Button>
                                <Button onClick={()=>this.onDeleteHandler(record._id)}>推送redis</Button>
                                <Button onClick={()=>this.onEditHandler(record._id)}>修改</Button>
                                <Button onClick={()=>this.onDeleteHandler(record._id)}>删除</Button>
                            </span>
                        )
                    }
                ]
            }
            else{
                columns=[
                    ...obj.columns,
                    {
                        title: '操作',
                        width: 200,
                        render: (text, record) => (
                            <span className="table-btns">
                                <Button onClick={()=>this.onEditHandler(record._id)}>修改</Button>
                                <Button onClick={()=>this.onDeleteHandler(record._id)}>删除</Button>
                            </span>
                        )
                    }
                ]
            }
            
            let state = {
                title: obj.title,
                bnAddTitle: obj.subTitle.add,
                columns: columns,
                urlApi: obj.urlApi.list.api,
                fetchType: obj.urlApi.list.type,
                loading: false,
                pagination: { pageSize: 10, current: 1 },
            }
                this.props.clearListData()
                this.setState(state, ()=>this.sendData(this.state.pagination))
            }
         
    }

    sendData(pagination = {}){
        let opt = {
            currentPage: pagination ? pagination.current : 1,
            pageSize: pagination ? pagination.pageSize : 10
        }, { urlApi, fetchType } = this.state
        this.props.getListData(urlApi, opt, fetchType).then(data=>{
            this.setState({
                loading: false,
                pagination: {
                    ...pagination,
                    current:　pagination.current || 0,
                    total: data.pageInfo.total
                }
            })
        }, ()=>{
            this.setState({
                loading: false
            })
        })
    }

    onPageChange(pagination) {
        // this.setState({pagination: pagination})
        this.sendData(pagination)
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

        Modal.confirm({
            title: "提示",
            content: "是否删除该记录？",
            onOk: ()=>{
                this.props.deleteListData(url, {}, type).then(()=>{
                    Modal.success({
                        title: '提示',
                        content: "删除成功！"
                    })
                })
            }
        })
    }

    render() {
        let { Content } = Layout
        let { title, bnAddTitle, loading, pagination, columns } = this.state
        return (
            <Content className="wapper_all">
                <div className="headers">
                    <h6 className="title">{title}</h6>
                    <Button className="headersButton" onClick={()=>this.onAddHandler()}>{bnAddTitle}</Button>
                </div>
                <Table className="oTable"
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
    listData: PropTypes.array.isRequired,
    pageTotal: PropTypes.number.isRequired
}

let mapStateToProps = state => ({
    listData: state.listReducer.listData,
    pageTotal: state.listReducer.pageTotal,
})

let mapDispatchToProps = (dispatch) => {
    return bindActionCreators({ getListData, deleteListData, clearListData }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(ListView)