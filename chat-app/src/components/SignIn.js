import React, { Component } from "react";
import { Form, Button } from "react-bootstrap";
import { setPage, emitOnline, setName } from "../actions";
import { connect } from "react-redux";
class SignIn extends Component {
  state = {
    error: ""
  };
  onSubmit = async e => {
    e.preventDefault();
    if (this.name.value !== "") {
      await this.props.setName(this.name.value);
      this.props.emitOnline(this.props.name);
      this.props.setPage("chat-box");
    } else {
      this.setState({ error: "Name cannot be empty!" });
    }
  };
  render() {
    return (
      <Form className="sign-in mt-5" onSubmit={e => this.onSubmit(e)}>
        <Form.Group>
          <Form.Label className="float-left">Enter name:</Form.Label>
          <Form.Control
            type="text"
            placeholder="Name"
            ref={name => (this.name = name)}
          />
        </Form.Group>
        <label>{this.state.error}</label>
        <Button variant="success" className="float-right" type="submit">
          Enter Chat
        </Button>
      </Form>
    );
  }
}
export default connect(
  state => state,
  { setPage, emitOnline, setName }
)(SignIn);
