import React from "react";
import ChatMessage from "./ChatMessage";
import { Form, Button, InputGroup, FormControl } from "react-bootstrap";
export class ChatBox extends React.Component {
  onSubmit = e => {
    e.preventDefault();
    if (this.message.value) this.props.updateChatMessage(this.message.value);
    e.target[0].value = "";
  };
  render() {
    return (
      <div className="chat-box col-8">
        <div className="messages m-5 d-flex flex-column">
          {this.props.chatMessage.map((message, i) => (
            <ChatMessage
              key={i}
              isUserMessage={this.props.name === message.name}
              {...message}
              deleteMessage={this.props.deleteMessage}
              editMessage = {this.props.editMessage}
            />
          ))}
        </div>
        <Form onSubmit={e => this.onSubmit(e)} className="chat-input m-5">
          <InputGroup>
            <FormControl
              type="text"
              placeholder="type something"
              ref={message => (this.message = message)}
            />
            <InputGroup.Append>
              <Button variant="success" type="submit">
                Enter
              </Button>
            </InputGroup.Append>
          </InputGroup>
        </Form>
      </div>
    );
  }
}
