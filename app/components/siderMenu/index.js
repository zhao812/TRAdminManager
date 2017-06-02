import React, { PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Router, Route, IndexRoute, Link ,hashHistory} from 'react-router';
import { Menu, Icon, Button } from 'antd'
import {getCurrent,getOpenKeys,getMenuData} from './reducer/action'
const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;
import './index.scss' 
let sub=[]
class SiderMenu extends React.Component{
    constructor(props,context) {
        super(props,context);
        this.state = {
            openKeys: []
        }
    }
    handleMenuClick(e){
        this.props.getCurrent(e.key)
    }
    componentDidMount(e){
        this.props.getMenuData()
    }
     setMenu(json){
        let _this=this;
        return json&&json.map((item,index)=>{
            item.url?item.url:'/';
            if(item.childrens && item.childrens.length > 0){
                sub.push('sub'+item._id)
                return(
                    <SubMenu key={'sub'+item._id} title={<span><Icon type="user" />{item.name}</span>}>
                        {_this.setMenu(item.childrens)}   
                    </SubMenu>
                )
            }else{
                if(item.url){
                    return(<Menu.Item key={item._id}><Link to={item.url}>{item.name}</Link></Menu.Item>);
                }else{
                    return(<Menu.Item key={item._id}>{item.name}</Menu.Item>);
                }
            }
        });
    }
    render(){
        const {data} =this.props;
        const {openTitle} = this.state;
        return (
             <Menu
                style={{width:280,flex:'0 0 280px'}} 
                defaultOpenKeys={sub}
                className="silder"
                mode="inline" >
                 {this.setMenu(data)}
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