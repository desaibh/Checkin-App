import React from 'react';
import request from 'superagent';
import CheckinView from './CheckinView.jsx';

const propTypes = {
  checkins: React.PropTypes.array,
  getCurrentUserCheckins: React.PropTypes.func,
};

class CheckinList extends React.Component {
  constructor(props){
    super(props);
    this.updateNote = this.updateNote.bind(this);
    this.deleteCheckin = this.deleteCheckin.bind(this);
    this.getGeolocations = this.getGeolocations.bind(this);
  }
  componentWillMount(){
    this.render();
  }
  updateNote(id, note) {
    request.patch(`api/checkins/${this.props.id}`)
             .send({ id, note })
             .then(() => {
             });
  }
  deleteCheckin(id) {
    // request.del(`api/checkins/${id}`)
    //        .then(() => {
    //          this.props.getCurrentUserCheckins();
    //        });
  }
  getGeolocations() {

  }
  render() {
    return (
      <div>
        <h1>My Account</h1>
        <h2>
          Save a location. Plan future visits.
        </h2>
        {this.props.checkins.map((checkin) =>
            <CheckinView
                key = {checkin.key}
                id = {checkin.id}
                note = {checkin.note}
                address = {checkin.streetaddress}
                latitude = {checkin.latitude}
                longitude = {checkin.longitude}
                updateNote = {this.updateNote}
                deleteCheckin = {this.deleteCheckin}
                getGeolocations = {this.getGeolocations}
            />
          )}
      </div>
    );
  }
}

CheckinList.propTypes = propTypes;

export default CheckinList;
