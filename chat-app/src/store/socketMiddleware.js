export default function createSocketMiddleware(socket) {
  
    return () => (next) => (action) => {
      console.log(next, action)
      if (action.type === 'emit') {
        console.log(socket.emit)
        socket.emit(action.event, action.message)
      }
  
      return next(action);
  
    };
  }