import * as ActionTypes from './ActionTypes'
const initialState = {
    data:[],
    rule:"",
    prevData:""
}

export default function update (state = initialState, action){
    switch(action.type){
        case ActionTypes.Get_Menu_Data:
            return { 
                ...state,
                data:action.data
            }
        case ActionTypes.RoleData:
            return{
                ...state,
                rule:action.data
            }
        case ActionTypes.PrevData:
            return{
                ...state,
                prevData:action.data
            }
        default:
            return state
    }
}