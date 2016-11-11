import React from 'react';
import Geocoding from '../homepage/Geocoding.jsx';


const propTypes = {
  latitude: React.PropTypes.string.isRequired,
  longitude: React.PropTypes.string.isRequired,
  hereiam: React.PropTypes.boolean,
}

class CheckinGeolocation extends React.Component {
  render() {
    return (
      <div>
        <Geocoding
            latititude={this.props.latitude}
            longitude={this.props.longitude}
            hereiam={this.state.checkin}
          />
      </div>

    )
  }
}

CheckinGeolocation.propTypes = propTypes;

export default CheckinGeolocation;
