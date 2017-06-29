import React, { PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { hashHistory } from 'react-router'
import { checkLogin } from '../login/reducer/action'

import './index.scss'

class App extends React.Component {


    render() {
        return (
            <div >
                11111
            </div>
        );
    }
}


App.PropTypes = {
}


let mapStateToProps = state => ({
})

let mapDispatchToProps = (dispatch) => {
    return bindActionCreators({ checkLogin }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(App)