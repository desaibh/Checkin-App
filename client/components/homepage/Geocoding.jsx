import React from 'react';
import request from 'superagent';
import GeocodingView from './GeocodingView.jsx';
import Checkin from '../checkins/Checkin.jsx';

const propTypes = {
  hereiam: React.PropTypes.boolean,
  longitude: React.PropTypes.number.isRequired,
  latitude: React.PropTypes.number.isRequired,
};

class Geocoding extends React.Component {
  constructor(props) {
   super(props)
   this.state = {
     streetAddress: '',
     restaurantDoors: [],
     todoDoors: [],
     touristspotDoors: [],
   }
  }
  componentDidMount() {
    request.get(`/geocode/${this.props.latitude}/${this.props.longitude}`)
           .then((response) => {
              let geocodeData = response.body;
              this.setState ({
                streetAddress: geocodeData[0].formatted_address,
              })
            });
    let restaurantArray = [];
    request.get(`/restaurant/${this.props.latitude}/${this.props.longitude}`)
           .then((response) => {
              restaurantArray = this.dataMapper(response.body);
              this.setState ({
               restaurantDoors: restaurantArray
              })
            })
    let touristArray = [];
    request.get(`/touristspot/${this.props.latitude}/${this.props.longitude}`)
           .then((response) => {
              touristArray = this.dataMapper(response.body);
              this.setState ({
               touristspotDoors: touristArray,
              })
            })
    let todoArray = [];
    request.get(`/todo/${this.props.latitude}/${this.props.longitude}`)
           .then((response) => {
              todoArray = this.dataMapper(response.body);
              this.setState ({
               todoDoors: todoArray,
              })
           })
    this.setState ({
     restaurantDoors: restaurantArray,
     todoDoors: todoArray,
     touristspotDoors: touristArray,
    })
    console.log(this.props.latitude, this.props.longitude, this.state.restaurantDoors, this.state.todoDoors, this.state.touristspotDoors)
  }
  dataMapper(res)  {
    let responseArray = [];
    if (res) {
      res.map((data) => {
        let icon  = data.icon;
        let place = data.name;
        let photo = '';
        if(data.photos) {
          photo = data.photos[0].photo_reference;
        } else {
          photo = null;
          };
        let rating = data.rating;
        let locale = data.vicinity;
        responseArray.push({ icon, place, photo, rating, locale })
      });
    } else {
      responseArray = "null";
    }
    return responseArray;
  }
  render() {
   return (
     <div>
        {this.props.hereiam ?
        <Checkin
           longitude={this.props.longitude}
           latitude={this.props.latitude}
           streetAddress={this.state.streetAddress}
         /> : false }
         <GeocodingView
          latitude = {this.props.latitude}
          longitude = {this.props.longitude}
          streetAddress = {this.state.streetAddress}
          restaurants = {this.state.restaurantDoors}
          todos = {this.state.todoDoors}
          touristspots = {this.state.touristspotDoors}
        />
     </div>
   )
  }
}

Geocoding.propTypes = propTypes;

export default Geocoding;
