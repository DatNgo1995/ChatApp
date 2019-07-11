import React from "react";
import { connect } from "react-redux";
import UserMessage from './UserMessage'
const ChatMessage = ({messages,name}) => {
  
  return (
    <React.Fragment>
      {messages.map((message, i) => (
       
        (message.name === name) ? 
          <UserMessage id = {message.id}/>
          : (
          <div className="chat-message d-flex flex-column mb-3">
            <p>
              {message.name}: {message.content}
            </p>
            <p className="message-date"> {message.date} </p>
          </div>
        )
      ))}
     
    </React.Fragment>
  );
};

export default connect(
  state => state
)(ChatMessage);
