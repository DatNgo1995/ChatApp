import React, { useState,useRef, useEffect } from "react";
import { connect } from "react-redux";
import UserMessage from "./UserMessage";
import { loadOldMessage,fetchMessage } from "../actions";
const ChatMessage = ({ limit, messages, name,loadOldMessage,fetchMessage }) => {
  const [messageState, setMessageState] = useState(messages)
  const chatBoxHeight = useRef(null);
  useEffect(() => {
    scrollToBottom(chatBoxHeight.current);
  }, []);
  useEffect(() => {
    console.log(messages.length - messageState.length)
    // not scroll to bottom when loading old messages
    if (messages.length - messageState.length !== 10)
      scrollToBottom(chatBoxHeight.current);
    setMessageState(messages)
  }, [messages]);
  useEffect(( ) => {
    fetchMessage(limit)
  }, [limit])
  const scrollToBottom = div => {
    div.scrollTop = div.scrollHeight - div.clientHeight;
  };
  return (
    <div className="messages m-5 d-flex flex-column" ref={chatBoxHeight}>
      <button onClick = { loadOldMessage}>Load older messages ...</button>
      {messages.map((message, i) =>
        message.name === name ? (
          <UserMessage id={message.id} />
        ) : (
          <div className="chat-message d-flex flex-column m-3">
            <p>
              {message.name}: {message.content}
            </p>
            <p className="message-date"> {message.date} </p>
          </div>
        )
      )}
    </div>
    
  );
};

export default connect(state => state, {loadOldMessage, fetchMessage})(ChatMessage);
