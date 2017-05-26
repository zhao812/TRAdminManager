import * as Fetches from '../../../utils'
import * as ActionTypes from './ActionTypes'
const wechatData = data => ({
    type : ActionTypes.WECHART,
    data : data
})

export const getMenu = () => dispatch => {
    let url = "/menu/list";
    return dispatch(Fetches.sendMsg(url, null))
}

