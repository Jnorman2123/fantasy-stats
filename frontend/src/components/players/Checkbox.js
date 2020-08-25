import React, { Component } from "react";

class Checkbox extends Component {
  render() {
    return (
      <div className="form-check">
        <label>
          <input
            type="checkbox"
            name={this.props.stat}
            toggled={this.props.isToggled}
            onChange={this.props.handleStatToggle}
            className="form-check-input"
          />
          {this.props.stat}
        </label>
      </div>
    );
  }
}

export default Checkbox;
