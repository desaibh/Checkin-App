import React from 'react';
import request from 'superagent';
import cookie from 'react-cookie';
import CheckinList from '../checkins/CheckinList.jsx';

const propTypes = {
  updateAuth: React.PropTypes.func.isRequired,
};

class MyAccountRequests extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      checkins: [],
      newpageload: false
    }
    this.getCurrentUserCheckins = this.getCurrentUserCheckins.bind(this);
  }
  componentDidMount() {
    this.props.updateAuth;
    if (cookie.load('token')) {
      this.getCurrentUserCheckins();
    }
  }
  getCurrentUserCheckins(e) {
    request.get('/api/checkins')
           .then((response) => {
             const checkins = response.body;
             this.setState({ checkins, newpageload: true });
           })
           .catch(() => {
             this.props.updateAuth;
           });
  }
  render() {
    return(
      <div>
      {this.state.newpageload ?
        <CheckinList
          checkins={this.state.checkins}
          getCurrentUserCheckins={this.getCurrentUserCheckins}
        /> : false }
      </div>
    )
  }
}

MyAccountRequests.propTypes = propTypes;

export default MyAccountRequests;
