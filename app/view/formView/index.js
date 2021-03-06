/**
 * created by zhao at 2017/5/26
 */
import React, { PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { hashHistory } from 'react-router'
import { Layout, Input, Button, Select, TreeSelect, Modal, Cascader, Switch  } from 'antd'

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
        console.log(this.props.params,1878)
        let { action, table, id } = this.props.params, obj = ListConst.tableList[table]
        let listData, data = obj[action]
        if(id){
            listData = this.props.getListDataById(id)
        }
        if(listData){
            data = data.map(obj=>{
                let temp, value
                if(Array.isArray(obj.key)){
                    value = []
                    for(let i =0; i<obj.key.length; i++){
                        let d = this.getValueByKey(obj.key[i], listData)
                        if(Array.isArray(d)){
                            value = value.concat(d)
                        }else{
                            value.push(d)
                        }
                    }
                }else{
                    value = this.getValueByKey(obj.key, listData)
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

    getValueByKey(key, itemData){
        let temp = key.split("."), value
        if(temp.length > 1 && itemData[temp[0]]){
            let d = itemData[temp[0]]
            if(Array.isArray(d)){
                value = d.map(c => c[temp[1]] ||　"")
            }else{
                value = d[temp[1]] || ""
            }
        }else{
            value = itemData[key] || ""
        }
        return value
    }

    onInputChangeHandler(e, id){
        let value = e.currentTarget.value.replace(/\s/g,'')
        this.setChangeValue(value, id)
    }

    onSelectChangeHandler(value, id){
        this.setChangeValue(value, id)
    }
    handlerSwitchChange(value, id){
        this.setChangeValue(value, id)
    }
    setChangeValue(value, id){
        let data = this.state.data.map(obj => {
            if(obj.id == id){
                if(obj.type == "number") {
                    value = parseInt(value)
                }
                return {
                    ...obj,
                    value: value
                }
            }
            else{
                return obj
            }
        })
        this.setState({data: data})
    }

    getAttributesDiv(){
        return this.state.data.map((obj, key) => {
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
            case "number":
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
            case "tree-select-multiple":
                let treeData = this.getTreeSelectData(this.props.parentData[obj.id] || [])
                return (
                    <TreeSelect treeData={treeData} mode="multiple" treeCheckable={true} searchPlaceholder={obj.placeholder} value={obj.value || []} onChange={(value, label, extra)=>this.onSelectChangeHandler(value, obj.id)} />
                )
            case "cascader":
                let opt = this.getCascaderOptions(this.props.parentData[obj.id] || [])
                return (
                    <Cascader options={opt}  placeholder={obj.placeholder} value={obj.value || []} onChange={(e)=>this.onSelectChangeHandler(e, obj.id)} />
                )
            case "switch":
                return (
                    <Switch onChange={(e)=>this.handlerSwitchChange(e,obj.id)} defaultChecked={obj.value ||false} />
                )
            case "ilabel":
                let value;
                if (obj.value==true) {
                    value="是"
                }else if (obj.value==false) {
                    value="否"
                }
                return (
                    <span>{value}</span>
                )
            case "label":
                return (
                    <span>{obj.value}</span>
                )
            default:
                return ""
        }
    }

    getTreeSelectData(arr){
        return arr.map((obj, index) => {
            let child = obj.departments || []
            let state = {
                value: obj._id,
                label: obj.name,
                key:  obj._id,
            }
            if (child.length > 0) {
                state.children = this.getTreeSelectData(child)
            }         
            return state
        })
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

    getBranchNameByValue(data, ids){
        for(let i=0; i<data.length; i++){
            let obj = data[i]
            if(ids.indexOf(obj._id) >= 0) return obj.name
            if(obj.departments){
                let res = this.getBranchNameByValue(obj.departments, ids)
                if(res) return obj.name
            }
        }
        return null
    }

    getDepartmentNameByValue(data, ids){
        for(let i=0; i<data.length; i++){
            let obj = data[i]
            if(obj.departments){
                let res = obj.departments.find(d => ids.indexOf(d._id)>=0)
                if(res) return res.name
            }
        }
        return ""
    }

    getSendData(){
        let result = {message: "", data: {}}, {data} = this.state
        for(let i=0; i<data.length; i++){
            let obj = data[i]
            if(obj.isRequired){
                if(obj.value == ""&&obj.type!="switch"){
                    result.message = obj.title + "不能为空！"
                    return result
                }else if(obj.minLength && obj.value.length<obj.minLength){
                    result.message = obj.title + "最少" + obj.minLength + "个字符"
                    return result
                }
            }
            if(this.props.params.table=="user" && obj.id == "departments"){
                let depData = this.props.parentData[obj.id]
                result.data["branchName"] = this.getBranchNameByValue(depData, obj.value)
                result.data["departmentName"] = this.getDepartmentNameByValue(depData, obj.value)
            }

            result.data[obj.id] = obj.value;
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
                if(this.props.params.table=="gateway"){
                    console.log(this.props.params)
                    urlApi = urlApi+"/"+this.props.params.id;
                }
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
        console.log(this.state,19999)
        return(
            <Content >
                <div className="wapper_all">
                    <div className="headers"><h6>{this.state.title}</h6></div>
                    <div className="oTable">
                        {this.getAttributesDiv()}
                    </div>
                    <div className="oTable ml100">
                        {this.props.params.action=="see"?
                             <Button onClick={()=>this.onClickHandler()}>返回</Button>:
                             
                            <div>
                                <Button onClick={()=>this.onClickHandler(true)} type="primary">确定</Button>
                                 <Button onClick={()=>this.onClickHandler()}>取消</Button>
                            </div>
                        }
                        
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