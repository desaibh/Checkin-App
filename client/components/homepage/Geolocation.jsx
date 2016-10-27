import React from 'react';
import GeolocationErrorView from './GeolocationErrorView.jsx';
import Geocoding from "./Geocoding.jsx";

const propTypes = {
  hereiam: React.PropTypes.boolean
}

class Geolocation extends React.Component {
  constructor() {
    super()
    this.state = {
      longitude: '',
      latitude: '',
      nextStep: false,
    }
  }
  componentDidMount() {
    this.geoFindMe();
  }
  geoFindMe() {
    navigator.geolocation.getCurrentPosition((position) => {
      this.setState({
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
        nextStep: true,
      });
    });
  };
  render() {
    return (
      <div>

        {navigator.geolocation ?
          false :
          <GeolocationErrorView /> }
        {this.state.nextStep ?
          <Geocoding
            longitude={this.state.longitude}
            latitude={this.state.latitude}
            hereiam={this.props.hereiam}
          /> :
          false }
      </div>
    )
  }
}

Geolocation.propTypes = propTypes;

export default Geolocation;
