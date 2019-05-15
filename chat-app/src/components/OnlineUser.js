import React, {Component} from "react";

export class OnlineUser extends Component {

    render() {
        return (
            <div class="online-users">
                {this.props.userList.map(member => (
                <div>
                    {member.user}: {member.status}
                </div>
                ))}
            </div>
        )
    }
}