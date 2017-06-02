import React, { PropTypes } from 'react'
import { Router, Route, IndexRoute, Link ,hashHistory} from 'react-router';
import { Layout, Table, Button, Modal ,Input,Select,TreeSelect} from 'antd'

import './index.scss' 
class Windows extends React.Component{
    // showoWindow
    render(){
        return (
             <div className="oWindow ">
                     <div className="oBg"></div>
                     <div className="sWindow">
                         <div className="headers"></div>
                         <div className="oContent">
                            
                         </div>
                         <div className="footer">
                            <Button type="primary" >确定</Button>
                            <Button >取消</Button>
                         </div>
                     </div>
                 </div>
        )
    }
}

export default Windows