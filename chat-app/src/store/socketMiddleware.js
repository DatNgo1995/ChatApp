import C from "../constants";

export default function createSocketMiddleware(socket) {
  return store => next => action => {
    if (action.wsType === "emit") {
      socket.emit(action.event, action.message);
    }
    if (action.type === C.SET_PAGE) {
      const events = [
        { type: C.POST_MESSAGE, event: "serverSendPost" },
        { type: C.DELETE_MESSAGE, event: "serverDeletePost" },
        { type: C.UPDATE_MESSAGE, event: "serverEditMessage" },
        { type: C.UPDATE_ONLINE_LIST, event: "updateOnline" }
      ];
      events.forEach(event => {
        socket.on(event.event, message => {
          store.dispatch({
            ...event,
            payload: message
          });
        });
      });
    }
    

    return next(action);
  };
}
