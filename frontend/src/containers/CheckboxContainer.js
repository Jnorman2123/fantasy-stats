import React, { Component } from "react";
import Checkbox from "../components/quarterbacks/Checkbox";

class CheckboxContainer extends Component {
  render() {
    if (this.props.stats !== undefined) {
      return (
        <div className="dropdown">
          <button
            type="button"
            className="btn btn-primary dropdown-toggle btn-sm"
            data-toggle="dropdown"
          >
            Hide Stat
          </button>
          <div
            className="dropdown-menu bg-primary"
            aria-labelledby="dropdownMenuButton"
          >
            {this.props.stats.map((stat) => {
              return (
                <Checkbox
                  key={stat}
                  stat={stat}
                  handleToggle={this.props.handleToggle}
                  toggled={this.props.toggled}
                />
              );
            })}
          </div>
        </div>
      );
    } else {
      return <></>;
    }
  }
}

export default CheckboxContainer;
