import * as ActionTypes from './ActionTypes'
const initialState = {
    data:[]
}
function addData(data,state){
    state.push(data)
}
export default function update (state = initialState, action){
    switch(action.type){
        case ActionTypes.Get_Menu_Data:
            return { 
                data:action.data
            }
        
        case ActionTypes.AddMenuData:
        console.log(action.data,55555)
            return { 
               // data:addData(action.data,state)
            }
        default:
            return state
    }
}