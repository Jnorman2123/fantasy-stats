import React, { Component } from "react";

class PlayerTable extends Component {
  render() {
    return (
      <table className="table table-bordered table-sm bg-dark">
        <thead>
          <tr>{this.props.renderStats()}</tr>
        </thead>
        <tbody>{this.props.renderPlayers()}</tbody>
      </table>
    );
  }
}

export default PlayerTable;
