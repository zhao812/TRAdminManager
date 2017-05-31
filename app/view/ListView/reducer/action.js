/**
 * create by zhao at 2017/5/25
 */
import { hashHistory } from 'react-router'

import * as utils from '../../../utils'
import * as ActionType from './actionType'

const receiveData = data => {
    return {
        type: ActionType.INIT_LIST_DATA,
        data: {
            ...data,
            result: data.result.map((obj, index)=>({
                ...obj,
                key: index+1
            }))
        }
    }
}

/**
 * 获取用户列表
 */
export const getListData = (url, opt, type) => dispatch => {
    return new Promise((resolve, reject) => {
        dispatch(utils.sendMsg(url, opt, type)).then(data =>{
            dispatch(receiveData(data))
            resolve&&resolve(data)
        }, reject)
    })
}

let receiveDelData = (list, id) => ({
    type: ActionType.DELETE_LIST_DATA,
    data: list.filter(obj=>obj._id != id).map((obj, index)=>({
        ...obj,
        key: index+1
    }))
})
/**
 * 删除数据
 */
export const deleteListData = (url, opt, type) => (dispatch, getState) =>{
    return new Promise((resolve, reject) => {
        dispatch(utils.sendMsg(url, opt, type)).then(data =>{
            let state = getState()
            dispatch(receiveDelData(state.listReducer.listData, data))
            resolve&&resolve(data)
        }, reject)
    })
}