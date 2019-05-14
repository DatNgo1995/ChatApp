import React, { Component } from "react";
import { Form, Button } from "react-bootstrap";

class SignIn extends Component {
  onSubmit = () => {
    this.props.moveToChatBox();
    this.props.setName(this.name.value);
  };
  render() {
    return (
      <Form className="sign-in mt-5" onSubmit={this.onSubmit}>
        <Form.Group>
          <Form.Label className="float-left">Enter name:</Form.Label>
          <Form.Control
            type="text"
            placeholder="Name"
            ref={name => (this.name = name)}
          />
        </Form.Group>
        <Button variant="success" className="float-right" type="submit">
          Enter Chat
        </Button>
      </Form>
    );
  }
}
export default SignIn;
