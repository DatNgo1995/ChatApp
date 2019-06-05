import React from "react";
import { ChatBox } from "./components/ChatBox";
import { OnlineUser } from "./components/OnlineUser";
import SignIn from "./components/SignIn";
import socketIOClient from "socket.io-client";
// eslint-disable-next-line
import Bootstrap from "bootstrap/dist/css/bootstrap.css";
import "./App.css";

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      endpoint: "/",
      currentPage: "sign-in",
      name: "",
      chatMessage: [],
      userList: []
    };
  }

  componentDidMount() {
    this.getDataFromDb();
    this.socket = socketIOClient(this.state.endpoint);
    this.socket.on("serverSendPost", mess => {
      this.setState({ chatMessage: [...this.state.chatMessage, mess] });
    });
    this.socket.on("serverdDeletePost", id => {
      let newState = this.state.chatMessage.filter(
        message => message.id !== id
      );
      this.setState(() => {
        return { chatMessage: newState };
      });
    });
    this.socket.on("serverEditMessage", editMessage => {
      let newState = this.state.chatMessage.map(message =>
        message.id === editMessage.id
          ? { ...message, content: editMessage.content }
          : message
      );
      this.setState(() => {
        return { chatMessage: newState };
      });
    });
    this.socket.on("updateOnline", onlineList => {
      this.setState(() => {
        return { userList: onlineList };
      });
    });
  }
  moveToChatBox = () => {
    this.socket.emit("online", this.state.name);
    this.setState({ currentPage: "chat-box" });
  };
  setName = name => {
    this.setState({ name: name[0].toUpperCase() + name.slice(1) });
  };
  updateChatMessage = newMessage => {
 
    let newContent = {
      name: this.state.name,
      date: new Date().toISOString(),
      content: newMessage[0].toUpperCase() + newMessage.slice(1)
    };
    this.postMessage(newContent);
  };
  getDataFromDb = () => {
    fetch("/getData")
      .then(data => data.json())
      .then(res => this.setState({ chatMessage: res }));
  };
  postMessage = message => {
    this.socket.emit("postMessage", message);
  };
  editMessage = message => {
    this.socket.emit("editMessage", message);
  };
  deleteMessage = id => {
    this.socket.emit("deleteMessage", id);
  };
  render() {
    return (
      <div className="App">
        {this.state.currentPage === "sign-in" ? (
          <SignIn moveToChatBox={this.moveToChatBox} setName={this.setName} />
        ) : (
          <div className="row">
            <ChatBox
              name={this.state.name}
              chatMessage={this.state.chatMessage}
              updateChatMessage={this.updateChatMessage}
              deleteMessage={this.deleteMessage}
              editMessage={this.editMessage}
            />
            <OnlineUser userList={this.state.userList} />
          </div>
        )}
      </div>
    );
  }
}

export default App;
