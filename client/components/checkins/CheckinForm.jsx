import React from 'react';

const propTypes = {
  sendCheckin: React.PropTypes.func,
};

class CheckinForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = { body: '' };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleInputChange(e) {
    const target = e.target;
    const name = target.getAttribute('name');
    const value = target.value;
    const updated = {};
    updated[name] = value;
    this.setState(updated);
  }
  handleSubmit(e) {
    e.preventDefault();
    this.props.sendCheckin(this.state);
  }
  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <input
            type="text"
            name="body"
            value={this.state.body}
            placeholder="checkin..."
            onChange={this.handleInputChange}
          />
          <input type="submit" value="CHECKIN" />
        </form>
      </div>
    );
  }
}

CheckinForm.propTypes = propTypes;

export default CheckinForm;
