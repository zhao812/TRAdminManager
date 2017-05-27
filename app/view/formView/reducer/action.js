/**
 * create by zhao at 2017/5/26
 */
import * as utils from '../../../utils'
import * as ActionType from './actionType'

export const sendFormData = (url, opt, postType,) => dispatch => {
    return dispatch(utils.sendMsg(url, opt, postType))
}

export const getListDataById = id => (dispatch, getState) => {
    let state = getState()
    return state.listReducer.listData.find(obj=>obj._id==id)
}

let receiceParentData = (id, data) => ({
    type: ActionType.INIT_FORM_PARENT_DATA,
    data: data,
    id: id
})

export const getListParentData = (key, url, opt, type) => (dispatch) => {
    dispatch(utils.sendMsg(url, opt, type)).then(data=>dispatch(receiceParentData(key, data)))
}