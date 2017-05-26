import React, { PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Layout, Table, Button, Modal ,Input} from 'antd'

import {menuManage,addMenu} from './reducer/action'
import './index.scss'

class MenuManager extends React.Component {
    constructor(props) {
    super(props)
    this.state = {
           showWindow:0,
           columns : [
               {title: '编号 ',dataIndex: '_id',key: '_id'},
               {title: '菜单名称',dataIndex: 'name',key: 'name'},
               {title: '创建者',dataIndex: 'createBy',key: 'createBy'},
               {title: '创建时间',dataIndex: 'createTime',key: 'createTime'},
               {title: '状态',dataIndex: 'status',key: 'status'},
               {title: '更新者',dataIndex: 'upBy',key: 'upBy'},
               {title: '修改时间',dataIndex: 'upTime',key: 'upTime'},
               {title: '操作',render:(text,record,index)=>{
                   return(
                       <div>
                            <Button>编辑</Button>
                            <Button>删除</Button>
                       </div>
                   )
               }}
            ]
        }
    }
    componentDidMount() {
        this.props.menuManage()
    }

    onClickHandler() {

    }

    handlerNew(e){
        this.setState({
            showWindow:1
        })
    }

    handlerNewMenu(e){
        this.props.addMenu({"name":this.state.name})
    }

    addMenuName(e){
        this.setState({
            name:e.target.value
        })
    }
    render() {
        const {showWindow } =this.state;
        return (
            <div className="wapper_all">
                 <div className={showWindow==0?"oWindow":"oWindow showoWindow"}>
                     <div className="oBg"></div>
                     <div className="sWindow">
                         <div className="headers">新建菜单</div>
                         <div className="oContent">
                             <div className="oLabel">
                                 <span>菜单名称</span><Input onChange={this.addMenuName.bind(this)}/>
                             </div>
                         </div>
                         <div className="footer">
                            <Button type="primary" onClick={this.handlerNewMenu.bind(this)}>确定</Button>
                            <Button>取消</Button>
                         </div>
                     </div>
                 </div>
                 <div className="headers"><h6 className="title">菜单管理</h6>
                     <Button className="headersButton" onClick={this.handlerNew.bind(this)}>新建菜单</Button>
                </div>
                 <Table className="oTable" dataSource={this.props.data} columns={this.state.columns} /> 
            </div>
        )
    }

}

MenuManager.PropTypes = {
}

let mapStateToProps = state => ({
    data: state.MenuReduice.data,
})

let mapDispatchToProps = (dispatch) => {
    return bindActionCreators({ menuManage,addMenu }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(MenuManager)