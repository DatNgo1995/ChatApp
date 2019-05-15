import React, { Component } from "react";
import { Form, Button } from "react-bootstrap";

class SignIn extends Component {
  state = {
    error: ""
  }
  onSubmit = async (e) => {
    e.preventDefault();
    if(this.name.value !== ""){
      await this.props.setName(this.name.value);
      this.props.moveToChatBox();
    }
    else {
      this.setState({error: "Name cannot be empty!"})
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
export default SignIn;
