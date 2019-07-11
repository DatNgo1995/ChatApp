import React, { Component } from "react";
import { connect } from "react-redux";

class OnlineUser extends Component {
  render() {
    return (
      <div className="chat-message col-4 mt-5">
        <h1>User List</h1>
        <ul>
          {this.props.userList.map((member,i) => (
            <div key ={i}>
              <li>
                {member.user}: {member.status}{" "}
              </li>
            </div>
          ))}
        </ul>
      </div>
    );
  }
}

export default connect(state => state)(OnlineUser);
