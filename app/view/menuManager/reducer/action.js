import * as Fetches from '../../../utils'
import * as ActionTypes from './ActionTypes'
const getMenuData = data => ({
    type : ActionTypes.Get_Menu_Data,
    data : data
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
export const addMenu = (name,iurl,prevId,role) => dispatch => {
    let url = "/api/sys/db/menu/add";
    let ops={"name":name,"url":iurl,"prevId":prevId||null,"permissions":role};
    return dispatch(Fetches.sendMsg(url, ops,'POST'))
}
export const oEditor = (id,name,iurl,prevId,role) => dispatch => {
    let url = "/api/sys/db/menu/up";
    let ops={"_id":id,"name":name,"url":iurl,"prevId":prevId||null,"permissions":role}
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
    let url = "api/sys/db/permissions/find";
    return dispatch(Fetches.sendMsg(url,{},'GET')).then((data)=>dispatch(roleData(data)))
}

const prevData = data => ({
    type : ActionTypes.PrevData,
    data : data
})
export const getPrevData = () => dispatch => {
    let url = "api/sys/v1/menu/find";
    return dispatch(Fetches.sendMsg(url,{},'GET')).then((data)=>dispatch(prevData(data)))
}





