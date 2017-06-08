import * as ActionTypes from './ActionTypes'
const initialState = {
    current:'a0',
    openKeys:['sub0'],
    menuList: []
}
export default function update (state = initialState, action){
    switch(action.type){
        case ActionTypes.GetCurrent:
            return { 
                ...state,
                current:action.current
            }
        case ActionTypes.GetOpenKeys:
            return { 
                ...state,
                openKeys:action.openKeys
            }
        case ActionTypes.INIT_MENU_LIST:
        console.log(action.data,1898)
            return {
                ...state,
                menuList: action.data
            }
        default:
            return state
    }
}