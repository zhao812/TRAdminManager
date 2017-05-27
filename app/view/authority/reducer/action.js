import * as Fetches from '../../../utils'
import * as ActionTypes from './ActionTypes'
const getAuthority = data => ({
    type : ActionTypes.GetAuthority,
    data : data
})
export const authority = () => dispatch => {
    let url = "/api/sys/db/permissions/find";
    dispatch(Fetches.sendMsg(url, null)).then((data)=>dispatch(getAuthority(data)))
}

