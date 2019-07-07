import appReducer from './reducer'
import socketIOClient from "socket.io-client";
import thunk from 'redux-thunk'
import createSocketMiddleware from './socketMiddleware.js'
import { createStore, applyMiddleware } from 'redux'
const socketMiddleware = createSocketMiddleware(socketIOClient.connect('/'));
export default (initialState={}) => {
	return applyMiddleware(socketMiddleware,thunk)(createStore)(appReducer, initialState)
}

