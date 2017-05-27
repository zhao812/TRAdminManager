import React, { PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Layout, Table, Button, Modal ,Input} from 'antd'

import {menuManage,addMenu,changName,oEditor,oDelete} from './reducer/action'

import './index.scss'
const confirm = Modal.confirm;
class MenuManager extends React.Component {
    constructor(props) {
    super(props)
    this.state = {
           showWindow:0,
           type:'add',
           columns : [
               {title: '编号 ',dataIndex: '_id',key: '_id'},
               {title: '菜单名称',dataIndex: 'name',key: 'name'},
               {title: 'prevId',dataIndex: 'prevId',key: 'prevId'},
               {title: '菜单链接',dataIndex: 'url',key: 'url'},
               {title: '创建者',dataIndex: 'createBy',key: 'createBy'},
               {title: '创建时间',dataIndex: 'createTime',key: 'createTime'},
               {title: '状态',dataIndex: 'status',key: 'status'},
               {title: '更新者',dataIndex: 'upBy',key: 'upBy'},
               {title: '修改时间',dataIndex: 'upTime',key: 'upTime'},
               {title: '操作',render:(text,record,index)=>{
                   return(
                       <div>
                            <Button onClick={this.handlerEdit.bind(this,[text])}>编辑</Button>
                            <Button onClick={this.handlerDelete.bind(this,[text])}>删除</Button>
                       </div>
                   )
               }}
            ]
        }
    }
    handlerEdit(text){
        this.setState({
            showWindow:1,
            type:'modfied',
            menuname:text[0].name,
            menuurl:text[0].url,
            id:text[0]._id
        })
    }
    handlerDelete(text){
        const _this=this;
        confirm({
            title: '确认是否删除'+text[0].name,
            onOk() {
                 _this.props.oDelete(text[0]._id).then(
                    Modal.success({
                            title: '删除成功',
                            onOk:function(){
                                _this.props.menuManage()
                            }
                        })
                )
            },
        });
    }
    componentDidMount() {
        this.props.menuManage()
    }

    handlerNew(e){
        this.setState({
            showWindow:1,
            type:'add',
            name:''
        })
    }

    handlerNewMenu(e){
        const {type,name,url,id,menuname,menuurl,prevId,menuprevId} = this.state;
        this.setState({
            showWindow:0
        })
        
        const _this=this;
        type=="add"?
        this.props.addMenu(name,url,prevId).then(
        //    Modal.success({
        //         title: '添加成功',
        //         onOk:function(){
        //             _this.props.menuManage()
        //         }
        //     })
       ):
       this.props.oEditor(id,menuname,menuurl,menuprevId).then(
        //    Modal.success({
        //         title: '修改成功',
        //         onOk:function(){
        //             _this.props.menuManage()
        //         }
        //     })
       )
    }
    handlerCancel(e){
        this.setState({
            showWindow:0
        })
    }

    addMenuName(msg,e){
        const {type} =this.state;
        if(type=='add'){
            // this.setState({
            //     name:e.target.value
            // })
            let state={};
            state[msg]=e.currentTarget.value;
            this.setState(state);
        }else{
            // this.setState({
            //     menuName:e.target.value
            // })
            let state={};
            state["menu"+msg]=e.target.value;
            this.setState(state);
        }
            
    }
    render() {
        const {showWindow ,type,menuname,name,url,menuurl,prevId,menuprevId} =this.state;
        console.log(this.state)
        return (
            <div className="wapper_all">
                 <div className={showWindow==0?"oWindow":"oWindow showoWindow"}>
                     <div className="oBg"></div>
                     <div className="sWindow">
                         <div className="headers">{type=="add"?"新建菜单":"修改菜单"}</div>
                         <div className="oContent">
                             <div className="oLabel">
                                 <span>菜单名称</span><Input onChange={this.addMenuName.bind(this,['name'])} value={type=='add'?name:menuname}/>
                             </div>
                             <div className="oLabel">
                                 <span>菜单链接</span><Input onChange={this.addMenuName.bind(this,['url'])} value={type=='add'?url:menuurl}/>
                             </div>
                             <div className="oLabel">
                                 <span>prevId</span><Input onChange={this.addMenuName.bind(this,['prevId'])} value={type=='add'?prevId:menuprevId}/>
                             </div>
                         </div>
                         <div className="footer">
                            <Button type="primary" onClick={this.handlerNewMenu.bind(this)}>确定</Button>
                            <Button onClick={this.handlerCancel.bind(this)}>取消</Button>
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
    data: state.MenuReduice.data
})

let mapDispatchToProps = (dispatch) => {
    return bindActionCreators({ menuManage,addMenu ,oEditor,oDelete}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(MenuManager)