import React, { PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Layout, Table, Button, Modal ,Input,Select,TreeSelect} from 'antd'

import {addMenu,changName,oEditor,oDelete,getRole,getPrevData,menuManage,handlerLoading} from './reducer/action'
import {getMenuData} from '../../components/siderMenu/reducer/action'

import './index.scss'
const { Option } = Select;
const TreeNode = TreeSelect.TreeNode;
const confirm = Modal.confirm;
class MenuManager extends React.Component {
    constructor(props) {
    super(props)
    this.state = {
           showWindow:0,
           type:'add',
           columns : [
               {title: '编号 ',dataIndex: 'key'},
               {title: '菜单名称',dataIndex: 'name'},
               {title: '菜单链接',dataIndex: 'url'},
               {title: '排序',dataIndex: 'sort'},
            //    {title: '创建者',dataIndex: 'createBy',key: 'createBy'},
               {title: '创建时间',dataIndex: 'createTime'},
               {title: '状态',dataIndex: 'status'},
            //    {title: '更新者',dataIndex: 'upBy',key: 'upBy'},
               {title: '修改时间',dataIndex: 'upTime'},
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
        console.log(text[0])
        this.setState({
            showWindow:1,
            type:'modfied',
            menuname:text[0].name,
            menuurl:text[0].url,
            menusort:text[0].sort,
            id:text[0]._id,
            menuprevId:text[0].prevId,
            menurole:text[0].permissions
        })
    }
    handlerDelete(text){
        const _this = this;
        confirm({
            title: '确认是否删除'+text[0].name,
            onOk() {
                 _this.props.oDelete(text[0]._id).then(
                    Modal.success({
                            title: '删除成功',
                            onOk:function(){
                                _this.props.menuManage();
                                _this.props.getMenuData();
                                
                            }
                        })
                )
            },
        });
    }
    componentDidMount() {
        this.props.menuManage({ pageSize: 10, currentPage: 1}).then(
            (data) => {
                const pagination = { ...this.state.pagination };
                pagination.total = data.pageInfo.total;
                this.setState({
                    data: data.results,
                    pagination,
                });
            }
        );
        this.props.getRole();
        this.props.getPrevData();
    }
    

    handlerNew(e){
        this.setState({
            showWindow:1,
            type:'add',
            name:'',
            url:'',
            sort: 100,
            prevId:'',
            role:[]
        })
    }

    handlerNewMenu(e){
        const {type,name,url,id,menuname,menuurl,prevId,menuprevId,role,menurole, sort, menusort,pagination} = this.state;
       
        let msg;
        if(type==="add"){
            if(!name){
                msg="菜单名称不能为空"
            }
            msg&&Modal.error({title:msg})
            !msg&&this.props.addMenu(name,url,prevId,role, sort).then(
                ()=>this.props.menuManage({ pageSize: 10, currentPage:pagination.current  })
            ).then(()=>this.props.getMenuData())
        }else{
            if(!menuname){
                msg="菜单名称不能为空"
            }
            msg&&Modal.error({title:msg})
            !msg&&this.props.oEditor(id,menuname,menuurl,menuprevId,menurole, menusort).
            then(this.props.menuManage({ pageSize: 10, currentPage: pagination.current }))
            .then(()=>this.props.getMenuData())
        }
        !msg&& this.setState({
            showWindow:0
        })
    }
    handlerCancel(e){
        this.setState({
            showWindow:0
        })
    }

    handlerChange(msg,e){
        const {type} =this.state;
        if(type==='add'){
            let state={};
            state[msg]=e.currentTarget.value;
            this.setState(state);
        }else{
            let state={};
            state["menu"+msg]=e.target.value;
            this.setState(state);
        }
            
    }
    handlerChanges(msg,e){
        const {type} =this.state;
        if(type==='add'){
            let state={};
            state[msg]=e;
            this.setState(state);
        }else{
            let state={};
            state["menu"+msg]=e;
            this.setState(state);
        }
    }
    onChange = (value) => {
        console.log(arguments);
        this.setState({ value });
    }
    setMenu(json){
        return json&&json.map((item,index)=>{
            if(item.childrens && item.childrens.length > 0){
                return (
                    <TreeNode value={item._id} title={item.name} key={item._id}>
                        {this.setMenu(item.childrens)}    
                    </TreeNode>
                )
            }else{
                return <TreeNode value={item._id} title={item.name} key={item._id}></TreeNode>
            }
        });
    }
     handleTableChange = (pagination, filters, sorter) => {
        const pager = { ...this.state.pagination };
        pager.current = pagination.current;
        this.setState({
          pagination: pager,
        });
        this.props.handlerLoading(true);
        this.props.menuManage( { pageSize: 10, currentPage: pager.current })
    }
    render() {
        const {showWindow ,type,menuname,name,url,menuurl,sort, menusort, prevId,menuprevId,role,menurole} =this.state;
        const {rule,prevData,data}=this.props;
        const children = [];
        rule&&rule.map((item,index)=> {
            children.push(<Option value={item._id} key={index+""+index}>{item.name}</Option>);
        });
        return (
            <div className="wapper_all">
                 <div className={showWindow===0?"oWindow":"oWindow showoWindow"}>
                     <div className="oBg"></div>
                     <div className="sWindow">
                         <div className="headers">{type==="add"?"新建菜单":"修改菜单"}</div>
                         <div className="oContent">
                             <div className="oLabel">
                                 <span>菜单名称</span><Input onChange={this.handlerChange.bind(this,['name'])} value={type=='add'?name:menuname}/>
                             </div>
                             <div className="oLabel">
                                 <span>菜单链接</span><Input onChange={this.handlerChange.bind(this,['url'])} value={type=='add'?url:menuurl}/>
                             </div>
                             <div className="oLabel">
                                 <span>上级菜单</span>
                                  <TreeSelect
                                   allowClear
                                   treeDefaultExpandAll  
                                   dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
                                   style={{ width: 200 }} value={type==='add'?prevId:menuprevId}  
                                    onChange={this.handlerChanges.bind(this,['prevId'])}>
                                        {this.setMenu(prevData)}
                                  </TreeSelect>
                             </div>
                             
                             <div className="oLabel">
                                 <span>用户权限</span>
                                 <Select mode="multiple"  
                                        onChange={this.handlerChanges.bind(this,['role'])} 
                                        style={{width:200}} value={type==='add'?role:menurole} >
                                    {children}
                                 </Select>
                             </div>
                             <div className="oLabel">
                                 <span>排序</span><Input type="number" onChange={this.handlerChange.bind(this, ['sort'])} value={type=='add'?sort:menusort}/>
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
                 <Table className="oTable"
                  dataSource={data.result} 
                  loading={this.props.loading}
                  columns={this.state.columns} 
                  pagination={this.state.pagination}
                  onChange={this.handleTableChange}
                  /> 
            </div>
        )
    }

}

MenuManager.PropTypes = {
}

let mapStateToProps = state => ({
    data: state.MenuReduice.data,
    rule: state.MenuReduice.rule,
    loading: state.MenuReduice.loading,
    prevData: state.MenuReduice.prevData
})

let mapDispatchToProps = (dispatch) => {
    return bindActionCreators({ addMenu ,oEditor,oDelete,getRole,getPrevData,menuManage,getMenuData,handlerLoading}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(MenuManager)