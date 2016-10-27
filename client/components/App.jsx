import React from 'react';
import request from 'superagent';
import cookie from 'react-cookie';
import Modal from 'react-modal';
import UserForm from './users/UserForm.jsx';
import MyAccountRequests from './users/MyAccountRequests.jsx'
import Main from './homepage/Main.jsx'

const propTypes = {};

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      buttonText: '',
      login: false,
      open: false,
      hereiam: false,
      viewAcct: false,
    }
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.logIn = this.logIn.bind(this);
    this.signUp = this.signUp.bind(this);
    this.signOut = this.signOut.bind(this);
    this.myCheckin = this.myCheckin.bind(this);
    this.myAccount = this.myAccount.bind(this);
    this.homepage = this.homepage.bind(this);
  }
  componentDidMount() {
    this.updateAuth();
    this.setState({
      hereiam: false,
    });
  }
  updateAuth() {
    this.setState({
      token: cookie.load('token'),
    });
  }
  logIn(userDetails) {
    request.post('/api/login')
          .send(userDetails)
         .then(() => {
           this.updateAuth();
         });
  }
  signUp(userDetails) {
    request.post('/api/signup')
          .send(userDetails)
          .then(() => {
            this.updateAuth();
          });
  }
  signOut() {
    request.post('/api/signout')
           .then(() => this.updateAuth());
    this.closeModal();
  }
  myCheckin() {
    if (this.state.hereiam == true) {
      this.setState({ hereiam: false })
    } else {
      this.setState({ hereiam: true })
    }
  }
  myAccount() {
    this.setState({
      viewAcct: true,
    })
  }
  homepage() {
    this.setState({
      viewAcct: false,
    })
  }
  openModal(e) {
    let register = e.target.value;
    this.setState({
      open: true,
      buttonText: register,
      hereiam: false,
    });
  }
  closeModal() {
    this.setState({
      open: false,
      hereiam: false,
      viewAcct: false,
    });
  }
  render() {
    let userDisplayElement;
    if (this.state.token) {
      userDisplayElement = (
        <div>
          <div id="registration-links">
            <button onClick={this.myAccount}>MY ACCOUNT</button>
            {this.state.viewAcct ?
            <button onClick={this.homepage}>HOMEPAGE</button> :
            <button onClick={this.myCheckin}>CHECKIN</button> }
            <button onClick={this.signOut} >LOG OUT</button>
          </div>
        </div>
      );
    } else {
      userDisplayElement = (
        <div>
          <div id="registration-links">
            <button onClick={this.openModal} value="LOGIN">LOGIN</button>
            <button onClick={this.openModal} value="SIGNUP">SIGNUP</button>
          </div>
          <Modal isOpen={this.state.open} onRequestClose={this.closeModal}>
          <h1>{this.state.buttonText}</h1>
              {(this.state.buttonText=="LOGIN") ?
                <UserForm
                  closeModal={this.closeModal}
                  handleSubmit={this.logIn}
                  buttonText={"LOGIN"}
                /> : false }
              {(this.state.buttonText=="SIGNUP") ?
                <UserForm
                  closeModal={this.closeModal}
                  handleSubmit={this.signUp}
                  buttonText={"SIGNUP"}
                /> : false
              }
            <button onClick={this.closeModal} id="closeButton">CLOSE</button>
         </Modal>
        </div>
      );
    }
    return (
      <div>
        <div id="container">
          {userDisplayElement}
          {this.state.viewAcct ?
          <MyAccountRequests
            updateAuth={this.updateAuth}
          /> :
          <Main
            hereiam={this.state.hereiam}
            updateAuth={this.updateAuth}
          />}
        </div>
      </div>
    );
  }
}

App.propTypes = propTypes;

export default App;
