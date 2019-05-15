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

  componentWillMount() {
    this.getDataFromDb();
  }
  componentDidMount() {
    this.socket = socketIOClient(this.state.endpoint);
    this.socket.on("serverSendPost", mess => {
      this.setState({ chatMessage: [...this.state.chatMessage, mess] });
    });
    this.socket.on("updateOnline", onlineList => this.setState({userList: onlineList}));
  }
  moveToChatBox = () => {
    this.socket.emit("online" , this.state.name);
    this.setState({ currentPage: "chat-box" });
  };
  setName = name => {
    this.setState({ name: name[0].toUpperCase() + name.slice(1) });
  };
  updateChatMessage = newMessage => {
    let newContent = {
      name: this.state.name,
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
  render() {
    return (
      <div className="App">
        {this.state.currentPage === "sign-in" ? (
          <SignIn moveToChatBox={this.moveToChatBox} setName={this.setName} />
        ) : (
          <React.Fragment>
          <ChatBox
            name={this.state.name}
            chatMessage={this.state.chatMessage}
            updateChatMessage={this.updateChatMessage}
          />
          <OnlineUser userList = {this.state.userList}/>
          </React.Fragment>
        )}
      </div>
    );
  }
}

export default App;
