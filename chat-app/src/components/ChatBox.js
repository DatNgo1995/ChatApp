import React from "react";
import { Form, Button,InputGroup, FormControl } from "react-bootstrap";
export class ChatBox extends React.Component {
  onSubmit = e => {
    e.preventDefault();
    this.props.updateChatMessage(this.message.value);
  };
  render() {
    return (
      <div className="chat-box">
        <div className="messages m-5">
          {this.props.chatMessage.map(message => (
            <div className="chat-message mb-3">
              {message.name}: {message.content}
            </div>
          ))}
        </div>
        <Form onSubmit={e => this.onSubmit(e)} className="chat-input m-5">
          <InputGroup >
            <FormControl
              type="text"
              placeholder="type something"
              ref={message => (this.message = message)}
            />
            <InputGroup.Append>
            <Button variant="success"  type="submit">
            Enter
          </Button>
            </InputGroup.Append>
          </InputGroup>
          
           
           
        </Form>
      </div>
    );
  }
}
