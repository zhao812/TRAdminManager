import * as ActionTypes from './ActionTypes'
const initialState = {
    rule:""
}

export default function update (state = initialState, action){
    switch(action.type){
        case ActionTypes.RoleData:
            return{
                ...state,
                rule:action.data
            }
        default:
            return state
    }
}