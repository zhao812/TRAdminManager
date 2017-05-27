import React, { PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Layout, Table, Button, Modal } from 'antd'
import {authority} from './reducer/action'
import './index.scss'

class Authority extends React.Component {
    constructor(props) {
    super(props)
    this.state = {
           columns : [
               {title: '编号 ',dataIndex: '_id',key: '_id'},
               {title: '权限名称',dataIndex: 'name',key: 'name'},
               {title: '状态',dataIndex: 'status',key: 'status'},
               {title: '创建者',dataIndex: 'createBy',key: 'createBy'},
               {title: '创建时间',dataIndex: 'creatTime',key: 'creatTime'},
               {title: '修改者',dataIndex: 'upBy',key: 'upBy'},
               {title: '修改时间',dataIndex: 'upTime',key: 'upTime'},
               {title: '操作',render:(text,record,index)=>{
                   return(
                       <div>
                            <Button>修改</Button>
                            <Button>删除</Button>
                       </div>
                   )
               }}
            ],
            dataSource:[]
        }
    }
    componentDidMount() {
        this.props.authority()
    }

    onClickHandler() {

    }

    handlerClickNew(){
        
    }
   

    render() {
        const dataSource = [
            {
                id: '1',
                name: '胡彦斌',
            },
            {
                id: '2',
                name: '胡彦斌',
            },
            {
                id: '3',
                name: '胡彦斌',
            },
            {
                id: '4',
                name: '胡彦斌',
            },
            {
                id: '5',
                name: '胡彦斌',
            }
        ];

        return (
            <div className="wapper_all">
                 <div className="window">
                     <div className="iBg"></div>
                     <div className="oW"></div>
                 </div>
                 <div className="headers"><h6 className="title">权限管理</h6><Button className="headersButton" onClick={this.handlerClickNew.bind(this)}>新建权限</Button></div>
                 <Table className="oTable" dataSource={this.props.data} columns={this.state.columns} /> 
            </div>
        )
    }

}

Authority.PropTypes = {
}

let mapStateToProps = state => ({
    data: state.authorityReduice.data,
})

let mapDispatchToProps = (dispatch) => {
    return bindActionCreators({ authority }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Authority)