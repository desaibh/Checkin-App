import React from 'react';

const propTypes = {
  checkins: React.PropTypes.array,
};

class CheckinList extends React.Component {
  render() {
    return (
      <div>
        <h4>
          This feels... like it could look better...
        </h4>
        {this.props.checkins.map((checkin) => checkin.body).join(` & `)}
      </div>
    );
  }
}

CheckinList.propTypes = propTypes;

export default CheckinList;
