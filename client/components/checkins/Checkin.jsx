import React from 'react';
import request from 'superagent';
import cookie from 'react-cookie';
import CheckinList from './CheckinList.jsx';
import CheckinForm from './CheckinForm.jsx';

const propTypes = {
  latitude: React.PropTypes.number.isRequired,
  longitude: React.PropTypes.number.isRequired,
  streetAddress: React.PropTypes.string.isRequired
};

class Checkin extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      checkins: []
    }
    this.sendCheckin = this.sendCheckin.bind(this);
  }
  sendCheckin(note) {
    let body = [];
    body.push( note, this.props.latitude, this.props.longitude, this.props.streetAddress )
    request.post('/api/checkins')
           .send({body})
           .then(() => { });
  }

  render() {
    return(
      <div>
        <div id="checkinForm">
          <CheckinForm sendCheckin={this.sendCheckin} />
        </div>

      </div>
    )
  }
}

Checkin.propTypes = propTypes;

export default Checkin;
