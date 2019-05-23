import React, { useState, useRef } from "react";
import { Form, Button, InputGroup, FormControl } from "react-bootstrap";
const ChatMessage = ({ isUserMessage, id, name, content, deleteMessage, editMessage }) => {
  const [mode, setMode] = useState(false);
    let message = useRef(null);
    const onSubmit = (e) => {
        e.preventDefault();
        editMessage({id: id,content: message.current.value});
        setMode(false);
    }
  return (
    <React.Fragment>
      {isUserMessage ? (
        mode ? (
          <Form onSubmit={e => onSubmit(e)} className="chat-message align-self-end mb-3">
            <InputGroup>
              <FormControl
                defaultValue = {content}
                type="text"
                ref={message}
              />
                <Button variant="danger" onClick ={() => setMode(false)}>
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
              <label className="m-1" onClick={() => setMode(true)}>
                {" "}
                edit |
              </label>
              <label onClick={() => deleteMessage(id)}> delete</label>
            </div>
          </div>
        )
      ) : (
        <div className="chat-message d-flex flex-column mb-3">
          {name}: {content}
        </div>
      )}
    </React.Fragment>
  );
};

export default ChatMessage;
