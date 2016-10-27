import React from 'react';
import ContainerView from './ContainerView.jsx'

const propTypes = {
  longitude: React.PropTypes.number.isRequired,
  latitude: React.PropTypes.number.isRequired,
  street: React.PropTypes.string.isRequired,
  restaurants: React.PropTypes.array.isRequired,
  todos: React.PropTypes.array.isRequired,
  touristspots: React.PropTypes.array.isRequired,
};

class GeocodingView extends React.Component {
  render() {
      const restaurantLocations = this.props.restaurants.map((d, idx) => {
        if (d.place) {
          return (
            <ContainerView
              key = {idx}
              icon = {d.icon}
              place = {d.place}
              photo = {d.photo}
              rating = {d.rating}
              locale = {d.locale}
              latitude = {this.props.latitude}
              longitude = {this.props.longitude}
            />
          );
        }
      });
    const todoLocations = this.props.todos.map((d, idx) => {
      if (d.place) {
      return (
        <ContainerView
          key = {idx}
          icon = {d.icon}
          place = {d.place}
          photo = {d.photo}
          rating = {d.rating}
          locale = {d.locale}
          latitude = {this.props.latitude}
          longitude = {this.props.longitude}
        />
      );
      }
    });
    const touristLocations = this.props.touristspots.map((d, idx) => {
      if (d.place) {
      return (
        <ContainerView
          key = {idx}
          icon = {d.icon}
          place = {d.place}
          photo = {d.photo}
          rating = {d.rating}
          locale = {d.locale}
          latitude = {this.props.latitude}
          longitude = {this.props.longitude}
        />
      );
      }
    });
    return (
      <div>
        <h1>YOU ARE HERE &mdash; {this.props.street}</h1>
        <p><img src={`https://maps.googleapis.com/maps/api/staticmap?center=${this.props.latitude},${this.props.longitude}&zoom=17&size=3300x300&sensor=false`} /></p>
        <h2>Things to do in your area</h2>
        <div id = "lightboxFrame">
          <div className="restaurantLocations">
            {restaurantLocations}
          </div>
          <div className="todoLocations">
            {todoLocations}
          </div>
          <div className="touristLocations">
            {touristLocations}
          </div>
        </div>
      </div>
    )
  }
}

GeocodingView.propTypes = propTypes;

export default GeocodingView;
