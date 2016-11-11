import React from 'react';
import {GoogleMapLoader, GoogleMap, Marker} from "react-google-maps";

const propTypes = {
  longitude: React.PropTypes.number.isRequired,
  latitude: React.PropTypes.number.isRequired,
  street: React.PropTypes.string.isRequired,
}


const ATLANTIC_OCEAN = {
  lat: 29.53,
  lng: -55.49
}
class Map extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      spots: [],
      foundAddress: this.props.street,
      isGeocodingError: false,
      lat: this.props.latitude,
      lng: this.props.longitude,
      localContent: this.props.Content || ''
    }
  }

  componentDidMount() {
    const INITIAL_LOCATION = {
      address: this.props.street,
      lat: this.props.latitude,
      lng: this.props.longitude,
      zoom: 2
    };
    this.map = new google.maps.Map(document.querySelector('#map'), {
      center: INITIAL_LOCATION,
      zoom: 18,
      setMap: 'map',
      mapTypeId: 'satellite',
    });

    this.marker = new google.maps.Marker({
      map: this.map,
      position: {
        lat: this.props.latitude,
        lng: this.props.longitude,
      },
      draggable: true,
      animation: google.maps.Animation.DROP
    });
  }
  myMap() {
    this.render();
  }
  render() {
    const mapStyle = {
      width: 840,
      height: 500,
      border: '1px solid black'
    };
    return (
      <div className="container">
        <div>
        {this.state.isGeocodingError ? <p className="bg-danger">Address not found.</p> : <p className="bg-info">{this.state.foundAddress}</p>}
        </div>
        <div id="map" ref="map" style={mapStyle}>Google Maps is malfunctioning!</div>
      </div>
    );
  }
}

Map.propTypes = propTypes;

export default Map;
