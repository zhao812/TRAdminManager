/**
 * create by zhao at 2017/5/25
 */
import { hashHistory } from 'react-router'

import * as utils from '../../../utils'
import * as ActionType from './actionType'

const receiveData = data => ({
    type: ActionType.INIT_USER_LIST_DATA,
    data: data
})

/**
 * 获取用户列表
 */
export const getUserData = (opt) => dispatch => {
    let url = "/user/userList"
    return new Promise((resolve, reject) => {
        dispatch(utils.sendMsg(url, opt)).then(data =>{
            dispatch(receiveData(data))
            resolve&&resolve(data)
        }, reject)
    })
}