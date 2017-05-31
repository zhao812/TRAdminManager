/**
 * created by zhao at 2017/5/26
 */
import React, { PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { hashHistory } from 'react-router'
import { Layout, Input, Button, Select, Modal, Cascader } from 'antd'

import { sendFormData, getListDataById, getListParentData } from './reducer/action'

import * as RouterConst from '../../static/const/routerConst'
import * as ListConst from '../../static/const/listConst'

import './index.scss'

class FormView extends React.Component{

    constructor(props, context){
        super(props, context)

        this.state = {
            urlApi: "",
            fetchType: "",
            title: "",
            data: []
        }
    }

    componentDidMount(){
        let { action, table, id } = this.props.params, obj = ListConst.tableList[table]
        let listData, data = obj[action]
        if(id){
            listData = this.props.getListDataById(id)
        }
        if(listData){
            data = data.map(obj=>{
                let temp, value
                if(obj.type == "cascader"){
                    value = obj.key.map(t => listData[t] || "")
                }else{
                    temp = obj.key.split(".")
                    value = temp.length > 0 && listData[temp[0]] &&　listData[temp[0]][temp[1]] ? listData[temp[0]][temp[1]] : listData[obj.key]
                }
                return { ...obj, value: value} 
            })
        }
        
        this.setState({
            urlApi: obj.urlApi[action].api,
            fetchType: obj.urlApi[action].type,
            title: obj.subTitle[action], 
            data: data
        })

        let formApis = obj.urlApi["form"]
        for(let key in formApis){
            this.props.getListParentData(key, formApis[key].api, {}, formApis[key].type)
        }
    }

    onInputChangeHandler(e, id){
        let value = e.currentTarget.value.replace(/\s/g,'')
        this.setChangeValue(value, id)
    }

    onSelectChangeHandler(value, id){
        this.setChangeValue(value, id)
    }

    setChangeValue(value, id){
        let data = this.state.data.map(obj => {
            if(obj.id == id){
                return {
                    ...obj,
                    value: value
                }
            }else{
                return obj
            }
        })
        this.setState({data: data})
    }

    getAttributesDiv(){
        return this.state.data.map((obj, key) => {
            console.log(obj)
            return (
                <div key={key} className="form-item">
                    <div className="form-item-title">{obj.title}</div>
                    {this.getComponentByType(obj)}
                    <span className="form-item-tip">{obj.isRequired ? "(必填)" : ""}</span>
                </div>
            )
        })
    }

    getComponentByType(obj){
        switch(obj.type){
            case "textarea":
            case "password":
            case "text":
                return <Input type={obj.type} placeholder={obj.placeholder} value={obj.value || ""} maxLength={obj.maxLength} onChange={(e)=>this.onInputChangeHandler(e, obj.id)} />
            case "select":
                return (
                    <Select placeholder={obj.placeholder} value={obj.value || ""} onChange={(e)=>this.onSelectChangeHandler(e, obj.id)}>
                        {(this.props.parentData[obj.id] || []).map((d, index)=><Select.Option key={d._id}>{d.name}</Select.Option>)}
                    </Select>
                )
            case "select-multiple":
                return (
                    <Select mode="multiple" placeholder={obj.placeholder} value={obj.value || []} onChange={(e)=>this.onSelectChangeHandler(e, obj.id)}>
                        {(this.props.parentData[obj.id] || []).map((d, index)=><Select.Option key={d._id}>{d.name}</Select.Option>)}
                    </Select>
                )
            case "cascader":
                let d = this.props.parentData[obj.id] || []
                let opt = this.getCascaderOptions(d)
                return (
                    <Cascader options={opt}  placeholder={obj.placeholder} value={obj.value || []} onChange={(e)=>this.onSelectChangeHandler(e, obj.id)} />
                )
            default:
                return ""
        }
    }

    getCascaderOptions(array){
        return array.map(obj => {
            let child = obj.departments || []
            let state = {
                value: obj._id,
                label: obj.name
            }
            if (child.length > 0) {
                state.children = this.getCascaderOptions(child)
            }         
            return state
        })
    }

    getSendData(){
        let result = {message: "", data: {}}, {data} = this.state
        for(let i=0; i<data.length; i++){
            let obj = data[i]
            if(obj.isRequired){
                if(obj.value == ""){
                    result.message = obj.title + "不能为空！"
                    return result
                }else if(obj.minLength && obj.value.length<obj.minLength){
                    result.message = obj.title + "最少" + obj.minLength + "个字符"
                    return result
                }
            }
            if(obj.type == "cascader"){
                obj.key.map((k, index)=>result.data[k] = obj.value[index] || '')
            }else{
                result.data[obj.id] = obj.value;
            }
        }
        return result
    }

    onClickHandler(type){
        if(type){
            let data = this.getSendData()
            if(data.message){
                Modal.error({
                    title: '提示',
                    content: data.message
                })
                return
            }
            let {urlApi, fetchType} = this.state, tip = "创建成功！"
            if(this.props.params.action == "edit"){
                data.data._id = this.props.params.id
                tip = "修改成功！"
            }
            this.props.sendFormData(urlApi, data.data, fetchType).then(data=>{
                Modal.success({
                    title: '提示',
                    content: tip,
                    onOk: ()=>{ hashHistory.goBack() }
                })
            })
        }else{
            hashHistory.goBack()
        }
    }

    render(){
        let { Content } = Layout

        return(
            <Content >
                <div className="wapper_all">
                    <div className="headers"><h6>{this.state.title}</h6></div>
                    <div className="oTable">
                        {this.getAttributesDiv()}
                    </div>
                    <div className="oTable ml100">
                        <Button onClick={()=>this.onClickHandler(true)} type="primary">确定</Button>
                        <Button onClick={()=>this.onClickHandler()}>取消</Button>
                    </div>
                </div>
            </Content>
        )
    }
}

FormView.PropTypes = {
    parentData: PropTypes.object.isRequired
}

let mapStateToProps = state => ({
    parentData: state.formReducer.parentData
})

let mapDispatchToProps = (dispatch) => {
    return bindActionCreators({ sendFormData, getListDataById, getListParentData }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(FormView)