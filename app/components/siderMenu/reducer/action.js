import * as ActionTypes from './ActionTypes'
import * as utils from '../../../utils'


export const getCurrent =(current) => dispatch => {
    dispatch({
        type : ActionTypes.GetCurrent,
        current: current
    })
}
export const getOpenKeys =(openKeys) => dispatch => {
    dispatch({
        type : ActionTypes.GetOpenKeys,
        openKeys: openKeys
    })
}

let reveiveData = data => ({
    type: ActionTypes.INIT_MENU_LIST,
    data: data
})
export const getMenuData = () => dispatch => {
    let url = "/api/sys/db/menu/find";
    dispatch(utils.sendMsg(url, null)).then((data)=>dispatch(reveiveData(data)))
}
