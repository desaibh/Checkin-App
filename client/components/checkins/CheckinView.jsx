import React from 'react';

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
    this.handleEditOfNote = this.handleEditOfNote.bind(this);
  }
  handleEditOfNote(e) {
    e.preventDefault();
    const newNote = e.target.value;
    this.props.updateNote(this.props.id, newNote, this.props.latitude, this.props.longitude, this.props.address, this.props.uid)
  }
  render() {
    return (
      <div>
        <h1>Saved Destination</h1>
        <p><b>Address:</b> {this.props.address}</p>
        <input type="text" defaultValue={this.props.note} onBlur={this.handleEditOfNote}  />
        <button onClick={this.props.deleteCheckin(this.props.id)}>Delete Checkin</button>
        <button onClick={this.props.getGeolocations()}>See What You Can Do Here</button>
        {this.props.id}
        {console.log(this.props.id)}
      </div>
    )
  }
}

CheckinView.propTypes = propTypes;

export default CheckinView;
