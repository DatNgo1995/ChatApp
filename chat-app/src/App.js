import React from "react";
import { ChatBox } from "./components/ChatBox";
import { OnlineUser } from "./components/OnlineUser";
import SignIn from "./components/SignIn";
import socketIOClient from "socket.io-client";
// eslint-disable-next-line
import Bootstrap from "bootstrap/dist/css/bootstrap.css";
import "./App.css";
import { connect } from "react-redux";
import {emitPostMessage,emitUpdateMessage, emitDeleteMessage,emitOnline, setPage,setName, onPostMessage, onDeleteMessage,onEditMessage, onUpdateOnline,fetchMessage}  from './actions';
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
  componentDidMount () {
    this.props.fetchMessage();
  }
  updateChatMessage = newMessage => {
 
    let newContent = {
      name: this.props.name,
      date: new Date().toISOString(),
      content: newMessage[0].toUpperCase() + newMessage.slice(1)
    };
    this.props.emitPostMessage(newContent);
  };
  moveToChatBox = () => {
    this.props.emitOnline(this.props.name);
    this.props.setPage("chat-box");
  };
  /*
  componentDidMount() {
    this.getDataFromDb();
    this.socket = socketIOClient(this.state.endpoint);
    this.socket.on("serverSendPost", mess => {
      this.setState({ chatMessage: [...this.state.chatMessage, mess] });
    });
    this.socket.on("serverDeletePost", id => {
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

  setName = name => {
    this.setState({ name: name[0].toUpperCase() + name.slice(1) });
  };
 


  editMessage = message => {
    this.socket.emit("editMessage", message);
  };
  deleteMessage = id => {
    this.socket.emit("deleteMessage", id);
  };
  */
  render() {
    return (
      <div className="App">
        {this.props.currentPage === "sign-in" ? (
          <SignIn moveToChatBox={this.moveToChatBox} setName={this.props.setName}  />
        ) : (
          <div className="row">
            <ChatBox
              name={this.props.name}
              chatMessage={this.props.messages}
              updateChatMessage={this.updateChatMessage}
              deleteMessage={this.props.emitDeleteMessage}
              editMessage={this.props.emitUpdateMessage}
            />
            <OnlineUser userList={this.props.userList} />
          </div>
        )}
      </div>
    );
  }
}

export default connect(state => ({
  name: state.name,
  messages: state.messages,
  currentPage: state.currentPage,
  userList: state.userList
}),
  {emitPostMessage,emitUpdateMessage, emitDeleteMessage,emitOnline, setPage,setName, onPostMessage, onDeleteMessage,onEditMessage, onUpdateOnline,fetchMessage})(App)
