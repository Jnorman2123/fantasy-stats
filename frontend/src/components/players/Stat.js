import React, { Component } from "react";

class Stat extends Component {
  render() {
    if (this.props.toggled === "on") {
      return (
        <td
          className="bg-info text-light"
          toggled={this.props.toggled}
          onClick={this.props.handleSort}
        >
          {this.props.stat}
        </td>
      );
    } else {
      return <></>;
    }
  }
}

export default Stat;
