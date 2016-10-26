import React from 'react';

const propTypes = {
  sendCheckin: React.PropTypes.func,
};

class CheckinForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      target: '',
      submitted: false
     };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  componentDidMount() {
    this.setState({ submitted: false });
  }
  handleInputChange(e) {
    const target = e.target.value;
    this.setState({ target: target });
  }
  handleSubmit(e) {
    e.preventDefault();
    this.props.sendCheckin(this.state.target);
    this.setState({ submitted: true });

  }
  render() {
    return (
      <div>
        {this.state.submitted  ? false :
        <form onSubmit={this.handleSubmit}>
          <input
            type="text"
            name="body"
            value={this.state.body}
            placeholder="Add a note to your checkin..."
            onChange={this.handleInputChange}
          />
          <input type="submit" value="CHECKIN" className="formSubmit" />
        </form>}
      </div>
    );
  }
}

CheckinForm.propTypes = propTypes;

export default CheckinForm;
