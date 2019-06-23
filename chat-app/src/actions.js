import C from "./constants";
// synchronous actions
export const setPage = page => ({
  type: C.SET_PAGE,
  payload: page
});
export const setName = name => ({
  type: C.SET_NAME,
  payload: name[0].toUpperCase() + name.slice(1)
});

//emit
export const emitPostMessage = message => ({
  type: "emit",
  wsType: "emit",
  event: "postMessage",
  message: message
});

export const emitOnline = name => ({
  type: "emit",
  wsType: "emit",
  event: "online",
  message: name
});

export const emitUpdateMessage = message => ({
  type: "emit",
  wsType: "emit",
  event: "editMessage",
  message: message
});

export const emitDeleteMessage = id => ({
  type: "emit",
  wsType: "emit",
  event: "deleteMessage",
  message: id
});

//helpers for on
/*
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

*/
//on

export const onPostMessage = message => ({
  wsType: "on",
  type: C.POST_MESSAGE,
  event: "serverSendPost",
  payload: message
});
export const onDeleteMessage = id => ({
  wsType: "on",
  type: C.DELETE_MESSAGE,
  event: "serverDeletePost",
  payload: id
});
export const onEditMessage = message => ({
  wsType: "on",
  type: C.UPDATE_MESSAGE,
  event: "serverEditMessage",
  payload: message
});
export const onUpdateOnline = list => ({
  wsType: "on",
  type: C.UPDATE_ONLINE_LIST,
  event: "updateOnline",
  payload: list
});

//load innitial data
export const fetchMessage = () => {
  return dispatch => {
    fetch("/getData")
      .then(data => data.json())
      .then(res => dispatch(loadMessage(res)));
  };
};
export const loadMessage = messages => ({
  type: C.GET_MESSAGE,
  payload: messages
});
