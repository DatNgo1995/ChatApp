import React from "react";
import ChatBox from "./components/ChatBox";
import  OnlineUser  from "./components/OnlineUser";
import SignIn from "./components/SignIn";
// eslint-disable-next-line
import Bootstrap from "bootstrap/dist/css/bootstrap.css";
import "./App.css";
import { connect } from "react-redux";
import { fetchMessage } from "./actions";
import { BrowserRouter, Switch, Route,  Redirect} from 'react-router-dom'
class App extends React.Component {
 
  componentDidMount() {
    this.props.fetchMessage();
  }

  render() {
    return (
      <div className="App">

        <BrowserRouter> 
          <Switch>
          <Route path="/login" render = { () => 
          this.props.currentPage ==="chat-box"? <Redirect to="/" />:<SignIn />} />
          <Route path="/" render = { () => 
            this.props.currentPage ==="chat-box" ?
            <div className="row">
            <ChatBox />
            <OnlineUser />
          </div>
          : <Redirect to="/login" />
          } />
          
          </Switch>
        </BrowserRouter>
         
       
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
