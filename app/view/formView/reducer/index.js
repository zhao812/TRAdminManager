/**
 * created by zhao at 2017/5/25
 */
'use strict'
import * as ActionType from './actionType'

const initialState = {
    parentData: {},
}

export default function update (state = initialState, action){
    switch(action.type){
        case ActionType.INIT_FORM_PARENT_DATA:
            let d = { ...state.parentData }
            d[action.id]=action.data
            return {
                ...state,
                parentData: d
            }
        default:
            return state
    }
}