import React from 'react';
import request from 'superagent';

const propTypes = {
  icon: React.PropTypes.string.isRequired,
  place: React.PropTypes.string.isRequired,
  photo: React.PropTypes.string,
  rating: React.PropTypes.number,
  locale: React.PropTypes.string.isRequired,
  longitude: React.PropTypes.number.isRequired,
  latitude: React.PropTypes.number.isRequired,
};

class ContainerView extends React.Component {
  constructor() {
    super();
    this.state = { stars: '' }
    this.makeAstar = this.makeAstar.bind(this);
  }
  makeAstar() {
    setInterval(console.log('waiting'), 10000);
    let starRating = parseInt(this.props.rating);
    let starImg = '🌟';
    let starArray = [];
    // for (let i in starRating) {
    //   starArray.push(starImg);
    // }
    // let starCount = 'Rating: ' + starImg * starRating;
    // this.setState ({
    //   stars: starArray.toString(),
    // })

  }
  render() {
    if (this.props.photo)  {
      let place = `https://maps.googleapis.com/maps/api/place/photo?maxwidth=200&photoreference=${this.props.photo}&key=AIzaSyAbXXCKNXsNet0L5QZpDN7zqh0eHpOo4lk}`;
    } else {
      let place = `../../../dist/images/star.png`
    }
    console.log(place);
    let placeLink =`https://www.google.com/search?q=google+places+API&oq=google+places&ie=UTF-8#q=${this.props.place}&tbs=lf:1,lf_ui:2,lf_pqs:EAE&rflfq=1&rlha=0&rllag=${this.props.latitude},${this.props.longitude},1170&tbm=lcl`;
    return (
      <div>
        <div className="lightbox">
          <img src={place} />
          <img src={this.props.icon} />
          <p>
           <a href={placeLink} target="_blank" >
             <b>{this.props.place}</b><br />
             {this.props.locale}<br />
          </a> </p>
        </div>
      </div>
    )
  }
}

ContainerView.propTypes = propTypes;

export default ContainerView;
