import React, { useState, useRef } from "react";
import { Form, Button, InputGroup, FormControl } from "react-bootstrap";
import { emitUpdateMessage, emitDeleteMessage } from "../actions";
import { connect } from "react-redux";

const UserMessage = ({id, messages, emitDeleteMessage, emitUpdateMessage}) => {
  const [mode, setMode] = useState(false);
  let mess = useRef(null);
  const onSubmit = (e, id) => {
    e.preventDefault();
    emitUpdateMessage({ id: id, content: mess.current.value });
    setMode(false);
  };
  
  let message = messages.filter(message => message.id === id)[0];
  return mode ? (
    <Form
      onSubmit={e => onSubmit(e, message.id)}
      className="chat-message align-self-end mb-3"
    >
      <InputGroup>
        <FormControl defaultValue={message.content} type="text" ref={mess} />
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
      {message.content}
      <div className="align-self-end edit-content">
        <span className="message-date">{message.date}</span>
        <label className="mt-1 mx-3" onClick={() => setMode(true)}>
          edit
        </label>
        <label onClick={() => emitDeleteMessage(message.id)}> delete</label>
      </div>
    </div>
  );
};

export default connect(
    state => state,
    { emitDeleteMessage, emitUpdateMessage }
  )(UserMessage);
  