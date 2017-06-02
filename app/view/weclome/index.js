import React from 'react';
import { Carousel } from 'antd';
import { Router, Route, IndexRoute, Link ,hashHistory} from 'react-router';
import * as RouterConst from '../../static/const/routerConst'
import './index.scss';
class Weclome extends React.Component {
    handlerRun(){
        setTimeout(function(){
            hashHistory.push(RouterConst.ROUTER_LIST + "/user")
        },3000)
        
    }
    render() {
        {this.handlerRun()}
        return (
                <div className="weclome">
                    <h6>Weclome</h6>
                </div>
        );
    }
}

export default Weclome