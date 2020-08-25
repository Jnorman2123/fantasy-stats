import React, { Component } from "react";

class Position extends Component {
  render() {
    return (
      <div className="form-check">
        <label>
          <input
            type="checkbox"
            name={this.props.position}
            toggled={this.props.isToggled}
            onChange={this.props.handlePositionToggle}
            className="form-check-input"
          />
          {this.props.position}
        </label>
      </div>
    );
  }
}

export default Position;
