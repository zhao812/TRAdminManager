import * as ActionTypes from './ActionTypes'
const initialState = {
    data:[]
}

export default function update (state = initialState, action){
    switch(action.type){
        case ActionTypes.Get_Menu_Data:
            return { 
                ...state,
                data:action.data
            }
        
        case ActionTypes.Changes_Menu_Name:
            return{
                ...state,
                name:action.name
            }
        default:
            return state
    }
}