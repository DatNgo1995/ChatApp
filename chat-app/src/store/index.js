import C from '../constants'
import appReducer from './reducers'
import thunk from 'redux-thunk'
import createSocketMiddleware from 'socketMiddleware.js'
import { createStore, applyMiddleware } from 'redux'
const socketMiddleware = createSocketMiddleware(io('http://example.com/socket'));
export default (initialState={}) => {
	return applyMiddleware(thunk,socketMiddleware)(createStore)(appReducer, initialState)
}

