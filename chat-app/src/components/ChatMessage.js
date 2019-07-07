import React, { useState, useRef } from "react";
import { Form, Button, InputGroup, FormControl } from "react-bootstrap";
import { emitUpdateMessage, emitDeleteMessage } from "../actions";
import { connect } from "react-redux";
const ChatMessage = ({ isUserMessage, id, name, content, date }) => {
  const [mode, setMode] = useState(false);
  let message = useRef(null);
  const onSubmit = e => {
    e.preventDefault();
    emitUpdateMessage({ id: id, content: message.current.value });
    setMode(false);
  };
  return (
    <React.Fragment>
      {isUserMessage ? (
        mode ? (
          <Form
            onSubmit={e => onSubmit(e)}
            className="chat-message align-self-end mb-3"
          >
            <InputGroup>
              <FormControl defaultValue={content} type="text" ref={message} />
              <Button variant="danger" onClick={() => setMode(false)}>
                Cancel
              </Button>
              <Button variant="success" type="submit">
                Enter
              </Button>
            </InputGroup>
          </Form>
        ) : (
          <div className="chat-message d-flex flex-column align-self-end d-block mb-3">
            {content}
            <div className="align-self-end edit-content">
              <span className="message-date">{date}</span>
              <label className="mt-1 mx-3" onClick={() => setMode(true)}>
                edit
              </label>
              <label onClick={() => emitDeleteMessage(id)}> delete</label>
            </div>
          </div>
        )
      ) : (
        <div className="chat-message d-flex flex-column mb-3">
          <p>
            {name}: {content}
          </p>
          <p className="message-date"> {date} </p>
        </div>
      )}
    </React.Fragment>
  );
};

export default connect(
  null,
  { emitDeleteMessage, emitUpdateMessage }
)(ChatMessage);
