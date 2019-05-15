import React, {Component} from "react";

export class OnlineUser extends Component {

    render() {
        return (
            <div className="chat-message col-4 mt-5">
                <h1>User List</h1>
                <ul>
                {this.props.userList.map(member => (
                <div>
                   <li> {member.user}: {member.status} </li>
                </div>
                ))}
                </ul>
                
            </div>
        )
    }
}