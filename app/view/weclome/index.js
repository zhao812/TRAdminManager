import React from 'react';
import { Carousel } from 'antd';
import { Router, Route, IndexRoute, Link ,hashHistory} from 'react-router';
import './index.scss';
class Weclome extends React.Component {
    handlerRun(){
        setTimeout(function(){
            hashHistory.push('/menu')
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