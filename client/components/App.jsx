import React from 'react';
import request from 'superagent';
import cookie from 'react-cookie';
import Modal from 'react-modal';
import UserForm from './users//UserForm.jsx';
import CheckinList from './checkins/CheckinList.jsx';
import CheckinForm from './checkins/CheckinForm.jsx';
import Main from './homepage/Main.jsx'

const propTypes = {};

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      checkins: [],
      buttonText: '',
      login: false,
      open: false,
    }
    this.openModal = this.openModal.bind(this, e);
    this.closeModal = this.closeModal.bind(this);
    this.logIn = this.logIn.bind(this);
    this.signUp = this.signUp.bind(this);
    this.signOut = this.signOut.bind(this);
    this.sendCheckin = this.sendCheckin.bind(this);
  }
  componentDidMount() {
    this.updateAuth();
    if (cookie.load('token')) {
      this.getCurrentUserCheckins();
    }
  }
  getCurrentUserCheckins() {
    request.get('/api/checkins')
           .then((response) => {
             const checkins = response.body;
             this.setState({ checkins });
           })
           .catch(() => {
             this.updateAuth();
           });
  }
  sendCheckin({ body }) {
    request.post('/api/checkins')
           .send({ body })
           .then(() => {
             this.getCurrentUserCheckins();
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
           this.getCurrentUserCheckins();
         });
  }
  signUp(userDetails) {
    request.post('/api/signup')
          .send(userDetails)
          .then(() => {
            this.updateAuth();
            this.getCurrentUserCheckins();
          });
  }
  signOut() {
    request.post('/api/signout')
           .then(() => this.updateAuth());
  }
  openModal(e) {
    let register = e.target.value;
    console.log(register)
    this.setState({
      open: true,
      buttonText: register
    });
  }
  closeModal() {
    this.setState({
      open: false
    });
  }
  render() {
    let userDisplayElement;
    if (this.state.token) {
      userDisplayElement = (
        <div>
            <button onClick={this.signOut} >Log-Out!</button>
            <CheckinForm sendCheckin={this.sendCheckin} />
            <CheckinList checkins={this.state.checkins} />
        </div>
      );
    } else {
      userDisplayElement = (
        <div>
        <button onClick={this.openModal}>LOGIN</button>
        <button onClick={this.openModal}>SIGNUP</button>
        <p>{this.state.buttonText}</p>>
        <Modal isOpen={this.state.open} onRequestClose={this.closeModal}>
        <h1>{this.state.buttonText}</h1>
        <button onClick={this.closeModal}>Close</button>

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
         </Modal>
        </div>
      );
    }
    return (
      <div>
      <div id="container">
        {userDisplayElement}
        <Main />
      </div>
      </div>
    );
  }
}

App.propTypes = propTypes;

export default App;
