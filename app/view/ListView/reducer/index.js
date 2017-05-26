/**
 * created by zhao at 2017/5/25
 */
'use strict'
import * as ActionType from './actionType'

const initialState = {
    listData: [],
}

export default function update (state = initialState, action){
    switch(action.type){
        case ActionType.INIT_LIST_DATA:
            return {
                ...state,
                listData: action.data,
            }
        default:
            return state
    }
}