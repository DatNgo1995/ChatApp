import C from './constants';

//emit
export const emitPostMessage = (message) => {
    return socket => {
        socket.emit("postMessage", message);
    }
}
    

export const emitUpdateMessage = ( message) => {
    return socket => {
        socket.emit("editMessage", message);
    }
}

export const emitDeleteMessage = ( id) => {
    return socket => {
        socket.emit("deleteMessage", id);
    }
}

export const setPage = page => ({
    type: C.SET_PAGE,
    payload: page
})
//helpers for on
export const postMessage =  message => ({
    type: C.POST_MESSAGE,
    payload: message
})

export const updateMessage =  message => ({
    type: C.UPDATE_MESSAGE,
    payload: message
})

export const deleteMessage =  id => ({
    type: C.DELETE_MESSAGE,
    payload: id
})
export const onlineList = list => ({
    type: C.ONLINE_LIST,
    payload: list
})


//on

export const onPostMessage = (message) => ({socket,dispatch}) => {
    socket.on("serverSendPost", dispatch(postMessage(message)));
}

export const onDeleteMessage = (id) =>  ({socket,dispatch}) => {
    socket.on("serverDeletePost", dispatch(deleteMessage(id)))
}
export const onEditMessage = (list) =>  ({socket,dispatch}) => {
    socket.on("serverEditMessage", dispatch(updateMessage(list)))
}

export const onUpdateOnline = (list) =>  ({socket,dispatch}) => {
    socket.on("updateOnline", dispatch(onlineList(list)))
}


//load innitial data
export const fetchMessage = () => {
    return dispatch => {
        fetch("/getData")
            .then(data => data.json())
            .then(res => dispatch(loadMessage(res)))
    }
}
export const loadMessage = messages => ({
    type: C.GET_MESSAGE,
    payload: messages
})