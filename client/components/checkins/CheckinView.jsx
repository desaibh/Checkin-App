import React from 'react';
import CheckinGeolocation from './CheckinGeolocation.jsx';


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
}

class CheckinView extends React.Component {
  constructor(props){
    super(props);
    this.state = ({ checkin: true })
    this.handleEditOfNote = this.handleEditOfNote.bind(this);
    this.getGeolocations = this.getGeolocations.bind(this);
  }
  componentWillMount() {
    this.setState({
      checkin: true,
    });
  }
  handleEditOfNote(e) {
    e.preventDefault();
    const newNote = e.target.value;
    this.props.updateNote(this.props.id, newNote)
  }
  getGeolocations() {
    this.setState({
      checkin: false,
    });
  }
  render() {
    return (
      <div>
        <h3><b>Address:</b> {this.props.address}</h3>
        <input type="text" defaultValue={this.props.note} onBlur={this.handleEditOfNote}  />
        <button onClick={this.getGeolocations()}>See What You Can Do Here</button>
        {this.state.checkin ? false : <CheckinGeolocation latititude={this.props.latitude} longitude={this.props.longitude} hereiam={this.state.checkin} />  }
      </div>

    )
  }
}

CheckinView.propTypes = propTypes;

export default CheckinView;
