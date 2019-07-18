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
  event: "postMessage",
  message: message
});

export const emitOnline = name => ({
  type: "emit",
  event: "online",
  message: name
});

export const emitUpdateMessage = message => ({
  type: "emit",
  event: "editMessage",
  message: message
});

export const emitDeleteMessage = id => ({
  type: "emit",
  event: "deleteMessage",
  message: id
});

//load innitial data
export const fetchMessage = (limit) => {
  return dispatch => {
    fetch("/getData/"+limit)
      .then(data => data.json())
      .then(res => dispatch(loadMessage(res)));
  };
};
export const loadMessage = messages => ({
  type: C.GET_MESSAGE,
  payload: messages
});
export const loadOldMessage = () => ({
  type: C.LOAD_OLD_MESSAGE
})