import * as ActionTypes from './ActionTypes'
const initialState = {
    data:[]
}
export default function update (state = initialState, action){
    switch(action.type){
        case ActionTypes.GetAuthority:
            return { 
                data:action.data
            }
        default:
            return state
    }
}