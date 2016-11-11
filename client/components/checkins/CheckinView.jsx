import React from 'react';
import Checkin from '../homepage/Geocoding.jsx';

const propTypes = {
  key: React.PropTypes.number,
  id: React.PropTypes.number.isRequired,
  address: React.PropTypes.string.isRequired,
  note: React.PropTypes.string.isRequired,
  latitude: React.PropTypes.string.isRequired,
  longitude: React.PropTypes.string.isRequired,
  uid: React.PropTypes.number.isRequired,
  updateNote: React.PropTypes.func,
  deleteCheckin: React.PropTypes.func,
  getGeolocations: React.PropTypes.func
}

class CheckinView extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      checkin: false
    }
    this.handleEditOfNote = this.handleEditOfNote.bind(this);
    this.getGeolocations = this.getGeolocations.bind(this);
  }
  handleEditOfNote(e) {
    e.preventDefault();
    const newNote = e.target.value;
    this.props.updateNote(this.props.id, newNote)
  }
  getGeolocations() {
    this.setState({checkin: true});
  }
  render() {
    return (
      <div>
        <h3><b>Address:</b> {this.props.address}</h3>
        <input type="text" defaultValue={this.props.note} onBlur={this.handleEditOfNote}  />
        <button onClick={this.getGeolocations()}>See What You Can Do Here</button>
      </div>
    )
  }
}

CheckinView.propTypes = propTypes;

export default CheckinView;
