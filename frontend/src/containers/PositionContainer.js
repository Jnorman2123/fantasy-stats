import React, { Component } from "react";
import Position from "../components/players/Position";

class PositionContainer extends Component {
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
                <Position
                  key={stat}
                  stat={stat}
                  handleStatToggle={this.props.handleStatToggle}
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

export default PositionContainer;
