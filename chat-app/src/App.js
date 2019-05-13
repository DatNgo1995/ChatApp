import React from 'react';
import { ChatBox } from './components/ChatBox';
import  SignIn  from './components/SignIn';
import socketIOClient  from "socket.io-client";
import Bootstrap from 'bootstrap/dist/css/bootstrap.css';
import './App.css';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      endpoint: "localhost:8080",
      currentPage: 'sign-in',
      name: '',
      chatMessage: []
   

    };
}
  
  componentWillMount() {
    this.getDataFromDb();
  }
  componentDidMount() {
    this.socket = socketIOClient (this.state.endpoint);
    this.socket.on("serverSendPost", (mess) => {
      this.setState({chatMessage : [
        ...this.state.chatMessage,
        mess      
      ]});
    })
  }
  moveToChatBox = () => {
    this.setState({ currentPage: 'chat-box' });
  }
  setName = (name) => {
    this.setState({ name: name });
  }
  updateChatMessage = (newMessage) => {
    let newContent= {
      name: this.state.name,
      content: newMessage
    }
   this.postMessage(newContent)
  }
  getDataFromDb = () => {
    fetch("http://localhost:8080/getData")
      .then(data => data.json())
      .then(res => this.setState({ chatMessage: res }));
  };
  postMessage = (message) => {
 
    this.socket.emit("postMessage", message);
    
  }
  render() {
    return (
      <div className="App">
        {this.state.currentPage === 'sign-in' ? (
          <SignIn moveToChatBox={this.moveToChatBox} setName = {this.setName} />
        ) : (
          <ChatBox name={this.state.name} chatMessage = {this.state.chatMessage} updateChatMessage = {this.updateChatMessage}/>
        )}
      </div>
    );
  }
}

export default App;
