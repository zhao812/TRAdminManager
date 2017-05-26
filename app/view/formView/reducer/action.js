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
    return state.listReducer.listData.find(obj=>obj._id=id)
}