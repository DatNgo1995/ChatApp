import C from '../constants';
import { combineReducers } from 'redux'
export const messages = (state=[],action) => {
    switch (action.type) {
        
        case C.POST_MESSAGE:
            return [...state, action.payload]
        case C.UPDATE_MESSAGE:
            return state.map(message =>
                message.id === action.payload.id
                  ? { ...message, content: action.payload.content }
                  : message
              )
        case C.DELETE_MESSAGE:
            return state.filter( message => message.id != action.payload)
        case C.GET_MESSAGE:
                return action.payload
        default: return state
    }
}
export const name =  (state=[],action) => 
    action.type === C.SET_NAME ? action.payload : state
export const userList =  (state=[],action) => 
    action.type === C. UPDATE_ONLINE_LIST ? action.payload : state

export const currentPage = (state = [], action) => action.type === C.SET_PAGE ? action.payload : state

export default combineReducers({
    messages,
    userList,
    name,
    currentPage
})