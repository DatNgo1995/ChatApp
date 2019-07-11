import React from "react";
import ChatBox from "./components/ChatBox";
import  OnlineUser  from "./components/OnlineUser";
import SignIn from "./components/SignIn";
// eslint-disable-next-line
import Bootstrap from "bootstrap/dist/css/bootstrap.css";
import "./App.css";
import { connect } from "react-redux";
import { fetchMessage } from "./actions";
class App extends React.Component {
 
  componentDidMount() {
    this.props.fetchMessage();
  }

  render() {
    return (
      <div className="App">
        {this.props.currentPage === "sign-in" ? (
          <SignIn />
        ) : (
          <div className="row">
            <ChatBox />
            <OnlineUser />
          </div>
        )}
      </div>
    );
  }
}

export default connect(
  state => state,
  {
    fetchMessage
  }
)(App);
