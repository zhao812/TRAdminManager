import * as Fetches from '../../../utils'
import * as ActionTypes from './ActionTypes'
const getMenuData = data => ({
    type : ActionTypes.Get_Menu_Data,
    data : data
})

export const addMenu = (name,iurl,prevId,role) => dispatch => {
    let url = "/api/sys/db/menu/add";
    let ops=prevId?{"name":name,"url":iurl,"prevId":prevId,"permissions":role}:{"name":name,"url":iurl,"permissions":role};
    return dispatch(Fetches.sendMsg(url, ops,'POST'))
}
export const oEditor = (id,name,iurl,prevId,role) => dispatch => {
    let url = "/api/sys/db/menu/up";
    let ops=prevId?{"_id":id,"name":name,"url":iurl,"prevId":prevId,"permissions":role}:{"_id":id,"name":name,"url":iurl,"permissions":role};
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
    let url = "api/sys/db/menu/find";
    return dispatch(Fetches.sendMsg(url,{},'GET')).then((data)=>dispatch(prevData(data)))
}



