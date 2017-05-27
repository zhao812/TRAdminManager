import * as Fetches from '../../../utils'
import * as ActionTypes from './ActionTypes'
const getMenuData = data => ({
    type : ActionTypes.Get_Menu_Data,
    data : data
})
export const menuManage = () => dispatch => {
    let url = "/api/sys/db/menu/find";
    dispatch(Fetches.sendMsg(url, null)).then((data)=>dispatch(getMenuData(data)))
}
const addMenuData = data => ({
    type : ActionTypes.AddMenuData,
    data : data
})
export const addMenu = (name) => dispatch => {
    let url = "/api/sys/db/menu/add";
    return dispatch(Fetches.sendMsg(url, {"name":name},'POST'))
}
export const oEditor = (id,name) => dispatch => {
    let url = "/api/sys/db/menu/up";
    console.log(name,id,13737744)
    return dispatch(Fetches.sendMsg(url, {"_id":id,"name":name},'PUT'))
}
export const oDelete = (id) => dispatch => {
    let url = "/api/sys/db/menu/"+id;
    return dispatch(Fetches.sendMsg(url,{},'DELETE'))
}


