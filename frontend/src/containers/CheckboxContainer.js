import React, { Component } from "react";
import Checkbox from "../components/players/Checkbox";

class CheckboxContainer extends Component {
  render() {
    if (this.props.stats !== undefined) {
      return (
        <>
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
                  handleStatToggle={this.props.handleStatToggle}
                  toggled={this.props.toggled}
                />
              );
            })}
          </div>
        </>
      );
    } else {
      return <></>;
    }
  }
}

export default CheckboxContainer;
