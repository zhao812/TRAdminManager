import React, { PropTypes } from 'react'
import { Select } from 'antd'


class SelectGroup extends React.Component{
    constructor(props, context){
        super(props, context)
        this.state = {
            value: []
        }
    }

    componentDidMount(){

    }

    getOptionList(options, data){
        return data.map()
        this.props.data.map((obj, index) => {
        })
        if(options.length == 0) return this.props.data
    }

    getSelectOption(index, obj){
        let list 
        if(index == 0){
            list = this.props.data
        }else{
            list = this.props.data
        }
    }

    onSelectChangeHandler(e){

    }

    render(){
        return (
            <div>
                {
                    this.props.list.map((item, key) => {
                        return (
                            <div key={key} className="form-item">
                                <div className="form-item-title">{item.title}</div>
                                <Select placeholder={item.placeholder} value={item.value || ""} onChange={(e)=>this.onSelectChangeHandler(e, item.id)}>
                                    { this.getSelectOption(key, item) }
                                </Select>
                                <span className="form-item-tip">{item.isRequired ? "(必填)" : ""}</span>
                            </div>
                        )
                    })
                }
            </div>
        )
    }

}

SelectGroup.PropTypes = {
    id: PropTypes.string.isRequired,
    list: PropTypes.array.isRequired,
    data: PropTypes.array.isRequired,
}

export default SelectGroup