import React, { PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Router, Route, IndexRoute, Link ,hashHistory} from 'react-router';
import { Menu, Icon, Button } from 'antd'
import {getCurrent,getOpenKeys,getMenuData} from './reducer/action'
const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;
import './index.scss' 

class SiderMenu extends React.Component{
    constructor(props,context) {
        super(props,context);
        this.state = {
            openKeys: ['sub0']
            
        }
    }
    handleMenuClick(e){
        this.props.getCurrent(e.key)
    }
    componentDidMount(e){
        this.props.getMenuData()
        this.props.getCurrent('a0')
        this.props.getOpenKeys(this.props.openKeys)
    }
    onOpenChange(openKeys){
        const state = this.props;
        const latestOpenKey = openKeys.find(key => !(state.openKeys.indexOf(key) > -1));
        const latestCloseKey = state.openKeys.find(key => !(openKeys.indexOf(key) > -1));
        let nextOpenKeys = [];
        if (latestOpenKey) {
        nextOpenKeys = this.getAncestorKeys(latestOpenKey).concat(latestOpenKey);
        }
        // if (latestCloseKey) {
        // nextOpenKeys = this.getAncestorKeys(latestCloseKey);
    //}
        
        this.props.getOpenKeys(nextOpenKeys)
    }
    
    getAncestorKeys = (key) => {
        return  [];
    }
     setMenu(json){
        let menus = []
        let _this=this;
        json.map((item,index)=>{
        item.url?item.url:'/';
        if(item.childrens && item.childrens.length > 0){
            menus.push(
            <SubMenu key={'sub'+item._id} title={<span><Icon type="user" />{item.name}</span>}>
                {_this.setMenu(item.childrens)}   
            </SubMenu>
            )
        }else{
            if(item.url){
            menus.push(<Menu.Item key={item._id}><Link to={item.url}>{item.name}</Link></Menu.Item>);
            }else{
            menus.push(<Menu.Item key={item._id}>{item.name}</Menu.Item>);
            }
        }
        });
        return menus
    }
    render(){
        //const {data} =this.props;
        let json = {
            "code": 0,
            "message": "success",
            "result": [
                {
                    "_id": "59294a96d841d42dfe238036",
                    "name": "菜单99",
                    "url": "jddkdk",
                    "createBy": "------",
                    "upBy": "000000000",
                    "__v": 0,
                    "isDel": 0,
                    "upTime": "2017-05-27T10:29:56.462Z",
                    "createTime": "2017-05-27T08:35:06.497Z",
                    "status": 0,
                    "permissions": [
                        "591d605e57079155139b722d",
                        "591d66451f6d8c56bbbc9143"
                    ]
                },
                {
                    "_id": "592935699ff7ed2949d73ded",
                    "name": "菜单5",
                    "url": "djdddjj",
                    "createBy": "------",
                    "upBy": "000000000",
                    "__v": 0,
                    "isDel": 0,
                    "upTime": "2017-05-27T08:11:54.744Z",
                    "createTime": "2017-05-27T08:11:54.743Z",
                    "status": 0,
                    "permissions": [],
                    "childrens": [
                        {
                            "_id": "592935a29ff7ed2949d73dee",
                            "name": "菜单5-1",
                            "url": "多大的",
                            "createBy": "------",
                            "upBy": "000000000",
                            "__v": 0,
                            "prevId": "592935699ff7ed2949d73ded",
                            "isDel": 0,
                            "upTime": "2017-05-27T10:04:45.095Z",
                            "createTime": "2017-05-27T08:11:54.743Z",
                            "status": 0,
                            "permissions": [
                                "591d66451f6d8c56bbbc9143"
                            ]
                        }
                    ]
                },
                {
                    "_id": "5929246e7fa7861bfaca5394",
                    "name": "菜单3",
                    "url": "但看到的苦苦等待看得开",
                    "createBy": "------",
                    "upBy": "000000000",
                    "__v": 0,
                    "isDel": 0,
                    "upTime": "2017-05-27T06:58:32.253Z",
                    "createTime": "2017-05-27T06:58:32.253Z",
                    "status": 0,
                    "permissions": [
                        "591d605e57079155139b722d"
                    ],
                    "childrens": [
                        {
                            "_id": "592924a3ef03a81cd1dcaa00",
                            "name": "菜单3-2",
                            "url": "yyyyy",
                            "createBy": "------",
                            "upBy": "000000000",
                            "__v": 0,
                            "prevId": "5929246e7fa7861bfaca5394",
                            "isDel": 0,
                            "upTime": "2017-05-27T07:03:11.831Z",
                            "createTime": "2017-05-27T07:02:50.691Z",
                            "status": 0,
                            "permissions": [
                                "591d605e57079155139b722d"
                            ],
                            "childrens": [
                                {
                                    "_id": "59292515ef03a81cd1dcaa02",
                                    "name": "菜单3-2-2",
                                    "url": "33333333",
                                    "createBy": "------",
                                    "upBy": "000000000",
                                    "__v": 0,
                                    "prevId": "592924a3ef03a81cd1dcaa00",
                                    "isDel": 0,
                                    "upTime": "2017-05-27T10:04:51.572Z",
                                    "createTime": "2017-05-27T07:02:50.691Z",
                                    "status": 0,
                                    "permissions": [
                                        "591d605e57079155139b722d"
                                    ],
                                    "childrens": [
                                        {
                                            "_id": "59294daa069ec43443b74237",
                                            "name": "菜单3-2-2-1",
                                            "url": "333333",
                                            "createBy": "------",
                                            "upBy": "000000000",
                                            "__v": 0,
                                            "prevId": "59292515ef03a81cd1dcaa02",
                                            "isDel": 0,
                                            "upTime": "2017-05-27T10:29:59.072Z",
                                            "createTime": "2017-05-27T09:52:34.593Z",
                                            "status": 0,
                                            "permissions": [
                                                "591d605e57079155139b722d",
                                                "591d66491f6d8c56bbbc9144",
                                                "591d66451f6d8c56bbbc9143"
                                            ]
                                        }
                                    ]
                                },
                                {
                                    "_id": "592924c5ef03a81cd1dcaa01",
                                    "name": "菜单3-2-1",
                                    "url": "ddddddddddd",
                                    "createBy": "------",
                                    "upBy": "000000000",
                                    "__v": 0,
                                    "prevId": "592924a3ef03a81cd1dcaa00",
                                    "isDel": 0,
                                    "upTime": "2017-05-27T07:04:00.246Z",
                                    "createTime": "2017-05-27T07:02:50.691Z",
                                    "status": 0,
                                    "permissions": [
                                        "591d605e57079155139b722d"
                                    ]
                                }
                            ]
                        },
                        {
                            "_id": "592924847fa7861bfaca5396",
                            "name": "菜单3-1",
                            "url": "3333333333",
                            "createBy": "------",
                            "upBy": "000000000",
                            "__v": 0,
                            "prevId": "5929246e7fa7861bfaca5394",
                            "isDel": 0,
                            "upTime": "2017-05-27T07:02:36.198Z",
                            "createTime": "2017-05-27T06:58:32.253Z",
                            "status": 0,
                            "permissions": [
                                "591d605e57079155139b722d"
                            ]
                        }
                    ]
                },
                {
                    "_id": "5929243b7fa7861bfaca5392",
                    "name": "菜单2",
                    "url": "dddddddddddd",
                    "createBy": "------",
                    "upBy": "000000000",
                    "__v": 0,
                    "isDel": 0,
                    "upTime": "2017-05-27T06:58:32.253Z",
                    "createTime": "2017-05-27T06:58:32.253Z",
                    "status": 0,
                    "permissions": [
                        "591d605e57079155139b722d"
                    ],
                    "childrens": [
                        {
                            "_id": "5929244b7fa7861bfaca5393",
                            "name": "菜单2-1",
                            "url": "44444444444",
                            "createBy": "------",
                            "upBy": "000000000",
                            "__v": 0,
                            "prevId": "5929243b7fa7861bfaca5392",
                            "isDel": 0,
                            "upTime": "2017-05-27T07:01:39.900Z",
                            "createTime": "2017-05-27T06:58:32.253Z",
                            "status": 0,
                            "permissions": [
                                "591d605e57079155139b722d"
                            ]
                        }
                    ]
                },
                {
                    "_id": "592923dc7fa7861bfaca538e",
                    "name": "菜单1",
                    "url": "11111111111",
                    "createBy": "------",
                    "upBy": "000000000",
                    "__v": 0,
                    "isDel": 0,
                    "upTime": "2017-05-27T06:58:32.253Z",
                    "createTime": "2017-05-27T06:58:32.253Z",
                    "status": 0,
                    "permissions": [
                        "591d605e57079155139b722d"
                    ],
                    "childrens": [
                        {
                            "_id": "592924037fa7861bfaca5390",
                            "name": "菜单1-2",
                            "prevId": "592923dc7fa7861bfaca538e",
                            "createBy": "------",
                            "upBy": "000000000",
                            "__v": 0,
                            "isDel": 0,
                            "upTime": "2017-05-27T06:58:32.253Z",
                            "createTime": "2017-05-27T06:58:32.253Z",
                            "status": 0,
                            "permissions": [
                                "591d605e57079155139b722d"
                            ],
                            "childrens": [
                                {
                                    "_id": "592924107fa7861bfaca5391",
                                    "name": "菜单1-2-1",
                                    "url": "dddddddddddd",
                                    "createBy": "------",
                                    "upBy": "000000000",
                                    "__v": 0,
                                    "prevId": "592924037fa7861bfaca5390",
                                    "isDel": 0,
                                    "upTime": "2017-05-27T07:00:39.290Z",
                                    "createTime": "2017-05-27T06:58:32.253Z",
                                    "status": 0,
                                    "permissions": [
                                        "591d605e57079155139b722d"
                                    ]
                                }
                            ]
                        },
                        {
                            "_id": "592923e57fa7861bfaca538f",
                            "name": "菜单1-1",
                            "url": "2222222",
                            "createBy": "------",
                            "upBy": "000000000",
                            "__v": 0,
                            "prevId": "592923dc7fa7861bfaca538e",
                            "isDel": 0,
                            "upTime": "2017-05-27T06:59:59.274Z",
                            "createTime": "2017-05-27T06:58:32.253Z",
                            "status": 0,
                            "permissions": [
                                "591d605e57079155139b722d"
                            ]
                        }
                    ]
                },
                {
                    "_id": "5929139de74ef10e8b46b6af",
                    "name": "用户组管理",
                    "url": "/list/usergroup",
                    "createBy": "------",
                    "upBy": "000000000",
                    "__v": 0,
                    "isDel": 0,
                    "upTime": "2017-05-27T06:57:27.521Z",
                    "createTime": "2017-05-27T05:47:24.755Z",
                    "status": 0,
                    "permissions": []
                },
                {
                    "_id": "5929136ce74ef10e8b46b6ae",
                    "name": "权限管理",
                    "url": "/list/permissions",
                    "createBy": "------",
                    "upBy": "000000000",
                    "__v": 0,
                    "isDel": 0,
                    "upTime": "2017-05-27T05:47:24.756Z",
                    "createTime": "2017-05-27T05:47:24.755Z",
                    "status": 0,
                    "permissions": []
                },
                {
                    "_id": "5929131de74ef10e8b46b6ad",
                    "name": "部门管理",
                    "url": "/list/department",
                    "createBy": "------",
                    "upBy": "000000000",
                    "__v": 0,
                    "isDel": 0,
                    "upTime": "2017-05-27T05:47:24.756Z",
                    "createTime": "2017-05-27T05:47:24.755Z",
                    "status": 0,
                    "permissions": []
                },
                {
                    "_id": "592912a139df480d9c70cc1c",
                    "name": "公司管理",
                    "url": "/list/branch",
                    "createBy": "------",
                    "upBy": "000000000",
                    "__v": 0,
                    "isDel": 0,
                    "upTime": "2017-05-27T05:43:41.536Z",
                    "createTime": "2017-05-27T05:43:41.536Z",
                    "status": 0,
                    "permissions": []
                },
                {
                    "_id": "5929125639df480d9c70cc1b",
                    "name": "角色管理",
                    "url": "/list/role",
                    "createBy": "------",
                    "upBy": "000000000",
                    "__v": 0,
                    "isDel": 0,
                    "upTime": "2017-05-27T05:43:41.536Z",
                    "createTime": "2017-05-27T05:43:41.536Z",
                    "status": 0,
                    "permissions": []
                },
                {
                    "_id": "592911738d8a6a0cd0562385",
                    "name": "菜单管理",
                    "url": "/menu",
                    "createBy": "------",
                    "upBy": "000000000",
                    "__v": 0,
                    "isDel": 0,
                    "upTime": "2017-05-27T05:40:32.595Z",
                    "createTime": "2017-05-27T05:40:32.595Z",
                    "status": 0,
                    "permissions": []
                },
                {
                    "_id": "5928f8a777939104eee619dd",
                    "name": "用户管理",
                    "url": "/list/user",
                    "createBy": "------",
                    "upBy": "000000000",
                    "__v": 0,
                    "isDel": 0,
                    "upTime": "2017-05-27T05:40:37.206Z",
                    "createTime": "2017-05-27T03:24:48.607Z",
                    "status": 0,
                    "permissions": []
                }
            ]
        }
        const {openTitle} = this.state;
        return (
             <Menu
                style={{width:280,flex:'0 0 280px'}} 
                openKeys={this.props.openKeys}
                onClick={(e)=>this.handleMenuClick(e)}
                onOpenChange={(e)=>this.onOpenChange(e)}
                className="silder"
                selectedKeys={[this.props.current]}
                defaultOpenKeys={openTitle}
                defaultSelectedKeys={[this.props.current]}
                mode="inline" >
                 {this.setMenu(json.result)}
            </Menu>
        )
    }
}


SiderMenu.propTypes = {
    data: PropTypes.array.isRequired
}

let mapStateToProps = state => ({
    current:state.sildermenuReduice.current,
    openKeys:state.sildermenuReduice.openKeys,
    data: state.sildermenuReduice.menuList
})

let mapDispatchToProps = (dispatch) => {
    return bindActionCreators({ SiderMenu,getCurrent,getOpenKeys, getMenuData }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(SiderMenu)