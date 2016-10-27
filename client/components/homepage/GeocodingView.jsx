import React from 'react';
import ContainerView from './ContainerView.jsx';
import { ShareButtons, ShareCounts, generateShareIcon } from 'react-share';

const propTypes = {
  longitude: React.PropTypes.number.isRequired,
  latitude: React.PropTypes.number.isRequired,
  street: React.PropTypes.string.isRequired,
  restaurants: React.PropTypes.array.isRequired,
  todos: React.PropTypes.array.isRequired,
  touristspots: React.PropTypes.array.isRequired,
};

const {
  FacebookShareButton,
  GooglePlusShareButton,
  LinkedinShareButton,
  TwitterShareButton,
  PinterestShareButton,
  VKShareButton
} = ShareButtons;

const FacebookIcon = generateShareIcon('facebook');
const TwitterIcon = generateShareIcon('twitter');
const GooglePlusIcon = generateShareIcon('google');
const LinkedinIcon = generateShareIcon('linkedin');
const PinterestIcon = generateShareIcon('pinterest');
const VKIcon = generateShareIcon('vk');

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
    let newUrl = "desaibh.github.io/checkin-app";
    let newTitle = "Checking In";
    return (
      <div>
        <h1><img src="https://desaibh.github.io/checkin-app/dist/images/drop.png" />YOU ARE HERE &mdash; {this.props.street}</h1>
        <div className="shareColumn">
          <FacebookShareButton url={newUrl} title={newTitle}>
            <FacebookIcon size={48} round={true} />
          </FacebookShareButton>
          <TwitterShareButton url={newUrl} title={newTitle}>
            <TwitterIcon size={48} round={true} />
          </TwitterShareButton>
          <GooglePlusShareButton url={newUrl} >
            <GooglePlusIcon size={48} round={true} />
          </GooglePlusShareButton>
          <LinkedinShareButton url={newUrl} title={newTitle} windowWidth={750} windowHeight={600}>
            <LinkedinIcon  size={48} round={true} />
          </LinkedinShareButton>
          <PinterestShareButton url={newUrl} title={newTitle}>
            <PinterestIcon  size={48} round={true} />
          </PinterestShareButton>
          <VKShareButton url={newUrl} title={newTitle}>
            <VKIcon  size={48} round={true} />
          </VKShareButton>
        </div>
        <p><img src={`https://maps.googleapis.com/maps/api/staticmap?center=${this.props.latitude},${this.props.longitude}&zoom=17&size=600x300&sensor=false&style=feature:road|color:0xffffff`} width="94%" /></p>
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
