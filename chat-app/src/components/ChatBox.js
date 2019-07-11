import React from "react";
import ChatMessage from "./ChatMessage";
import { Form, Button, InputGroup, FormControl } from "react-bootstrap";
import { connect } from "react-redux";
import { emitPostMessage } from "../actions";
class ChatBox extends React.Component {
  onSubmit = e => {
    e.preventDefault();

    if (this.message.value) {
      let newContent = {
        name: this.props.name,
        date: new Date().toISOString(),
        content:
          this.message.value[0].toUpperCase() + this.message.value.slice(1)
      };
      this.props.emitPostMessage(newContent);
    }
    e.target[0].value = "";
  };
  render() {
    return (
      <div className="chat-box col-8">
        <div className="messages m-5 d-flex flex-column">
          <ChatMessage />
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
export default connect(
  state => state,
  { emitPostMessage }
)(ChatBox);
