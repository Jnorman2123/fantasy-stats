import React, { Component } from "react";
import Position from "../components/players/Position";

class PositionContainer extends Component {
  render() {
    if (this.props.positions !== undefined) {
      return (
        <div>
          <button
            type="button"
            className="btn btn-secondary dropdown-toggle btn-sm"
            data-toggle="dropdown"
          >
            Hide Position
          </button>
          <div
            className="dropdown-menu bg-secondary"
            aria-labelledby="dropdownMenuButton"
          >
            {this.props.positions.map((position) => {
              return (
                <Position
                  key={position}
                  position={position}
                  handlePositionToggle={this.props.handlePositionToggle}
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
