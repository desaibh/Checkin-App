import React from 'react';
import Geolocation from './Geolocation.jsx';

const propTypes = {
  hereiam: React.PropTypes.boolean,
}

class Main extends React.Component {
  render() {
    return (
      <div>
        <Geolocation
          hereiam={this.props.hereiam}
        />
      </div>
    )
  }
}

Main.propTypes = propTypes;

export default Main;
