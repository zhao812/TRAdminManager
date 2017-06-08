import * as Fetches from '../../../utils'
import * as ActionTypes from './ActionTypes'

const getMenuData = data => ({
    type : ActionTypes.Get_Menu_Data,
    data : {
        ...data,
        result: data.result.map((obj, index)=>({
            ...obj,
            key: index+1
        }))
    }
})
export const menuManage = (data) => dispatch => {
    return new Promise((resolve, reject) => {
        let url = "/api/sys/db/menu/findByPage";
        dispatch(Fetches.sendMsg(url, data, 'GET')).then(data =>{
            dispatch(getMenuData(data))
            resolve&&resolve(data)
        }, reject)
    })
}
export const addMenu = (name,iurl,prevId,role, sort) => dispatch => {
    let url = "/api/sys/db/menu/add";
    let ops={"name":name,"url":iurl,"prevId":prevId||null,"permissions":role, "sort": sort};
    return dispatch(Fetches.sendMsg(url, ops,'POST'))
}
export const oEditor = (id,name,iurl,prevId,role, sort) => dispatch => {
    let url = "/api/sys/db/menu/up";
    let ops={"_id":id,"name":name,"url":iurl,"prevId":prevId||null,"permissions":role, "sort": sort}
    return dispatch(Fetches.sendMsg(url, ops,'PUT'))
}
export const oDelete = (id) => dispatch => {
    let url = "/api/sys/db/menu/"+id;
    return dispatch(Fetches.sendMsg(url,{},'DELETE'))
}


const roleData = data => ({
    type : ActionTypes.RoleData,
    data : data
})
export const getRole = () => dispatch => {
    let url = "/api/sys/db/permissions/find";
    return dispatch(Fetches.sendMsg(url,{},'GET')).then((data)=>dispatch(roleData(data)))
}

const prevData = data => ({
    type : ActionTypes.PrevData,
    data : data
})
export const getPrevData = () => dispatch => {
    let url = "/api/sys/v1/menu/find";
    return dispatch(Fetches.sendMsg(url,{},'GET')).then((data)=>dispatch(prevData(data)))
}


export const handlerLoading = (loading) => dispatch => {
    dispatch({
        type:ActionTypes.Is_Loading,
        loading:loading
    })
}


export const handlerisShow = (isShow) => dispatch => {
    dispatch({
        type:ActionTypes.Is_Show,
        isShow:isShow
    })
}
