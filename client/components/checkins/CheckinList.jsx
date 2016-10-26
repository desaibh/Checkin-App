import React from 'react';

const propTypes = {
  checkins: React.PropTypes.array,
};

class CheckinList extends React.Component {
  componentWillReceiveProps() {
    this.render();
  }
  render() {

    return (
      <div>
        <h1>My AccountView</h1>
        <h2>
          Save this location. Plan future visits.
        </h2>
        <p>{this.props.checkins.map((checkin) =>
          checkin.note)}</p>
      </div>
    );
  }
}

CheckinList.propTypes = propTypes;

export default CheckinList;
