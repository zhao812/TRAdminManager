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
export const addMenu = (data) => dispatch => {
    let url = "/api/sys/db/menu/add";
    dispatch(Fetches.sendMsg(url, data,'POST')).then((data)=>dispatch(addMenuData(data)))
}

